import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  getAttendanceProductionTypes,
  getAttendanceTypes,
  getDepartments,
  getDesignations,
  getGenders,
  getRoles,
} from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function LeaveTypeForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, getValues } = methods;
  const { errors } = formState;
  const roles = useSelector((state) => state.data.roles);
  const designations = useSelector((state) => state.data.designations);
  const departments = useSelector((state) => state.data.departments);
  const attendanceTypes = useSelector((state) => state.data.attendanceTypes);
  const attendanceProductionTypes = useSelector(
    (state) => state.data.attendanceProductionTypes
  );
  const genders = useSelector((state) => state.data.genders);

  useEffect(() => {
    dispatch(getAttendanceTypes());
    dispatch(getAttendanceProductionTypes());
    dispatch(getDepartments());
    dispatch(getRoles());
    dispatch(getGenders());
    dispatch(getDesignations());
  }, []);


  return (
    <div>
      {/* Name */}
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
            InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
          />
        )}
      />
      <Controller
        name='num_of_days'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              error={!!errors?.num_of_days}
              helperText={errors?.num_of_days?.message}
              label='No of Days'
              id='num_of_days'
              required
              variant='outlined'
              type='number'
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
      <Controller
        name='applicable_gender'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            multiple
            filterSelectedOptions
            value={
              value ? genders.filter((data) => value.includes(data.id)) : []
            }
            options={[...genders]} // Add an "All" option
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              const selectedValues = newValue?.map((option) => option.id);
              onChange(
                selectedValues.includes('all')
                  ? genders.map((gender) => genders.id)
                  : selectedValues
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder='Select gender'
                  label='Gender'
                  error={!!errors?.applicable_gender}
                  required
                  autoFocus
                  helperText={errors?.applicable_gender?.message}
                  variant='outlined'
                  InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
                />
              );
            }}
          />
        )}
      />

      <Controller
        name='applicable_department'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            multiple
            filterSelectedOptions
            value={
              value ? departments.filter((data) => value.includes(data.id)) : []
            }
            options={[{ id: 'all', name: 'All Department' }, ...departments]} // Add an "All" option
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              const selectedValues = newValue?.map((option) => option.id);
              onChange(
                selectedValues.includes('all')
                  ? departments.map((department) => department.id)
                  : selectedValues
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder='Select departments'
                  label='Departments'
                  error={!!errors?.applicable_department}
                  required
                  autoFocus
                  helperText={errors?.applicable_department?.message}
                  variant='outlined'
                  InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
                />
              );
            }}
          />
        )}
      />
      <Controller
        name='applicable_designation'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            multiple
            filterSelectedOptions
            value={
              value
                ? designations.filter((data) => value.includes(data.id))
                : []
            }
            options={[{ id: 'all', name: 'All Designation' }, ...designations]} // Add an "All" option
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              const selectedValues = newValue?.map((option) => option.id);
              onChange(
                selectedValues.includes('all')
                  ? designations.map((designation) => designation.id)
                  : selectedValues
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder='Select designations'
                  label='Designations'
                  error={!!errors?.applicable_designation}
                  required
                  autoFocus
                  helperText={errors?.applicable_designation?.message}
                  variant='outlined'
                  InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
                />
              );
            }}
          />
        )}
      />
      <Controller
        name='applicable_role'
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            multiple
            filterSelectedOptions
            value={value ? roles.filter((data) => value.includes(data.id)) : []}
            options={[{ id: 'all', name: 'All Roles' }, ...roles]} // Add an "All" option
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              const selectedValues = newValue?.map((option) => option.id);
              onChange(
                selectedValues.includes('all')
                  ? roles.map((role) => role.id)
                  : selectedValues
              );
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder='Select Roles'
                  label='Roles'
                  error={!!errors?.applicable_role}
                  required
                  autoFocus
                  helperText={errors?.applicable_role?.message}
                  variant='outlined'
                  InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
                />
              );
            }}
          />
        )}
      />
    </div>
  );
}

export default LeaveTypeForm;
