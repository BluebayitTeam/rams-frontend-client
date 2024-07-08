/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { FormControl } from '@mui/base';
import { useParams } from 'react-router-dom';
import { Autocomplete, Box, Checkbox, FormControlLabel, Icon, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getCities, getCountries, getGroups, getThanas, getThanasBasedOnCity } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import countryCodes from 'src/app/@data/countrycodes';
import { genders } from 'src/app/@data/data';

import { BASE_URL } from 'src/app/constant/constants';
import FileUpload from 'src/app/@components/FileUploader';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function EmployeeForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, getValues } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { employeeId } = routeParams;
	const classes = useStyles(props);
	const thanas = useSelector((state) => state.data.thanas);

	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const groups = useSelector((state) => state.data.groups);
	const getCountryCode1 = watch('country_code1');

	const [file, setFile] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		dispatch(getThanas());
		dispatch(getCities());
		dispatch(getCountries());
		dispatch(getGroups());
	}, []);

	useEffect(() => {
		const currentImage = getValues('image');

		if (currentImage && !currentImage.name) {
			setFile(`${BASE_URL}/${currentImage}`);
		}
	}, [employeeId, watch('image')]);
	const handleChnageCountry = (selectedCountry) => {
		const countryID = countries.find((data) => data.name === selectedCountry)?.id;
		setValue('country', countryID);
	};

	return (
		<div>
			<Controller
				name="group"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? groups.find((data) => data.id === value) : null}
						options={groups}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Group"
								label="Group"
								helperText={errors?.group?.message}
								variant="outlined"
								autoFocus
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								//
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="first_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16  "
							helperText={<span style={{ color: 'red' }}>{errors?.first_name?.message}</span>}
							label="Employee Name"
							id="first_name"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="father_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.father_name?.message}
							label="Father Name"
							id="father_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="mother_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.mother_name?.message}
							label="Mother Name"
							id="mother_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="username"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.username?.message}
							label="User Name"
							id="username"
							variant="outlined"
							InputLabelProps={field?.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.email?.message}
							label="Email"
							id="email"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			{employeeId === 'new' && (
				<>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								label="Password"
								type="password"
								helperText={<span style={{ color: 'red' }}>{errors?.password?.message}</span>}
								variant="outlined"
								fullWidth
								InputProps={{
									className: 'pr-2',
									type: showPassword ? 'text' : 'password',
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={() => setShowPassword(!showPassword)}>
												<Icon
													className="text-20"
													color="action"
												>
													{showPassword ? 'visibility' : 'visibility_off'}
												</Icon>
											</IconButton>
										</InputAdornment>
									)
								}}
								InputLabelProps={field.value && { shrink: true }}
							/>
						)}
					/>
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								label="Confirm Password"
								type="password"
								helperText={<span style={{ color: 'red' }}>{errors?.confirmPassword?.message}</span>}
								variant="outlined"
								fullWidth
								InputProps={{
									className: 'pr-2',
									type: showConfirmPassword ? 'text' : 'password',
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
												<Icon
													className="text-20"
													color="action"
												>
													{showConfirmPassword ? 'visibility' : 'visibility_off'}
												</Icon>
											</IconButton>
										</InputAdornment>
									)
								}}
								InputLabelProps={field.value && { shrink: true }}
							/>
						)}
					/>
				</>
			)}

			<Controller
				name="gender"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? genders.find((data) => data.id === value) : null}
						options={genders}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Gender"
								label="Gender"
								helperText={errors?.gender?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								//
							/>
						)}
					/>
				)}
			/>

			<Box style={{ display: 'flex' }}>
				<Controller
					name="country_code1"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 "
							id="country-select-demo"
							sx={{ width: 300 }}
							value={value ? countryCodes.find((country) => country.value === value) : null}
							options={countryCodes}
							autoHighlight
							error={!value}
							getOptionLabel={(option) => option.label}
							renderOption={(prop, option) => {
								return (
									<Box
										component="li"
										sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
										{...prop}
									>
										<img
											loading="lazy"
											width="20"
											src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
											srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
											alt=""
										/>
										{option.label} ({option.code}) +{option.value}
									</Box>
								);
							}}
							onChange={(event, newValue) => {
								onChange(newValue?.value);
								handleChnageCountry(newValue?.label);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Choose a country"
									variant="outlined"
									error={!value}
									style={{ width: '250px' }}
									inputProps={{
										...params.inputProps,
										autoComplete: 'new-password'
									}}
								/>
							)}
						/>
					)}
				/>
				<TextField
					name="show_country_code1"
					id="filled-read-only-input"
					label="Country Code"
					style={{ width: '150px' }}
					value={getCountryCode1 || ''}
					className="mt-8 mb-16"
					InputLabelProps={{ shrink: true }}
					InputProps={{
						readOnly: true
					}}
					variant="outlined"
				/>
				<Controller
					name="primary_phone"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16"
							label="Primary Phone"
							id="primary_phone"
							variant="outlined"
							fullWidth
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
						/>
					)}
				/>
			</Box>

			<Controller
				name="user_type"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.user_type?.message}
							label="User Type"
							id="user_type"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="date_of_birth"
				control={control}
				render={({ field }) => (
					<CustomDatePicker
						field={field}
						label="Date of Birth"
						required
						className="mt-8 mb-16 w-full"
						error={!!errors.date_of_birth}
						helperText={errors?.date_of_birth?.message}
						placeholder="DD-MM-YYYY"
					/>
				)}
			/>

			<Controller
				name="is_active"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormControlLabel
							label="Is active"
							control={
								<Checkbox
									{...field}
									color="primary"
									checked={field.value || false}
								/>
							}
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="street_address_one"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.street_address_one?.message}
							label="Street Address One"
							id="street_address_one"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="street_address_two"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.street_address_two?.message}
							label="Street Address Two"
							id="street_address_two"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="country"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? countries.find((data) => data.id === value) : null}
						options={countries}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Country"
								label="Country"
								helperText={errors?.country?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								//
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="city"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? cities.find((data) => data.id === value) : null}
						options={cities}
						getOptionLabel={(option) => `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							dispatch(getThanasBasedOnCity(newValue?.id));
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select District"
								label="District"
								helperText={errors?.city?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="thana"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? thanas.find((data) => data?.id === value) : null}
						options={thanas}
						getOptionLabel={(option) => `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Police Station"
								label="Police Station"
								helperText={errors?.thana?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="postal_code"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.postal_code?.message}
							label="Postal Code"
							id="postal_code"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="nid"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.nid?.message}
							label="NID"
							id="nid"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="notes"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors.notes?.message}
							label="Notes*"
							id="notes"
							multiline
							rows={4}
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<div className="text-center">
				<div>
					<FileUpload
						name="image"
						label="File"
						control={control}
						setValue={setValue}
						setFile={setFile}
						file={file}
						BASE_URL={BASE_URL}
						classes={classes}
					/>
				</div>
			</div>
		</div>
	);
}

export default EmployeeForm;
