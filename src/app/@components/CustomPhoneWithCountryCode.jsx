import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import countryCodes from '../@data/countrycodes';

function CustomPhoneWithCountryCode({
	getCountryCode1,
	countryName = 'country_code1',
	countryLabel = 'Select Country',
	countryCodeLabel = 'Country Code',
	phoneName = 'phone',
	phoneLabel = 'Phone',
	onChange, // Ensure onChange is a function
	required = false,
}) {
	const methods = useFormContext();
	const { control, setValue } = methods;

	const handleCountryChange = (event, newValue) => {
		if (newValue) {
			const newValueCode = newValue.value || '';
			setValue(countryName, newValueCode, { shouldValidate: true });

			if (onChange) onChange(newValue); // Call the custom onChange if provided
		} else {
			setValue(countryName, '', { shouldValidate: true });

			if (onChange) onChange(null); // Call the custom onChange if provided
		}
	};

	return (
		<Box style={{ display: 'flex', alignItems: 'center' }}>
			<Controller
				name={countryName}
				control={control}
				render={({ field }) => (
					<Autocomplete
						{...field}
						className="mt-8 mb-16"
						id="country-select-demo"
						sx={{ width: 500 }}
						value={countryCodes.find((country) => country.value === field.value) || null}
						options={countryCodes}
						autoHighlight
						getOptionLabel={(option) => option.label}
						renderOption={(props, option) => (
							<Box
								component="li"
								sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
								{...props}
							>
								<img
									loading="lazy"
									width="30"
									src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
									srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
									alt=""
								/>
								{option.label} ({option.code}) +{option.value}
							</Box>
						)}
						onChange={handleCountryChange}
						renderInput={(params) => (
							<TextField
								{...params}
								label={countryLabel}
								variant="outlined"
								style={{ width: '300px' }}
								inputProps={{
									...params.inputProps,
									autoComplete: 'new-password' // disable autocomplete and autofill
								}}
								InputLabelProps={!field?.value && required ? { style: { color: 'red' } } : { shrink: true }}
							/>
						)}
					/>
				)}
			/>
			<TextField
				name={`show_${countryName}`}
				id="filled-read-only-input"
				label={countryCodeLabel}
				style={{ width: '400px' }}
				value={getCountryCode1 || ''}
				className="mt-8 mb-16"
				InputLabelProps={{ shrink: true }}
				InputProps={{
					readOnly: true
				}}
				variant="outlined"
			/>
			<Controller
				name={phoneName}
				control={control}
				render={({ field, fieldState: { error } }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						style={{ marginTop: error && '23px' }}
						helperText={error ? error.message : ''}
						label={phoneLabel}
						id="primary_phone"
						variant="outlined"
						fullWidth
						// InputLabelProps={{ shrink: !!field.value }
						error={!!error} // Set error state if there's an error
						onChange={(e) => {
							field.onChange(e); // Call the original onChange from React Hook Form

							if (onChange) onChange(e); // Call the custom onChange if provided
						}}
						InputLabelProps={!field?.value && required ? { style: { color: 'red' } } : { shrink: true }}
						FormHelperTextProps={{ style: { marginTop: 0 } }} // Prevent margin collapse
					/>
				)}
			/>
		</Box>
	);
}

export default CustomPhoneWithCountryCode;
