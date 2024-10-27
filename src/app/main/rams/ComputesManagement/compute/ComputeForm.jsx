import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { compound } from 'src/app/@data/data';

function ComputeForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch } = methods;
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
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
    </div>
  );
}

export default ComputeForm;
