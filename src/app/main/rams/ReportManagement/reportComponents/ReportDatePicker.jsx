import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import fillUnderscoreBySpace from 'app/@helpers/fillUnderscoreBySpace';
import moment from 'moment';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
	fieldContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: theme.palette.primary.main,
		height: '30px',
		width: 'fit-content',
		margin: '10px 5px',
		'& .dateLabel': {
			width: 'fit-content',
			padding: '3px 5px 0px 8px',
			cursor: 'pointer',
			color: theme.palette.primary.main
		},
		'& .icon': {
			fontSize: '20px'
		}
	}
}));

const ReportDatePicker = ({ name, label = '', minDate, maxDate, setReRender, onEnter = () => null } = {}) => {
	const classes = useStyles();

	const methods = useFormContext();
	const { control } = methods;

	const [Label] = useState(label || fillUnderscoreBySpace(name));

	return (
		<div className={classes.fieldContainer}>
			<FontAwesomeIcon
				className="icon cursor-pointer"
				icon={faCalendarAlt}
				onClick={() => document.getElementById(`${name}El`).click()}
			/>

			<div className="dateLabel" onClick={() => document.getElementById(`${name}El`).click()}>
				{Label}
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
