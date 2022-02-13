import { faCalendarAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getReportFilterMakeStyles } from '../../../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportFilterMakeStyles(theme)
}));

function AccountSummaryFilterMenu({ inShowAllMode, handleGetAccountSummarys, handleGetAllAccountSummarys }) {
	const classes = useStyles();

	const [_reRender, setReRender] = useState(0);

	const methods = useFormContext();
	const { control, getValues, setValue } = methods;
	const values = getValues();

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
										inShowAllMode ? handleGetAllAccountSummarys() : handleGetAccountSummarys();
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
										inShowAllMode ? handleGetAllAccountSummarys() : handleGetAccountSummarys();
									}}
								/>
							);
						}}
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
									inShowAllMode ? handleGetAllAccountSummarys() : handleGetAccountSummarys();
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
									inShowAllMode ? handleGetAllAccountSummarys() : handleGetAccountSummarys();
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

export default AccountSummaryFilterMenu;
