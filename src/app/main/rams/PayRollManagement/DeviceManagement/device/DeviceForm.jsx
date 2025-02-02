import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function DeviceForm(props) {
  const userID = localStorage.getItem('user_id');
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, getValues, watch } = methods;
  const { errors, isValid, dirtyFields } = formState;

  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors?.name}
              helperText={errors?.name?.message}
              label="Device Name"
              id="name"
              required
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="ip_address"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors?.ip_address}
              helperText={errors?.ip_address?.message}
              label="IP Address"
              id="ip_address"
              required
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="port"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors?.port}
              helperText={errors?.port?.message}
              label="Device Port"
              id="port"
              required
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="communication_password"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors?.communication_password}
              helperText={errors?.communication_password?.message}
              label="Device Password"
              id="communication_password"
              required
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

    </div>
  );
}

export default DeviceForm;
