import { FormControl } from '@mui/base';
import { Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getParentPassengers } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { passengerTypes } from 'src/app/@data/data';

function PassengerForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { passengerId } = routeParams;
	const parents = useSelector((state) => state.data.parentPassengers);

	useEffect(() => {
		dispatch(getParentPassengers());
	}, []);
	return (
		<div>
			<Controller
				name="passenger_id"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.passenger_id || !field.value}
							helperText={errors?.passenger_id?.message}
							label="Passenger ID"
							id="passenger_id"
							autoFocus
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="title"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.title || !field.value}
							helperText={errors?.title?.message}
							label="Title"
							id="title"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="translate"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.translate || !field.value}
							helperText={errors?.translate?.message}
							label="Translate"
							id="translate"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="type"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? passengerTypes.find((passengerType) => passengerType.id === value) : null}
						options={passengerTypes}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						// defaultValue={{ id: null, name: "Select a gender" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a Type"
								label="Type"
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="parent"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? parents.find((data) => data.id === value) : null}
						options={parents}
						getOptionLabel={(option) => `${option?.translate}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Parent"
								label="Parent"
								// error={!!errors.parent}
								helperText={errors?.parent?.message}
								variant="outlined"
								autoFocus
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="display_order"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={errors.display_order}
							helperText={errors?.display_order?.message}
							label="Display Order"
							id="display_order"
							type="number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="icon"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.icon}
							helperText={errors?.icon?.message}
							label="Icon"
							id="icon"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="url"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.url}
							helperText={errors?.url?.message}
							label="Url"
							id="url"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="exact"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormControlLabel
							label="Exact"
							control={
								<Checkbox
									color="primary"
									{...field}
									checked={field.value ? field.value : true}
								/>
							}
						/>
					</FormControl>
				)}
			/>
		</div>
	);
}

export default PassengerForm;
