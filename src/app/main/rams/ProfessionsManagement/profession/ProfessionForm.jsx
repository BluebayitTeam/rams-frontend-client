import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function ProfessionForm(props) {
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
              helperText={errors?.name?.message}
              label='Name'
              id='name'
              variant='outlined'
              InputLabelProps={
                field?.value ? { shrink: true } : { style: { color: 'red' } }
              }
              fullWidth
            />
          );
        }}
      />
    </div>
  );
}

export default ProfessionForm;
