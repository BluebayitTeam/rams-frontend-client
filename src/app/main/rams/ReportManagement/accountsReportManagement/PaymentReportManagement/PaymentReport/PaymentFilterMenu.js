import {
	faBookOpen,
	faCalendarAlt,
	faChevronDown,
	faTextHeight,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { bankAndCash } from 'app/@data/data';
import { getLedgers, getSubLedgers } from 'app/store/dataSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getReportFilterMakeStyles } from '../../../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportFilterMakeStyles(theme)
}));

function PaymentFilterMenu({ inShowAllMode, handleGetPayments, handleGetAllPayments }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//select field data
	const ledgers = useSelector(state => state.data.ledgers);
	const subLedgers = useSelector(state => state.data.subLedgers);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getLedgers());
		dispatch(getSubLedgers());
	}, []);

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* Date from */}
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
										inShowAllMode ? handleGetAllPayments() : handleGetPayments();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* Date to */}
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
										inShowAllMode ? handleGetAllPayments() : handleGetPayments();
									}}
								/>
							);
						}}
					/>
				</div>

				{/* ledger */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faBookOpen} />

					<div
						className="selectLabel"
						style={{
							width: values.ledgerFocused ? '0px' : '45px',
							margin: values.ledgerFocused ? '0px' : '2px 5px 0px 10px'
						}}
						onClick={() => {
							setValue('ledgerFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('ledgerEl').focus(), 300);
						}}
					>
						Ledger
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.ledgerFocused ? '0px' : '15px',
							margin: values.ledgerFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('ledgerFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('ledgerEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="ledger"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="ledgerEl"
								className="mb-3 selectField"
								style={{
									width: values.ledgerFocused ? '130px' : '0px',
									margin: values.ledgerFocused ? '0px 10px' : '0px',
									display: values.ledgerFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('ledgerFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={ledgers}
								value={value ? ledgers.find(data => data.id == value) : null}
								getOptionLabel={option => option.name}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('ledgerName', newValue?.name || '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Ledger"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* sub ledger */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faBookOpen} />

					<div
						className="selectLabel"
						style={{
							width: values.subLadgerFocused ? '0px' : '70px',
							margin: values.subLadgerFocused ? '0px' : '3px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('subLadgerFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('subLadgerEl').focus(), 300);
						}}
					>
						SubLadger
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.subLadgerFocused ? '0px' : '15px',
							margin: values.subLadgerFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('subLadgerFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('subLadgerEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="sub_ledger"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="subLadgerEl"
								className="mb-3 selectField"
								style={{
									width: values.subLadgerFocused ? '130px' : '0px',
									margin: values.subLadgerFocused ? '0px 10px' : '0px',
									display: values.subLadgerFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('subLadgerFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={subLedgers}
								value={value ? subLedgers.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('subLadgerName', newValue?.name || '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select SubLadger"
									/>
								)}
							/>
						)}
					/>
				</div>

				{/* account Type */}
				<div className="fieldContainer">
					<FontAwesomeIcon className="icon" icon={faTextHeight} />

					<div
						className="selectLabel"
						style={{
							width: values.accountTypeFocused ? '0px' : '89px',
							margin: values.accountTypeFocused ? '0px' : '3px 5px 0px 5px'
						}}
						onClick={() => {
							setValue('accountTypeFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('accountTypeEl').focus(), 300);
						}}
					>
						Account Type
					</div>
					<FontAwesomeIcon
						className="selectOpenIcon cursor-pointer"
						style={{
							width: values.accountTypeFocused ? '0px' : '15px',
							margin: values.accountTypeFocused ? '0px' : '2px 10px 0px 0px'
						}}
						onClick={() => {
							setValue('accountTypeFocused', true);
							setReRender(Math.random());
							setTimeout(() => document.getElementById('accountTypeEl').focus(), 300);
						}}
						icon={faChevronDown}
					/>

					<Controller
						name="account_type"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								id="accountTypeEl"
								className="mb-3 selectField"
								style={{
									width: values.accountTypeFocused ? '130px' : '0px',
									margin: values.accountTypeFocused ? '0px 10px' : '0px',
									display: values.accountTypeFocused ? 'block' : 'none'
								}}
								classes={{ endAdornment: 'endAdornment' }}
								openOnFocus={true}
								onClose={() => {
									setValue('accountTypeFocused', false);
									setReRender(Math.random());
								}}
								freeSolo
								options={bankAndCash}
								value={value ? bankAndCash.find(data => data.id == value) : null}
								getOptionLabel={option => `${option.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									setValue('accountTypeName', newValue?.name || '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
								}}
								renderInput={params => (
									<TextField
										{...params}
										className="textFieldUnderSelect"
										placeholder="Select Account Type"
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
							<p>{moment(new Date(values.date_after)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('date_after', '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
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
							<p>{moment(new Date(values.date_before)).format('DD-MM-YYYY')}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('date_before', '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.ledgerName && (
					<div className="keywordContainer">
						<b>ledger</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faBookOpen} />
							<p>{values.ledgerName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('ledgerName', '');
									setValue('ledger', '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.subLadgerName && (
					<div className="keywordContainer">
						<b>SubLadger</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faBookOpen} />
							<p>{values.subLadgerName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('subLadgerName', '');
									setValue('sub_ledger', '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
									setReRender(Math.random());
								}}
							/>
						</div>
					</div>
				)}

				{values.accountTypeName && (
					<div className="keywordContainer">
						<b>Account Type</b>
						<div>
							<FontAwesomeIcon className="iconWithKeyWord" icon={faTextHeight} />
							<p>{values.accountTypeName}</p>
							<FontAwesomeIcon
								className="closeIconWithKeyWord"
								icon={faTimesCircle}
								onClick={() => {
									setValue('accountTypeName', '');
									setValue('account_type', '');
									inShowAllMode ? handleGetAllPayments() : handleGetPayments();
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

export default PaymentFilterMenu;
