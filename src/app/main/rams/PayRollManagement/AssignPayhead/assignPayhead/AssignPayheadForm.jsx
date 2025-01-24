import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getPayrollMakeStyles } from '../../payrollMakeStyles/payrollMakeStyles';
import { useParams } from 'react-router';
import { getDepartments, getEmployees, getPayheads } from 'app/store/dataSlice';
import { CHECK_ASSIGN_PAYHEAD, GET_UNITS } from 'src/app/constant/constants';
import { useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

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
  const handleDelete = localStorage.getItem('salaryEvent');
  const employees = useSelector((state) => state.data.employees);
  const payheads = useSelector((state) => state.data?.payheads);
  const departments = useSelector((state) => state.data?.departments);
  const watchPayhead = watch('payhead');
  const [selectedRadio, setSelectedRadio] = useState('');

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPayheads());
    dispatch(GET_UNITS());
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (salaryId !== 'new') {
      setSelectedRadio(getValues().calculation_for);
    }
  }, [salaryId, getValues().calculation_for]);

  const checkAssignPayhead = () => {
    const data = getValues();
    data.id = data?.payhead_assignments?.id || null;
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
        console.log('resAssing', res);
        if (res.has_value === false)
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `${res.text}`,
            showConfirmButton: false,
            timer: 60000,
          });
        else if (res.has_value === null && res.text) {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `${res.text}`,
            showConfirmButton: false,
            timer: 60000,
          });
        } else if (res.is_recorded === true) {
          const employee = res.duplicate_entries.map(
            (option) => `${option.employee}-${option.payhead}`
          );
          const employeeNames = employee.join(', ');

          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `Duplicate assigned:  
						${employeeNames}`,
            showConfirmButton: false,
            timer: 60000,
          });
        } else if (res.is_recorded === null && res.text) {
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `${res.text}`,
            showConfirmButton: false,
            timer: 60000,
          });
        }
      })
      .catch(() => '');
  };

  return (
    <div>
      <Controller
        name='calculation_for'
        control={control}
        render={({ field }) => (
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
                if (event.target.value == 'all') {
                  setSelectedRadio(event.target.value);
                  // setSelectedValues('All');
                  // setSalaryTable(true);
                  setValue('department', []);
                  setValue('employee', []);
                } else if (event.target.value == 'department') {
                  setSelectedRadio(event.target.value);

                  setValue('employee', []);
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
                    checked={field.value === 'department' ? field.value : false}
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
                    checked={field.value === 'employees' ? field.value : false}
                    style={{ color: 'red' }}
                  />
                }
                label='Employees'
              />
            </RadioGroup>
          </FormControl>
        )}
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
            name='payhead'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-8 mb-16'
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
                  // const employee = newValue.map(option => option.first_name);
                  // const employeeNames = employee.join(', ');
                  // setSelectedValues(employeeNames);
                  // setSalaryTable(true);

                  // checkUserDefineValue();
                  checkAssignPayhead();
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select Payhead'
                      label='Payhead'
                      error={!!errors.payhead}
                      required
                      helperText={errors?.payhead?.message}
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
                className='mt-8 mb-16'
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
                  // const deparment = newValue.map(option => option.name);
                  // const departmentNames = deparment.join(', ');
                  // setSelectedValues(departmentNames);
                  // setSalaryTable(true);
                  if (watchPayhead?.length !== 0) {
                    // checkUserDefineValue();
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
            name='payhead'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-8 mb-16'
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
                  // const employee = newValue.map(option => option.first_name);
                  // const employeeNames = employee.join(', ');
                  // setSelectedValues(employeeNames);
                  // setSalaryTable(true);
                  // checkUserDefineValue();
                  checkAssignPayhead();
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select Payhead'
                      label='Payhead'
                      error={!!errors.payhead}
                      required
                      helperText={errors?.payhead?.message}
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
            name='employee'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-8 mb-16'
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
                  // const employee = newValue.map(option => option.first_name);
                  // const employeeNames = employee.join(', ');
                  // setSelectedValues(employeeNames);
                  // setSalaryTable(true);
                  if (watchPayhead?.length !== 0 && watchPayhead) {
                    // checkUserDefineValue();
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
            name='payhead'
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Autocomplete
                className='mt-8 mb-16'
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
                  // const employee = newValue.map(option => option.first_name);
                  // const employeeNames = employee.join(', ');
                  // setSelectedValues(employeeNames);
                  // setSalaryTable(true);
                  // checkUserDefineValue();
                  checkAssignPayhead();
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder='Select Payhead'
                      label='Payhead'
                      error={!!errors.payhead}
                      required
                      helperText={errors?.payhead?.message}
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
