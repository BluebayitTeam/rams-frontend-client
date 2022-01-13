import {
	faCalendarAlt,
	faChevronDown,
	faCity,
	faPhoneAlt,
	faQrcode,
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

function AgentFilterMenu({ inShowAllMode, handleGetAgents, handleGetAllAgents }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const agentCodeEl = useRef(null);

	//select field data
	const districts = useSelector(state => state.data.cities);
	const groups = useSelector(state => state.data.groups);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getCities());
		dispatch(getGroups());
	}, []);

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* user name */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUser} />

					<input
						ref={userNameEl}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('username', e.target.value);
								inShowAllMode ? handleGetAllAgents() : handleGetAgents();
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
				</div>

				{/* group */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faUsers} />

					<div
						className="selectLabel"
						style={{
							width: values.groupFocused ? '0px' : '40px',
							margin: values.groupFocused ? '0px' : '2px 5px 0px 10px'
						}}
						onClick={() => {
							setValue('groupFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('groupEl').focus(), 300);
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
							setTimeout(() => document.getElementById('groupEl').focus(), 300);
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

				{/* phone */}
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
								primaryPhoneEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() =>
							(primaryPhoneEl.current.value = primaryPhoneEl.current.value || values.primary_phone || '')
						}
					/>
				</div>

				{/* district */}
				<div className="fieldContainer">
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

				{/* Agent Code */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faQrcode} />

					<input
						ref={agentCodeEl}
						className="textField"
						style={{ width: '77px' }}
						placeholder="Agent Code"
						onKeyDown={e => {
							if (e.key === 'Enter') {
								setValue('agent_code', e.target.value);
								inShowAllMode ? handleGetAllAgents() : handleGetAgents();
								agentCodeEl.current.blur();
								agentCodeEl.current.value = '';
								setReRender(Math.random());
							}
						}}
						onFocus={() =>
							(agentCodeEl.current.value = agentCodeEl.current.value || values.agent_code || '')
						}
					/>
				</div>

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
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
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
										inShowAllMode ? handleGetAllAgents() : handleGetAgents();
									}}
								/>
							);
						}}
					/>
				</div>
			</div>

			{/* keywords */}
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
	);
}

export default AgentFilterMenu;
