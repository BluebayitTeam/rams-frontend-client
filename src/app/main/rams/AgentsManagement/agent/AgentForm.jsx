import { FormControl } from '@mui/base';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import {
	Autocomplete,
	Box,
	Checkbox,
	FormControlLabel,
	Icon,
	IconButton,
	InputAdornment,
	Tooltip,
	tooltipClasses
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
	getBranches,
	getCities,
	getAgentTypes,
	getCountries,
	getDepartments,
	getEmployees,
	getPackages,
	getRoles,
	getThanas
} from 'app/store/dataSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import countryCodes from 'src/app/@data/countrycodes';
import { BASE_URL } from 'src/app/constant/constants';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9'
	}
}));

function AgentForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const { errors } = formState;
	const thanas = useSelector((state) => state.data.thanas);
	const agentTypes = useSelector((state) => state.data.agentTypes);
	const routeParams = useParams();

	console.log('agentTypes', agentTypes);

	const packages = useSelector((state) => state.data.packages);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const departments = useSelector((state) => state.data.departments);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const [showPassword, setShowPassword] = useState(false);
	const getCountryCode1 = watch('country_code1');
	const getCountryCode2 = watch('country_code2');
	const logo = watch('logo');

	console.log('logo', logo);

	const [previewLogo, setPreviewLogo] = useState();
	useEffect(() => {
		dispatch(getBranches());
		dispatch(getThanas());
		dispatch(getPackages());
		dispatch(getAgentTypes());
		dispatch(getRoles());
		dispatch(getDepartments());
		dispatch(getCities());
		dispatch(getCountries());
		dispatch(getEmployees());

		if (props?.agentId === 'new') {
			const countryID = countries.find((data) => data.name == 'Bangladesh')?.id;
			setValue('country', countryID);
		}
	}, []);

	const handleChnageCountry = (selectedCountry) => {
		const countryID = countries.find((data) => data.name == selectedCountry)?.id;
		setValue('country', countryID);
	};

	return (
		<div>
			<Controller
				name="agent_type"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? agentTypes.find((agentType) => agentType.id === value) : null}
						options={agentTypes}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								className=""
								placeholder="Select a Agent Type"
								label="Selected Agent Type"
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
				name="first_name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="First Name"
						autoFocus
						id="first_name"
						variant="outlined"
						fullWidth
						error={!!errors.first_name}
						helperText={errors?.first_name?.message}
					/>
				)}
			/>
			<Controller
				name="last_name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Last Name"
						autoFocus
						id="last_name"
						variant="outlined"
						fullWidth
						error={!!errors.last_name}
						helperText={errors?.last_name?.message}
					/>
				)}
			/>{' '}
			<Controller
				name="rl_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="RL No"
						autoFocus
						id="rl_no"
						variant="outlined"
						fullWidth
						error={!!errors.rl_no}
						helperText={errors?.rl_no?.message}
					/>
				)}
			/>
			<Controller
				name="username"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Username"
						autoFocus
						id="username"
						variant="outlined"
						fullWidth
						error={!!errors.username}
						helperText={errors?.username?.message}
					/>
				)}
			/>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						type="text"
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
						helperText={errors?.email?.message}
						label="Email"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon
										className="text-20"
										color="action"
									>
										agent
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			{props?.agentId === 'new' && (
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
								helperText={errors?.password?.message}
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
								InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
								// error={!!errors.confirmPassword || !field.value}
								helperText={errors?.confirmPassword?.message}
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
								InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				</>
			)}
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
								console.log('pasasrop', option);

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
										autoComplete: 'new-password' // disable autocomplete and autofill
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
							// error={!!errors.primary_phone || !field.value}
							label="Phone"
							id="primary_phone"
							variant="outlined"
							fullWidth
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
						/>
					)}
				/>
			</Box>
			{/* <Controller
				name="package_type"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? packages.find((packag) => packag.id === value) : null}
						options={packages}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						// defaultValue={{ id: null, name: "Select a country" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a Package"
								label="Selected Package"
								variant="outlined"
								//
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/> */}
			<Controller
				name="package_type"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? packages.find((packag) => packag.id === value) : null}
						options={packages}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								className="w-1/2"
								placeholder="Select a Package"
								label="Selected Package"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
						renderOption={(props, option) => (
							<HtmlTooltip
								title={
									<div>
										<h2 className="text-yellow-900 text-center  mb-5 ">Package:{option?.name}</h2>{' '}
										<h3 className="text-yellow-600   mb-5 ">Price:{option?.price}(Per Month)</h3>{' '}
										<h4 className="text-gray-100 text-center border-b-1 mb-5 border-white">
											Some Feature List
										</h4>{' '}
										<ol className="list-decimal ml-10">
											{option?.feature_customizations?.slice(0, 8)?.map((data, index) => (
												<li key={index}>
													<h5>
														{data?.feature?.label}-{data?.custom_value}
													</h5>
												</li>
											))}
										</ol>
									</div>
								}
								placement="right-end"
							>
								<li {...props}>
									<div>{`${option.name}`}</div>
								</li>
							</HtmlTooltip>
						)}
					/>
				)}
			/>
			<Controller
				name="street_address_one"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Address"
						autoFocus
						id="street_address_one"
						variant="outlined"
						fullWidth
						error={!!errors.street_address_one}
						helperText={errors?.street_address_one?.message}
					/>
				)}
			/>
			{/* <Controller
				name="street_address_two"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.street_address_two}
						helperText={errors?.street_address_two?.message}
						label="Secondary address"
						id="address2"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/> */}
			{/* <Controller
				name="gender"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? genders.find((gender) => gender.id === value) : null}
						options={genders}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a gender"
								label="Gender"
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/> */}
			<Controller
				name="country"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? countries.find((country) => country.id === value) : null}
						options={countries}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						// defaultValue={{ id: null, name: "Select a country" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a country"
								label="Country"
								variant="outlined"
								//
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
			{/* <Controller
				name="city"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? cities.find((city) => city.id === value) : null}
						options={cities}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							// dispatch(getThanasBasedOnCity(newValue?.id));
						}}
						// defaultValue={{ id: null, name: "Select a city" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a city"
								label="District"
								variant="outlined"
								//
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/> */}
			{/* <Controller
				name="thana"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? thanas.find((thana) => thana.id === value) : null}
						options={thanas}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a police station"
								label="Police Station"
								variant="outlined"
								//
								InputLabelProps={{
									shrink: true
								}}
								InputProps={{ ...params.InputProps, type: 'search' }}
							/>
						)}
					/>
				)}
			/> */}
			{/* <Controller
				name="postal_code"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.postal_code}
						helperText={errors?.postal_code?.message}
						label="Postal Code"
						id="postal_code"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/> */}
			<Controller
				name="is_agent_active"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormControlLabel
							//
							label="Is active"
							control={
								<Checkbox
									{...field}
									checked={field.value ? field.value : false}
								/>
							}
						/>
					</FormControl>
				)}
			/>
			{/* image upload */}
			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Controller
					name="logo"
					control={control}
					render={({ field: { onChange, value } }) => (
						<label
							htmlFor="button-file"
							className={clsx(
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
							)}
						>
							<input
								accept="image/*"
								className="hidden"
								id="button-file"
								type="file"
								label="Employee Picture"
								// onChange={handlePreviewImage}
								onChange={async (e) => {
									const reader = new FileReader();
									reader.onload = () => {
										if (reader.readyState === 2) {
											setPreviewLogo(reader.result);
										}
									};
									reader.readAsDataURL(e.target.files[0]);

									const file = e.target.files[0];

									onChange(file);
								}}
							/>
							<Icon
								fontSize="large"
								color="action"
							>
								cloud_upload
							</Icon>
						</label>
					)}
				/>
				{/* {image && !previewImage && (
					<img src={`${BASE_URL}${image}`} style={{ width: '100px', height: '100px' }} alt="Not found" />
				)}

				<div style={{ width: '100px', height: '100px' }}>
					<img src={previewImage} alt="Not found" />
				</div> */}
				{logo && !previewLogo && (
					<img
						src={`${BASE_URL}${logo}`}
						alt=""
						className={clsx(
							'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
						)}
					/>
				)}

				<div style={{ width: '100px', height: '100px' }}>
					{previewLogo && (
						<img
							label="Employee Picture"
							alt=""
							src={previewLogo}
							className={clsx(
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
							)}
							// alt="no image found"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default AgentForm;
