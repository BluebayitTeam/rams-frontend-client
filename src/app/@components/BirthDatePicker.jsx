import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { dateAlert } from '../@customHooks/notificationAlert';

function BirthDatePicker({ name, label, required, placeholder }) {
  const { control } = useFormContext();

  const isValidAge = (dob) => {
    const today = dayjs();
    const age = today.diff(dob, 'year');
    return age >= 22 && age <= 35;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isRequired = required; // Check if 'required' prop is passed
        const isFieldEmpty = isRequired && !field.value;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className='w-full'
              {...field}
              label={label}
              value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
              onChange={(date) => {
                if (date) {
                  // Check the user's age
                  const dob = dayjs(date);
                  if (isValidAge(dob)) {
                    field.onChange(dob.format('YYYY-MM-DD')); // Update the date if age is valid
                  } else {
                    dateAlert();
                    field.onChange(null); // Reset the field value if age is invalid
                  }
                } else {
                  field.onChange(null); // Reset if the date is cleared
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className='mt-8 mb-16 w-full'
                  required={required}
                  error={!!error} // Set the error prop if there's a validation error
                  label={label}
                  helperText={error ? error.message : ''} // Display the error message in the helper text
                  placeholder={placeholder || 'DD/MM/YYYY'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              inputFormat='DD/MM/YYYY'
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export default BirthDatePicker;
