import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { getClients } from 'app/store/dataSlice';

function FeatureDetailForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, getValues } = methods;
	const clients = useSelector((state) => state.data.clients);
	const { errors } = formState;

	useEffect(() => {
		dispatch(getClients());
	}, []);
	console.log(`aslhdnlas`, getValues());
	return (
		<div>
			<Controller
				name="label"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Label"
						autoFocus
						id="label"
						variant="outlined"
						fullWidth
						error={!!errors.label}
						helperText={errors?.label?.message}
					/>
				)}
			/>
			<Controller
				name="value"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Value"
						autoFocus
						id="value"
						variant="outlined"
						fullWidth
						error={!!errors.value}
						helperText={errors?.value?.message}
					/>
				)}
			/>
			<Controller
				name="note"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Note"
						id="note"
						variant="outlined"
						fullWidth
						error={!!errors.note}
						helperText={errors?.note?.message}
					/>
				)}
			/>
		</div>
	);
}

export default FeatureDetailForm;
