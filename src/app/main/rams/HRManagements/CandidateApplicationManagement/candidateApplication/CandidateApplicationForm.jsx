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

function CandidateApplicationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const classes = useStyles(props);

  const { control, formState, watch, getValues } = methods;
  const routeParams = useParams();
  const { CandidateApplicationId } = routeParams;
  const { errors } = formState;
  const jobPosts = useSelector((state) => state.data.jobPosts);

  const resume = watch('resume') || '';
  const coverLetter = watch('cover_letter') || '';

  const [previewFile, setPreviewFile] = useState('');
  const [fileExtName, setFileExtName] = useState('');
  const [previewImage, setPreviewImage] = useState();
  const [previewFile2, setPreviewFile2] = useState('');
  const [fileExtName2, setFileExtName2] = useState('');
  const [previewImage2, setPreviewImage2] = useState();
  useEffect(() => {
    dispatch(getJobPosts());
  }, []);

  return (
    <div>
      <Controller
        name='job_post'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? jobPosts.find((role) => role.id === value) : null}
            options={jobPosts}
            getOptionLabel={(option) => `${option?.title}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Job'
                label='Job'
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
        name='first_name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.first_name}
              helperText={errors?.first_name?.message}
              label='First Name'
              id='first_name'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name='last_name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.last_name}
              helperText={errors?.last_name?.message}
              label='Last Name'
              id='last_name'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name='email'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.email}
              helperText={errors?.email?.message}
              label='Email'
              id='email'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name='phone_number'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.phone_number}
              helperText={errors?.phone_number?.message}
              label='Phone Number'
              id='phone_number'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name='reference_email'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.reference_email}
              helperText={errors?.reference_email?.message}
              label='Reference Email'
              id='reference_email'
              required
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name='gender'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className='mt-8 mb-16'
              freeSolo
              value={value ? genders.find((data) => data.id === value) : null}
              options={genders}
              getOptionLabel={(option) => `${option?.name} `}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Gender'
                  label='Gender'
                  error={!!errors.gender}
                  required
                  helperText={errors?.gender?.message}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />{' '}
      <Controller
        name='application_status'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className='mt-8 mb-16'
              freeSolo
              value={value ? status.find((data) => data.id === value) : null}
              options={status}
              getOptionLabel={(option) => `${option?.name} `}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Select Status'
                  label='Status'
                  error={!!errors.application_status}
                  required
                  helperText={errors?.application_status?.message}
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
      <h3> Upload Resume</h3>
      <div className='flex justify-center sm:justify-start flex-wrap -mx-16'>
        <Controller
          name='resume'
          control={control}
          render={({ field: { onChange, value } }) => (
            <label
              htmlFor='button-file-resume'
              className={clsx(
                classes.productImageUpload,
                'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
              )}>
              <input
                className='hidden'
                id='button-file-resume'
                type='file'
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return; // Check if a file is selected

                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setPreviewFile(reader.result);
                    }
                  };
                  reader.readAsDataURL(file);

                  setFileExtName(file?.name?.split('.')?.pop()?.toLowerCase());

                  onChange(file);
                }}
              />
              <Icon fontSize='large' color='action'>
                cloud_upload
              </Icon>
            </label>
          )}
        />
        {!previewFile && resume && (
          <div
            style={{
              width: 'auto',
              height: '150px',
              overflow: 'hidden',
              display: 'flex',
            }}>
            {(resume?.name || resume)?.split('.')?.pop()?.toLowerCase() ===
            'pdf' ? (
              <PictureAsPdf
                style={{
                  color: 'red',
                  cursor: 'pointer',
                  display: 'block',
                  fontSize: '35px',
                  margin: 'auto',
                }}
                onClick={() => window.open(`${BASE_URL}${resume}`)}
              />
            ) : (
              <img src={`${BASE_URL}${resume}`} style={{ height: '150px' }} />
            )}
          </div>
        )}

        {previewFile && (
          <div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
            {fileExtName === 'pdf' ? (
              <iframe
                src={previewFile}
                frameBorder='0'
                scrolling='auto'
                height='150px'
                width='150px'
              />
            ) : (
              <img src={previewFile} style={{ height: '150px' }} />
            )}
          </div>
        )}
      </div>{' '}
      <h3> Upload Cover Letter</h3>
      <div className='flex justify-center sm:justify-start flex-wrap -mx-16'>
        <Controller
          name='cover_letter'
          control={control}
          render={({ field: { onChange, value } }) => (
            <label
              htmlFor='button-file-cover-letter'
              className={clsx(
                classes.productImageUpload,
                'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
              )}>
              <input
                className='hidden'
                id='button-file-cover-letter'
                type='file'
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return; // Check if a file is selected

                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setPreviewFile2(reader.result);
                    }
                  };
                  reader.readAsDataURL(file);

                  setFileExtName2(file?.name?.split('.')?.pop()?.toLowerCase());

                  onChange(file);
                }}
              />
              <Icon fontSize='large' color='action'>
                cloud_upload
              </Icon>
            </label>
          )}
        />
        {!previewFile2 && coverLetter && (
          <div
            style={{
              width: 'auto',
              height: '150px',
              overflow: 'hidden',
              display: 'flex',
            }}>
            {(coverLetter?.name || coverLetter)
              ?.split('.')
              ?.pop()
              ?.toLowerCase() === 'pdf' ? (
              <PictureAsPdf
                style={{
                  color: 'red',
                  cursor: 'pointer',
                  display: 'block',
                  fontSize: '35px',
                  margin: 'auto',
                }}
                onClick={() => window.open(`${BASE_URL}${coverLetter}`)}
              />
            ) : (
              <img
                src={`${BASE_URL}${coverLetter}`}
                style={{ height: '150px' }}
              />
            )}
          </div>
        )}

        {previewFile2 && (
          <div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
            {fileExtName2 === 'pdf' ? (
              <iframe
                src={previewFile2}
                frameBorder='0'
                scrolling='auto'
                height='150px'
                width='150px'
              />
            ) : (
              <img src={previewFile2} style={{ height: '150px' }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateApplicationForm;
