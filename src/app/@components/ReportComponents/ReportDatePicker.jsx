import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	fieldContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: theme.palette.primary.main,
		height: '30px',
		width: 'fit-content',
		margin: '10px 5px',
		position: 'relative', // Make container relative to position calendar correctly
		'& .dateLabel': {
			width: 'fit-content',
			padding: '3px 5px 0px 8px',
			cursor: 'pointer',
			color: theme.palette.primary.main,
			transition: 'font-size 0.3s ease'
		},
		'& .icon': {
			fontSize: '20px',
			cursor: 'pointer'
		}
	},
	calendarPopup: {
		position: 'absolute',
		top: 'calc(100% + 5px)', // Position calendar below the container with some margin
		left: '50%', // Center horizontally relative to the container
		transform: 'translateX(-50%)', // Adjust for exact centering
		zIndex: 1200 // Ensure calendar is above other elements
	}
}));

function ReportDatePicker({ name, label, minDate, maxDate, setReRender, onEnter = () => null }) {
	const classes = useStyles();
	const { control } = useFormContext();
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<div className={classes.fieldContainer}>
						<CalendarMonthSharpIcon
							className="icon"
							onClick={handleClick}
						/>
						<div
							className="dateLabel"
							onClick={handleClick}
						>
							{label || name.replace(/_/g, ' ')}
						</div>
						<DatePicker
							{...field}
							open={isOpen}
							onClose={handleClose}
							value={field.value ? dayjs(field.value) : null}
							onChange={(date) => {
								field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null);
								onEnter();
								setReRender(Math.random());
								handleClose();
							}}
							components={{
								TextField: () => null // Hide the text field completely
							}}
							renderInput={() => null} // No rendering of input field
							minDate={minDate ? dayjs(minDate) : null}
							maxDate={maxDate ? dayjs(maxDate) : null}
							inputFormat="DD/MM/YYYY"
						/>
					</div>
				</LocalizationProvider>
			)}
		/>
	);
}

export default ReportDatePicker;
