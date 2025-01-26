import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getPayrollMakeStyles } from '../../payrollMakeStyles/payrollMakeStyles';
import { useParams } from 'react-router';
import {
  getDepartments,
  getEmployees,
  getEmployeesReadyToPayment,
  getLedgersCashAndBank,
  getPayheads,
  getPayrollVoucherClass,
} from 'app/store/dataSlice';
import {
  CHECK_ASSIGN_PAYHEAD,
  CHECK_SALARY_PAYMENT_PER_EMPLOYEE,
  GENERATE_SALARY_PAYMENT,
  GET_UNITS,
} from 'src/app/constant/constants';
import { useEffect, useRef, useState } from 'react';

import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
    alignItems: 'left',
  },
  removePadding: {
    padding: '0px !important',
  },
}));

function SalaryPaymentForm(props) {
  const classes = useStyles(props);
  const methods = useFormContext();
  const { control, formState, getValues, setValue, watch } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const routeParams = useParams();
  const { paymentSalaryId, paymentSalaryName } = routeParams;
  const handleDelete = localStorage.getItem('voucherEvent');
  const [getVoucher, setGetVoucher] = useState([]);
  const employees = useSelector((state) => state.data.employeesReadyToPayment);
  const employeesAll = useSelector((state) => state.data.employees);

  const departments = useSelector((state) => state.data?.departments);
  const ledgersCashAndBank = useSelector(
    (state) => state?.data?.ledgersCashAndBank
  );

  console.log('ledgersCashAndBank', ledgersCashAndBank);
  const emp = watch('employee');
  const [editedDebitValues, setEditedDebitValues] = useState({});
  const [editedCreditValues, setEditedCreditValues] = useState({});

  const [selectedRadio, setSelectedRadio] = useState('');
  const [selectedTypeRadio, setSelectedTypeRadio] = useState('regular');
  const [isBank, setIsBank] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayrollVoucherClass());
    dispatch(getEmployeesReadyToPayment());
    dispatch(getDepartments());
    dispatch(getEmployees());

    dispatch(getLedgersCashAndBank());
  }, [dispatch]);

  useEffect(() => {
    if (
      paymentSalaryName &&
      !clicked &&
      getValues().payment_type == 'regular'
    ) {
      setSelectedTypeRadio(getValues().payment_type);
      setSelectedRadio(getValues().calculation_for);

      // setValue('employee', getValues().employees);
      const salaryList = getValues()?.salary_list;
      console.log('4545454', getValues());

      const modifiedData = Object.entries(salaryList ? salaryList : {}).map(
        ([salaryKey, salaryValue]) => ({
          ...salaryValue,
          payheads: salaryValue.payheads?.map((e) => {
            if (e.transaction_type === 'cr') {
              return {
                ...e,
                credit_amount: e.payhead_amount,
                debit_amount: 0, // Set debit_amount to 0 for credit_amount transactions
              };
            } else {
              return {
                ...e,
                debit_amount: e.payhead_amount,
                credit_amount: 0, // Set credit_amount to 0 for debit_amount transactions
              };
            }
          }),
        })
      );
      console.log('modifiedData', modifiedData);
      // Set the modified data in getVoucher state
      const netSalary = modifiedData?.reduce(
        (total, item) =>
          total +
          item.payheads?.reduce(
            (sum, payhead) =>
              payhead.transaction_type == 'dr'
                ? sum + -(payhead?.debit_amount || 0)
                : sum + (payhead.credit_amount || 0),
            0
          ),
        0
      );

      // Update the net_salary in the getVoucher array
      const updatedGetVoucher = modifiedData?.map((item) => ({
        ...item,
        net_salary: item.payheads?.reduce(
          (sum, payhead) =>
            payhead.transaction_type == 'dr'
              ? sum + -(payhead?.debit_amount || 0)
              : sum + (payhead.credit_amount || 0),
          0
        ),
        gross_salary: item.payheads?.reduce(
          (sum, payhead) =>
            payhead.transaction_type == 'dr'
              ? sum + (payhead?.debit_amount || 0)
              : sum + (payhead.credit_amount || 0),
          0
        ),
      }));
      setGetVoucher(updatedGetVoucher);

      setValue('salary_list_item', updatedGetVoucher || []);

      setValue('total_amount', netSalary || 0.0);
      console.log(
        'selectedRadio',
        selectedRadio,
        'updatedGetVouchersdf',
        updatedGetVoucher
      );
    } else if (
      paymentSalaryName &&
      !clicked &&
      getValues().payment_type == 'advanced'
    ) {
      setSelectedTypeRadio(getValues().payment_type);
      // setSelectedRadio(getValues().calculation_for);

      setValue('employee', getValues().employee);
      console.log('AdbancedgetValue', getValues());
      setValue('total_amount', getValues().total_amount || 0.0);
    }
  }, [
    paymentSalaryName,
    getValues().calculation_for,
    !clicked,
    getValues().payment_type,
  ]);

  function handleSavePayrollVoucher() {
    setLoading(true);

    axios
      .post(`${GENERATE_SALARY_PAYMENT}`, getValues(), {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      })
      .then((res) => {
        setLoading(false);

        const modifiedData = res.data?.map((item) => ({
          ...item,
          payheads: item.payheads?.map((e) => {
            if (e.transaction_type === 'cr') {
              return {
                ...e,
                credit_amount: e.payhead_amount,
                debit_amount: 0, // Set debit_amount to 0 for credit_amount transactions
              };
            } else {
              return {
                ...e,
                debit_amount: e.payhead_amount,
                credit_amount: 0, // Set credit_amount to 0 for debit_amount transactions
              };
            }
          }),
        }));

        // Set the modified data in getVoucher state

        const netSalary = modifiedData?.reduce(
          (total, item) =>
            total +
            item.payheads?.reduce(
              (sum, payhead) =>
                payhead.transaction_type == 'dr'
                  ? sum + -(payhead?.debit_amount || 0)
                  : sum + (payhead.credit_amount || 0),
              0
            ),
          0
        );

        // Update the net_salary in the getVoucher array
        const updatedGetVoucher = modifiedData?.map((item) => ({
          ...item,
          net_salary: item.payheads?.reduce(
            (sum, payhead) =>
              payhead.transaction_type == 'dr'
                ? sum + -(payhead?.debit_amount || 0)
                : sum + (payhead.credit_amount || 0),
            0
          ),
          gross_salary: item.payheads?.reduce(
            (sum, payhead) =>
              payhead.transaction_type == 'dr'
                ? sum + (payhead?.debit_amount || 0)
                : sum + (payhead.credit_amount || 0),
            0
          ),
        }));
        setGetVoucher(updatedGetVoucher);

        setValue('salary_list_item', updatedGetVoucher || []);

        setValue('total_amount', netSalary || 0.0);
      })
      .catch((err) => {
        setLoading(false);
      });

    // dispatch(getVoucher(values)).then(data => {
    //
  }

  //start edit

  const handleInputValueDebit = (event, employeeId, payheadId) => {
    const editedValue = parseInt(event.target.value) || 0; // Parse the input value as an integer with a default of 0

    setEditedDebitValues({
      ...editedDebitValues,
      [employeeId]: {
        ...editedDebitValues[employeeId],
        [payheadId]: editedValue,
      },
    });
  };

  const handleInputValueCredit = (event, employeeId, payheadId) => {
    const editedValue = parseInt(event.target.value) || 0; // Parse the input value as an integer with a default of 0

    setEditedCreditValues({
      ...editedCreditValues,
      [employeeId]: {
        ...editedCreditValues[employeeId],
        [payheadId]: editedValue,
      },
    });
  };

  const handleEditDebitChange = (
    event,
    employeeId,
    payheadId,
    transactionType
  ) => {
    let editedValue = parseInt(event.target.value) || 0;

    const newTotalPayheadAmount = getVoucher?.map((item) => {
      if (item.employee_id === employeeId) {
        return {
          ...item,
          payheads: item.payheads?.map((payhead) => {
            if (payhead.payhead_id === payheadId) {
              if (transactionType === 'dr') {
                return {
                  ...payhead,
                  payhead_amount: payhead.payhead_amount,
                  debit_amount: editedValue
                    ? editedValue
                    : payhead.payhead_amount,
                };
              } else if (transactionType === 'cr') {
                return {
                  ...payhead,
                  payhead_amount: payhead.payhead_amount,
                  credit_amount: editedValue
                    ? editedValue
                    : payhead.payhead_amount,
                };
              }
            }
            return payhead;
          }),
          net_salary: item.payheads?.reduce(
            (total, item) => total + item.payhead_amount,
            0
          ),
        };
      }
      return item;
    });

    setGetVoucher(newTotalPayheadAmount);
    // Calculate and update the net_salary
    const netSalary = newTotalPayheadAmount?.reduce(
      (total, item) =>
        total +
        item.payheads?.reduce(
          (sum, payhead) =>
            payhead.transaction_type == 'dr'
              ? sum + -(payhead?.debit_amount || 0)
              : sum + (payhead.credit_amount || 0),
          0
        ),
      0
    );

    // Update the net_salary in the getVoucher array
    const updatedGetVoucher = newTotalPayheadAmount?.map((item) => ({
      ...item,
      net_salary: item.payheads?.reduce(
        (sum, payhead) =>
          payhead.transaction_type == 'dr'
            ? sum + -(payhead?.debit_amount || 0)
            : sum + (payhead.credit_amount || 0),
        0
      ),
      gross_salary: item.payheads?.reduce(
        (sum, payhead) =>
          payhead.transaction_type == 'dr'
            ? sum + (payhead?.debit_amount || 0)
            : sum + (payhead.credit_amount || 0),
        0
      ),
    }));
    setGetVoucher(updatedGetVoucher);

    setValue('salary_list_item', updatedGetVoucher || []);

    setValue('total_amount', netSalary || 0.0);
  };

  const handleEditCreditChange = (
    event,
    employeeId,
    payheadId,
    transactionType
  ) => {
    const editedValue = parseInt(event.target.value) || 0;

    const newTotalPayheadAmount = getVoucher?.map((item) => {
      if (item.employee_id === employeeId) {
        return {
          ...item,
          payheads: item.payheads?.map((payhead) => {
            if (payhead.payhead_id === payheadId) {
              if (transactionType === 'dr') {
                return {
                  ...payhead,
                  payhead_amount: payhead.payhead_amount,
                  debit_amount: editedValue
                    ? editedValue
                    : payhead.payhead_amount,
                };
              } else if (transactionType === 'cr') {
                return {
                  ...payhead,
                  payhead_amount: payhead.payhead_amount,
                  credit_amount: editedValue
                    ? editedValue
                    : payhead.payhead_amount,
                };
              }
            }
            return payhead;
          }),
        };
      }
      return item;
    });

    // Calculate and update the net_salary
    const netSalary = newTotalPayheadAmount?.reduce(
      (total, item) =>
        total +
        item.payheads?.reduce(
          (sum, payhead) =>
            payhead.transaction_type == 'dr'
              ? sum + -(payhead?.debit_amount || 0)
              : sum + (payhead.credit_amount || 0),
          0
        ),
      0
    );

    // Update the net_salary in the getVoucher array
    const updatedGetVoucher = newTotalPayheadAmount?.map((item) => ({
      ...item,
      net_salary: item.payheads?.reduce(
        (sum, payhead) =>
          payhead.transaction_type == 'dr'
            ? sum + -(payhead?.debit_amount || 0)
            : sum + (payhead.credit_amount || 0),
        0
      ),
      gross_salary: item.payheads?.reduce(
        (sum, payhead) =>
          payhead.transaction_type == 'dr'
            ? sum + (payhead?.debit_amount || 0)
            : sum + (payhead.credit_amount || 0),
        0
      ),
    }));
    setGetVoucher(updatedGetVoucher);

    setValue('salary_list_item', updatedGetVoucher || []);

    setValue('total_amount', netSalary || 0.0);
  };

  //end//

  // const checkAssignPayhead = () => {
  //   const data = getValues();
  //   data.id = data.id ? data.id : null;
  //   fetch(`${CHECK_SALARY_PAYMENT_PER_EMPLOYEE}`, {
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
  //       if (res.has_value === false)
  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: `${res.text}`,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       else if (res.has_value === null && res.text) {
  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: `${res.text}`,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       } else if (res.is_recorded === true) {
  //         const employee = res.duplicate_entries.map((option) => `${option}`);
  //         const employeeNames = employee.join(', ');

  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: `Duplicate assigned:
  // 					${employeeNames}`,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       } else if (res.is_recorded === false) {
  //         handleSavePayrollVoucher();
  //       } else if (res.is_recorded === null && res.text) {
  //         Swal.fire({
  //           position: 'top-center',
  //           icon: 'error',
  //           title: `${res.text}`,
  //           showConfirmButton: false,
  //           timer: 60000,
  //         });
  //       }
  //     })
  //     .catch(() => '');
  // };

  const checkAssignPayhead = () => {
    const data = getValues();
    data.id = data.id ? data.id : null;
    fetch(`${CHECK_SALARY_PAYMENT_PER_EMPLOYEE}`, {
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
            <Typography className='flex justify-center mb-10' variant='h5'>
              Payroll Autofill
            </Typography>
            <Grid container spacing={2}>
              {/* <Grid item xs={4} className={classes.itemHead}>
								<Typography>Name</Typography>
							</Grid>
							<Grid item xs={8}>
								<Controller
									name="name"
									control={control}
									render={({ field }) => {
										return (
											<TextField
												{...field}
												className="mt-8 mb-16"
												error={!!errors?.name}
												helperText={errors?.name?.message}
												label="Voucher Name"
												id="name"
												required
												variant="outlined"
												InputLabelProps={field?.value && { shrink: true }}
												fullWidth
											/>
										);
									}}
								/>
							</Grid> */}
              {/* <Grid item xs={4} className={classes.itemHead}>
								<Typography>From (blank for beginning)</Typography>
							</Grid>
							<Grid item xs={8}>
								<Controller
									className="p-0"
									name={`date_from`}
									control={control}
									// rules={{
									// 	validate: value => {
									// 		const selectedDate = moment(value);
									// 		if (selectedDate.date() !== 1) {
									// 			return 'Please select the first date of the month.';
									// 		}
									// 		return true;
									// 	}
									// }}
									render={({ field }) => {
										return (
											<CustomDatePicker
												className="p-0"
												// previous_date_disable={true}
												field={field}
												startOfDate={true}
												views={['month']}
												label="Date From"
												error={!!errors?.date_from} // Check if there's an error for the "date_from" field
												helperText={errors?.date_from?.message || ''} // Display the error message if available
											/>
										);
									}}
								/>
							</Grid> */}
              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Payment Date /Month</Typography>
              </Grid>
              <Grid item xs={4}>
                <CustomDatePicker
                  name='date'
                  label='Date'
                  required
                  placeholder='DD-MM-YYYY'
                />
              </Grid>
              <Grid item xs={4}>
                <CustomDatePicker
                  name='payment_month'
                  label='Payment'
                  required
                  placeholder='DD-MM-YYYY'
                />
              </Grid>
              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Payment Account</Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='payment_account'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      className='mt-8 mb-16'
                      freeSolo
                      options={ledgersCashAndBank}
                      value={
                        value
                          ? ledgersCashAndBank.find((data) => data.id == value)
                          : null
                      }
                      getOptionLabel={(option) => `${option.name}`}
                      onChange={(event, newValue) => {
                        onChange(newValue?.id);
                        if (newValue.name !== ('Cash' || 'cash')) {
                          setIsBank(true);
                        } else {
                          setIsBank(false);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder='Select Ledger'
                          label='Ledger'
                          variant='outlined'
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              {isBank && (
                <>
                  <Grid item xs={4} className={classes.itemHead}>
                    <Typography>Cheque no</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name='cheque_no'
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            className='mt-8 mb-16'
                            error={!!errors?.cheque_no}
                            helperText={errors?.cheque_no?.message}
                            label='Cheque no'
                            id='cheque_no'
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
                    <Typography>Account No</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name='account_no'
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            className='mt-8 mb-16'
                            error={!!errors?.account_no}
                            helperText={errors?.account_no?.message}
                            label='Account no'
                            id='account_no'
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
                    <Typography>Cheque Date</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <CustomDatePicker
                      name='cheque_date'
                      label='cheque date'
                      required
                      placeholder='DD-MM-YYYY'
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Payment Type</Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='payment_type'
                  control={control}
                  render={({ field }) => (
                    <FormControl component='fieldset'>
                      <RadioGroup
                        row
                        aria-label='position'
                        name='position'
                        defaultValue='top'
                        onChange={(event) => {
                          if (event.target.value == 'regular') {
                            setSelectedTypeRadio(event.target.value);
                          } else if (event.target.value == 'advanced') {
                            setSelectedTypeRadio(event.target.value);
                            setValue('department', []);
                            setValue('calculation_for', '');
                            setSelectedRadio('');
                            setGetVoucher([]);
                          } else {
                            setSelectedTypeRadio(event.target.value);
                          }
                        }}>
                        <FormControlLabel
                          {...field}
                          value='regular'
                          control={
                            <Radio
                              checked={
                                field.value === 'regular' ? field.value : false
                              }
                              style={{ color: '#22d3ee' }}
                              onClick={() => setClicked(true)}
                            />
                          }
                          label='Regular'
                        />
                        <FormControlLabel
                          {...field}
                          value='advanced'
                          control={
                            <Radio
                              checked={
                                field.value === 'advanced' ? field.value : false
                              }
                              style={{ color: 'green' }}
                              onClick={() => setClicked(true)}
                            />
                          }
                          label='Advanced'
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>

              {selectedTypeRadio == 'regular' ? (
                <>
                  <Grid item xs={4} className={classes.itemHead}>
                    <Typography>Process Assign</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name='calculation_for'
                      control={control}
                      render={({ field }) => {
                        console.log('fieldsdsd', field);
                        return (
                          <FormControl component='fieldset'>
                            <RadioGroup
                              row
                              aria-label='position'
                              name='position'
                              defaultValue='top'
                              style={{}}
                              onChange={(event) => {
                                if (event.target.value == 'all') {
                                  setSelectedRadio(event.target.value);
                                  // setSelectedValues('All');
                                  // setSalaryTable(true);
                                  checkAssignPayhead();

                                  setValue('department', []);
                                  // setValue('employee', []);
                                } else if (event.target.value == 'department') {
                                  setSelectedRadio(event.target.value);
                                  setGetVoucher([]);
                                  // setValue('employee', []);

                                  // setSelectedValues('');
                                } else if (event.target.value == 'employees') {
                                  setSelectedRadio(event.target.value);

                                  setValue('department', []);
                                  setGetVoucher([]);

                                  // setSelectedValues('');
                                } else {
                                  setSelectedRadio(event.target.value);
                                  setGetVoucher([]);

                                  // setSelectedValues('');
                                }
                              }}>
                              <FormControlLabel
                                {...field}
                                value='all'
                                control={
                                  <Radio
                                    checked={
                                      field.value === 'all'
                                        ? field.value
                                        : false
                                    }
                                    style={{ color: '#22d3ee' }}
                                    onClick={() => setClicked(true)}
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
                                    onClick={() => setClicked(true)}
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
                                    onClick={() => setClicked(true)}
                                  />
                                }
                                label='Employees'
                              />
                            </RadioGroup>
                          </FormControl>
                        );
                      }}
                    />
                  </Grid>

                  {selectedRadio && (
                    <>
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
                                  const selectedValues = newValue?.map(
                                    (option) => option.id
                                  );
                                  onChange(selectedValues);
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
                            render={({ field: { onChange, value, name } }) => {
                              return (
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
                                    const selectedValues = newValue?.map(
                                      (option) => option.id
                                    );
                                    onChange(selectedValues);
                                    checkAssignPayhead();
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
                              );
                            }}
                          />
                        )}
                        {selectedRadio === 'all' && (
                          <Typography>All Emloyees</Typography>
                        )}
                      </Grid>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Grid item xs={4} className={classes.itemHead}>
                    <Typography>Process For</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name='employee'
                      control={control}
                      render={({ field: { onChange, value, name } }) => {
                        return (
                          <Autocomplete
                            className='mt-8 mb-16'
                            freeSolo
                            multiple
                            filterSelectedOptions
                            value={
                              value
                                ? employeesAll.filter((data) =>
                                    value.includes(data.id)
                                  )
                                : []
                            }
                            options={employeesAll}
                            getOptionLabel={(option) =>
                              `${option?.first_name} ${option?.last_name}`
                            }
                            onChange={(event, newValue) => {
                              const selectedValues = newValue?.map(
                                (option) => option.id
                              );
                              onChange(selectedValues);
                              // checkAssignPayhead();
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
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.itemHead}>
                    <Typography>Amount</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name='total_amount'
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            className='mt-8 mb-16'
                            error={!!errors?.total_amount}
                            helperText={errors?.total_amount?.message}
                            label='Amount'
                            id='total_amount'
                            required
                            // multiline
                            // rows={2}
                            variant='outlined'
                            InputLabelProps={field?.value && { shrink: true }}
                            fullWidth
                          />
                        );
                      }}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={4} className={classes.itemHead}>
                <Typography>Note</Typography>
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name='details'
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        className='mt-8 mb-16'
                        error={!!errors?.details}
                        helperText={errors?.details?.message}
                        label='Note'
                        id='details'
                        required
                        multiline
                        rows={2}
                        variant='outlined'
                        InputLabelProps={field?.value && { shrink: true }}
                        fullWidth
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        {getVoucher?.length !== 0 && selectedTypeRadio == 'regular' && (
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
                      {selectedRadio === 'employees' && (
                        <>
                          <TableCell
                            style={{ fontSize: '14px' }}
                            className={classes.tableCell}>
                            <Typography className='text-14 font-medium'>
                              Debit Amount
                            </Typography>
                          </TableCell>
                          <TableCell
                            style={{ fontSize: '14px' }}
                            className={classes.tableCell}>
                            <Typography className='text-14 font-medium'>
                              Credit Amount
                            </Typography>
                          </TableCell>
                        </>
                      )}
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
                    {getVoucher?.map((item) => {
                      return (
                        <React.Fragment key={item.employee_name}>
                          {item.payheads?.map((e, index) => {
                            const isLastRow =
                              index === item.payheads?.length - 1;

                            return (
                              <TableRow hover key={e.payhead}>
                                {index === 0 && (
                                  <TableCell
                                    rowSpan={item.payheads?.length}
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
                                {/* <TableCell
																	className={`text-12 font-medium p-5 ${
																		isLastRow ? classes.lastRow : null
																	}`}
																>
																	<input
																		type="text"
																		value={editedValues[item.employee_name] || ''} // Step 2: Use edited value for this payhead
																		onChange={event =>
																			handleEditChange(event, item.employee_name)
																		} // Step 3
																	/>
																</TableCell> */}

                                {selectedRadio === 'employees' && (
                                  <>
                                    <TableCell
                                      className={`text-12 font-medium p-5 ${
                                        isLastRow ? classes.lastRow : null
                                      }`}>
                                      <Controller
                                        name='debit_amount'
                                        control={control}
                                        render={({ field }) => {
                                          return (
                                            <TextField
                                              {...field}
                                              disabled={
                                                e.transaction_type == 'cr'
                                              }
                                              error={!!errors?.debit_amount}
                                              helperText={
                                                errors?.debit_amount?.message
                                              }
                                              id='debit_amount'
                                              required
                                              value={
                                                editedDebitValues[
                                                  item.employee_id
                                                ]?.[e.payhead_id] ||
                                                (e.transaction_type == 'dr' &&
                                                  e.payhead_amount) ||
                                                0
                                              }
                                              onChange={(event) => {
                                                handleInputValueDebit(
                                                  event,
                                                  item.employee_id,
                                                  e.payhead_id
                                                );
                                              }}
                                              onKeyDown={(event) => {
                                                if (
                                                  event.key === 'Enter' &&
                                                  item.employee_id &&
                                                  e.payhead_id
                                                ) {
                                                  handleEditDebitChange(
                                                    event,
                                                    item.employee_id,
                                                    e.payhead_id,
                                                    e.transaction_type
                                                  );
                                                }
                                              }}
                                              variant='outlined'
                                              InputLabelProps={
                                                field?.value && {
                                                  shrink: true,
                                                }
                                              }
                                              inputProps={{
                                                style: {
                                                  padding: 10,
                                                },
                                              }}
                                            />
                                          );
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell
                                      className={`text-12 font-medium p-5 ${
                                        isLastRow ? classes.lastRow : null
                                      }`}>
                                      <Controller
                                        name='credit_amount'
                                        control={control}
                                        render={({ field }) => {
                                          return (
                                            <TextField
                                              {...field}
                                              disabled={
                                                e.transaction_type == 'dr'
                                              }
                                              error={!!errors?.credit_amount}
                                              helperText={
                                                errors?.credit_amount?.message
                                              }
                                              id='credit_amount'
                                              required
                                              value={
                                                editedCreditValues[
                                                  item.employee_id
                                                ]?.[e.payhead_id] ||
                                                (e.transaction_type == 'cr' &&
                                                  e.payhead_amount) ||
                                                0
                                              }
                                              onChange={(event) => {
                                                handleInputValueCredit(
                                                  event,
                                                  item.employee_id,
                                                  e.payhead_id
                                                );
                                              }}
                                              onKeyDown={(event) => {
                                                if (
                                                  event.key === 'Enter' &&
                                                  item.employee_id &&
                                                  e.payhead_id
                                                ) {
                                                  handleEditCreditChange(
                                                    event,
                                                    item.employee_id,
                                                    e.payhead_id,
                                                    e.transaction_type
                                                  );
                                                }
                                              }}
                                              variant='outlined'
                                              InputLabelProps={
                                                field?.value && {
                                                  shrink: true,
                                                }
                                              }
                                              inputProps={{
                                                style: {
                                                  padding: 10,
                                                },
                                              }}
                                            />
                                          );
                                        }}
                                      />
                                    </TableCell>
                                  </>
                                )}

                                {index === 0 && (
                                  <TableCell
                                    rowSpan={item.payheads?.length}
                                    className={classes.tableCellInBody}
                                    align='center'>
                                    {/* {item.payheads?.reduce(
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
                        </React.Fragment>
                      );
                    })}

                    {/* Total Row */}
                    <TableRow hover>
                      <TableCell className={classes.tableCellInBody} />
                      <TableCell
                        className={
                          selectedRadio === 'employees'
                            ? ''
                            : classes.tableCellInBody
                        }
                        style={{
                          borderBottom:
                            selectedRadio === 'employees'
                              ? '1px solid #252f3e'
                              : '',
                        }}
                      />
                      {selectedRadio === 'employees' && (
                        <>
                          <TableCell
                            style={{ borderBottom: '1px solid #252f3e' }}
                          />
                          <TableCell
                            style={{ borderBottom: '1px solid #252f3e' }}
                          />
                        </>
                      )}
                      <TableCell className={classes.tableCellInBody}>
                        <Typography className={classes.tableCellInBody}>
                          Total
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.tableCellInBody}
                        align='center'>
                        <Typography className={classes.tableCellInBody}>
                          {/* {voucherDemoData?.reduce(
												(total, item) => total + item.totalPayheadAmount,
												0
											)} */}
                          {/* {getVoucher?.reduce(
														(total, item) =>
															total +
															item.payheads?.reduce(
																(sum, payhead) => sum + payhead.payhead_amount,
																0
															),
														0
													)} */}
                          {getVoucher?.reduce(
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

export default SalaryPaymentForm;
