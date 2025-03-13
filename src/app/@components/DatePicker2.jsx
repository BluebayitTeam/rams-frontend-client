import { Popper, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

// Custom Popper component to center the DatePicker
const CustomPopper = styled(Popper)({
  position: 'fixed !important',
  top: '50% !important',
  left: '50% !important',
  transform: 'translate(-50%, -50%) !important',
  zIndex: 1300, // Ensures it appears above other elements
});

function DatePicker2({ name, label, required, className, format = 'DD/MM/YYYY', placeholder = 'DD/MM/YYYY', ...props }) {
  const { control, formState: { errors } } = useFormContext();
  const today = moment().format('YYYY-MM-DD');

  return (
    <Controller
      name={name}
      control={control}
      // defaultValue={placeholder}
      defaultValue={today}
      render={({ field: { value, onChange } }) => {
        const selectedValue = value ? moment(value) : moment(today);
        return (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label={label}
              className={className || 'mt-8 mb-16 w-full'}
              format={format}
              placeholder={placeholder}
              value={selectedValue}
              // value={value ? moment(value) : null}
              onChange={(newValue) => {
                onChange(newValue ? moment(newValue).format('YYYY-MM-DD') : '');
                props?.onChange && props?.onChange(newValue);
              }}
              slotProps={{
                popper: { component: CustomPopper }, // Custom positioning
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors[name]}
                  helperText={errors[name]?.message || ''}
                  required={!!required}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={
                    !value
                      ? { style: { color: 'red' }, ...inputLabelProps }
                      : { shrink: true, ...inputLabelProps }
                  }
                />
              )}
            />
          </LocalizationProvider>
        )
      }}
    />
  );
}

export default DatePicker2;