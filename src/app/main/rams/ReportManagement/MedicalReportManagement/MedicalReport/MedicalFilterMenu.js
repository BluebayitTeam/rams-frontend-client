import {
	faCalendarAlt,
	faChevronDown,
	faFlag,
	faGenderless,
	faTextHeight,
	faTimesCircle,
	faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { genders } from 'app/@data/data';
import { getAgents, getCountries, getPassengers, getPassengerTypes } from 'app/store/dataSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
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
					color: theme.palette.primary.main,
					whiteSpace: 'nowrap'
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

function MedicalFilterMenu({ inShowAllMode, handleGetMedicals, handleGetAllMedicals }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//select field data
	const passengers = useSelector(state => state.data.passengers);
	const countries = useSelector(state => state.data.countries);
	const agents = useSelector(state => state.data.agents);
	const passengerTypes = useSelector(state => state.data.passengerTypes);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCountries());
		dispatch(getAgents());
		dispatch(getPassengerTypes());
	}, []);

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* M.Rpt From */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('reportDateAfterEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('reportDateAfterEl').click()}>
						M.Rpt From
					</div>

					<Controller
						name="report_date_after"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="reportDateAfterEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									maxDate={values.report_date_bofore || new Date()}
									value={field.value || ''}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* M.Rpt To */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('reportDateBeforeEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('reportDateBeforeEl').click()}>
						M.Rpt To
					</div>

					<Controller
						name="report_date_bofore"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="reportDateBeforeEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									value={field.value || ''}
									minDate={values.report_date_after}
									maxDate={new Date()}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* M.Exp From */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('expDateAfterEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('expDateAfterEl').click()}>
						M.Exp From
					</div>

					<Controller
						name="expiry_date_after"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="expDateAfterEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									maxDate={values.expiry_date_bofore || new Date()}
									value={field.value || ''}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* M.Exp To */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('expDateBeforeEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('expDateBeforeEl').click()}>
						M.Exp To
					</div>

					<Controller
						name="expiry_date_bofore"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="expDateBeforeEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									value={field.value || ''}
									minDate={values.expiry_date_after}
									maxDate={new Date()}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* M.Ent from */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('dateAfterEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('dateAfterEl').click()}>
						M.Ent From
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
										inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* M.Ent to */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('dateBeforeEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('dateBeforeEl').click()}>
						M.Ent To
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
										inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* Passenger */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<div
						className="selectLabel"
						style={{
							width: values.passengerFocused ? '0px' : '68px',
							margin: values.passengerFocused ? '0px' : '2px 5px 0px 10px'
						}}
						onClick={() => {
							setValue('passengerFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('passengerEl').focus(), 300);
						}}
					>
						Passenger
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.passengerFocused ? '0px' : '15px',
							margin: values.passengerFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('passengerFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('passengerEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="passenger"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="passengerEl"
								className="mb-3 selectField"
								style={{
									width: values.passengerFocused ? '130px' : '0px',
									margin: values.passengerFocused ? '0px 10px' : '0px',
									display: values.passengerFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('passengerFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={passengers}
								value={value ? passengers.find(data => data.id == value) : null}
								getOptionLabel={option =>
									`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
								}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('passengerName', newValue?.passenger_name || '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Passenger"
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
							margin: values.countryFocused ? '0px' : '3px 5px 0px 5px'
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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

				{/* passenger Type */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faTextHeight} />

					<div
						className="selectLabel"
						style={{
							width: values.passengerTypeFocused ? '0px' : '102px',
							margin: values.passengerTypeFocused ? '0px' : '3px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('passengerTypeFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('passengerTypeEl').focus(), 300);
						}}
					>
						Passenger Type
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.passengerTypeFocused ? '0px' : '15px',
							margin: values.passengerTypeFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('passengerTypeFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('passengerTypeEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="passenger_type"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="passengerTypeEl"
								className="mb-3 selectField"
								style={{
									width: values.passengerTypeFocused ? '130px' : '0px',
									margin: values.passengerTypeFocused ? '0px 10px' : '0px',
									display: values.passengerTypeFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('passengerTypeFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={passengerTypes}
								value={value ? passengerTypes.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('passengerTypeName', newValue?.name || '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select passenger type"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* gender */}
				<div className="fieldContainer">
					<FontAwesomeIcon style={{ fontSize: '30px' }} icon={faGenderless} />

					<div
						className="selectLabel"
						style={{
							width: values.genderFocused ? '0px' : '48px',
							margin: values.genderFocused ? '0px' : '3px 5px 0px 5px'
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
				{values.report_date_after && (
					<div className="keywordContainer">
						<b>M.Rpt From</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{values.report_date_after}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('report_date_after', '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.report_date_bofore && (
					<div className="keywordContainer">
						<b>M.Rpt To</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{values.report_date_bofore}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('report_date_bofore', '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.expiry_date_after && (
					<div className="keywordContainer">
						<b>M.Exp From</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{values.expiry_date_after}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('expiry_date_after', '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.expiry_date_bofore && (
					<div className="keywordContainer">
						<b>M.Exp To</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{values.expiry_date_bofore}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('expiry_date_bofore', '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.date_after && (
					<div className="keywordContainer">
						<b>M.Ent From</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{values.date_after}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('date_after', '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.date_before && (
					<div className="keywordContainer">
						<b>M.Ent To</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{values.date_before}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('date_before', '');
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.passengerName && (
					<div className="keywordContainer">
						<b>Passenger</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUser} />
							<p>{values.passengerName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('passengerName', '');
									setValue('passenger', {});
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUser} />
							<p>{values.agentName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('agentName', '');
									setValue('agent', {});
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.passengerTypeName && (
					<div className="keywordContainer">
						<b>Passenger Type</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faTextHeight} />
							<p>{values.passengerTypeName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('passengerTypeName', '');
									setValue('passenger_type', {});
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
							<FontAwesomeIcon
								style={{ fontSize: '20px' }}
								className="iconWithKeyWord"
								icon={faGenderless}
							/>
							<p>{values.genderName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('genderName', '');
									setValue('gender', {});
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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

export default MedicalFilterMenu;
