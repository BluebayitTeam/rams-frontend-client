import { getAccountFormStyles } from '@fuse/utils/accountMakeStyles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import {
  getBranches,
  getEmployeeLedgers,
  getLedgerBankCashs,
  getProfileData,
  getSubLedgers
} from 'app/store/dataSlice';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';
import {
  GET_PROVIDENT_FUND_BANK_CASH_CURRENT_BALANCE,
  GET_PROVIDENT_FUND_CURRENT_BALANCE
} from 'src/app/constant/constants';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  ...getAccountFormStyles(theme),
}));

function ProvidentFundForm({ setLetFormSave }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const methods = useFormContext();
  const { providentFundId } = useParams();

  const { control, formState, getValues, setValue, reset, watch } = methods;

  const { errors } = formState;
  const branchs = useSelector((state) => state.data.branches);
  const subLedgers = useSelector((state) => state.data.subLedgers);
  const ledgers = useSelector((state) => state.data.ledgers);
  const employeeLedgers = useSelector((state) => state.data.employeeLedgers);
  const bankAccounts = useSelector((state) => state.data.ledgerBankCashs || []);
  const profileData = useSelector((state) => state.data.profileData);
  const [isDebitCreditMatched, setIsDebitCreditMatched] = useState(true);
  const [debitCreditMessage, setDebitCreditMessage] = useState('');
  const [haveEmptyLedger, setHaveEmptyLedger] = useState(true);
  const [ledgerMessage, setLedgerMessage] = useState('');
  const [checked, setChecked] = useState(!!providentFundId?.currency);

  const { fields, remove } = useFieldArray({
    control,
    name: 'items',
    keyName: 'key',
  });
  const values = getValues();
  useEffect(() => {
    dispatch(getBranches());
    dispatch(getSubLedgers());
    dispatch(getEmployeeLedgers());
    dispatch(getLedgerBankCashs());
    dispatch(getProfileData());
  }, []);

  useEffect(() => {
    cheackDbCdEquality();
  }, [getValues()?.items]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
  };
  const cheackDbCdEquality = async () => {
    const items = getValues()?.items || [];
    const totalDebitAmount = getTotalAmount(items || [], 'debit_amount') || 0;
    setValue(`items.0.credit_amount`, totalDebitAmount);

    const totalCreditAmount = getTotalAmount(items || [], 'credit_amount');
    if (totalDebitAmount === totalCreditAmount && totalDebitAmount > 0) {
      setIsDebitCreditMatched(true);
      setDebitCreditMessage('Congratulations, Debit & Credit match...');
      haveEmptyLedger || setLetFormSave(true);
    } else {
      setIsDebitCreditMatched(false);
      setDebitCreditMessage("Sorry, Debit and Credit doesn't match...");
      setLetFormSave(false);
    }
  };

  const checkEmptyLedger = async (itms) => {
    setTimeout(() => {
      const items = itms || watch(items) || [];

      let isLedgerEmpty = false;
      items.map((itm) => {
        if (!itm?.ledger) {
          isLedgerEmpty = true;
        }
      });

      if (isLedgerEmpty) {
        setHaveEmptyLedger(true);
        setLedgerMessage('Account type is required');
        setLetFormSave(false);
      } else {
        setHaveEmptyLedger(false);
        setLedgerMessage('');
        isDebitCreditMatched && setLetFormSave(true);
      }
    }, 0);
  };

  useEffect(() => {
    checkEmptyLedger(watch('items') || []);
  }, [getValues()]);

  // rerender feildsArray after ledgers fetched otherwise ledger's option not be shown
  useEffect(() => {
    reset({ ...getValues(), items: watch('items') });
  }, [ledgers]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const handleGetLedgerCurrentBalanceBankCash = (ledgerId, idx) => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token')
      }
    };
    fetch(`${GET_PROVIDENT_FUND_BANK_CASH_CURRENT_BALANCE}?ledger=${ledgerId}`, authTOKEN)
      .then(response => response.json())
      .then(data => {
        setValue(`items.${idx}.balance`, data?.balance || 0);
      });
  };
  const handleAutocompleteChange = (_event, newValue) => {
    // onChange(newValue?.id);
    checkEmptyLedger();

    if (newValue?.name === 'Bank') {
      setModalOpen(true);
    }
  };

  <Autocomplete onChange={handleAutocompleteChange} />;
  const handleGetLedgerCurrentBalance = (ledgerId, idx) => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token')
      }
    };
    fetch(`${GET_PROVIDENT_FUND_CURRENT_BALANCE}?ledger=${ledgerId}`, authTOKEN)
      .then(response => response.json())
      .then(data => {
        setValue(`items.${idx}.balance`, data?.balance || 0);
      });
  };

  useEffect(() => {
    if (!_.isEmpty(employeeLedgers)) {
      const getProvidentFundLedger = employeeLedgers?.find(data => data.name === 'Provident Fund')?.id;
      console.log('Provident Fund Ledger ID:', getProvidentFundLedger);
      if (getProvidentFundLedger) {
        setValue('items.0.ledger', getProvidentFundLedger);
      }
    }
  }, [employeeLedgers]);
  useEffect(() => {
    if (!_.isEmpty(branchs) && !_.isEmpty(profileData)) {
      if (profileData?.role?.name?.toLowerCase() !== "admin") {
        const branchId = branchs?.find(
          (data) => data?.id === profileData?.branch?.id
        )?.id;
        branchId && setValue('branch', branchId);
      }
    }
  }, [branchs, profileData]);
  useEffect(() => {
    if (!_.isEmpty(subLedgers)) {
      const getSubLedger = subLedgers?.find(
        data => data.name === 'Provident Fund' || data.name === 'Provident Fund'
      )?.id;

      setValue('sub_ledger', getSubLedger);
    }
  }, [subLedgers]);

  console.log("getValues_data", getValues());

  return (
    <div>
      <Controller
        name='branch'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            options={branchs}
            value={value ? branchs?.find((data) => data.id === value) : null}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            disabled={!!value}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Branch'
                label='Branch'
                variant='outlined'
                InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
              />
            )}
          />
        )}
      />

      <Controller
        name='sub_ledger'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            options={subLedgers}
            value={value ? subLedgers?.find((data) => data.id == value) : null}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Sub Ledger'
                label='Sub Ledger'
                style={{ display: 'none' }}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <CustomDatePicker
        name='payment_date'
        label='Payment Date'
        required
        placeholder='DD-MM-YYYY'
      />


      <Controller
        name='details'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ''}
              className='my-16'
              label='Details'
              id='details'
              variant='outlined'
              multiline
              rows={2}
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <Grid>
        <div className={classes.mainContainer}>
          <TableContainer component={Paper} className={classes.tblContainer}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={classes.tableCell}>No.</TableCell>
                  <TableCell className={classes.tableCell} align='center'>
                    Account Type
                  </TableCell>
                  <TableCell className={classes.tableCell} align='center'>
                    Dr
                  </TableCell>
                  <TableCell className={classes.tableCell} align='center'>
                    Cr
                  </TableCell>
                  <TableCell className={classes.tableCell} align='center'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {fields.map((item, idx) => {
                  return (
                    <TableRow key={item.key}>
                      <TableCell
                        className={classes.tableCellInBody}
                        component='th'
                        scope='row'>
                        {idx + 1}
                      </TableCell>
                      <TableCell className={classes.tableCellInBody}>
                        <Controller
                          name={`items.${idx}.ledger`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Autocomplete
                              className='mt-8 mb-16'
                              freeSolo
                              options={
                                idx === 0 ? bankAccounts : employeeLedgers
                              }
                              value={
                                value
                                  ? (idx === 0
                                    ? bankAccounts
                                    : employeeLedgers
                                  )?.find((data) => data.id == value)
                                  : null
                              }
                              getOptionLabel={(option) => `${option.name}`}
                              InputLabelProps={{ shrink: true }}
                              onChange={(_event, newValue) => {
                                onChange(newValue?.id);
                                checkEmptyLedger();
                                idx === 0
                                  ? handleGetLedgerCurrentBalanceBankCash(newValue?.id, idx)
                                  : handleGetLedgerCurrentBalance(
                                    newValue?.id,
                                    idx
                                  );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  placeholder='Select an account'
                                  label='Account'
                                  variant='outlined'
                                  error={!value}
                                  InputLabelProps={value ? {
                                    shrink: true,
                                  } : { style: { color: 'red' } }}
                                />
                              )}
                            />
                          )}
                        />

                        {providentFundId === 'new' && (
                          <div>
                            <Controller
                              name={`items.${idx}.balance`}
                              control={control}
                              render={({ field }) => (
                                <div className='mt-8 '>
                                  <Typography
                                    style={{
                                      color: field.value > 0 ? 'green' : 'red',
                                      paddingLeft: '5px',
                                    }}>
                                    Balance: {field.value}
                                  </Typography>
                                </div>
                              )}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCellInBody}>
                        <Controller
                          name={`items.${idx}.debit_amount`}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                {...field}
                                className='mt-8 mb-16'
                                label='Debit'
                                id='debit'
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (
                                    watch(`items.${idx}.balance`) >=
                                    e.target.value
                                  ) {
                                    if (!isNaN(value)) {
                                      setValue(
                                        `items.${idx}.debit_amount`,
                                        value?.slice(-1) == '.'
                                          ? value
                                          : Number(value)
                                      );
                                      setValue(`items.${idx}.credit_amount`, 0);
                                      cheackDbCdEquality();
                                    }
                                  } else {
                                    Swal.fire({
                                      position: 'top-center',
                                      icon: 'warning',
                                      title: `Insufficient Balance`,
                                      showConfirmButton: false,
                                      timer: 1000,
                                    });
                                  }
                                }}
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={
                                  (providentFundId === 'new' && idx === 0)
                                }
                              />
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell className={classes.tableCellInBody}>
                        <Controller
                          name={`items.${idx}.credit_amount`}
                          control={control}
                          render={({ field }) => {
                            return (
                              <TextField
                                {...field}
                                className='mt-8 mb-16'
                                label='Credit'
                                id='credit'
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (!isNaN(value)) {
                                    setValue(
                                      `items.${idx}.credit_amount`,
                                      value?.slice(-1) == '.'
                                        ? value
                                        : Number(value)
                                    );
                                    setValue(`items.${idx}.debit_amount`, 0);
                                    cheackDbCdEquality();
                                  }
                                }}
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={
                                  (providentFundId === 'new' && idx !== 0)
                                }
                                // disabled={
                                //   !!(providentFundId === 'new' && idx === 0)
                                // }
                                readonly
                              />
                            );
                          }}
                        />
                      </TableCell>
                      {idx === 0 && (
                        <TableCell
                          className='p-0 md:p-0'
                          align='center'
                          component='th'
                          scope='row'
                          style={{ minWidth: '80px' }}>
                          <div>
                            {checked ? (
                              <div
                                variant='outlined'
                                className={classes.btnContainer}>
                                <AddIcon />
                              </div>
                            ) : (
                              <div
                                variant='outlined'
                                className={classes.btnContainer}
                                onClick={() => {
                                  const values = getValues();
                                  reset({
                                    ...values,
                                    items: [
                                      ...values?.items,
                                      {
                                        ledger: null,
                                        debit_amount: 0,
                                        credit_amount: 0,
                                      },
                                    ],
                                  });
                                  checkEmptyLedger();
                                }}
                                onBlur={() => { }}>
                                <AddIcon />
                              </div>
                            )}
                          </div>
                        </TableCell>
                      )}
                      {idx !== 0 && idx !== 1 && (
                        <TableCell
                          className='p-0 md:p-0'
                          align='center'
                          component='th'
                          scope='row'
                          style={{ minWidth: '80px' }}>
                          <div>
                            <DeleteIcon
                              onClick={() => {
                                remove(idx);
                                cheackDbCdEquality();
                                checkEmptyLedger();
                              }}
                              className='h-52 cursor-pointer'
                              style={{ color: 'red' }}
                            />
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {<Typography style={{ color: 'red' }}>{ledgerMessage}</Typography>}
          {debitCreditMessage && (
            <Typography
              style={{ color: isDebitCreditMatched ? 'green' : 'red' }}>
              {debitCreditMessage}
            </Typography>
          )}
        </div>
      </Grid>
    </div>
  );
}

export default ProvidentFundForm;
