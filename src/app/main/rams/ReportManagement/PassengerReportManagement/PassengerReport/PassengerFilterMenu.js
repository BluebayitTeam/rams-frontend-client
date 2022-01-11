import {
	faCalendarAlt,
	faChevronDown,
	faFlag,
	faGenderless,
	faTimesCircle,
	faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { LocalActivity } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { genders } from 'app/@data/data';
import { getAgents, getCountries, getCurrentStatuss } from 'app/store/dataSlice';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	filterMenuContainer: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0px 10px',
		'& .borderTop': {
			borderTop: `1px solid ${theme.palette.primary.light}`
		},
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
					borderBottom: `1px solid ${theme.palette.primary.light}`,
					color: theme.palette.primary.main,
					width: '100%',
					transition: '0.3s',
					'&:focus': {
						borderBottom: `1px solid ${theme.palette.primary.main}`,
						width: '100px !important'
					},
					'&::placeholder': {
						color: theme.palette.primary.main
					},
					'&::-ms-input-placeholder': {
						color: theme.palette.primary.main
					},
					'&:-ms-input-placeholder': {
						color: theme.palette.primary.main
					}
				},
				'& .selectLabel': {
					cursor: 'pointer',
					overflow: 'hidden',
					transition: '0.3s',
					color: theme.palette.primary.main,
					whiteSpace: 'nowrap'
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
			margin: '20px auto',
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
					height: '25px',
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

function PassengerFilterMenu({ inShowAllMode, handleGetPassengers, handleGetAllPassengers }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//element refs
	const passengerNameEl = useRef(null);

	//select field data
	const currentStatuss = useSelector(state => state.data.currentStatuss);
	const countries = useSelector(state => state.data.countries);
	const agents = useSelector(state => state.data.agents);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
		dispatch(getAgents());
	}, []);

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* date from */}
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
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* date to */}
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
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* passenger name */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<input
						ref={passengerNameEl}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('passenger_name', e.target.value);
								inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
								passengerNameEl.current.blur();
								passengerNameEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() =>
							(passengerNameEl.current.value =
								passengerNameEl.current.value || values.passenger_name || '')
						}
						className="textField"
						style={{ width: '111px' }}
						placeholder="Passenger Name"
					/>
				</div>

				{/* current status */}
				<div className="fieldContainer">
					<LocalActivity style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.currentStatusFocused ? '0px' : '94px',
							margin: values.currentStatusFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('currentStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('currentStatusEl').focus(), 300);
						}}
					>
						Current Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.currentStatusFocused ? '0px' : '15px',
							margin: values.currentStatusFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('currentStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('currentStatusEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="current_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="currentStatusEl"
								className="mb-3 selectField"
								style={{
									width: values.currentStatusFocused ? '130px' : '0px',
									margin: values.currentStatusFocused ? '0px 10px' : '0px',
									display: values.currentStatusFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('currentStatusFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={currentStatuss}
								value={value ? currentStatuss.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('currentStatusName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select current status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* country */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faFlag} />

					<div
						className="selectLabel"
						style={{
							width: values.countryFocused ? '0px' : '52px',
							margin: values.countryFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('countryFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('countryEl').focus(), 300);
						}}
					>
						Country
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.countryFocused ? '0px' : '15px',
							margin: values.countryFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('countryFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('countryEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="target_country"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="countryEl"
								className="mb-3 selectField"
								style={{
									width: values.countryFocused ? '130px' : '0px',
									margin: values.countryFocused ? '0px 10px' : '0px',
									display: values.countryFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('countryFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={countries}
								value={value ? countries.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('countryName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select country"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* agent */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<div
						className="selectLabel"
						style={{
							width: values.agentFocused ? '0px' : '38px',
							margin: values.agentFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('agentFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('agentEl').focus(), 300);
						}}
					>
						Agent
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.agentFocused ? '0px' : '15px',
							margin: values.agentFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('agentFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('agentEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="agent"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="agentEl"
								className="mb-3 selectField"
								style={{
									width: values.agentFocused ? '130px' : '0px',
									margin: values.agentFocused ? '0px 10px' : '0px',
									display: values.agentFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('agentFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={agents}
								value={value ? agents.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.username}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('agentName', newValue?.username || '');
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select agent"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* gender */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faGenderless} />

					<div
						className="selectLabel"
						style={{
							width: values.genderFocused ? '0px' : '48px',
							margin: values.genderFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('genderFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('genderEl').focus(), 300);
						}}
					>
						Gender
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.genderFocused ? '0px' : '15px',
							margin: values.genderFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('genderFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('genderEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="gender"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="genderEl"
								className="mb-3 selectField"
								style={{
									width: values.genderFocused ? '130px' : '0px',
									margin: values.genderFocused ? '0px 10px' : '0px',
									display: values.genderFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('genderFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={genders}
								value={value ? genders.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('genderName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select gender"
									/>
								)}
							/>
						)}
					/>
				</div>
			</div>

			{/* keywords */}
			<div className="allKeyWrdContainer">
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
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
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
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.passenger_name && (
					<div className="keywordContainer">
						<b>Passenger Name</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUser} />
							<p>{values.passenger_name}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('passenger_name', '');
									passengerNameEl.current.value = '';
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.currentStatusName && (
					<div className="keywordContainer">
						<b>Current Status</b>
						<div>
							<LocalActivity className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.currentStatusName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('currentStatusName', '');
									setValue('current_status', {});
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.countryName && (
					<div className="keywordContainer">
						<b>Country</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faFlag} />
							<p>{values.countryName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('countryName', '');
									setValue('target_country', {});
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.agentName && (
					<div className="keywordContainer">
						<b>Agent</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faFlag} />
							<p>{values.agentName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('agentName', '');
									setValue('agent', {});
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}
				{values.genderName && (
					<div className="keywordContainer">
						<b>Gender</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faFlag} />
							<p>{values.genderName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('genderName', '');
									setValue('gender', {});
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default PassengerFilterMenu;
