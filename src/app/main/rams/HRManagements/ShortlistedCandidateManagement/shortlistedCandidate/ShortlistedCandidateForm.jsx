import { Autocomplete, Icon } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  getAttendanceProductionTypes,
  getEmployees,
  getJobPosts,
  getLeaveTypes,
  getUnits,
} from 'app/store/dataSlice';

import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  BASE_URL,
  GET_APPLICANT_LEAVE_HISTORY,
} from 'src/app/constant/constants';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';
import { genders, status } from 'src/app/@data/data';
import { PictureAsPdf } from '@mui/icons-material';

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
                ? candidateApplications.find((role) => role.id === value)
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='interview_date'
        control={control}
        render={({ field }) => (
          <CustomDatePicker field={field} label='Interview Date' />
        )}
      />
      <Controller
        name='mcq_mark'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.mcq_mark}
            helperText={errors?.mcq_mark?.message}
            label='MCQ Marks'
            id='mcq_mark'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
            onKeyDown={handleSubmitOnKeyDownEnter}
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
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
            onKeyDown={handleSubmitOnKeyDownEnter}
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
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
            onKeyDown={handleSubmitOnKeyDownEnter}
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
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
            onKeyDown={handleSubmitOnKeyDownEnter}
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
            onKeyDown={handleSubmitOnKeyDownEnter}
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
                  ? shortlistedStatus.find((data) => data.id === value)
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
