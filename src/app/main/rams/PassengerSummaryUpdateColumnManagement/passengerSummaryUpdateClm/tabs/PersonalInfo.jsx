/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import {
  Autocomplete,
  TextField,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { maritalStatuses } from 'src/app/@data/data';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { useEffect } from 'react';
import { getDesignations } from 'app/store/dataSlice';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function PersonalInfo(props) {
  const userID = localStorage.getItem('user_id');
  const classes = useStyles(props);
  const methods = useFormContext();
  const routeParams = useParams();
  const { agentId } = routeParams;
  const { control, formState, getValues, setError } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const handleDelete = localStorage.getItem('agentEvent');
  const designations = useSelector((state) => state.data.designations);
  const { employeeId } = routeParams;
  const dispatch = useDispatch();

  useEffect(() => {
		dispatch(getDesignations());
	
	}, []);

  return (
    <div>
      <Controller
        name={employeeId === 'new' ? 'created_by' : 'updated_by'}
        control={control}
        defaultValue={userID}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className={classes.hidden}
              label='created by'
              id='created_by'
              error={false}
              helperText=''
              variant='outlined'
              fullWidth
            />
          );
        }}
      />

      {/* <Controller
        name='designation'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? designations.find((data) => data.id === value) : null}
            options={designations}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Designation'
                label='designation'
                error={!!errors.designation}
                helperText={errors?.designation?.message}
                variant='outlined'
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                // onKeyDown={handleSubmitOnKeyDownEnter}
              />
            )}
          />
        )}
      /> */}

      <CustomDropdownField
					name="designation"
					label="Designation"
					options={designations}
					optionLabelFormat={(option) => `${option.name}`}
					required
				/>

      <Controller
        name='marital_status'
        control={control}
        render={({ field: { onChange, value,  } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={
              value ? maritalStatuses.find((data) => data.id === value) : null
            }
            options={maritalStatuses}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Marital Status'
                label='Marital Status'
                error={!!errors.marital_status}
                helperText={errors?.marital_status?.message}
                variant='outlined'
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                // onKeyDown={handleSubmitOnKeyDownEnter}
              />
            )}
          />
        )}
      />

      <Controller
        name='father_name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors.father_name}
              helperText={errors?.father_name?.message}
              label='Father Name'
              id='father_name'
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <Controller
        name='mother_name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors.mother_name}
              helperText={errors?.mother_name?.message}
              label='Mother Name'
              id='mother_name'
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <Controller
        name='spouse_name'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors.spouse_name}
              helperText={errors?.spouse_name?.message}
              label='Spouse Name'
              id='spouse_name'
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <Controller
        name='marriage_date'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors.marriage_date}
              helperText={errors?.marriage_date?.message}
              label='Marriage Date'
              id='marriage_date'
              type='date'
              InputLabelProps={{ shrink: true }}
              fullWidth
              // onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
    </div>
  );
}

export default PersonalInfo;
