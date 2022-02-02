import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getLedgers, getPassengers, getSubLedgers } from '../../../../../store/dataSlice';

function PaymentVoucherForm() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const dispatch = useDispatch();
	const passengers = useSelector(state => state.data.passengers);
	const branchs = getBranches(state => state.data.branches);
	const subLedgers = useSelector(state => state.data.subLedgers);
	const ledgers = useSelector(state => state.data.ledgers);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getBranchs());
		dispatch(getSubLedgers());
		dispatch(getLedgers());
	}, []);

	return (
		<div>
			<Controller
				name="passenger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? passengers.find(data => data.id == value) : null}
						options={passengers}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Passenger"
								label="Passenger"
								error={!!errors.passenger}
								helperText={errors?.passenger?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="branch"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? branchs.find(data => data.id == value) : null}
						options={branchs}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Branch"
								label="Branch"
								error={!!errors.branch}
								helperText={errors?.branch?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="sub_ledger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? subLedgers.find(data => data.id == value) : null}
						options={subLedgers}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Sub Ledger"
								label="Sub Ledger"
								error={!!errors.sub_ledger}
								helperText={errors?.sub_ledger?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="ledger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? ledgers.find(data => data.id == value) : null}
						options={ledgers}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Ledger"
								label="Ledger"
								error={!!errors.ledger}
								helperText={errors?.ledger?.message}
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
				name="payment_date"
				control={control}
				render={({ field }) => {
					return <CustomDatePicker field={field} label="Payment Date" />;
				}}
			/>

			<Controller
				name="details"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.details}
							helperText={errors?.details?.message}
							label="Details"
							id="details"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
		</div>
	);
}

export default PaymentVoucherForm;
