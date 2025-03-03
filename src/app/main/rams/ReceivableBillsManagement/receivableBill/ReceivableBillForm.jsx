import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import {
  getBranches,
  getCurrencies,
  getLedgers,
  getPassengers,
  getSubLedgers,
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import FileUpload from 'src/app/@components/FileUploader';
import { BASE_URL } from 'src/app/constant/constants';
import MultiplePassengersTable from './MultiplePassengersTable';

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

function ReceivableBillForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue, getValues } = methods;
  const { errors } = formState;
  const routeParams = useParams();
  const { receivableBillId } = routeParams;
  const passengers = useSelector((state) => state.data.passengers);
  const branchs = useSelector((state) => state.data.branches);
  const subLedgers = useSelector((state) => state.data.subLedgers);
  const currencies = useSelector((state) => state.data.currencies);
  const ledgers = useSelector((state) => state.data.ledgers);
  const [mltPassengerList, setMltPassengerList] = useState([]);
  const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
  const classes = useStyles(props);
  const image = watch('file');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const currentImage = watch('file');

    if (currentImage && !currentImage.name) {
      setFile(`${BASE_URL}/${currentImage}`);
    }
  }, [receivableBillId, watch('file')]);
  useEffect(() => {
    if (mltPassengerDeletedId) {
      setMltPassengerList((prevList) =>
        prevList
          .filter((item) => item.id !== mltPassengerDeletedId)
          .map(({ passenger_id, passenger_name, passport_no }) => ({
            passenger_id,
            passenger_name,
            passport_no,
          }))
      );

      setMltPassengerDeletedId(null);
    }
  }, [mltPassengerDeletedId]);

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getBranches());
    dispatch(getSubLedgers());
    dispatch(getLedgers());
    dispatch(getCurrencies());
  }, []);

  useEffect(() => {
    if (receivableBillId !== 'new') {
      setMltPassengerList(watch('passenger_list'));
    }
  }, [receivableBillId, getValues()?.passenger_list]);

  useEffect(() => {
    setValue('passenger_list', mltPassengerList);
    setValue(
      'debit_amount',
      mltPassengerList?.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    );
  }, [mltPassengerList]);

  function handleAddPassenger(id) {
    const amount = watch('per_pax_amount');
    setMltPassengerList((prevList) => [
      ...prevList,
      {
        amount,
        passenger_id: passengers.find((data) => data?.id === id)?.passenger_id,
        passenger_name: passengers.find((data) => data?.id === id)
          ?.passenger_name,
        passport_no: passengers.find((data) => data?.id === id)?.passport_no,
        id: passengers.find((data) => data?.id === id)?.id,
      },
    ]);
  }
  console.log("receive_bills", getValues())
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
            value={value ? branchs.find((data) => data.id == value) : null}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name='is_multiple_passenger'
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              label='Multiple Passenger'
              control={
                <Checkbox
                  {...field}
                  checked={field.value ? field.value : false}
                  onChange={(e) => {
                    field.onChange(e);
                    setMltPassengerList([]);
                    setValue('per_pax_amount', 0);
                  }}
                />
              }
            />
          </FormControl>
        )}
      />{' '}
      <Controller
        name='is_npl'
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              //
              label='NPL(Not For Passenger Ledger)'
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
      {watch('is_multiple_passenger') && (
        <Controller
          name='per_pax_amount'
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className='mt-8 mb-16'
                label='Per Pax Amount'
                id='per_pax_amount'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            );
          }}
        />
      )}
      <Controller
        name='passenger'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            className='mt-8 mb-16 w-full '
            freeSolo
            value={value ? passengers.find((data) => data.id === value) : null}
            options={passengers}
            getOptionLabel={(option) =>
              `${option.passenger_name} - ${option.passport_no}`
            }
            onChange={(event, newValue) => {
              onChange(newValue?.id);

              // Update mltPassengerList state with the selected passenger
              if (newValue && watch('is_multiple_passenger')) {
                handleAddPassenger(newValue?.id);
              } // Update mltPassengerList state with the selected passenger

              if (
                newValue &&
                !watch('is_multiple_passenger') &&
                mltPassengerList?.length === 0
              ) {
                handleAddPassenger(newValue?.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Passenger'
                label='Passenger'
                error={!value}
                helperText={errors?.agency?.message}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      {watch('is_multiple_passenger') && (
        <div>
          <MultiplePassengersTable
            passengers={mltPassengerList}
            setMltPassengerList={setMltPassengerList}
          />
        </div>
      )}
      <Controller
        name='sub_ledger'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            options={subLedgers}
            value={value ? subLedgers.find((data) => data.id == value) : null}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Sub Ledger'
                label='Sub Ledger'
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
        name='sales_date'
        label='Sales Date'
        required
        placeholder='DD-MM-YYYY'
      />
      <Controller
        name='is_foreign_currency'
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              //
              label='Foreign Currency'
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
      {watch('is_foreign_currency') && (
        <div
          style={{
            backgroundColor: 'rgb(243 239 239)',
            padding: '10px',
          }}>
          <Controller
            name='currency'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                className='mt-8 mb-16'
                freeSolo
                options={currencies}
                value={
                  value ? currencies.find((data) => data.id == value) : null
                }
                getOptionLabel={(option) => `${option.name}`}
                onChange={(event, newValue) => {
                  onChange(newValue?.id);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Select Currency '
                    label='Currency'
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
            name='currency_rate'
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  className='mt-8 mb-16'
                  // error={!!errors.name}
                  // helperText={errors?.name?.message}
                  label='Rate'
                  id='rate'
                  variant='outlined'
                  InputLabelProps={field.value && { shrink: true }}
                  fullWidth
                />
              );
            }}
          />

          <Controller
            name='currency_amount'
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  className='mt-8 mb-16'
                  // error={!!errors.name}
                  // helperText={errors?.name?.message}
                  label='Amount'
                  id='currency_amount'
                  variant='outlined'
                  InputLabelProps={field.value && { shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              );
            }}
          />
        </div>
      )}
      <Controller
        name='ledger'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            options={ledgers}
            value={value ? ledgers.find((data) => data.id == value) : null}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Account'
                label='Account'
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
        name='debit_amount'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              // error={!!errors.name}
              // helperText={errors?.name?.message}
              label='Amount'
              id='Amount'
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name='note'
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className='mt-8 mb-16'
              // error={!!errors.name}
              // helperText={errors?.name?.message}
              label='Note'
              id='note'
              variant='outlined'
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            // InputProps={{
            //   readOnly: true,
            // }}
            />
          );
        }}
      />
      <div className='text-center'>
        <div>
          <FileUpload
            name='file'
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

export default ReceivableBillForm;
