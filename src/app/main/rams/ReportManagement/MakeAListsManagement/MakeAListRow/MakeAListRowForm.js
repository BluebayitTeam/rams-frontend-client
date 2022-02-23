import TextField from '@material-ui/core/TextField';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {} from '../../../../../store/dataSlice';

function MakeAListForm() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	console.log('row');
	return (
		<div>
			<Controller
				name="title"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.title || !field.value}
							helperText={errors?.title?.message}
							label="Title"
							id="title"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							required
						/>
					);
				}}
			/>

			<Controller
				name="make_date"
				control={control}
				render={({ field }) => {
					return <CustomDatePicker field={field} label="Make Date" />;
				}}
			/>

			<Controller
				name="note"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							label="Note"
							id="note"
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

export default MakeAListForm;
