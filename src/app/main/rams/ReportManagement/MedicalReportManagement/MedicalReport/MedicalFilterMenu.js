import { faCalendarAlt, faChevronDown, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { getCities, getPassengers } from 'app/store/dataSlice';
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
					color: theme.palette.primary.main
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

	//element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const agentCodeEl = useRef(null);

	//select field data
	const districts = useSelector(state => state.data.cities);
	const passengers = useSelector(state => state.data.passengers);
	const agents = useSelector(state => state.data.agents);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getCities());
		dispatch(getPassengers());
	}, []);

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* user name */}
				{/* <div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<input
						ref={userNameEl}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('username', e.target.value);
								inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
								userNameEl.current.blur();
								userNameEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() => (userNameEl.current.value = userNameEl.current.value || values.username || '')}
						className="textField"
						style={{ width: '75px' }}
						placeholder="User Name"
					/>
				</div> */}

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
										inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
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
										inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
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

				{/* phone */}
				{/* <div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faPhoneAlt} />

					<input
						ref={primaryPhoneEl}
						className="textField"
						style={{ width: '45px' }}
						placeholder="Phone"
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('primary_phone', e.target.value);
								inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
								primaryPhoneEl.current.blur();
								primaryPhoneEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() =>
							(primaryPhoneEl.current.value = primaryPhoneEl.current.value || values.primary_phone || '')
						}
					/>
				</div> */}

				{/* district */}
				{/* <div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faCity} />

					<div
						className="selectLabel"
						style={{
							width: values.districtFocused ? '0px' : '45px',
							margin: values.districtFocused ? '0px' : '2px 5px 0px 10px'
						}}
						onClick={() => {
							setValue('districtFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('districtEl').focus(), 300);
						}}
					>
						District
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.districtFocused ? '0px' : '15px',
							margin: values.districtFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('districtFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('districtEl').focus(), 300);
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
				</div> */}

				{/* Agent Code */}
				{/* <div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faQrcode} />

					<input
						ref={agentCodeEl}
						className="textField"
						style={{ width: '77px' }}
						placeholder="Agent Code"
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('agent_code', e.target.value);
								inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
								agentCodeEl.current.blur();
								agentCodeEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() =>
							(agentCodeEl.current.value = agentCodeEl.current.value || values.agent_code || '')
						}
					/>
				</div> */}
			</div>

			{/* keywords */}
			<div className="allKeyWrdContainer">
				{/* {values.username && (
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)} */}

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
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
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
									inShowAllMode ? handleGetAllPassengers() : handleGetPassengers();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{/* {values.passengerName && (
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
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
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.agent_code && (
					<div className="keywordContainer">
						<b>Agent Code</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faQrcode} />
							<p>{values.agent_code}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('agent_code', '');
									agentCodeEl.current.value = '';
									inShowAllMode ? handleGetAllMedicals() : handleGetMedicals();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)} */}
			</div>
		</div>
	);
}

export default MedicalFilterMenu;
