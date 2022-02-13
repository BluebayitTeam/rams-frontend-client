import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import { getReportDateMakeStyles } from '../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportDateMakeStyles(theme)
}));

const ReportDatePicker = ({ name, label = '', minDate, maxDate, setReRender, onEnter = () => null } = {}) => {
	const classes = useStyles();

	const methods = useFormContext();
	const { control } = methods;

	return (
		<div className={classes.fieldContainer}>
			<FontAwesomeIcon
				className="icon cursor-pointer"
				icon={faCalendarAlt}
				onClick={() => document.getElementById(`${name}El`).click()}
			/>

			<div className="dateLabel" onClick={() => document.getElementById(`${name}El`).click()}>
				{label}
			</div>

			<Controller
				name={`${name}`}
				control={control}
				render={({ field }) => (
					<DatePicker
						id={`${name}El`}
						className="hidden"
						autoOk
						clearable
						format={'dd/MM/yyyy'}
						maxDate={maxDate}
						minDate={minDate}
						value={field.value || ''}
						onChange={value => {
							value ? field.onChange(moment(new Date(value)).format('YYYY-MM-DD')) : field.onChange('');
							onEnter();
							setReRender(Math.random());
						}}
					/>
				)}
			/>
		</div>
	);
};

export default ReportDatePicker;
