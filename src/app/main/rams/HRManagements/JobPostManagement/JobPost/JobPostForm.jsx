import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  getJobcategory
} from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

function JobPostForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors } = formState;
  const jobCategorys = useSelector((state) => state.data.jobCategorys);

  useEffect(() => {
    dispatch(getJobcategory());
  }, []);

  return (
    <div>
      <CustomDatePicker
        className='mt-8 mb-16'
        name='date'
        label='Date'
        placeholder='DD-MM-YYYY'
        required={true}
      />

      <Controller
        name='title'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-10 mb-16'
              error={!!errors?.title}
              helperText={errors?.title?.message}
              label='Title'
              id='title'
              required
              variant='outlined'
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />

      <CustomDatePicker
        name='deadline_date'
        label='Deadline Date'
        placeholder='DD-MM-YYYY'
        className='mt-8 mb-16'
        required={true}
      />

      <Controller
        name='category'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-16 mb-16'
            freeSolo
            value={
              value ? jobCategorys?.find((data) => data.id === value) : null
            }
            options={jobCategorys}
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Category'
                label='Job Category'
                error={!!errors.category}
                required
                helperText={errors?.category?.message}
                variant='outlined'
                autoFocus
                InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
              />
            )}
          />
        )}
      />

      <Controller
        name='code'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.code}
              helperText={errors?.code?.message}
              label='Code'
              id='code'
              required
              variant='outlined'
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />

      <Controller
        name='location'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.location}
              helperText={errors?.location?.message}
              label='Location'
              id='location'
              required
              variant='outlined'
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />

      <Controller
        name='description'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.description}
              helperText={errors?.description?.message}
              label='Description'
              id='description'
              multiline
              rows={2}
              required
              variant='outlined'
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
    </div>
  );
}

export default JobPostForm;
