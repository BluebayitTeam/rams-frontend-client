import {
	faCalendarAlt,
	faChevronDown,
	faCity,
	faPhoneAlt,
	faTimesCircle,
	faUser,
	faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { getCities, getGroups } from 'app/store/dataSlice';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	filterMenuContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0px 10px',
		'& .allFieldContainer': {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			flexWrap: 'wrap',
			'& .fieldContainer': {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				color: theme.palette.primary.main,
				height: '30px',
				width: 'fit-content',
				margin: '10px 5px',
				'& .textField': {
					height: '100%',
					margin: '0px 10px',
					background: 'inherit',
					border: 'none',
					outline: 'none',
					borderBottom: `1px solid ${theme.palette.primary.main}`,
					color: theme.palette.primary.main,
					width: '100%',
					transition: '0.3s',
					'&:focus': {
						borderBottomWidth: '2px',
						width: '100px !important'
					},
					'&::placeholder': {
						color: theme.palette.primary.main,
						opacity: 0.6
					},
					'&::-ms-input-placeholder': {
						color: theme.palette.primary.main,
						opacity: 0.6
					},
					'&:-ms-input-placeholder': {
						color: theme.palette.primary.main,
						opacity: 0.6
					}
				},
				'& .selectLabel': {
					overflow: 'hidden',
					transition: '0.3s',
					color: theme.palette.primary.main
				},
				'& .dateLabel': {
					width: 'fit-content',
					margin: '3px 5px 0px 8px',
					cursor: 'pointer',
					color: theme.palette.primary.main
				},
				'& .selectOpenIcon': {
					fontSize: '18px',
					overflow: 'hidden'
				},
				'& .selectField': {
					overflow: 'hidden',
					transition: '0.3s',
					'& .endAdornment': {
						'& > button': {
							color: theme.palette.primary.main
						}
					},
					// '& .popper': {
					//     width: '130px !important',
					//     color: 'bluer'
					// },
					'& .textFieldUnderSelect': {
						'& > div': {
							color: theme.palette.primary.main,
							'&::before': {
								borderColor: theme.palette.primary.main
							}
						}
					}
				},
				'& .icon': {
					fontSize: '20px'
				}
			}
		},
		'& .allKeyWrdContainer': {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center',
			margin: '30px auto 20px auto',
			paddingTop: '5px',
			borderTop: `1px solid ${theme.palette.primary.light}`,
			'& .keywordContainer': {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				width: 'fit-content',
				margin: '2px 5px',
				'& > b': {
					color: theme.palette.primary.main,
					opacity: 0.6,
					fontWeight: 600
				},
				'& > div': {
					padding: '3px 8px',
					fontSize: '14px',
					background: theme.palette.primary.light,
					color: theme.palette.primary.dark,
					margin: '3px 5px',
					borderRadius: '15px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					'& > p': {
						marginBottom: '-1px'
					},
					'& .iconWithKeyWord': {
						marginRight: '5px'
					},
					'& .closeIconWithKeyWord': {
						marginLeft: '5px',
						cursor: 'pointer'
					}
				}
			}
		}
	}
}));

function PassengerFilterMenu({ inShowAllMode, handleGetAgents, handleGetAllAgents }) {
	//element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);

	const [_reRender, setReRender] = useState(0);

	//select field data
	const districts = useSelector(state => state.data.cities);
	const groups = useSelector(state => state.data.groups);

	const methods = useFormContext();
	const { reset, control, formState, getValues, setValue } = methods;
	const { errors } = formState;
	const values = getValues();

	const classes = useStyles(values);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCities());
		dispatch(getGroups());
	}, []);

	console.log('values', getValues());

	//for tab
	// useLayoutEffect(() => {
	//     document.getElementById('groupEl').onfocus = () => setValue('groupFocused', true)
	// }, [])

	return (
		<>
			<div className={classes.filterMenuContainer}>
				<div className="allFieldContainer">
					<div className="fieldContainer">
						<FontAwesomeIcon className="icon" icon={faUser} />

						<input
							ref={userNameEl}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									setValue('username', e.target.value);
									inShowAllMode ? handleGetAllAgents() : handleGetAgents();
									userNameEl.current.blur();
									setReRender(Math.random());
								}
							}}
							className="textField"
							style={{ width: '75px' }}
							placeholder="User Name"
						/>
					</div>

					<div className="fieldContainer">
						<FontAwesomeIcon className="icon" icon={faUsers} />

						<div
							className="selectLabel"
							style={{
								width: values.groupFocused ? '0px' : '40px',
								margin: values.groupFocused ? '0px' : '2px 5px 0px 10px'
							}}
						>
							Group
						</div>
						<FontAwesomeIcon
							className="selectOpenIcon cursor-pointer"
							style={{
								width: values.groupFocused ? '0px' : '15px',
								margin: values.groupFocused ? '0px' : '2px 10px 0px 0px'
							}}
							onClick={() => {
								setValue('groupFocused', true);
								setReRender(Math.random());
								setTimeout(() => {
									document.getElementById('groupEl').focus();
								}, 400);
							}}
							icon={faChevronDown}
						/>

						<Controller
							name="group"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Autocomplete
									id="groupEl"
									className="mb-3 selectField"
									style={{
										width: values.groupFocused ? '130px' : '0px',
										margin: values.groupFocused ? '0px 10px' : '0px',
										display: values.groupFocused ? 'block' : 'none'
									}}
									classes={{ endAdornment: 'endAdornment' }}
									openOnFocus={true}
									onClose={() => {
										console.log('group onClose');
										setValue('groupFocused', false);
										setReRender(Math.random());
									}}
									freeSolo
									options={groups}
									value={value ? groups.find(data => data.id == value) : null}
									getOptionLabel={option => `${option.name}`}
									onChange={(event, newValue) => {
										onChange(newValue?.id);
										setValue('groupName', newValue?.name || '');
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
									}}
									renderInput={params => (
										<TextField
											{...params}
											className="textFieldUnderSelect"
											placeholder="Select group"
										/>
									)}
								/>
							)}
						/>
					</div>

					<div className="fieldContainer">
						<FontAwesomeIcon className="icon" icon={faPhoneAlt} />

						<input
							ref={primaryPhoneEl}
							className="textField"
							style={{ width: '45px' }}
							placeholder="Phone"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									setValue('primary_phone', e.target.value);
									inShowAllMode ? handleGetAllAgents() : handleGetAgents();
									primaryPhoneEl.current.blur();
									setReRender(Math.random());
								}
							}}
						/>
					</div>

					<div className="fieldContainer">
						<FontAwesomeIcon className="icon" icon={faCity} />

						<div
							className="selectLabel"
							style={{
								width: values.districtFocused ? '0px' : '45px',
								margin: values.districtFocused ? '0px' : '2px 5px 0px 10px'
							}}
						>
							District
						</div>
						<FontAwesomeIcon
							className="selectOpenIcon cursor-pointer"
							style={{
								width: values.districtFocused ? '0px' : '15px',
								margin: values.groupFocused ? '0px' : '2px 10px 0px 0px'
							}}
							onClick={() => {
								setValue('districtFocused', true);
								setReRender(Math.random());
								setTimeout(() => {
									document.getElementById('districtEl').focus();
								}, 400);
							}}
							icon={faChevronDown}
						/>

						<Controller
							name="district"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Autocomplete
									id="districtEl"
									className="mb-3 selectField"
									style={{
										width: values.districtFocused ? '130px' : '0px',
										margin: values.districtFocused ? '0px 10px' : '0px',
										display: values.districtFocused ? 'block' : 'none'
									}}
									classes={{ endAdornment: 'endAdornment' }}
									openOnFocus={true}
									onClose={() => {
										console.log('district onClose');
										setValue('districtFocused', false);
										setReRender(Math.random());
									}}
									freeSolo
									options={districts}
									value={value ? districts.find(data => data.id == value) : null}
									getOptionLabel={option => `${option.name}`}
									onChange={(event, newValue) => {
										onChange(newValue?.id);
										setValue('ditrictName', newValue?.name || '');
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
									}}
									renderInput={params => (
										<TextField
											{...params}
											className="textFieldUnderSelect"
											placeholder="Select District"
										/>
									)}
								/>
							)}
						/>
					</div>

					<div className="fieldContainer">
						<FontAwesomeIcon
							className="icon cursor-pointer"
							icon={faCalendarAlt}
							onClick={() => document.getElementById('dateAfterEl').click()}
						/>

						<div className="dateLabel" onClick={() => document.getElementById('dateAfterEl').click()}>
							Date From
						</div>

						<Controller
							name="date_after"
							control={control}
							render={({ field }) => {
								return (
									<DatePicker
										id="dateAfterEl"
										className="hidden"
										autoOk
										clearable
										format={'dd/MM/yyyy'}
										maxDate={values.date_before || new Date()}
										value={field.value || ''}
										onChange={value => {
											value
												? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
												: field.onChange('');
											// setReRender(Math.random());
											inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										}}
									/>
								);
							}}
						/>
					</div>

					<div className="fieldContainer">
						<FontAwesomeIcon
							className="icon cursor-pointer"
							icon={faCalendarAlt}
							onClick={() => document.getElementById('dateBeforeEl').click()}
						/>

						<div className="dateLabel" onClick={() => document.getElementById('dateBeforeEl').click()}>
							Date To
						</div>

						<Controller
							name="date_before"
							control={control}
							render={({ field }) => {
								return (
									<DatePicker
										id="dateBeforeEl"
										className="hidden"
										autoOk
										clearable
										format={'dd/MM/yyyy'}
										value={field.value || ''}
										minDate={values.date_after}
										maxDate={new Date()}
										onChange={value => {
											value
												? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
												: field.onChange('');
											// setReRender(Math.random());
											inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										}}
									/>
								);
							}}
						/>
					</div>
				</div>

				<div className="allKeyWrdContainer">
					{values.username && (
						<div className="keywordContainer">
							<b>User Name</b>
							<div>
								<FontAwesomeIcon className="iconWithKeyWord" icon={faUser} />
								<p>{values.username}</p>
								<FontAwesomeIcon
									className="closeIconWithKeyWord"
									icon={faTimesCircle}
									onClick={() => {
										setValue('username', '');
										userNameEl.current.value = '';
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										setReRender(Math.random());
									}}
								/>
							</div>
						</div>
					)}

					{values.groupName && (
						<div className="keywordContainer">
							<b>Group</b>
							<div>
								<FontAwesomeIcon className="iconWithKeyWord" icon={faUsers} />
								<p>{values.groupName}</p>
								<FontAwesomeIcon
									className="closeIconWithKeyWord"
									icon={faTimesCircle}
									onClick={() => {
										setValue('groupName', '');
										setValue('group', {});
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										setReRender(Math.random());
									}}
								/>
							</div>
						</div>
					)}

					{values.primary_phone && (
						<div className="keywordContainer">
							<b>Phone</b>
							<div>
								<FontAwesomeIcon className="iconWithKeyWord" icon={faPhoneAlt} />
								<p>{values.primary_phone}</p>
								<FontAwesomeIcon
									className="closeIconWithKeyWord"
									icon={faTimesCircle}
									onClick={() => {
										setValue('primary_phone', '');
										primaryPhoneEl.current.value = '';
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										setReRender(Math.random());
									}}
								/>
							</div>
						</div>
					)}

					{values.ditrictName && (
						<div className="keywordContainer">
							<b>District</b>
							<div>
								<FontAwesomeIcon className="iconWithKeyWord" icon={faCity} />
								<p>{values.ditrictName}</p>
								<FontAwesomeIcon
									className="closeIconWithKeyWord"
									icon={faTimesCircle}
									onClick={() => {
										setValue('ditrictName', '');
										setValue('district', {});
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										setReRender(Math.random());
									}}
								/>
							</div>
						</div>
					)}

					{values.date_after && (
						<div className="keywordContainer">
							<b>Date From</b>
							<div>
								<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
								<p>{values.date_after}</p>
								<FontAwesomeIcon
									className="closeIconWithKeyWord"
									icon={faTimesCircle}
									onClick={() => {
										setValue('date_after', '');
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										setReRender(Math.random());
									}}
								/>
							</div>
						</div>
					)}

					{values.date_before && (
						<div className="keywordContainer">
							<b>Date To</b>
							<div>
								<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
								<p>{values.date_before}</p>
								<FontAwesomeIcon
									className="closeIconWithKeyWord"
									icon={faTimesCircle}
									onClick={() => {
										setValue('date_before', '');
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
										setReRender(Math.random());
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default PassengerFilterMenu;
