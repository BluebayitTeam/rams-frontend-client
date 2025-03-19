import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  getCandidateApplications,
  getEmployees
} from 'app/store/dataSlice';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

import { makeStyles } from '@mui/styles';
import { shortlistedStatus } from 'src/app/@data/data';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
}));

function ShortlistedCandidateForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const classes = useStyles(props);

  const { control, formState, watch, getValues } = methods;
  const routeParams = useParams();
  const { ShortlistedCandidateId } = routeParams;
  const { errors } = formState;
  const candidateApplications = useSelector(
    (state) => state.data.candidateApplications
  );
  const resume = watch('resume') || '';
  const coverLetter = watch('cover_letter') || '';

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getCandidateApplications());
  }, []);

  return (
    <div>
      <Controller
        name='candidate_application'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value
                ? candidateApplications?.find((role) => role.id === value)
                : null
            }
            options={candidateApplications}
            getOptionLabel={(option) =>
              `${option?.first_name} ${option?.last_name}`
            }
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Candidate'
                label='Candidate'
                variant='outlined'
                required
                InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
              />
            )}
          />
        )}
      />
      <CustomDatePicker name='interview_date' label='Interview Date' required={true} />
      <Controller
        name='mcq_mark'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-24 mb-16'
            error={!!errors.mcq_mark}
            helperText={errors?.mcq_mark?.message}
            label='MCQ Marks'
            id='mcq_mark'
            type='number'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
          // onKeyDown={handleSubmitOnKeyDownEnter}
          />
        )}
      />
      <Controller
        name='written_mark'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.written_mark}
            helperText={errors?.written_mark?.message}
            label='Written Marks'
            id='written_mark'
            type='number'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
          // onKeyDown={handleSubmitOnKeyDownEnter}
          />
        )}
      />
      <Controller
        name='viva_mark'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.viva_mark}
            helperText={errors?.viva_mark?.message}
            label='Viva Marks'
            id='viva_mark'
            type='number'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
          // onKeyDown={handleSubmitOnKeyDownEnter}
          />
        )}
      />
      <Controller
        name='total_mark'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.total_mark}
            helperText={errors?.total_mark?.message}
            label='Total Marks'
            id='total_mark'
            type='number'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
          // onKeyDown={handleSubmitOnKeyDownEnter}
          />
        )}
      />{' '}
      <Controller
        name='recommendation'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.recommendation}
            helperText={errors?.recommendation?.message}
            label='Recommendation'
            id='recommendation'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
          // onKeyDown={handleSubmitOnKeyDownEnter}
          />
        )}
      />
      <Controller
        name='selection'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className='mt-8 mb-16'
              freeSolo
              value={
                value
                  ? shortlistedStatus?.find((data) => data.id === value)
                  : null
              }
              options={shortlistedStatus}
              getOptionLabel={(option) => `${option?.name} `}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Status'
                  label='Status'
                  error={!!errors.selection}
                  required
                  helperText={errors?.selection?.message}
                  variant='outlined'
                  InputLabelProps={value ? {
                    shrink: true,
                  } : { style: { color: 'red' } }}
                />
              )}
            />
          );
        }}
      />
    </div>
  );
}

export default ShortlistedCandidateForm;
