import {
	faCalendarAlt,
	faChevronDown,
	faFlag,
	faGenderless,
	faIdCard,
	faLandmark,
	faTextHeight,
	faTimesCircle,
	faUniversalAccess,
	faUser,
	faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { Accessibility, DriveEta, LocalActivity, Report, TouchApp } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { doneNotDone, genders, medicalResults } from 'app/@data/data';
import {
	getAgents,
	getCountries,
	getCurrentStatuss,
	getDemands,
	getPassengers,
	getPassengerTypes,
	getProfessions
} from 'app/store/dataSlice';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getReportFilterMakeStyles } from '../../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportFilterMakeStyles(theme)
}));

function PassengerSummaryFilterMenu({ inShowAllMode, handleGetPassengerSummarys, handleGetAllPassengerSummarys }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//input dom refs
	const visaNoEl = useRef(null);

	//select field data
	const passengers = useSelector(state => state.data.passengers);
	const demands = useSelector(state => state.data.demands);
	const countries = useSelector(state => state.data.countries);
	const agents = useSelector(state => state.data.agents);
	const professions = useSelector(state => state.data.professions);
	const passengerTypes = useSelector(state => state.data.passengerTypes);
	const currentStatuss = useSelector(state => state.data.currentStatuss);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getDemands());
		dispatch(getCountries());
		dispatch(getAgents());
		dispatch(getProfessions());
		dispatch(getPassengerTypes());
		dispatch(getCurrentStatuss());
	}, []);

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* demand */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<div
						className="selectLabel"
						style={{
							width: values.demandFocused ? '0px' : '56px',
							margin: values.demandFocused ? '0px' : '2px 5px 0px 10px'
						}}
						onClick={() => {
							setValue('demandFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('demandEl').focus(), 300);
						}}
					>
						Demand
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.demandFocused ? '0px' : '15px',
							margin: values.demandFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('demandFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('demandEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="demand"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="demandEl"
								className="mb-3 selectField"
								style={{
									width: values.demandFocused ? '130px' : '0px',
									margin: values.demandFocused ? '0px 10px' : '0px',
									display: values.demandFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('demandFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={demands}
								value={value ? demands.find(data => data.id == value) : null}
								getOptionLabel={option => option.company_name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('demandName', newValue?.company_name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Demand"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* P.agent */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<div
						className="selectLabel"
						style={{
							width: values.passengerAgentFocused ? '0px' : '48px',
							margin: values.passengerAgentFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('passengerAgentFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('passengerAgentEl').focus(), 300);
						}}
					>
						P.Agent
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.passengerAgentFocused ? '0px' : '15px',
							margin: values.passengerAgentFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('passengerAgentFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('passengerAgentEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="passenger_agent"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="passengerAgentEl"
								className="mb-3 selectField"
								style={{
									width: values.passengerAgentFocused ? '130px' : '0px',
									margin: values.passengerAgentFocused ? '0px 10px' : '0px',
									display: values.passengerAgentFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('passengerAgentFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={agents}
								value={value ? agents.find(data => data.id == value) : null}
								getOptionLabel={option => option.username}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('passengerAgentName', newValue?.username || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select p.Agent"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* Visa No */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUniversalAccess} />

					<input
						ref={visaNoEl}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('visa_number', e.target.value);
								inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								visaNoEl.current.blur();
								visaNoEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() => (visaNoEl.current.value = visaNoEl.current.value || values.visa_number || '')}
						className="textField"
						style={{ width: '50px' }}
						placeholder="Visa No"
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
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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

				{/* profession */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUserTie} />

					<div
						className="selectLabel"
						style={{
							width: values.professionFocused ? '0px' : '68px',
							margin: values.professionFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('professionFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('professionEl').focus(), 300);
						}}
					>
						Profession
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.professionFocused ? '0px' : '15px',
							margin: values.professionFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('professionFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('professionEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="profession"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="professionEl"
								className="mb-3 selectField"
								style={{
									width: values.professionFocused ? '130px' : '0px',
									margin: values.professionFocused ? '0px 10px' : '0px',
									display: values.professionFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('professionFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={professions}
								value={value ? professions.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('professionName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select profession"
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
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
						name="country"
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
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									setValue('genderName', newValue?.id || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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

				{/* Mofa Status */}
				<div className="fieldContainer">
					<LocalActivity style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.mofaStatusFocused ? '0px' : '77px',
							margin: values.mofaStatusFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('mofaStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('mofaStatusEl').focus(), 300);
						}}
					>
						Mofa Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.mofaStatusFocused ? '0px' : '15px',
							margin: values.mofaStatusFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('mofaStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('mofaStatusEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="mofa_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="mofaStatusEl"
								className="mb-3 selectField"
								style={{
									width: values.mofaStatusFocused ? '130px' : '0px',
									margin: values.mofaStatusFocused ? '0px 10px' : '0px',
									display: values.mofaStatusFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('mofaStatusFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={doneNotDone}
								value={value ? doneNotDone.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('mofaStatusName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Mofa Status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* Stamping from */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('stampingDateAfterEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('stampingDateAfterEl').click()}>
						Stanping From
					</div>

					<Controller
						name="stamping_date_after"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="stampingDateAfterEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									maxDate={values.stamping_date_before || new Date()}
									value={field.value || ''}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* Stamping to */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('stampingDateBeforeEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('stampingDateBeforeEl').click()}>
						Stamping To
					</div>

					<Controller
						name="stamping_date_before"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="stampingDateBeforeEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									value={field.value || ''}
									minDate={values.stamping_date_after}
									maxDate={new Date()}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* Medical Resul */}
				<div className="fieldContainer">
					<Report style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.medicalResultFocused ? '0px' : '93px',
							margin: values.medicalResultFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('medicalResultFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('medicalResultEl').focus(), 300);
						}}
					>
						Medical Result
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.medicalResultFocused ? '0px' : '15px',
							margin: values.medicalResultFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('medicalResultFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('medicalResultEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="medical_result"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="medicalResultEl"
								className="mb-3 selectField"
								style={{
									width: values.medicalResultFocused ? '130px' : '0px',
									margin: values.medicalResultFocused ? '0px 10px' : '0px',
									display: values.medicalResultFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('medicalResultFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={medicalResults}
								value={value ? medicalResults.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('medicalResultName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select M.Result"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* Med.Exp from */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('medicalExpDateAfterEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('medicalExpDateAfterEl').click()}>
						Med.Exp From
					</div>

					<Controller
						name="medical_expiry_date_after"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="medicalExpDateAfterEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									maxDate={values.medical_expiry_date_before || new Date()}
									value={field.value || ''}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* Med.Exp to */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('medicalExpDateBeforeEl').click()}
					/>

					<div
						className="dateLabel"
						onClick={() => document.getElementById('medicalExpDateBeforeEl').click()}
					>
						Med.Exp To
					</div>

					<Controller
						name="medical_expiry_date_before"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="medicalExpDateBeforeEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									value={field.value || ''}
									minDate={values.medical_expiry_date_after}
									maxDate={new Date()}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* PC.Status */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faLandmark} />

					<div
						className="selectLabel"
						style={{
							width: values.pCStatusFocused ? '0px' : '61px',
							margin: values.pCStatusFocused ? '0px' : '2px 5px 0px 7px'
						}}
						onClick={() => {
							setValue('pCStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('pCStatusEl').focus(), 300);
						}}
					>
						PC.Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.pCStatusFocused ? '0px' : '15px',
							margin: values.pCStatusFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('pCStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('pCStatusEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="police_clearance_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="pCStatusEl"
								className="mb-3 selectField"
								style={{
									width: values.pCStatusFocused ? '130px' : '0px',
									margin: values.pCStatusFocused ? '0px 10px' : '0px',
									display: values.pCStatusFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('pCStatusFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={doneNotDone}
								value={value ? doneNotDone.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('pCStatusName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select PC.Status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* DL.Status */}
				<div className="fieldContainer">
					<DriveEta style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.dLStatusFocused ? '0px' : '61px',
							margin: values.dLStatusFocused ? '0px' : '2px 5px 0px 4px'
						}}
						onClick={() => {
							setValue('dLStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('dLStatusEl').focus(), 300);
						}}
					>
						DL.Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.dLStatusFocused ? '0px' : '15px',
							margin: values.dLStatusFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('dLStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('dLStatusEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="driving_license_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="dLStatusEl"
								className="mb-3 selectField"
								style={{
									width: values.dLStatusFocused ? '130px' : '0px',
									margin: values.dLStatusFocused ? '0px 10px' : '0px',
									display: values.dLStatusFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('dLStatusFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={doneNotDone}
								value={value ? doneNotDone.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('dLStatusName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select DL.Status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* Fng.Status */}
				<div className="fieldContainer">
					<TouchApp style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.fngStatusFocused ? '0px' : '68px',
							margin: values.fngStatusFocused ? '0px' : '3px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('fngStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('fngStatusEl').focus(), 300);
						}}
					>
						Fng.Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.fngStatusFocused ? '0px' : '15px',
							margin: values.fngStatusFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('fngStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('fngStatusEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="finger_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="fngStatusEl"
								className="mb-3 selectField"
								style={{
									width: values.fngStatusFocused ? '130px' : '0px',
									margin: values.fngStatusFocused ? '0px 10px' : '0px',
									display: values.fngStatusFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('fngStatusFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={doneNotDone}
								value={value ? doneNotDone.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('fngStatusName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Fng.Status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* Trng.Card Status */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faIdCard} />

					<div
						className="selectLabel"
						style={{
							width: values.trngCrdStatusFocused ? '0px' : '108px',
							margin: values.trngCrdStatusFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('trngCrdStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('trngCrdStatusEl').focus(), 300);
						}}
					>
						Trng.Card Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.trngCrdStatusFocused ? '0px' : '15px',
							margin: values.trngCrdStatusFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('trngCrdStatusFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('trngCrdStatusEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="training_card_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="trngCrdStatusEl"
								className="mb-3 selectField"
								style={{
									width: values.trngCrdStatusFocused ? '130px' : '0px',
									margin: values.trngCrdStatusFocused ? '0px 10px' : '0px',
									display: values.trngCrdStatusFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('trngCrdStatusFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={doneNotDone}
								value={value ? doneNotDone.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('trngCrdStatusName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Trng.Card Status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* ManP.from */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('manPwrDateAfterEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('manPwrDateAfterEl').click()}>
						ManP.from
					</div>

					<Controller
						name="man_power_date_after"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="manPwrDateAfterEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									maxDate={values.man_power_date_before || new Date()}
									value={field.value || ''}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* ManP.to */}
				<div className="fieldContainer">
					<FontAwesomeIcon
						className="icon cursor-pointer"
						icon={faCalendarAlt}
						onClick={() => document.getElementById('manPwrDateBeforeEl').click()}
					/>

					<div className="dateLabel" onClick={() => document.getElementById('manPwrDateBeforeEl').click()}>
						ManP.To
					</div>

					<Controller
						name="man_power_date_before"
						control={control}
						render={({ field }) => {
							return (
								<DatePicker
									id="manPwrDateBeforeEl"
									className="hidden"
									autoOk
									clearable
									format={'dd/MM/yyyy'}
									value={field.value || ''}
									minDate={values.man_power_date_after}
									maxDate={new Date()}
									onChange={value => {
										value
											? field.onChange(moment(new Date(value)).format('YYYY-MM-DD'))
											: field.onChange('');
										setReRender(Math.random());
										inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* ManP.Status */}
				<div className="fieldContainer">
					<Accessibility style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.manPowerStsFocused ? '0px' : '80px',
							margin: values.manPowerStsFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('manPowerStsFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('manPowerStsEl').focus(), 300);
						}}
					>
						ManP.Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.manPowerStsFocused ? '0px' : '15px',
							margin: values.manPowerStsFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('manPowerStsFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('manPowerStsEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="man_power_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="manPowerStsEl"
								className="mb-3 selectField"
								style={{
									width: values.manPowerStsFocused ? '130px' : '0px',
									margin: values.manPowerStsFocused ? '0px 10px' : '0px',
									display: values.manPowerStsFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('manPowerStsFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={doneNotDone}
								value={value ? doneNotDone.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('manPowerStsName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Trng.Card Status"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* V.agent */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUniversalAccess} />

					<div
						className="selectLabel"
						style={{
							width: values.visaAgentFocused ? '0px' : '51px',
							margin: values.visaAgentFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('visaAgentFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('visaAgentEl').focus(), 300);
						}}
					>
						V.Agent
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.visaAgentFocused ? '0px' : '15px',
							margin: values.visaAgentFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('visaAgentFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('visaAgentEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="visa_agent"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="visaAgentEl"
								className="mb-3 selectField"
								style={{
									width: values.visaAgentFocused ? '130px' : '0px',
									margin: values.visaAgentFocused ? '0px 10px' : '0px',
									display: values.visaAgentFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('visaAgentFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={agents}
								value={value ? agents.find(data => data.id == value) : null}
								getOptionLabel={option => option.username}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('visaAgentName', newValue?.username || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select V.Agent"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* Current Status */}
				<div className="fieldContainer">
					<LocalActivity style={{ fontSize: '25px' }} />

					<div
						className="selectLabel"
						style={{
							width: values.currentStsFocused ? '0px' : '93px',
							margin: values.currentStsFocused ? '0px' : '2px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('currentStsFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('currentStsEl').focus(), 300);
						}}
					>
						Current Status
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.currentStsFocused ? '0px' : '15px',
							margin: values.currentStsFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('currentStsFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('currentStsEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="current_status"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="currentStsEl"
								className="mb-3 selectField"
								style={{
									width: values.currentStsFocused ? '130px' : '0px',
									margin: values.currentStsFocused ? '0px 10px' : '0px',
									display: values.currentStsFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('currentStsFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={currentStatuss}
								value={value ? currentStatuss.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('currentStsName', newValue?.name || '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Current Status"
									/>
								)}
							/>
						)}
					/>
				</div>
			</div>

			{/* keywords */}
			<div className="allKeyWrdContainer">
				{values.demandName && (
					<div className="keywordContainer">
						<b>Demand</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUser} />
							<p>{values.demandName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('demandName', '');
									setValue('demand', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.passengerAgentName && (
					<div className="keywordContainer">
						<b>P.Agent</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUser} />
							<p>{values.passengerAgentName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('passengerAgentName', '');
									setValue('passenger_agent', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.visa_number && (
					<div className="keywordContainer">
						<b>Visa No</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUniversalAccess} />
							<p>{values.visa_number}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('visa_number', '');
									visaNoEl.current.value = '';
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									setValue('agent', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.professionName && (
					<div className="keywordContainer">
						<b>Profession</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUserTie} />
							<p>{values.professionName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('professionName', '');
									setValue('profession', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									setValue('passenger_type', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									setValue('country', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									setValue('gender', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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
									setValue('passenger', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.mofaStatusName && (
					<div className="keywordContainer">
						<b>Mofa Status</b>
						<div>
							<LocalActivity className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.mofaStatusName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('mofaStatusName', '');
									setValue('mofa_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.stamping_date_after && (
					<div className="keywordContainer">
						<b>Stamping From</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{moment(new Date(values.stamping_date_after)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('stamping_date_after', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.stamping_date_before && (
					<div className="keywordContainer">
						<b>Stamping To</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{moment(new Date(values.stamping_date_before)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('stamping_date_before', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.medicalResultName && (
					<div className="keywordContainer">
						<b>Medical Result</b>
						<div>
							<Report className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.medicalResultName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('medicalResultName', '');
									setValue('medical_result', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.medical_expiry_date_after && (
					<div className="keywordContainer">
						<b>Med.Exp From</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{moment(new Date(values.medical_expiry_date_after)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('medical_expiry_date_after', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.medical_expiry_date_before && (
					<div className="keywordContainer">
						<b>Med.Exp To</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{moment(new Date(values.medical_expiry_date_before)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('medical_expiry_date_before', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.pCStatusName && (
					<div className="keywordContainer">
						<b>PC.Status</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faLandmark} />
							<p>{values.pCStatusName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('pCStatusName', '');
									setValue('police_clearance_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.dLStatusName && (
					<div className="keywordContainer">
						<b>DL.Status</b>
						<div>
							<DriveEta className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.dLStatusName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('dLStatusName', '');
									setValue('driving_license_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.fngStatusName && (
					<div className="keywordContainer">
						<b>Fng.Status</b>
						<div>
							<TouchApp className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.fngStatusName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('fngStatusName', '');
									setValue('finger_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.trngCrdStatusName && (
					<div className="keywordContainer">
						<b>Trng.Card Status</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faIdCard} />
							<p>{values.trngCrdStatusName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('trngCrdStatusName', '');
									setValue('training_card_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.man_power_date_after && (
					<div className="keywordContainer">
						<b>ManP.From</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{moment(new Date(values.man_power_date_after)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('man_power_date_after', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.man_power_date_before && (
					<div className="keywordContainer">
						<b>ManP.To</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faCalendarAlt} />
							<p>{moment(new Date(values.man_power_date_before)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('man_power_date_before', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.manPowerStsName && (
					<div className="keywordContainer">
						<b>Trng.Card Status</b>
						<div>
							<Accessibility className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.manPowerStsName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('manPowerStsName', '');
									setValue('man_power_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.visaAgentName && (
					<div className="keywordContainer">
						<b>V.Agent</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faUniversalAccess} />
							<p>{values.visaAgentName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('visaAgentName', '');
									setValue('visa_agent', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.currentStsName && (
					<div className="keywordContainer">
						<b>Current Status</b>
						<div>
							<LocalActivity className="iconWithKeyWord" style={{ fontSize: '18px' }} />
							<p>{values.currentStsName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('currentStsName', '');
									setValue('current_status', '');
									inShowAllMode ? handleGetAllPassengerSummarys() : handleGetPassengerSummarys();
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

export default PassengerSummaryFilterMenu;
