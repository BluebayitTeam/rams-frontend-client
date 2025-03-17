import TextField from '@mui/material/TextField';
import { getPayheadTypes } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';

function CalculationTypeForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;

	const payheadTypes = useSelector((state) => state.data.payheadTypes);
	useEffect(() => {
		dispatch(getPayheadTypes());
	}, []);

	return (
		<div>
			{/* Name */}
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
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
					/>
				)}
			/>
			{/* Payhead type */}
			<CustomDropdownField
				name='payhead_type'
				label='Payhead Type'
				options={payheadTypes}
				optionLabelFormat={(option) =>
					`${option.name || ''}`
				}
				required
			/>

		</div>
	);
}

export default CalculationTypeForm;
