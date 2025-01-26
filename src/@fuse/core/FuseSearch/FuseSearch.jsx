import ClickAwayListener from '@mui/material/ClickAwayListener';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import clsx from 'clsx';
import _ from '@lodash';
import { memo, useEffect, useReducer, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';
import FuseSvgIcon from '../FuseSvgIcon';
import { makeStyles } from '@mui/styles';
import { Icon } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  '& .FuseSearch-container': {
    position: 'relative',
  },
  '& .FuseSearch-suggestionsContainerOpen': {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(),
    left: 0,
    right: 0,
  },
  '& .FuseSearch-suggestion': {
    display: 'block',
  },
  '& .FuseSearch-suggestionsList': {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  '& .FuseSearch-input': {
    transition: theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

function renderInputComponent(props) {
  const { variant, ref, inputRef = () => {}, ...other } = props;
  return (
    <div className='relative w-full'>
      {variant === 'basic' ? (
        // Outlined
        <>
          <TextField
            fullWidth
            InputProps={{
              inputRef: (node) => {
                ref?.(node);
                inputRef(node);
              },
              classes: {
                input:
                  'FuseSearch-input py-0 px-16 h-40 md:h-48 ltr:pr-48 rtl:pl-48',
                notchedOutline: 'rounded-8',
              },
            }}
            variant='outlined'
            {...other}
          />
          <FuseSvgIcon
            className='pointer-events-none absolute top-0 h-40 w-48 p-12 ltr:right-0 rtl:left-0 md:h-48'
            color='action'>
            heroicons-outline:search
          </FuseSvgIcon>
        </>
      ) : (
        // Standard
        <TextField
          fullWidth
          InputProps={{
            disableUnderline: true,
            inputRef: (node) => {
              ref?.(node);
              inputRef(node);
            },
            classes: {
              input: 'FuseSearch-input py-0 px-16 h-48 md:h-64',
            },
          }}
          variant='standard'
          {...other}
        />
      )}
    </div>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);
  return (
    <MenuItem selected={Boolean(isHighlighted)} component='div'>
      <ListItemIcon className='min-w-40'>
        {suggestion.icon ? (
          <FuseSvgIcon>{suggestion.icon}</FuseSvgIcon>
        ) : (
          <span className='w-24 text-center text-20 font-semibold uppercase'>
            {suggestion.title[0]}
          </span>
        )}
      </ListItemIcon>
      <ListItemText
        primary={parts.map((part, index) =>
          part.highlight ? (
            <span key={index} style={{ fontWeight: 600 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      />
    </MenuItem>
  );
}

function getSuggestions(value, data) {
  const inputValue = _.deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  if (inputLength === 0) {
    return [];
  }

  return data.filter((suggestion) => {
    const keep =
      count < 10 &&
      suggestion?.title &&
      match(suggestion?.title, inputValue)?.length > 0;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  input: {
    transition: theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const initialState = {
  searchText: '',
  search: false,
  navigation: [],
  suggestions: [],
  noSuggestions: false,
  opened: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'open': {
      return {
        ...state,
        opened: true,
      };
    }
    case 'close': {
      return {
        ...state,
        opened: false,
        searchText: '',
      };
    }
    case 'setSearchText': {
      return {
        ...state,
        searchText: action.value,
      };
    }
    case 'setNavigation': {
      return {
        ...state,
        navigation: action.data,
      };
    }
    case 'updateSuggestions': {
      const suggestions = getSuggestions(action.value, state.navigation);
      const isInputBlank =
        typeof action.value === 'string' && action.value.trim() === '';
      const noSuggestions = !isInputBlank && suggestions.length === 0;
      return {
        ...state,
        suggestions,
        noSuggestions,
      };
    }
    case 'clearSuggestions': {
      return {
        ...state,
        suggestions: [],
        noSuggestions: false,
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

/**
 * FuseSearch component
 */
function FuseSearch(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const suggestionsNode = useRef(null);
  const popperAnchor = useRef(null);
  const popperNode = useRef(null);
  const buttonNode = useRef(null);
  const classes = useStyles(props);

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e?.detail?.name === 'passenger_search_key') {
        const searchKeyword = sessionStorage.getItem('passenger_search_key');
        if (searchKeyword) {
          dispatch({ type: 'open' });
          dispatch({
            type: 'setSearchText',
            value: searchKeyword,
          });
        }
      }
    });
  }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: 'setNavigation',
  //     data: navigation,
  //   });
  // }, [navigation]);

  function showSearch() {
    dispatch({ type: 'open' });
    document.addEventListener('keydown', escFunction, false);
  }

  function hideSearch() {
    dispatch({ type: 'close' });
    document.removeEventListener('keydown', escFunction, false);
  }

  function escFunction(event) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      hideSearch();
    }
  }

  function handleSuggestionsFetchRequested({ value }) {
    dispatch({
      type: 'updateSuggestions',
      value,
    });
  }

  function handleSuggestionSelected(event, { suggestion }) {
    event.preventDefault();
    event.stopPropagation();

    if (!suggestion.url) {
      return;
    }

    navigate(suggestion.url);
    hideSearch();
  }

  function handleSuggestionsClearRequested() {
    dispatch({
      type: 'clearSuggestions',
    });
  }

  function handleChange(event) {
    dispatch({
      type: 'setSearchText',
      value: event.target.value,
    });
  }

  const hanleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value?.length) {
      searchPassenger(event.target.value);
    }
  };

  const searchPassenger = (value) => {
    console.log('PrintValue', value);
    navigate(`/apps/passengerSearch/passengerSearchs/${value}`);
  };
  function handleClickAway(event) {
    if (
      state.opened &&
      (!suggestionsNode.current ||
        !(
          event.target instanceof Node &&
          suggestionsNode.current.contains(event.target)
        ))
    ) {
      hideSearch();
    }
  }

  switch (props.variant) {
    case 'basic': {
      return (
        <>
          <div
            className={clsx('flex items-center', props.className)}
            ref={popperNode}>
            <TextField
              inputProps={{
                classes,
                InputLabelProps: {
                  shrink: true,
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
            <Tooltip title='Click to search' placement='bottom'>
              <div
                onClick={showSearch}
                onKeyDown={showSearch}
                role='button'
                tabIndex={0}
                ref={buttonNode}>
                {props.trigger}
              </div>
            </Tooltip>

            {state.opened && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper className='absolute left-0 right-0 top-0 h-full z-9999 shadow-0 px-20'>
                  <div
                    className='flex items-center max-w-520 mx-auto h-full'
                    ref={popperNode}>
                    <TextField
                      id='passenger_search'
                      name='passenger_search'
                      inputProps={{
                        classes,
                        InputLabelProps: {
                          shrink: true,
                        },
                      }}
                      value={state.searchText}
                      autoFocus
                      fullWidth
                      placeholder={props.placeholder}
                      onChange={handleChange}
                      onKeyDown={hanleKeyDown}
                    />
                    <IconButton onClick={hideSearch} className='mx-8'>
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
    <IconButton className='w-40 h-40'>
      <Icon>search</Icon>
    </IconButton>
  ),
  variant: 'full',
  placeholder: 'Search Passenger Id or Passport No',
  noResults: 'No results..',
};

export default memo(FuseSearch);
