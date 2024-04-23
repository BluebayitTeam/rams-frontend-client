import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { getClients } from 'app/store/dataSlice';

function PackageTypeForm(props) {
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
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message}
					/>
				)}
			/>
			<Controller
				name="price"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Price"
						autoFocus
						id="price"
						variant="outlined"
						fullWidth
						error={!!errors.price}
						helperText={errors?.price?.message}
					/>
				)}
			/>
		</div>
	);
}

export default PackageTypeForm;
