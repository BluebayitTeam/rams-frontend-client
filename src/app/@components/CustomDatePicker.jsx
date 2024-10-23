import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

function CustomDatePicker({ name, label, required, placeholder }) {
  const { control } = useFormContext();

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
                field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className='mt-8 mb-16 w-full'
                  required={required}
                  error={!!error} // Set the error prop if there's a validation error
                  label={label}
                  variant={variant}
                  helperText={error ? error.message : ''} // Display the error message in the helper text
                  placeholder={placeholder || 'DD/MM/YYYY'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={
                    isFieldEmpty
                      ? { style: { color: 'red' }, ...inputLabelProps }
                      : { shrink: true, ...inputLabelProps }
                  }
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

export default CustomDatePicker;
