import _ from '@lodash';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import match from 'autosuggest-highlight/match';
import clsx from 'clsx';
import { memo, useEffect, useReducer, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';


function getSuggestions(value, data) {
	const inputValue = _.deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0
		? []
		: data.filter(suggestion => {
			const keep = count < 10 && match(suggestion.title, inputValue).length > 0;

			if (keep) {
				count += 1;
			}

			return keep;
		});
}

const useStyles = makeStyles(theme => ({
	root: {},
	container: {
		position: 'relative'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	input: {
		transition: theme.transitions.create(['background-color'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.short
		}),
		'&:focus': {
			backgroundColor: theme.palette.background.paper
		},
	}
}));

const initialState = {
	searchText: '',
	search: false,
	navigation: null,
	suggestions: [],
	noSuggestions: false
};

function reducer(state, action) {
	switch (action.type) {
		case 'open': {
			return {
				...state,
				opened: true
			};
		}
		case 'close': {
			return {
				...state,
				opened: false,
				searchText: ''
			};
		}
		case 'setSearchText': {
			return {
				...state,
				searchText: action.value
			};
		}
		case 'setNavigation': {
			return {
				...state,
				navigation: action.value
			};
		}
		case 'updateSuggestions': {
			const suggestions = getSuggestions(action.value, state.navigation);
			const isInputBlank = action.value.trim() === '';
			const noSuggestions = !isInputBlank && suggestions.length === 0;

			return {
				...state,
				suggestions,
				noSuggestions
			};
		}
		case 'clearSuggestions': {
			return {
				...state,
				suggestions: [],
				noSuggestions: false
			};
		}
		case 'decrement': {
			return { count: state.count - 1 };
		}
		default: {
			throw new Error();
		}
	}
}

function FuseSearch(props) {
	const navigation = useSelector(selectFlatNavigation);
	const [state, dispatch] = useReducer(reducer, initialState);
	const classes = useStyles(props);
	const suggestionsNode = useRef(null);
	const popperNode = useRef(null);
	const buttonNode = useRef(null);

	const router = useHistory()

	useEffect(() => {
		window.addEventListener('storage', () => {
			const searchKeyword = sessionStorage.getItem('passenger_search_key')
			if (searchKeyword) {
				dispatch({ type: 'open' });
				dispatch({
					type: 'setSearchText',
					value: searchKeyword
				});
			}
		});
	}, [])

	useEffect(() => {
		dispatch({
			type: 'setNavigation',
			value: navigation
		});
	}, [navigation]);

	function showSearch(ev) {
		ev && ev.stopPropagation();
		dispatch({ type: 'open' });
		document.addEventListener('keydown', escFunction, false);
	}

	function hideSearch() {
		dispatch({ type: 'close' });
		document.removeEventListener('keydown', escFunction, false);
	}

	function escFunction(event) {
		if (event.keyCode === 27) {
			hideSearch();
		}
	}

	const searchPassenger = (value) => {
		router.push(`/apps/passenger/search/${value}`)
	}

	function handleChange(event) {
		dispatch({
			type: 'setSearchText',
			value: event.target.value
		});
	}

	const hanleKeyDown = (event) => {
		console.log("onChangedFired", event)
		if (event.key === 'Enter' && event.target.value?.length) {
			searchPassenger(event.target.value)
		}
	}

	function handleClickAway(event) {
		return (
			state.opened &&
			(!suggestionsNode.current || !suggestionsNode.current.contains(event.target)) &&
			hideSearch()
		);
	}


	switch (props.variant) {
		case 'basic': {
			return (
				<>
					<div className={clsx('flex items-center', props.className)} ref={popperNode}>
						<TextField
							inputProps={{
								classes,
								InputLabelProps: {
									shrink: true
								},
							}}
							value={state.searchText}
							autoFocus
							fullWidth
							placeholder={props.placeholder}
							onChange={handleChange}
							onKeyDown={hanleKeyDown}
						/>

					</div>
				</>
			);
		}
		case 'full': {
			return (
				<>
					<div className={clsx(classes.root, 'flex', props.className)}>
						<Tooltip title="Click to search" placement="bottom">
							<div onClick={showSearch} onKeyDown={showSearch} role="button" tabIndex={0} ref={buttonNode}>
								{props.trigger}
							</div>
						</Tooltip>

						{state.opened && (
							<ClickAwayListener onClickAway={handleClickAway}>
								<Paper className="absolute left-0 right-0 top-0 h-full z-9999 shadow-0" square>
									<div className="flex items-center max-w-320 mx-auto h-full" ref={popperNode}>
										<TextField
											id="passenger_search"
											name="passenger_search"
											inputProps={{
												classes,
												InputLabelProps: {
													shrink: true
												},
											}}
											value={state.searchText}
											autoFocus
											fullWidth
											placeholder={props.placeholder}
											onChange={handleChange}
											onKeyDown={hanleKeyDown}
										/>
										<IconButton onClick={hideSearch} className="mx-8">
											<Icon>close</Icon>
										</IconButton>
									</div>
								</Paper>
							</ClickAwayListener>
						)}
					</div>
				</>
			);
		}
		default: {
			return null;
		}
	}
}

FuseSearch.propTypes = {};
FuseSearch.defaultProps = {
	trigger: (
		<IconButton className="w-40 h-40">
			<Icon>search</Icon>
		</IconButton>
	),
	variant: 'full',
	placeholder: 'Search Passenger',
	noResults: 'No results..'
};

export default withRouter(memo(FuseSearch));
