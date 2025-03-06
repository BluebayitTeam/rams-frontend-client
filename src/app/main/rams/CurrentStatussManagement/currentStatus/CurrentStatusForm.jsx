import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputColor from 'react-input-color';
import { useDispatch } from 'react-redux';
import CustomTextField from 'src/app/@components/CustomTextField';

function CurrentStatusForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;
  const [color, setColor] = useState({});

  // useEffect(() => {
  // 	setValue(`color_code`, color.hex);
  // }, [color.hex]);

  return (
    <div>
      <Controller
        name='name'
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
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        )}
      />

      <div className='flex items-center justify-between gap-5'>
        <CustomTextField name='color_code' label='Color Code' required />
        <div>
          <InputColor
            initialValue=''
            onChange={(color) => setValue('color_code', color.hex)}
            placement='right'
            style={{
              width: '30px',
              height: '30px',
            }}
          />
        </div>
        <div
          className='rounded m-auto'
          style={{
            height: '50px',
            width: '50px',

            backgroundColor: watch('color') || 'white',
          }}
        />
      </div>
    </div>
  );
}

export default CurrentStatusForm;
