import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function ComputeForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name='name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.name}
              helperText={errors?.name?.message}
              label='Compute Name'
              id='name'
              required
              variant='outlined'
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            />
          );
        }}
      />
    </div>
  );
}

export default ComputeForm;
