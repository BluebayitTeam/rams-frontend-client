import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getPayrollMakeStyles } from '../../payrollMakeStyles/payrollMakeStyles';
import { useParams } from 'react-router';
import { getDepartments, getEmployees, getPayheads } from 'app/store/dataSlice';
import {
  CHECK_ASSIGN_PAYHEAD,
  CHECK_PAYROLL_VOUCHER_FRO_EMPLOYEE,
  GET_UNITS,
} from 'src/app/constant/constants';
import { Fragment, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import FuseScrollbars from '@fuse/core/FuseScrollbars';

const useStyles = makeStyles((theme) => ({
  ...getPayrollMakeStyles(theme),

  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    overflow: 'auto',
    minHeight: '35px',
  },
  toolbar: {
    '& > div': {
      minHeight: 'fit-content',
    },
  },
  box: {
    background: '#fff',
    border: '1px solid',
    borderColor: 'grey',
    borderRadius: 2,
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '50%',
    padding: '20px',
    height: 'fit-content',
  },
  tableBox: {
    background: '#fff',
    border: '1px solid',
    borderColor: 'grey',
    borderRadius: 2,
    fontSize: '0.875rem',
    fontWeight: '700',
    padding: '20px',
    height: 'fit-content',
    margin: '20px',
  },

  itemHead: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function PayrollVoucherForm(props) {
  const userID = localStorage.getItem('user_id');
  const classes = useStyles(props);
  const [getVoucher, setGetVoucher] = useState([]);
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, getValues, reset, setValue, watch } = methods;
  const { errors, isValid, dirtyField } = formState;
  const routeParams = useParams();
  const voucherId = routeParams;
  const handleDelete = localStorage.getItem('voucherEvent');

  const employees = useSelector((state) => state.data.employees);
  const departments = useSelector((state) => state.data?.departments);
  const calCulationFor = watch('calculation_for');
  const salaryLists = watch('salary_list');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [fatchTrue, setFatchTrue] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPayheads());
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (voucherId !== 'new' && calCulationFor && salaryLists && !fatchTrue) {
      setSelectedRadio(calCulationFor);
      // const modifiedData = salaryLists.map(([salaryKey, salaryValue]) => ({
      // 	...salaryValue
      // }));
      setGetVoucher(salaryLists);
      setFatchTrue(true);

      // console.log('getValues', getValues(), modifiedData);
    }
  }, [voucherId !== 'new', calCulationFor, salaryLists, fatchTrue]);

  const checkAssignPayhead = () => {
    const data = getValues();
    data.id = data.id ? data.id : null;
    fetch(`${CHECK_PAYROLL_VOUCHER_FRO_EMPLOYEE}`, {
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
          const employee = res.duplicate_entries.map((option) => `${option}`);
          const employeeNames = employee.join(', ');

          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: `Duplicate assigned:  
						${employeeNames}`,
            showConfirmButton: false,
            timer: 60000,
          });
        } else if (res.is_recorded === false) {
          handleSavePayrollVoucher();
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
    <div className=''>
      <FuseScrollbars className='flex-grow overflow-x-auto'>
        <Box className='w-full flex justify-center my-6'>
          <Box className={classes.box}>
            <Typography className='flex justify-center' variant='h5'>
              Payroll Autofill
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        className='mt-8 mb-16'
                        error={!!errors?.name}
                        helperText={errors?.name?.message}
                        label='Voucher Name'
                        id='name'
                        required
                        variant='outlined'
                        InputLabelProps={field?.value && { shrink: true }}
                        fullWidth
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Select Month</Typography>
              </Grid>
              <Grid item xs={8}>
                <CustomDatePicker
                  name='voucher_date'
                  label='Date'
                  required
                  placeholder='DD-MM-YYYY'
                />
              </Grid>

              <Grid item xs={3} className={classes.itemHead}>
                <Typography>Process Assign</Typography>
              </Grid>
              <Grid item xs={9}>
                <Controller
                  name='calculation_for'
                  control={control}
                  render={({ field }) => (
                    <FormControl component='fieldset'>
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
                            // handleSavePayrollVoucher();
                            checkAssignPayhead();

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
                        }}>
                        <FormControlLabel
                          {...field}
                          value='all'
                          control={
                            <Radio
                              checked={
                                field.value === 'all' ? field.value : false
                              }
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
                                field.value === 'department'
                                  ? field.value
                                  : false
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
                                field.value === 'employees'
                                  ? field.value
                                  : false
                              }
                              style={{ color: 'red' }}
                            />
                          }
                          label='Employees'
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Process for</Typography>
              </Grid>
              <Grid item xs={8}>
                {selectedRadio === 'department' && (
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
                            ? departments.filter((data) =>
                                value.includes(data.id)
                              )
                            : []
                        }
                        options={departments}
                        getOptionLabel={(option) => `${option?.name}`}
                        onChange={(event, newValue) => {
                          const selectedValues = newValue.map(
                            (option) => option.id
                          );
                          onChange(selectedValues);
                          // handleSavePayrollVoucher();
                          checkAssignPayhead();
                        }}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              placeholder='Select departments'
                              label='Departments'
                              error={!!errors?.department}
                              required
                              autoFocus
                              helperText={errors?.department?.message}
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
                )}
                {selectedRadio === 'employees' && (
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
                            ? employees.filter((data) =>
                                value.includes(data.id)
                              )
                            : []
                        }
                        options={employees}
                        getOptionLabel={(option) =>
                          `${option?.first_name} ${option?.last_name}`
                        }
                        onChange={(event, newValue) => {
                          const selectedValues = newValue.map(
                            (option) => option.id
                          );
                          onChange(selectedValues);
                          // handleSavePayrollVoucher();
                          checkAssignPayhead();
                          // if (voucherId !== 'new') {
                          // 	setValue('salary_list', []);
                          // }
                        }}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              placeholder='Select Employee'
                              label='Employee'
                              error={!!errors?.employee}
                              required
                              autoFocus
                              helperText={errors?.employee?.message}
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
                )}
                {selectedRadio === 'all' && (
                  <Typography>All Emloyees</Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>

        {getVoucher.length !== 0 && (
          <>
            <Box
              style={{
                margin: '0 50px 50px 50px',
                border: '2px solid #1b2330',
                height: 'fit-content',
                display: 'flex',
                // className={classes.mainContainer}
                padding: '10px',
                alignItems: 'flex-start',
                borderRadius: '5px',
                justifyContent: 'space-between',
              }}>
              <TableContainer
                component={Paper}
                className={classes.tblContainer}>
                <Table className={`${classes.table}`} aria-label='simple table'>
                  <TableHead className={classes.tableHead}>
                    <TableRow hover style={{ fontSize: '14px' }}>
                      <TableCell
                        className={classes.tableCell}
                        style={{ fontSize: '14px' }}>
                        <Typography className='text-14 font-medium'>
                          Employee Name
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{ fontSize: '14px' }}
                        className={classes.tableCell}>
                        <Typography className='text-14 font-medium'>
                          Payhead{' '}
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{ fontSize: '14px' }}
                        className={classes.tableCell}>
                        <Typography className='text-14 font-medium'>
                          Amount
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{ fontSize: '14px' }}
                        className={classes.tableCell}>
                        <Typography className='text-14 font-medium'>
                          Total
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getVoucher.map((item) => {
                      return (
                        <Fragment key={item.employee_name}>
                          {item.payheads.map((e, index) => {
                            const isLastRow =
                              index === item.payheads.length - 1;

                            return (
                              <TableRow hover key={e.payhead}>
                                {index === 0 && (
                                  <TableCell
                                    rowSpan={item.payheads.length}
                                    className={classes.tableCellInBody}
                                    align='center'>
                                    {item.employee_name}
                                  </TableCell>
                                )}
                                <TableCell
                                  className={`text-12 font-medium p-5 ${
                                    isLastRow ? classes.lastRow : null
                                  }`}>
                                  {e.payhead_name}
                                </TableCell>
                                <TableCell
                                  className={`text-12 font-medium p-5 ${
                                    isLastRow ? classes.lastRow : null
                                  }`}>
                                  {`${e.payhead_amount} ${e.transaction_type} `}
                                </TableCell>
                                {index === 0 && (
                                  <TableCell
                                    rowSpan={item.payheads.length}
                                    className={classes.tableCellInBody}
                                    align='center'>
                                    {/* {item.payheads.reduce(
																			(total, item) =>
																				total + item.payhead_amount,
																			0
																		)} */}
                                    {item?.net_salary}
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          })}
                        </Fragment>
                      );
                    })}

                    {/* Total Row */}
                    <TableRow hover>
                      <TableCell className={classes.tableCellInBody} />
                      <TableCell className={classes.tableCellInBody} />
                      <TableCell className={classes.tableCellInBody}>
                        <Typography className={classes.tableCellInBody}>
                          Total
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellInBody}
                        align='center'>
                        <Typography className={classes.tableCellInBody}>
                          {/* {voucherDemoData.reduce(
												(total, item) => total + item.totalPayheadAmount,
												0
											)} */}

                          {getVoucher.reduce(
                            (total, item) => total + item.net_salary,
                            0
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
        {loading && <FuseLoading />}
      </FuseScrollbars>
    </div>
  );
}

export default PayrollVoucherForm;
