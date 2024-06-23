/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { FormControl } from '@mui/base';
import { useParams } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';
import {
	Autocomplete,
	Box,
	Checkbox,
	FormControlLabel,
	Icon,
	IconButton,
	InputAdornment,
	Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { getCities, getCountries, getGroups, getThanas, getThanasBasedOnCity } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import countryCodes from 'src/app/@data/countrycodes';
import { genders } from 'src/app/@data/data';
import clsx from 'clsx';

import { PictureAsPdf } from '@mui/icons-material';
import { BASE_URL } from 'src/app/constant/constants';

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

function CvFemaleForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { cvFemaleId } = routeParams;
	const classes = useStyles(props);

	const thanas = useSelector((state) => state.data.thanas);

	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const groups = useSelector((state) => state.data.groups);
	const getCountryCode1 = watch('country_code1');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const [fileExtPCName, setFileExtPCName] = useState('');

	const slipPic = watch('image') || '';

	const fileInputRef = useRef(null);

	useEffect(() => {
		dispatch(getThanas());
		dispatch(getCities());
		dispatch(getCountries());
		dispatch(getGroups());
		// dispatch(getThanasBasedOnCity());
	}, []);

	useEffect(() => {}, [watch('date_of_birth')]);

	const handleChnageCountry = (selectedCountry) => {
		const countryID = countries.find((data) => data.name === selectedCountry)?.id;
		setValue('country', countryID);
	};

	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('image', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};

	return (
		<div>
			<Controller
				name="group"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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
							label="CvFemale Name"
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
							// error={!!errors.username}
							helperText={errors?.username?.message}
							// helperText={<span style={{ color: 'red' }}>{errors?.username?.message}</span>}
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

			{cvFemaleId === 'new' && (
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
				render={({ field: { onChange, value, name } }) => (
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
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.date_of_birth}
							helperText={errors?.date_of_birth?.message}
							label="Date of Birth"
							id="date_of_birth"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
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
				render={({ field: { onChange, value, name } }) => (
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
				render={({ field: { onChange, value, name } }) => (
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
								//
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="thana"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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
								//
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

			<div className="flex justify-center sm:justify-start flex-wrap -mx-0.5">
				<Controller
					name="image"
					control={control}
					render={({ field: { onChange } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center"> File</Typography>
								<label
									htmlFor="image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewslipPicFile(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											if (file) {
												const fileExtension = file.name.split('.').pop().toLowerCase();
												setFileExtPCName(fileExtension);
												onChange(file);
											}

											// Force reset the input value to allow re-uploading the same file
											e.target.value = '';
										}}
									/>
									<Icon
										fontSize="large"
										color="action"
									>
										cloud_upload
									</Icon>
								</label>
							</div>
							{!previewslipPicFile && slipPic && (
								<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
									<div
										id="cancelIcon"
										style={{
											position: 'absolute',
											top: '0',
											right: '0',
											zIndex: 1,
											color: 'red',
											cursor: 'pointer',
											backgroundColor: 'white',
											width: '20px',
											height: '20px',
											borderRadius: '50%',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<HighlightOffIcon onClick={handleRemoveslipPicFile} />
									</div>
									<div
										style={{ width: 'auto', height: '150px', overflow: 'hidden', display: 'flex' }}
									>
										{typeof slipPic === 'string' &&
										['pdf', 'doc', 'docx'].includes(slipPic.split('.').pop().toLowerCase()) ? (
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: '100%'
												}}
											>
												{slipPic.toLowerCase().includes('pdf') ? (
													<PictureAsPdf
														style={{
															color: 'red',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${slipPic}`)}
													/>
												) : (
													<DescriptionIcon
														style={{
															color: 'blue',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${slipPic}`)}
													/>
												)}
											</div>
										) : (
											<img
												src={`${BASE_URL}${slipPic}`}
												style={{ height: '100px' }}
												alt="file"
											/>
										)}
									</div>
								</div>
							)}

							{previewslipPicFile ? (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtPCName && ['pdf', 'doc', 'docx'].includes(fileExtPCName) ? (
										<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
											<div
												id="cancelIcon"
												style={{
													position: 'absolute',
													top: '0',
													right: '0',
													zIndex: 1,
													color: 'red',
													cursor: 'pointer',
													backgroundColor: 'white',
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<HighlightOffIcon onClick={handleRemoveslipPicFile} />
											</div>
											{fileExtPCName === 'pdf' ? (
												<iframe
													src={previewslipPicFile}
													frameBorder="0"
													scrolling="auto"
													height="150px"
													width="150px"
												/>
											) : (
												<DescriptionIcon
													style={{
														color: 'blue',
														cursor: 'pointer',
														display: 'block',
														fontSize: '137px',
														margin: 'auto'
													}}
													onClick={() => window.open(previewslipPicFile)}
												/>
											)}
										</div>
									) : (
										<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
											<div
												id="cancelIcon"
												style={{
													position: 'absolute',
													top: '0',
													right: '0',
													zIndex: 1,
													color: 'red',
													cursor: 'pointer',
													backgroundColor: 'white',
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<HighlightOffIcon onClick={handleRemoveslipPicFile} />
											</div>
											<img
												src={previewslipPicFile}
												style={{ height: '140px', width: '150px' }}
												alt="file"
											/>
										</div>
									)}
								</div>
							) : (
								!slipPic && (
									<Box
										height={180}
										width={180}
										my={4}
										display="flex"
										alignItems="center"
										gap={4}
										p={2}
										style={{
											width: '150px',
											height: '70px',
											border: '1px solid red'
										}}
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<Typography className="text-sm font-700">
											<span className="mr-4 text-xs text-red-500">
												Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
											</span>
										</Typography>
									</Box>
								)
							)}
						</div>
					)}
				/>
			</div>
		</div>
	);
}

export default CvFemaleForm;
