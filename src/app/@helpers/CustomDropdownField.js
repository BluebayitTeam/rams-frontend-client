import { useFormContext, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CustomDropdownField({
	name,
	options,
	label,
	onChange: customOnChange,
	optionLabelFormat,
	fullWidth = true,
	className = 'mt-8 mb-16 w-full',
	inputLabelProps = {},
	required = false,
	...props
}) {
	const { control } = useFormContext(); // Automatically get control from form context

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange }, fieldState: { error } }) => {
				const selectedOption = value ? options.find((option) => option.id === value) : null;
				const isFieldEmpty = required && !value; // Check if the field is required and empty

				return (
					<Autocomplete
						className={className}
						freeSolo
						value={selectedOption}
						options={options}
						getOptionLabel={(option) => optionLabelFormat(option)}
						onChange={(event, newValue) => {
							onChange(newValue?.id);

							if (customOnChange) customOnChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder={`Select ${label}`}
								label={label}
								helperText={error ? error.message : ''}
								variant="outlined"
								InputLabelProps={
									isFieldEmpty
										? { style: { color: 'red' }, ...inputLabelProps }
										: { shrink: true, ...inputLabelProps }
								}
								fullWidth={fullWidth}
								error={!!error}
								{...props}
							/>
						)}
					/>
				);
			}}
		/>
	);
}

export default CustomDropdownField;
