/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import _ from 'lodash';
import moment from 'moment';
import {
  getBranches,
  getCities,
  getCountries,
  getDepartments,
  getProfiles,
  getRoles,
  getThanas,
} from 'app/store/dataSlice';

const useStyles = makeStyles(() => ({
  textField: {
    '& > div': {
      height: '35px',
    },
  },
  container: {
    padding: '0px 25px',
    minWidth: '1000px',
    '& *': {
      boxSizing: 'border-box',
    },
    '& .row': {
      marginRight: '-15px',
      marginLeft: '-15px',
    },
    '& .western': {
      marginBottom: '5px',
    },
    '& .borderedTable': {
      '& table, th, td': {
        border: '1px solid white',
      },
      '& table': {
        color: 'black',
        background: 'transparent',
        borderSpacing: 0,
        borderCollapse: 'collapse',
        '& td, th': {
          padding: '0px',
        },
      },
    },
  },
}));

function ProfileForm(props) {
  const methods = useFormContext();
  const routeParams = useParams();
  const classes = useStyles(props);
  const { profileId } = routeParams;
  const {
    control,
    formState,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = methods;

  const { errors } = formState;
  const thanas = useSelector((state) => state.data.thanas);
  const branches = useSelector((state) => state.data.branches);
  const roles = useSelector((state) => state.data.roles);
  const departments = useSelector((state) => state.data.departments);
  const cities = useSelector((state) => state.data.cities);
  const countries = useSelector((state) => state.data.countries);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const getCountryCode1 = watch('country_code1');
  const [file, setFile] = useState(null);
  const [createProfile] = useCreateProfileMutation();
  const [saveProfile] = useUpdateProfileMutation();
  const handleDelete = localStorage.getItem('deleteProfile');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getThanas());
    dispatch(getRoles());
    dispatch(getDepartments());
    dispatch(getCities());
    dispatch(getCountries());
    dispatch(getProfiles());
  }, []);

  useEffect(() => {
    const currentImage = getValues('image');

    if (currentImage && !currentImage.name) {
      setFile(`${BASE_URL}/${currentImage}`);
    }
  }, [profileId, watch('image')]);
  const handleChnageCountry = (selectedCountry) => {
    const countryID = countries.find(
      (data) => data.name === selectedCountry
    )?.id;
    setValue('country', countryID);
  };

  // const handleCheckUserName = async (name) => {
  //   const response = await axios.get(
  //     `${CHECK_USERNAME_PROFILE}?username=${name}&id=${profileId === 'new' ? '' : profileId}&type=${profileId === 'new' ? 'create' : 'update'}`
  //   );

  //   if (response?.data.username_exists) {
  //     setError('username', {
  //       type: 'manual',
  //       message: 'User Name Already Exists',
  //     });
  //   }
  // };

  // const handleCheckEmail = async (email) => {
  //   if (!email.trim()) {
  //     // Optionally clear the email error if it's empty
  //     setError('email', {
  //       type: 'manual',
  //       message: 'Email cannot be empty',
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `${CHECK_EMAIL_PROFILE}?email=${email}&id=${profileId === 'new' ? '' : profileId}&type=${profileId === 'new' ? 'create' : 'update'}`
  //     );

  //     if (response?.data.email_exists) {
  //       setError('email', {
  //         type: 'manual',
  //         message: 'Email Already Exists',
  //       });
  //     } else {
  //       // Optionally clear the error if the email doesn't exist
  //       clearErrors('email');
  //     }
  //   } catch (error) {
  //     // Handle error, possibly log it or show a user-friendly message
  //     console.error('Error checking email:', error);
  //   }
  // };

  // const handleCheckPhone = async () => {
  //   const formattedPhoneNumber = `${watch('country_code1')}${watch('primary_phone')}`;
  //   try {
  //     const response = await axios.get(
  //       `${CHECK_PRIMARY_PHONE}?primary_phone=${formattedPhoneNumber}&id=${profileId === 'new' ? '' : profileId}&type=${profileId === 'new' ? 'create' : 'update'}`
  //     );

  //     if (response?.data?.primary_phone_exists) {
  //       setError('primary_phone', {
  //         type: 'manual',
  //         message: 'Phone number already exists',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error checking phone number:', error);
  //     // Handle errors if needed
  //   }
  // };

  function handleCreateProfile() {
    createProfile(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/profile/profiles`);
      });
  }

  function handleUpdateProfile() {
    saveProfile(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/profile/profiles`);
    });
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === 'Enter') {
      if (
        routeParams?.userName === 'new' &&
        !_.isEmpty(dirtyFields) &&
        isValid
      ) {
        handleCreateDesignation();
      } else if (routeParams?.userName && handleDelete !== 'Delete') {
        handleUpdateProfile();
      }
    }
  };
  return (
    <div>
      <Controller
        name='branch'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? branches.find((bnch) => bnch.id === value) : null}
            options={branches}
            getOptionLabel={(option) => `${option.name}`}
            InputLabelProps={{ shrink: true }}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a branch'
                label='Branch'
                autoFocus
                onKeyDown={handleSubmitOnKeyDownEnter}
                helperText={errors?.branch?.message}
                variant='outlined'
                InputLabelProps={
                  value ? {} : { style: { color: 'red', borderColor: 'red' } }
                }
              />
            )}
          />
        )}
      />
      <Controller
        name='emp_id_no'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            // error={!!errors.emp_id_no}
            helperText={errors?.emp_id_no?.message}
            onKeyDown={handleSubmitOnKeyDownEnter}
            label={
              field.value ? (
                'Profile Id'
              ) : (
                <span style={{ color: 'red' }}>Profile Id</span>
              )
            }
            id='emp_id_no'
            variant='outlined'
            fullWidth
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />
      <Controller
        name='first_name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            label='First Name'
            helperText={errors?.first_name?.message}
            id='firstName'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={
              field.value ? { shrink: true } : { style: { color: 'red' } }
            }
          />
        )}
      />
      <Controller
        name='last_name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            label='Last Name'
            helperText={errors?.last_name?.message}
            id='lastName'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            color='success'
            InputLabelProps={
              field.value ? { shrink: true } : { style: { color: 'red' } }
            }
          />
        )}
      />

      <CustomTextField
        name='username'
        label='UserName'
        required
        onKeyDown={handleSubmitOnKeyDownEnter}
        // onChange={(e) => {
        //   handleCheckUserName(e.target.value);
        // }}
      />

      <CustomTextField
        name='email'
        label='Email'
        onKeyDown={handleSubmitOnKeyDownEnter}
        required
        // onChange={(e) => {
        //   handleCheckEmail(e.target.value);
        // }}
      />
      {profileId === 'new' && (
        <>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className='mt-8 mb-16'
                label='Password'
                type='password'
                helperText={
                  <span style={{ color: 'red' }}>
                    {errors?.password?.message}
                  </span>
                }
                variant='outlined'
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
                InputProps={{
                  className: 'pr-2',
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}>
                        <Icon className='text-20' color='action'>
                          {showPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={
                  field.value ? { shrink: true } : { style: { color: 'red' } }
                }
                required
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className='mt-8 mb-16'
                label='Confirm Password'
                type='password'
                helperText={
                  <span style={{ color: 'red' }}>
                    {errors?.confirmPassword?.message}
                  </span>
                }
                variant='outlined'
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
                InputProps={{
                  className: 'pr-2',
                  type: showConfirmPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }>
                        <Icon className='text-20' color='action'>
                          {showConfirmPassword
                            ? 'visibility'
                            : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={
                  field.value ? { shrink: true } : { style: { color: 'red' } }
                }
                required
              />
            )}
          />
        </>
      )}

      <CustomPhoneWithCountryCode
        getCountryCode1={getCountryCode1}
        countryName='country_code1'
        countryLabel='Select Country'
        countryCodeLabel='Country Code'
        phoneName='primary_phone'
        phoneLabel='Phone'
        onKeyDown={handleSubmitOnKeyDownEnter}
        onChange={() => {
          handleCheckPhone();
        }}
        required
      />

      <Controller
        name='gender'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? genders.find((gender) => gender.id === value) : null}
            options={genders}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a gender'
                label='Gender'
                onKeyDown={handleSubmitOnKeyDownEnter}
                variant='outlined'
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: 'red' } }
                }
              />
            )}
          />
        )}
      />

      <Controller
        name='role'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? roles.find((role) => role.id === value) : null}
            options={roles}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            // defaultValue={{ id: null, name: "Select a role" }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a profile role'
                label='Role'
                onKeyDown={handleSubmitOnKeyDownEnter}
                variant='outlined'
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: 'red' } }
                }
              />
            )}
          />
        )}
      />
      <Controller
        name='department'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value
                ? departments.find((department) => department.id === value)
                : null
            }
            options={departments}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            // defaultValue={{ id: null, name: "Select a deparment" }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a profile department'
                label='Department'
                variant='outlined'
                onKeyDown={handleSubmitOnKeyDownEnter}
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: 'red' } }
                }
              />
            )}
          />
        )}
      />
      <Controller
        name='street_address_one'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.street_address_one}
            helperText={errors?.street_address_one?.message}
            //
            label='Primary address'
            id='address1'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />
      <Controller
        name='street_address_two'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.street_address_two}
            helperText={errors?.street_address_two?.message}
            label='Secondary address'
            id='address2'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />

      <CustomDatePicker
        name='date_of_birth'
        label='Date of Birth'
        required
        placeholder='DD-MM-YYYY'
      />

      <Controller
        name='country'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? countries.find((country) => country.id === value) : null
            }
            options={countries}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            // defaultValue={{ id: null, name: "Select a country" }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a country'
                label='Country'
                onKeyDown={handleSubmitOnKeyDownEnter}
                variant='outlined'
                //
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name='city'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? cities.find((city) => city.id === value) : null}
            options={cities}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
              dispatch(getThanasBasedOnCity(newValue?.id));
            }}
            // defaultValue={{ id: null, name: "Select a city" }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a city'
                label='District'
                onKeyDown={handleSubmitOnKeyDownEnter}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name='thana'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? thanas.find((thana) => thana.id === value) : null}
            options={thanas}
            getOptionLabel={(option) => `${option.name}`}
            // defaultValue={{ id: null, name: "Select a thana" }}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select a police station'
                label='Police Station'
                onKeyDown={handleSubmitOnKeyDownEnter}
                variant='outlined'
                //
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        )}
      />

      <Controller
        name='postal_code'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.postal_code}
            helperText={errors?.postal_code?.message}
            label='Postal Code'
            id='postal_code'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />
      <Controller
        name='nid'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.nid}
            helperText={errors?.nid?.message}
            label='National Id'
            id='nid'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />

      <Controller
        name='basic_money'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.basic_money}
            helperText={errors?.basic_money?.message}
            label='Basic Money'
            id='basic_money'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />
      <Controller
        name='allowance_money'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16'
            error={!!errors.allowance_money}
            helperText={errors?.allowance_money?.message}
            label='Allowance Money'
            id='allowance_money'
            variant='outlined'
            fullWidth
            onKeyDown={handleSubmitOnKeyDownEnter}
            InputLabelProps={field.value && { shrink: true }}
          />
        )}
      />

      <CustomDatePicker
        name='emp_join_date'
        label='Join Date'
        required
        placeholder='DD-MM-YYYY'
      />
      <Controller
        name='is_active'
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              //
              label='Is active'
              control={
                <Checkbox
                  {...field}
                  checked={field.value ? field.value : false}
                />
              }
            />
          </FormControl>
        )}
      />
      <Controller
        name='is_admin'
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              label='Is admin'
              control={
                <Checkbox
                  {...field}
                  checked={field.value ? field.value : false}
                />
              }
            />
          </FormControl>
        )}
      />

      <div className='text-center'>
        <div>
          <FileUpload
            name='image'
            label='File'
            control={control}
            setValue={setValue}
            setFile={setFile}
            file={file}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
