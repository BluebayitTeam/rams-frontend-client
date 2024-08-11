import { Autocomplete, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getGroups } from 'app/store/dataSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { CHECK_LEDGER_NAME_WHEN_CREATE, CHECK_LEDGER_NAME_WHEN_UPDATE } from 'src/app/constant/constants';

function LedgerForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const routeParams = useParams();

	const { ledgerId } = routeParams;

	console.log('ledgerId', ledgerId);

	const { control, formState, setError, setValue, getValues } = methods;
	const { errors } = formState;
	const groups = useSelector((state) => state.data.groups);
	const userRole = localStorage.getItem('user_role');

	// useEffect(() => {
	// 	if (ledgerId) {
	// 		dispatch(getLedgers(ledgerId))
	// 			.then((action) => {
	// 				const balanceType = action?.payload?.balance_type;

	// 				if (balanceType) {
	// 					setValue('balance_type', balanceType);
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.error('Failed to fetch ledgers', error);
	// 			});
	// 	}
	// }, [ledgerId, dispatch, setValue]);

	useEffect(() => {
		dispatch(getGroups());
	}, [dispatch]);

	function checkNameDuplicate(name) {
		const encodedText = encodeURIComponent(name);

		if (routeParams.ledgerId === 'new') {
			axios.get(`${CHECK_LEDGER_NAME_WHEN_CREATE}?key=${encodedText}`).then((res) => {
				if (res.data.name_exists) {
					setError('name', {
						type: 'manual',
						message: 'Name Already Exists'
					});
				}
			});
		} else if (routeParams?.ledgerId !== 'new') {
			axios.get(`${CHECK_LEDGER_NAME_WHEN_UPDATE}?key=${encodedText}&id=${getValues().id}`).then((res) => {
				if (res.data.name_exists) {
					setError('name', {
						type: 'manual',
						message: 'Name Already Exists'
					});
				}
			});
		}
	}

	return (
    <div>
      <Controller
        name='head_group'
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className='mt-8 mb-16'
            freeSolo
            value={value ? groups.find((data) => data.id === value) : null}
            options={groups}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Select Group'
                label='Group'
                helperText={errors?.head_group?.message}
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
        name='name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            className='mt-8 mb-16'
            error={!!errors.name}
            helperText={errors?.name?.message}
            label='Name'
            id='name'
            onBlur={(event) => {
              field.onChange(event.target.value);
              checkNameDuplicate(event.target.value);
            }}
            variant='outlined'
            InputLabelProps={
              field.value ? { shrink: true } : { style: { color: 'red' } }
            }
            fullWidth
            autoFocus
          />
        )}
      />

      <Controller
        name='details'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            className='mt-8 mb-16'
            helperText={errors?.details?.message}
            label='Details'
            id='details'
            variant='outlined'
            InputLabelProps={field.value && { shrink: true }}
            fullWidth
          />
        )}
      />

      {ledgerId !== 'new' && (userRole === 'ADMIN' || userRole === 'admin') && (
        <>
          <h4 className='mb-10'>Opening Balance</h4>
          <div
            style={{
              backgroundColor: 'whitesmoke',
              padding: '10px',
              borderRadius: '10px',
            }}>
            <Controller
              name='balance_type'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormLabel
                    disabled
                    style={{ marginRight: '1rem', marginTop: '0.5rem' }}>
                    Select an option
                  </FormLabel>
                  <FormControlLabel
                    value='creditors'
                    control={<Radio />}
                    label='Cr'
                  />
                  <FormControlLabel
                    value='debtors'
                    control={<Radio />}
                    label='Dr'
                  />
                </RadioGroup>
              )}
            />

            <Controller
              name='balance_amount'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className='mt-8 mb-16'
                  helperText={errors?.balance_amount?.message}
                  label='Balance Amount'
                  id='balance_amount'
                  variant='outlined'
                  InputLabelProps={field.value && { shrink: true }}
                  fullWidth
                  autoFocus
                />
              )}
            />

          
            <CustomDatePicker
              name='balance_date'
              label='Balance Date'
              required
              placeholder='DD-MM-YYYY'
            />

            <Controller
              name='balance_note'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ''}
                  className='mt-8 mb-16'
                  helperText={errors?.balance_note?.message}
                  label='Remarks'
                  id='balance_note'
                  variant='outlined'
                  multiline
                  rows={3}
                  InputLabelProps={
                    field.value ? { shrink: true } : { style: { color: 'red' } }
                  }
                  fullWidth
                  autoFocus
                />
              )}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LedgerForm;
