import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

function CustomDatePicker(props) {
	console.log('props', props);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker
				{...props?.field}
				value={props?.field.value ? dayjs(props?.field.value, 'YYYY-MM-DD') : null}
				onChange={(date) => {
					props?.field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						className={props?.className || 'mt-8 mb-16 w-full'}
						required={props?.required}
						error={!!props?.error}
						helperText={props?.helperText}
						placeholder={props?.placeholder || 'DD-MM-YYYY'}
						label="asdasdknl"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<CalendarTodayIcon />
								</InputAdornment>
							)
						}}
						InputLabelProps={{ shrink: true }}
					/>
				)}
				inputFormat="DD-MM-YYYY"
			/>
		</LocalizationProvider>
	);
}

export default CustomDatePicker;
