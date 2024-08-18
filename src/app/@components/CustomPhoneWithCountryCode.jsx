import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import countryCodes from '../@data/countrycodes';

function CustomPhoneWithCountryCode({
	getCountryCode1,
	errors,
	handleSubmitOnKeyDownEnter,
	countryName = 'country_code1',
	countryLabel = 'Choose a country',
	countryCodeLabel = 'Country Code',
	phoneName = 'phone',
	phoneLabel = 'Phone',
	onChange // Add onChange as a prop
}) {
	const methods = useFormContext();
	const { control } = methods;
	return (
		<Box style={{ display: 'flex' }}>
			<Controller
				name={countryName}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						id="country-select-demo"
						sx={{ width: 500 }}
						value={value ? countryCodes.find((country) => country.value === value) : null}
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
						onChange={(event) => onChange(event, { value: event.target.value })}
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
								InputLabelProps={{ shrink: true }}
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
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						helperText={errors?.[phoneName]?.message}
						label={phoneLabel}
						id="primary_phone"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
						onKeyDown={handleSubmitOnKeyDownEnter}
						onChange={(e) => {
							field.onChange(e); // Call the original onChange from React Hook Form

							if (onChange) onChange(e); // Call the custom onChange if provided
						}}
					/>
				)}
			/>
		</Box>
	);
}

export default CustomPhoneWithCountryCode;
