import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function SubLedgerForm() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

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
		</div>
	);
}

export default SubLedgerForm;
