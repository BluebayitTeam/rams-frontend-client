import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getBangladeshAllBanks, getBranches, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { postDateTypes } from 'src/app/@data/data';
import { CHECK_BANK_OR_CASH } from 'src/app/constant/constants';

function PostDateChequeForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const members = useSelector((state) => state.data.memberledgers);
	const countries = useSelector((state) => state.data.countries);
	const branches = useSelector((state) => state.data.branches);
	const ledgers = useSelector((state) => state.data.ledgers);
	const branchs = useSelector((state) => state.data.branches);
	const subLedgers = useSelector((state) => state.data.subLedgers);
	const [checkBankOrCash, setCheckBankOrCash] = useState(false);
	const bangladeshAllBanks = useSelector((state) => state.data.bangladeshAllBanks);

	useEffect(() => {
		handleCheckBankOrCash(watch('payment_account'));
	}, [watch('payment_account')]);

	const handleCheckBankOrCash = (bankId) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${CHECK_BANK_OR_CASH}${bankId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setCheckBankOrCash(data?.has_bank_accounts);
			});
	};
	const [paymentAccounts, setPaymentAccounts] = useState([]);

	useEffect(() => {
		dispatch(getBranches());
		dispatch(getSubLedgers());
		dispatch(getBangladeshAllBanks());
	}, []);
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
							label="Cheque Range"
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
				name="bank_name"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						autoHighlight
						options={bangladeshAllBanks}
						value={value ? bangladeshAllBanks.find((data) => data.id == value) : null}
						getOptionLabel={(option) => `${option.name}`}
						InputLabelProps={{ shrink: true }}
						onChange={(_event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a Bank Name Of Cheque/PO "
								label="Bank Name Of Cheque/PO "
								variant="outlined"
								// error={!value}
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="inst_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.inst_no}
						helperText={errors?.inst_no?.message}
						label="Inst No"
						id="inst_no"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
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

export default PostDateChequeForm;
