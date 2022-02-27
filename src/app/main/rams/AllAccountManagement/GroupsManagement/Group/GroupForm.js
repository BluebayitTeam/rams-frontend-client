import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups, getPrimaryGroups } from '../../../../../store/dataSlice';

function GroupForm() {
	const methods = useFormContext();
	const { control, formState, getValues, reset } = methods;
	const { errors } = formState;
	const values = getValues();
	const dispatch = useDispatch();

	const groups = useSelector(state => state.data.groups);
	const primaryGroups = useSelector(state => state.data.primaryGroups);

	useEffect(() => {
		dispatch(getGroups());
		dispatch(getPrimaryGroups());
	}, []);

	console.log({ values });
	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.name}
							helperText={errors?.name?.message}
							label="Name"
							id="name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							required
							autoFocus
						/>
					);
				}}
			/>

			<Controller
				name="is_primary"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormControlLabel
							required
							label="Is Primary"
							control={
								<Checkbox
									{...field}
									color="primary"
									checked={field.value || false}
									onChange={e => {
										reset({
											...values,
											is_primary: e.target.checked,
											name: values.name,
											head_group: e.target.checked ? null : values.head_group,
											head_primarygroup: e.target.checked ? values.head_primarygroup : null
										});
									}}
								/>
							}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="head_group"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className={`mt-8 mb-16 ${values.is_primary ? 'hidden' : ''}`}
						freeSolo
						value={value ? groups.find(data => data.id == value) : null}
						options={groups}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id || null);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Head of group"
								label="Head of group"
								error={!!errors.head_group}
								helperText={errors?.head_group?.message}
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
				name="head_primarygroup"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className={`mt-8 mb-16 ${values.is_primary ? '' : 'hidden'}`}
						freeSolo
						value={value ? primaryGroups.find(data => data.id == value) : null}
						options={primaryGroups}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id || null);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Head of primary group"
								label="Head of primary group"
								error={!!errors.head_primarygroup}
								helperText={errors?.head_primarygroup?.message}
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

export default GroupForm;
