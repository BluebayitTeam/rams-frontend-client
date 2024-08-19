/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { FormControl } from '@mui/base';
import { Autocomplete, Checkbox, FormControlLabel, Icon, IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
	getBranches,
	getCities,
	getCountries,
	getDepartments,
	getEmployees,
	getRoles,
	getThanas,
	getThanasBasedOnCity
} from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { genders } from 'src/app/@data/data';

import {
	BASE_URL,
	CHECK_EMAIL_EMPLOYEE,
	CHECK_PRIMARY_PHONE,
	CHECK_USERNAME_EMPLOYEE
} from 'src/app/constant/constants';
import FileUpload from 'src/app/@components/FileUploader';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { useParams } from 'react-router';
import CustomPhoneWithCountryCode from 'src/app/@components/CustomPhoneWithCountryCode';
import axios from 'axios';

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
	const routeParams = useParams();
	const classes = useStyles(props);
	const { employeeId } = routeParams;
	const { control, formState, watch, setValue, getValues, setError } = methods;
	const { errors } = formState;
	const thanas = useSelector((state) => state.data.thanas);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const departments = useSelector((state) => state.data.departments);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const getCountryCode1 = watch('country_code1');
	// const getCountryCode2 = watch('country_code2');
	const [file, setFile] = useState(null);

	useEffect(() => {
		dispatch(getBranches());
		dispatch(getThanas());
		dispatch(getRoles());
		dispatch(getDepartments());
		dispatch(getCities());
		dispatch(getCountries());
		dispatch(getEmployees());
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

	const handleCheckUserName = async (name) => {
		const response = await axios.get(
			`${CHECK_USERNAME_EMPLOYEE}?username=${name}&id=${employeeId === 'new' ? '' : employeeId}&type=${employeeId === 'new' ? 'create' : 'update'}`
		);

		if (response?.data.username_exists) {
			setError('username', {
				type: 'manual',
				message: 'User Name Already Exists'
			});
		}
	};

	const handleCheckEmail = async (name) => {
		const response = await axios.get(
			`${CHECK_EMAIL_EMPLOYEE}?email=${name}&id=${employeeId === 'new' ? '' : employeeId}&type=${employeeId === 'new' ? 'create' : 'update'}`
		);

		if (response?.data.email_exists) {
			setError('email', {
				type: 'manual',
				message: 'User Name Already Exists'
			});
		}
	};
	const handleCheckPhone = async (phoneNumber) => {
		const countryCode = getCountryCode1;

		const formattedPhoneNumber = `${countryCode}${phoneNumber}`;
		const response = await axios.get(
			`${CHECK_PRIMARY_PHONE}?primary_phone=${formattedPhoneNumber}&id=${employeeId === 'new' ? '' : employeeId}&type=${employeeId === 'new' ? 'create' : 'update'}`
		);

		if (response?.data?.primary_phone_exists) {
			setError('primary_phone', {
				type: 'manual',
				message: 'Phone number already exists'
			});
		}
	};

	return (
		<div>
			<Controller
				name="branch"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? branches.find((bnch) => bnch.id === value) : null}
						options={branches}
						getOptionLabel={(option) => `${option.name}`}
						InputLabelProps={{ shrink: true }}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a branch"
								label="Branch"
								autoFocus
								helperText={errors?.branch?.message}
								variant="outlined"
								InputLabelProps={value ? {} : { style: { color: 'red', borderColor: 'red' } }}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="emp_id_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						// error={!!errors.emp_id_no}
						helperText={errors?.emp_id_no?.message}
						label={field.value ? 'Employee Id' : <span style={{ color: 'red' }}>Employee Id</span>}
						id="emp_id_no"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
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
						label="First Name"
						helperText={errors?.first_name?.message}
						id="firstName"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
						label="Last Name"
						helperText={errors?.last_name?.message}
						id="lastName"
						variant="outlined"
						fullWidth
						color="success"
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
						helperText={errors?.username?.message}
						FormHelperTextProps={{ style: { color: 'red' } }}
						label="User Name"
						id="userName"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
						required
						onChange={(e) => {
							field.onChange(e); // Ensure the field value is updated
							handleCheckUserName(e.target.value);
						}}
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
						FormHelperTextProps={{ style: { color: 'red' } }}
						// onBlur={(event) => handleOnChange('email', event)}
						onChange={(e) => {
							handleCheckEmail(e.target.value);
						}}
						label="Email"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon
										className="text-20"
										color="action"
									>
										user
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						fullWidth
					/>
				)}
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
								InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
								required
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
								InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
								required
							/>
						)}
					/>
				</>
			)}

			<CustomPhoneWithCountryCode
				getCountryCode1={getCountryCode1}
				countryName="country_code1"
				countryLabel="Select Country"
				countryCodeLabel="Country Code"
				phoneName="primary_phone"
				phoneLabel="Phone"
				onChange={(newValue) => {
					if (newValue) {
						handleCheckPhone(newValue.value, setError);
					} else {
						handleCheckPhone('', setError); // Handle case where no country is selected
					}
				}}
				required
			/>

			{/* <CustomPhoneWithCountryCode
				getCountryCode1={getCountryCode2}
				countryName="country_code2"
				countryLabel="Select Country"
				countryCodeLabel="Country Code"
				phoneName="Secondary Phone"
				phoneLabel="Phone"
			/> */}

			<Controller
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
			/>

			<Controller
				name="role"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? roles.find((role) => role.id === value) : null}
						options={roles}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						// defaultValue={{ id: null, name: "Select a role" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a employee role"
								label="Role"
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="department"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? departments.find((department) => department.id === value) : null}
						options={departments}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						// defaultValue={{ id: null, name: "Select a deparment" }}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select a employee department"
								label="Department"
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
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
						error={!!errors.street_address_one}
						helperText={errors?.street_address_one?.message}
						//
						label="Primary address"
						id="address1"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/>
			<Controller
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
			/>

			<CustomDatePicker
				name="date_of_birth"
				label="Date of Birth"
				required
				placeholder="DD-MM-YYYY"
			/>

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

			<Controller
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
							dispatch(getThanasBasedOnCity(newValue?.id));
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
			/>

			<Controller
				name="thana"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? thanas.find((thana) => thana.id === value) : null}
						options={thanas}
						getOptionLabel={(option) => `${option.name}`}
						// defaultValue={{ id: null, name: "Select a thana" }}
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
			/>

			<Controller
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
			/>
			<Controller
				name="nid"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.nid}
						helperText={errors?.nid?.message}
						label="National Id"
						id="nid"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/>

			<Controller
				name="basic_money"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.basic_money}
						helperText={errors?.basic_money?.message}
						label="Basic Money"
						id="basic_money"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/>
			<Controller
				name="allowance_money"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.allowance_money}
						helperText={errors?.allowance_money?.message}
						label="Allowance Money"
						id="allowance_money"
						variant="outlined"
						fullWidth
						InputLabelProps={field.value && { shrink: true }}
					/>
				)}
			/>

			<CustomDatePicker
				name="emp_join_date"
				label="Join Date"
				required
				placeholder="DD-MM-YYYY"
			/>
			<Controller
				name="is_active"
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
			<Controller
				name="is_admin"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormControlLabel
							label="Is admin"
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
