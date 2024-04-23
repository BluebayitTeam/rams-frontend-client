import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { getClients } from 'app/store/dataSlice';
import { DatePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CHECK_LOAN_ELIGBLITY } from 'src/app/constant/constants';
import moment from 'moment';

function SubscriptionLoanForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, getValues, setError } = methods;
	const clients = useSelector((state) => state.data.clients);
	const { errors } = formState;
	const routeParams = useParams();

	useEffect(() => {
		dispatch(getClients());
	}, []);
	console.log(`aslhdnlas`, getValues());

	// Check Duplicate Entry
	function checkClientNoDuplicate(clientId) {
		if (routeParams.subscriptionLoanId === 'new') {
			axios.get(`${CHECK_LOAN_ELIGBLITY}${clientId}`).then((res) => {
				console.log('reasdasds', res);

				if (res.data.Loan_is_not_eligible) {
					setError('customer', {
						type: 'manual',
						message: `Already received a loan until ${moment(new Date(res.data.loan_end_date)).format('DD-MM-YYYY')}`
					});
				}
			});
		}
	}

	return (
		<div>
			<Controller
				name="customer"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? clients.find((client) => client.id === value) : null}
						options={clients}
						getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							checkClientNoDuplicate(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a Client"
								error={!!errors.customer}
								helperText={errors?.customer?.message}
								label="Client"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				control={control}
				name="loan_end_date"
				render={({ field: { value, onChange } }) => (
					<DatePicker
						value={new Date(value)}
						onChange={(val) => {
							onChange(val?.toString());
						}}
						className="mt-32 mb-16 w-full"
						slotProps={{
							textField: {
								id: 'loan_end_date',
								label: 'Loan Date',
								InputLabelProps: {
									shrink: true
								},
								fullWidth: true,
								variant: 'outlined',
								error: !!errors.loan_end_date,
								helperText: errors?.loan_end_date?.message
							},
							actionBar: {
								actions: ['clear', 'today']
							}
						}}
					/>
				)}
			/>
		</div>
	);
}

export default SubscriptionLoanForm;
