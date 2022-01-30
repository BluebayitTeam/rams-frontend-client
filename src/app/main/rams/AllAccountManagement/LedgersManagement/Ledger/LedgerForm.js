import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from '../../../../../store/dataSlice';

function LedgerForm(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const dispatch = useDispatch();

	const groups = useSelector(state => state.data.groups);

	useEffect(() => {
		dispatch(getGroups());
	}, []);

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
				name="head_group"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? groups.find(data => data.id == value) : null}
						options={groups}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Group"
								label="Group"
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
		</div>
	);
}

export default LedgerForm;
