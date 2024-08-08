import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

function CustomTextField({
	name,
	label,
	variant = 'outlined',
	className = 'mt-8 mb-16',
	fullWidth = true,
	inputLabelProps = {},
	...props
}) {
	const { control } = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const isRequired = props.required; // Check if 'required' prop is passed
				const isFieldEmpty = isRequired && !field.value;

				return (
					<TextField
						{...field}
						className={className}
						helperText={error ? error.message : ''}
						label={label}
						id={name}
						variant={variant}
						InputLabelProps={
							isFieldEmpty
								? { style: { color: 'red' }, ...inputLabelProps }
								: { shrink: true, ...inputLabelProps }
						}
						fullWidth={fullWidth}
						error={!!error} // Set error state if there's an error
						{...props} // Spread other props like 'required'
					/>
				);
			}}
		/>
	);
}

export default CustomTextField;
