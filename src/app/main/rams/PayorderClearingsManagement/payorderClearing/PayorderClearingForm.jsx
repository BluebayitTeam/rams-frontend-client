import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getBranches, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { postDateTypes } from 'src/app/@data/data';
import { LEDGER_BANK_CASH } from 'src/app/constant/constants';

function PayorderClearingForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, getValues, setValue } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const handleDelete = localStorage.getItem('payorderCheckEvent');
	const branches = useSelector((state) => state.data.branches);
	const subLedgers = useSelector((state) => state.data.subLedgers);

	const [paymentAccounts, setPaymentAccounts] = useState([]);

	console.log('paymentAccounts', paymentAccounts);

	useEffect(() => {
		dispatch(getBranches());
		dispatch(getSubLedgers());
	}, []);

	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${LEDGER_BANK_CASH}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setPaymentAccounts(data.ledger_accounts);
			});
	}, [watch('cheque_no')]);

	return (
		<div>
			<Controller
				name="is_posted"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? postDateTypes.find((data) => data.id === value) : null}
						options={postDateTypes}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Status"
								label="Status"
								id="is_posted"
								error={!!errors.is_posted}
								helperText={errors?.is_posted?.message}
								variant="outlined"
								autoFocus
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// //onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="date"
				control={control}
				render={({ field }) => {
					return (
						<CustomDatePicker
							field={field}
							label="Date"
						/>
					);
				}}
			/>

			<Controller
				name="amount"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.name || !field.value}
							helperText={errors?.amount?.message}
							label="Amount"
							id="amount"
							variant="outlined"
							InputLabelProps={
								field?.value ? { shrink: true } : { style: { color: 'red', borderColor: 'red' } }
							}
							InputProps={{
								readOnly: true
							}}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="payment_account"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? paymentAccounts.find((data) => data.id === value) : null}
						options={paymentAccounts}
						getOptionLabel={(option) => `${option.name}`}
						InputLabelProps={{ shrink: true }}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Account Type"
								label="Account Type"
								helperText={errors?.payment_account?.message}
								variant="outlined"
								id="payment_account"
								InputLabelProps={
									value
										? { shrink: true }
										: {
												style: { color: 'red', borderColor: 'red' },
												shrink: true
											}
								}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="cheque_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.name || !field.value}
							helperText={errors?.check_no?.message}
							label="Clearing Range"
							id="cheque_no"
							variant="outlined"
							InputLabelProps={
								field?.value ? { shrink: true } : { style: { color: 'red', borderColor: 'red' } }
							}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="cheque_date"
				control={control}
				render={({ field }) => {
					return (
						<CustomDatePicker
							fullWidth
							field={field}
							label="PDC Issue Date"
						/>
					);
				}}
			/>

			<Controller
				name="favouring_name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.favouring_name}
						helperText={errors?.favouring_name?.message}
						label="Favouring Name"
						id="favouring_name"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/>

			<Controller
				name="pdc_note"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.pdc_note}
						helperText={errors?.pdc_note?.message}
						label="PDC Note"
						id="pdc_note"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/>
		</div>
	);
}

export default PayorderClearingForm;
