import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function QualificationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name='degree_name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            required
            label='Name'
            autoFocus
            id='name'
            variant='outlined'
            fullWidth
            error={!!errors.degree_name}
            helperText={errors?.degree_name?.message}
          />
        )}
      />
    </div>
  );
}

export default QualificationForm;
