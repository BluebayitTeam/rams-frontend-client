import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

function CustomDatePicker({ name, label, required, placeholder }) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						className="w-full my-7"
						{...field}
						label={label}
						value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
						onChange={(date) => {
							field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								className="mt-8 mb-16 w-full"
								required={required}
								error={!!error}
								label={label}
								helperText={error ? error.message : ''}
								placeholder={placeholder || 'DD/MM/YYYY'}
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
						inputFormat="DD/MM/YYYY"
						format="DD/MM/YYYY" // Set the input format to DD/MM/YYYY
					/>
				</LocalizationProvider>
			)}
		/>
	);
}

export default CustomDatePicker;
