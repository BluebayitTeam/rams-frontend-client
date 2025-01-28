import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getPayrollMakeStyles } from '../../payrollMakeStyles/payrollMakeStyles';
import { useParams } from 'react-router';
import { getDepartments, getEmployees, getPayheads } from 'app/store/dataSlice';
import { CHECK_ASSIGN_PAYHEAD, GET_UNITS } from 'src/app/constant/constants';
import { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  ...getPayrollMakeStyles(theme),
  textField: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield', // Firefox
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none', // Chrome, Safari, Edge
      margin: 0,
    },
  },
}));

function AssignPayheadForm(props) {
  const userID = localStorage.getItem('user_id');
  const classes = useStyles(props);

  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, getValues, reset, setValue, watch } = methods;
  const { errors, isValid, dirtyField } = formState;
  const routeParams = useParams();
  const { assignPayheadId } = routeParams;
  const handleDelete = localStorage.getItem('salaryEvent');
  const employees = useSelector((state) => state.data.employees);
  const payheads = useSelector((state) => state.data?.payheads);
  const departments = useSelector((state) => state.data?.departments);
  const watchPayhead = watch('payheads');
  const previousValidSelection = useRef([]);

  const [selectedRadio, setSelectedRadio] = useState('');
  console.log('selectedRadio', getValues());

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPayheads());
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (assignPayheadId !== 'new') {
      setSelectedRadio(getValues().calculation_for);
    }
  }, [assignPayheadId, getValues().calculation_for]);

  // const checkAssignPayhead = (selectedValues) => {
  //   const data = getValues();
  //   data.id = data?.payhead_assignments?.id || null;
  //   fetch(`${CHECK_ASSIGN_PAYHEAD}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((res) => {
  //       console.log('resAssing', res);
  //       if (res.has_value === false) {
  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: res.text,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });

  //         // Revert selection to previous valid state
  //         setValue('payheads', previousValidSelection.current);
  //       } else if (res.has_value === null && res.text) {
  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: res.text,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       } else if (res.is_recorded === true) {
  //         const employees = res.duplicate_entries.map(
  //           (option) => `${option.employees}-${option.payhead}`
  //         );
  //         const employeeNames = employees.join(', ');

  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: `Duplicate assigned: ${employeeNames}`,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       } else if (res.is_recorded === null && res.text) {
  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: res.text,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       } else {
  //         // Update the previous valid state
  //         previousValidSelection.current = selectedValues;
  //       }
  //     })
  //     .catch(() => {
  //       // Handle fetch errors
  //       Swal.fire({
  //         position: 'top-center',
  //         icon: 'error',
  //         title: 'Something went wrong. Please try again.',
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //     });
  // };

  const checkAssignPayhead = (selectedValues) => {
    const data = getValues();
    // data.id = data?.payhead_assignments?.id || null;

    fetch(`${CHECK_ASSIGN_PAYHEAD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((res) => {
        console.log('resAssign', res);

        if (res.has_value === false) {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: res.text,
            showConfirmButton: false,
            timer: 60000,
          });

          // Revert selection to the previous valid state
          setValue('payheads', previousValidSelection.current);
        } else if (res.is_recorded === true) {
          const employees = res.duplicate_entries.map(
            (option) => `${option.employee}-${option.payhead}`
          );
          const employeeNames = employees.join(', ');

          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `Duplicate assigned: ${employeeNames}`,
            showConfirmButton: false,
            timer: 60000,
          });

          // Revert selection to the previous valid state
          setValue('payheads', previousValidSelection.current);
        } else if (res.is_recorded === null && res.text) {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: res.text,
            showConfirmButton: false,
            timer: 60000,
          });
        } else {
          // Update the previous valid state
          previousValidSelection.current = selectedValues;
        }
      })
      .catch(() => {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Something went wrong. Please try again.',
          showConfirmButton: false,
          timer: 3000,
        });

        // Revert to the previous valid selection in case of an error
        setValue('payheads', previousValidSelection.current);
      });
  };

  return (
    <div>
      <Controller
        name='calculation_for'
        control={control}
        render={({ field }) => {
          console.log('fieldCheck', field);
          return (
            <FormControl component='fieldset'>
              <FormLabel component='legend'>
                How would you like to show?
              </FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue='top'
                onChange={(event) => {
                  console.log('event', event);
                  if (event.target.value == 'all') {
                    setSelectedRadio(event.target.value);
                    // setSelectedValues('All');
                    // setSalaryTable(true);
                    setValue('department', []);
                    setValue('employees', []);
                  } else if (event.target.value == 'department') {
                    setSelectedRadio(event.target.value);

                    setValue('employees', []);
                    // setSelectedValues('');
                  } else if (event.target.value == 'employees') {
                    setSelectedRadio(event.target.value);

                    setValue('department', []);
                    // setSelectedValues('');
                  } else {
                    setSelectedRadio(event.target.value);
                    // setSelectedValues('');
                  }

                  if (watchPayhead?.length !== 0 && watchPayhead) {
                    // checkUserDefineValue();
                    checkAssignPayhead();
                  }
                }}>
                <FormControlLabel
                  {...field}
                  value='all'
                  control={
                    <Radio
                      checked={field.value === 'all' ? field.value : false}
                      style={{ color: '#22d3ee' }}
                    />
                  }
                  label='All'
                />
                <FormControlLabel
                  {...field}
                  value='department'
                  control={
                    <Radio
                      checked={
                        field.value === 'department' ? field.value : false
                      }
                      style={{ color: 'green' }}
                    />
                  }
                  label='Department'
                />
                <FormControlLabel
                  {...field}
                  value='employees'
                  control={
                    <Radio
                      checked={
                        field.value === 'employees' ? field.value : false
                      }
                      style={{ color: 'red' }}
                    />
                  }
                  label='Employees'
                />
              </RadioGroup>
            </FormControl>
          );
        }}
      />
      {selectedRadio === 'all' && (
        <>
          <CustomDatePicker
            name='date'
            label='Date'
            required
            placeholder='DD-MM-YYYY'
          />
          <Controller
            name='payheads'
            control={control}
            render={({ field: { onChange, value, name } }) => {
              console.log('valueCheck', value);
              return (
                <Autocomplete
                  className='mt-24 mb-16'
                  freeSolo
                  multiple
                  filterSelectedOptions
                  value={
                    value
                      ? payheads.filter((data) => value.includes(data.id))
                      : []
                  }
                  options={payheads}
                  getOptionLabel={(option) => `${option?.name}`}
                  onChange={(event, newValue) => {
                    const selectedValues = newValue.map((option) => option.id);
                    onChange(selectedValues);
                    checkAssignPayhead(selectedValues);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        placeholder='Select Payhead'
                        label='Payhead'
                        error={!!errors.payheads}
                        required
                        helperText={errors?.payheads?.message}
                        variant='outlined'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    );
                  }}
                />
              );
            }}
          />
        </>
      )}

      {selectedRadio === 'department' && (
        <>
          <CustomDatePicker
            name='date'
            label='Date'
            required
            placeholder='DD-MM-YYYY'
          />
          <Controller
            name='department'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-24 mb-16'
                freeSolo
                multiple
                filterSelectedOptions
                value={
                  value
                    ? departments.filter((data) => value.includes(data.id))
                    : []
                }
                options={departments}
                getOptionLabel={(option) => `${option?.name}`}
                onChange={(event, newValue) => {
                  const selectedValues = newValue.map((option) => option.id);
                  onChange(selectedValues);
                  if (watchPayhead?.length !== 0) {
                    checkAssignPayhead();
                  }
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select departments'
                      label='Departments'
                      error={!!errors.departments}
                      required
                      helperText={errors?.departments?.message}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
            )}
          />
          <Controller
            name='payheads'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-24 mb-16'
                freeSolo
                multiple
                filterSelectedOptions
                value={
                  value
                    ? payheads.filter((data) => value.includes(data.id))
                    : []
                }
                options={payheads}
                getOptionLabel={(option) => `${option?.name}`}
                onChange={(event, newValue) => {
                  const selectedValues = newValue.map((option) => option.id);
                  onChange(selectedValues);
                  checkAssignPayhead();
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select Payhead'
                      label='Payhead'
                      error={!!errors.payheads}
                      required
                      helperText={errors?.payheads?.message}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
            )}
          />
        </>
      )}
      {selectedRadio === 'employees' && (
        <>
          <CustomDatePicker
            name='date'
            label='Date'
            required
            placeholder='DD-MM-YYYY'
          />
          <Controller
            name='employees'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-24 mb-16'
                freeSolo
                multiple
                filterSelectedOptions
                value={
                  value
                    ? employees.filter((data) => value.includes(data.id))
                    : []
                }
                options={employees}
                getOptionLabel={(option) =>
                  `${option?.first_name} ${option?.last_name}`
                }
                onChange={(event, newValue) => {
                  const selectedValues = newValue.map((option) => option.id);
                  onChange(selectedValues);
                  if (watchPayhead?.length !== 0 && watchPayhead) {
                    checkAssignPayhead();
                  }
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select Employee'
                      label='Employee'
                      error={!!errors.employees}
                      required
                      helperText={errors?.employees?.message}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
            )}
          />
          <Controller
            name='payheads'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-24 mb-16'
                freeSolo
                multiple
                filterSelectedOptions
                value={
                  value
                    ? payheads.filter((data) => value.includes(data.id))
                    : []
                }
                options={payheads}
                getOptionLabel={(option) => `${option?.name}`}
                onChange={(event, newValue) => {
                  const selectedValues = newValue.map((option) => option.id);
                  onChange(selectedValues);
                  checkAssignPayhead();
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select Payhead'
                      label='Payhead'
                      error={!!errors.payheads}
                      required
                      helperText={errors?.payheads?.message}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
              />
            )}
          />
        </>
      )}
    </div>
  );
}

export default AssignPayheadForm;
