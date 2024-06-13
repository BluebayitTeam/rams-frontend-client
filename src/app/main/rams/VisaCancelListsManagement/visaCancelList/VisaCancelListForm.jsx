import { Autocomplete, TextField } from '@mui/material';
import { getAgencys, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function VisaCancelListForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	const agencys = useSelector((state) => state.data.agencies);

	const currentStatuss = useSelector((state) => state.data.currentStatuss);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	return (
		<div>
			<Controller
				name="agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? agencys.find((data) => data.id === value) : null}
						options={agencys}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Agency"
								label="Agency"
								error={!!errors.agency || !value}
								helperText={errors?.agency?.message}
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
				name="submission_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.submission_date}
						helperText={errors?.submission_date?.message}
						label="Submission Date"
						required
						id="submission_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id === value) : null}
						options={currentStatuss}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Current Status"
								label="Current Status"
								id="current_status"
								error={!!errors.current_status}
								helperText={errors?.current_status?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
		</div>
	);
}

export default VisaCancelListForm;
