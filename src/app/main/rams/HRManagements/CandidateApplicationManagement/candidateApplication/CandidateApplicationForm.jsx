import { Autocomplete, Icon } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  getJobPosts
} from 'app/store/dataSlice';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { PictureAsPdf } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import CustomPhoneWithCountryCode from 'src/app/@components/CustomPhoneWithCountryCode';
import { genders, status } from 'src/app/@data/data';
import {
  BASE_URL
} from 'src/app/constant/constants';
import Swal from 'sweetalert2';
import { useGetCandidateApplicationQuery } from '../CandidateApplicationsApi';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
}));

function CandidateApplicationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const classes = useStyles(props);

  const { control, formState, watch, getValues, setValue, reset } = methods;
  const routeParams = useParams();
  const { CandidateApplicationId } = routeParams;
  const { errors } = formState;
  const jobPosts = useSelector((state) => state.data.jobPosts);
  const {
    data: CandidateApplication,
    isLoading,
    isError,
  } = useGetCandidateApplicationQuery(CandidateApplicationId, {
    skip: !CandidateApplicationId || CandidateApplicationId === 'new',
  });

  const resume = watch('resume') || '';
  const coverLetter = watch('cover_letter') || '';
  const getCountryCode1 = watch('country_code1');
  const [previewFile, setPreviewFile] = useState('');
  const [fileExtName, setFileExtName] = useState('');
  const [previewImage, setPreviewImage] = useState();
  const [previewFile2, setPreviewFile2] = useState('');
  const [fileExtName2, setFileExtName2] = useState('');
  const [previewImage2, setPreviewImage2] = useState();

  useEffect(() => {
    dispatch(getJobPosts());
  }, []);


  // useEffect(() => {
  //   setValue("country_code1", getCountryCode1)
  // }, [getValues()?.country_code1])


  return (
    <div>
      <Controller
        name='job_post'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? jobPosts?.find((role) => role.id === value) : null}
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
                InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
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
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
              type='email'
              required
              variant='outlined'
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      {/* <Controller
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
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
              fullWidth
            // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      /> */}
      <CustomPhoneWithCountryCode
        getCountryCode1={getCountryCode1}
        countryName='country_code1'
        countryLabel='Select Country'
        countryCodeLabel='Country Code'
        phoneName='phone_number'
        phoneLabel='Phone'
        // onKeyDown={handleSubmitOnKeyDownEnter
        required={true}
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
              InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
              value={value ? genders?.find((data) => data.id === value) : null}
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
                  InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
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
              value={value ? status?.find((data) => data.id === value) : null}
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
                  InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
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
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
                  if (!validTypes.includes(file?.type)) {
                    Swal.fire({
                      icon: 'error',
                      title: "Only PDF and Image files (JPG,JPEG, PNG) are allowed!",
                      showConfirmButton: false,
                    });
                    return;
                  }
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
      {/* <Typography variant="caption" color="error" sx={{ fontWeight: 500 }}>
        {errors?.resume?.message}
      </Typography> */}
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
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return; // Check if a file is selected
                  const validTypes = ["application/pdf", "image/jpg", "image/jpeg", "image/png"];
                  if (!validTypes.includes(file.type)) {
                    Swal.fire({
                      icon: 'error',
                      title: "Only PDF and image files (JPG, PNG) are allowed!",
                      showConfirmButton: false,
                    });
                    return;
                  }
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
        {/* <Typography variant="caption" color="error" sx={{ fontWeight: 500 }}>
          {errors?.cover_letter?.message}
        </Typography> */}
      </div>
    </div>
  );
}

export default CandidateApplicationForm;
