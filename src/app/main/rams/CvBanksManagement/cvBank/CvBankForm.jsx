/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
	getAgencys,
	getAgents,
	getCities,
	getCountries,
	getCurrentStatuss,
	getPassengers,
	getProfessions,
	getThanas
} from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { genders, maritalStatuses, religions } from 'src/app/@data/data';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { differenceInYears } from 'date-fns';
import increaseYear from 'src/app/@helpers/increaseYear';
import FileUpload from 'src/app/@components/FileUploader';

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

function CvBankForm(props) {
	const dispatch = useDispatch();
	const userID = localStorage.getItem('user_id');

	const targetCountrys = useSelector((state) => state.data.countries);
	const districts = useSelector((state) => state.data.cities);
	const thanas = useSelector((state) => state.data.thanas);
	const professions = useSelector((state) => state.data.professions);

	const classes = useStyles(props);

	const methods = useFormContext();
	const routeParams = useParams();
	const { cvBankId } = routeParams;
	const { control, formState, watch, getValues, setValue } = methods;
	const { errors } = formState;

	const [file, setFile] = useState(null);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getProfessions());
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
		dispatch(getPassengers());
		dispatch(getAgents());
		dispatch(getAgencys());
		dispatch(getCountries());
		dispatch(getThanas());
		dispatch(getCities());
	}, []);

	useEffect(() => {}, [watch('date_of_birth')]);

	useEffect(() => {
		const currentImage = getValues('image');

		if (currentImage && !currentImage.name) {
			setFile(`${BASE_URL}/${currentImage}`);
		}
	}, [cvBankId, watch('image')]);

	return (
		// <div>
		// 	<Controller
		// 		name={cvBankId ==== 'new' ? 'created_by' : 'updated_by'}
		// 		control={control}
		// 		defaultValue={userID}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className={classes.hidden}
		// 					label="created by"
		// 					id="created_by"
		// 					error={false}
		// 					helperText=""
		// 					variant="outlined"
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="passenger_name"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					// error={!!errors.passenger_name || !field.value}
		// 					helperText={errors?.passenger_name?.message}
		// 					label="Passenger Name"
		// 					id="passenger_name"
		// 					variant="outlined"
		// 					InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="gender"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? genders.find((data) => data.id ==== value) : null}
		// 				options={genders}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select Gender"
		// 						label="Gender"
		// 						id="gender"
		// 						// error={!!errors.gender || !value}
		// 						helperText={errors?.gender?.message}
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="profession"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? professions.find((data) => data.id ==== value) : null}
		// 				options={professions}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select profession"
		// 						label="profession"
		// 						id="profession"
		// 						// error={!!errors.profession || !value}
		// 						helperText={errors?.professions?.message}
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	{/* <Controller
		// 		name="profession"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.profession}
		// 					helperText={errors?.profession?.message}
		// 					label="Profession"
		// 					id="profession"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/> */}
		// 	<Controller
		// 		name="date_of_birth"
		// 		control={control}
		// 		render={({ field }) => (
		// 			<CustomDatePicker
		// 				field={field}
		// 				label="Date Of Birth"
		// 				className="mt-8 mb-16 w-full"
		// 				InputLabelProps={field.value && { shrink: true }}
		// 				onChange={(value) => {
		// 					// Check if value is valid date
		// 					if (value) {
		// 						const selectedDate = new Date(value);
		// 						const age = differenceInYears(new Date(), selectedDate);

		// 						if (age < 22 || age > 35) {
		// 							window.alert('Age must be between 22-35');
		// 							dispatch(showMessage({ message: 'Age must be between 22-35', variant: 'error' }));
		// 							setValue('date_of_birth', null); // Clear the field if condition is not met
		// 						} else {
		// 							// Set the valid date value
		// 							setValue('date_of_birth', selectedDate);
		// 						}
		// 					} else {
		// 						// If value is null or invalid, clear the field
		// 						setValue('date_of_birth', null);
		// 					}
		// 				}}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="target_country"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-16 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? targetCountrys.find((data) => data.id ==== value) : null}
		// 				options={targetCountrys}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select Target Country"
		// 						label="Target Country"
		// 						// error={!!errors.target_country || !value}
		// 						helperText={errors?.target_country?.message}
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="passport_no"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					// error={!!errors.passport_no || !field.value}
		// 					helperText={errors?.passport_no?.message}
		// 					label="Passport No"
		// 					id="passport_no"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 					onChange={(event) => {
		// 						field.onChange(event.target.value);
		// 					}}
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="passport_issue_place"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? districts.find((data) => data.id ==== value || data.name ==== value) : null}
		// 				options={districts}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.name);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						error={!value}
		// 						placeholder="Select Passport Issue Place"
		// 						label="Passport Issue Place"
		// 						id="passport_issue_place"
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="passport_issue_date"
		// 		control={control}
		// 		render={({ field }) => (
		// 			<TextField
		// 				{...field}
		// 				className="mt-8 mb-16"
		// 				error={!!errors.passport_issue_date}
		// 				helperText={errors?.passport_issue_date?.message}
		// 				label="Passport Issue Date"
		// 				onChange={(event) => {
		// 					const { value } = event.target;
		// 					field.onChange(value);
		// 					setValue('passport_expiry_date', increaseYear(value, 10));
		// 				}}
		// 				id="passport_issue_date"
		// 				type="date"
		// 				InputLabelProps={{ shrink: true }}
		// 				fullWidth
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="passport_expiry_date"
		// 		control={control}
		// 		render={({ field }) => (
		// 			<TextField
		// 				{...field}
		// 				className="mt-8 mb-16"
		// 				error={!!errors.passport_expiry_date}
		// 				helperText={errors?.passport_expiry_date?.message}
		// 				label="passport Expiry Date"
		// 				id="passport_expiry_date"
		// 				type="date"
		// 				InputLabelProps={{ shrink: true }}
		// 				fullWidth
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="district"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? districts.find((data) => data.id ==== value) : null}
		// 				options={districts}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 					dispatch(getThanasBasedOnCity(newValue?.id));
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select District"
		// 						label="District"
		// 						// error={!!errors.district}
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="police_station"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? thanas.find((data) => data.id ==== value) : null}
		// 				options={thanas}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select Police Station"
		// 						label="Police Station"
		// 						// error={!!errors.police_station}
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="office_serial"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full "
		// 					label="Office Serial"
		// 					id="office_serial"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="father_name"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Father Name"
		// 					id="father_name"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="mother_name"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Mother Name"
		// 					id="mother_name"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="spouse_name"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Spouse Name"
		// 					id="spouse_name"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="religion"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? religions.find((data) => data.id ==== value) : null}
		// 				options={religions}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select Religion"
		// 						label="Religion"
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="post_office"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Post Office"
		// 					id="post_office"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="village"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Village"
		// 					id="village"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="marital_status"
		// 		control={control}
		// 		render={({ field: { onChange, value } }) => (
		// 			<Autocomplete
		// 				className="mt-8 mb-16 w-full  "
		// 				freeSolo
		// 				value={value ? maritalStatuses.find((data) => data.id ==== value) : null}
		// 				options={maritalStatuses}
		// 				getOptionLabel={(option) => `${option.name}`}
		// 				onChange={(event, newValue) => {
		// 					onChange(newValue?.id);
		// 				}}
		// 				renderInput={(params) => (
		// 					<TextField
		// 						{...params}
		// 						placeholder="Select Marital Status"
		// 						label="Marital Status"
		// 						variant="outlined"
		// 						InputLabelProps={{
		// 							shrink: true
		// 						}}
		// 					/>
		// 				)}
		// 			/>
		// 		)}
		// 	/>
		// 	<Controller
		// 		name="contact_no"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Contact No"
		// 					id="contact_no"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="nid"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="NID"
		// 					id="nid"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="place_of_birth"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Place Of Birth"
		// 					id="place_of_birth"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>{' '}
		// 	<Controller
		// 		name="emergency_contact_no"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					className="mt-8 mb-16 w-full  "
		// 					label="Emergency Contact No"
		// 					id="emergency_contact_no"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="post"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.post}
		// 					helperText={errors?.post?.message}
		// 					label="Post"
		// 					id="post"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="experience"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.experience}
		// 					helperText={errors?.experience?.message}
		// 					label="Experience Task"
		// 					id="experience"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="year_of_experience"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.year_of_experience}
		// 					helperText={errors?.year_of_experience?.message}
		// 					label="Experience Period"
		// 					id="year_of_experience"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="place_of_birth"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.place_of_birth}
		// 					helperText={errors?.place_of_birth?.message}
		// 					label="Place Of Birth"
		// 					id="place_of_birth"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="place_of_residence"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.place_of_residence}
		// 					helperText={errors?.place_of_residence?.message}
		// 					label="Place Of Residence"
		// 					id="place_of_residence"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="number_of_children"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.number_of_children}
		// 					helperText={errors?.number_of_children?.message}
		// 					label="Number Of Children"
		// 					id="number_of_children"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="height"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.height}
		// 					helperText={errors?.height?.message}
		// 					label="Height"
		// 					id="height"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="weight"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.weight}
		// 					helperText={errors?.weight?.message}
		// 					label="weight"
		// 					id="weight"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="education"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.education}
		// 					helperText={errors?.education?.message}
		// 					label="Education"
		// 					id="education"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="arabic_skill"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.arabic_skill}
		// 					helperText={errors?.arabic_skill?.message}
		// 					label="Arabic Skill"
		// 					id="arabic_skill"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="english_skill"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.english_skill}
		// 					helperText={errors?.english_skill?.message}
		// 					label="English Skill"
		// 					id="english_skill"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="salary"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.salary}
		// 					helperText={errors?.salary?.message}
		// 					label="Salary"
		// 					id="salary"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="complexion"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.complexion}
		// 					helperText={errors?.complexion?.message}
		// 					label="Complexion"
		// 					id="complexion"
		// 					variant="outlined"
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<Controller
		// 		name="remarks"
		// 		control={control}
		// 		render={({ field }) => {
		// 			return (
		// 				<TextField
		// 					{...field}
		// 					value={field.value || ''}
		// 					className="mt-8 mb-16"
		// 					// error={!!errors.remarks}
		// 					helperText={errors?.remarks?.message}
		// 					label="Remarks"
		// 					id="remarks"
		// 					variant="outlined"
		// 					multiline
		// 					rows={4}
		// 					InputLabelProps={field.value && { shrink: true }}
		// 					fullWidth
		// 				/>
		// 			);
		// 		}}
		// 	/>
		// 	<div className="text-center">
		// 		<div>
		// 			<FileUpload
		// 				name="file"
		// 				label="Resume"
		// 				control={control}
		// 				setValue={setValue}
		// 				setFile={setFile}
		// 				file={file}
		// 				BASE_URL={BASE_URL}
		// 				classes={classes}
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
		<div>
			<Controller
				name={cvBankId === 'new' ? 'created_by' : 'updated_by'}
				control={control}
				defaultValue={userID}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className={classes.hidden}
							label="created by"
							id="created_by"
							error={false}
							helperText=""
							variant="outlined"
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="passenger_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							// error={!!errors.passenger_name || !field.value}
							helperText={errors?.passenger_name?.message}
							label="Passenger Name"
							id="passenger_name"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="gender"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
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
								id="gender"
								// error={!!errors.gender || !value}
								helperText={errors?.gender?.message}
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
				name="profession"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? professions.find((data) => data.id === value) : null}
						options={professions}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Profession"
								label="Profession"
								// error={!!errors.profession || (!value && routeParams.passengerType != 'female')}
								helperText={errors?.profession?.message}
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
				name="date_of_birth"
				control={control}
				render={({ field }) => (
					<CustomDatePicker
						field={field}
						label="Date Of Birth"
						className="mt-8 mb-16 w-full  "
						// error={!field.value}
						InputLabelProps={field.value && { shrink: true }}
						onChange={(value) => {
							if (
								differenceInYears(new Date(), new Date(value)) < 22 ||
								differenceInYears(new Date(), new Date(value)) > 35
							) {
								dispatch(showMessage({ message: 'Age Must be Between 22-35', variant: 'error' }));
								setValue('date_of_birth', '');
							}
						}}
					/>
				)}
			/>
			<Controller
				name="target_country"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? targetCountrys.find((data) => data.id === value) : null}
						options={targetCountrys}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Target Country"
								label="Target Country"
								// error={!!errors.target_country || !value}
								helperText={errors?.target_country?.message}
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
				name="passport_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							// error={!!errors.passport_no || !field.value}
							helperText={errors?.passport_no?.message}
							label="Passport No"
							id="passport_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onChange={(event, newValue) => {
								field.onChange(event.target.value);
							}}
						/>
					);
				}}
			/>
			<Controller
				name="passport_issue_place"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? districts.find((data) => data.id === value || data.name === value) : null}
						options={districts}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								error={!value}
								placeholder="Select Passport Issue Place"
								label="Passport Issue Place"
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
				name="passport_issue_date"
				control={control}
				render={({ field }) => {
					return (
						<CustomDatePicker
							field={field}
							label="Passport Issue Date"
							className="mt-8 mb-16 w-full  "
							// error={!field.value}
							InputLabelProps={field.value && { shrink: true }}
							onChange={(value) => {
								setValue('passport_expiry_date', increaseYear(value, 10));
							}}
						/>
					);
				}}
			/>
			<Controller
				name="passport_expiry_date"
				control={control}
				render={({ field }) => {
					return (
						<CustomDatePicker
							field={field}
							label="Passport Expiry Date"
							className="mt-8 mb-16 w-full  "
							readOnly
						/>
					);
				}}
			/>
			<Controller
				name="district"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? districts.find((data) => data.id === value) : null}
						options={districts}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							dispatch(getThanasBasedOnCity(newValue?.id));
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select District"
								label="District"
								// error={!!errors.district}
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
				name="police_station"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? thanas.find((data) => data.id === value) : null}
						options={thanas}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Police Station"
								label="Police Station"
								// error={!!errors.police_station}
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
				name="office_serial"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full "
							label="Office Serial"
							id="office_serial"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
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
							className="mt-8 mb-16 w-full  "
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
							className="mt-8 mb-16 w-full  "
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
				name="spouse_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							label="Spouse Name"
							id="spouse_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="religion"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? religions.find((data) => data.id === value) : null}
						options={religions}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Religion"
								label="Religion"
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
				name="post_office"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							label="Post Office"
							id="post_office"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="village"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							label="Village"
							id="village"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="marital_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? maritalStatuses.find((data) => data.id === value) : null}
						options={maritalStatuses}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Marital Status"
								label="Marital Status"
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
				name="contact_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							label="Contact No"
							id="contact_no"
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
							className="mt-8 mb-16 w-full  "
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
				name="place_of_birth"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							label="Place Of Birth"
							id="place_of_birth"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>{' '}
			<Controller
				name="emergency_contact_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full  "
							label="Emergency Contact No"
							id="emergency_contact_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="post"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.post}
							helperText={errors?.post?.message}
							label="Post"
							id="post"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="experience"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.experience}
							helperText={errors?.experience?.message}
							label="Experience Task"
							id="experience"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="year_of_experience"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.year_of_experience}
							helperText={errors?.year_of_experience?.message}
							label="Experience Period"
							id="year_of_experience"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="place_of_birth"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.place_of_birth}
							helperText={errors?.place_of_birth?.message}
							label="Place Of Birth"
							id="place_of_birth"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="place_of_residence"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.place_of_residence}
							helperText={errors?.place_of_residence?.message}
							label="Place Of Residence"
							id="place_of_residence"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="number_of_children"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.number_of_children}
							helperText={errors?.number_of_children?.message}
							label="Number Of Children"
							id="number_of_children"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="height"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.height}
							helperText={errors?.height?.message}
							label="Height"
							id="height"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="weight"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.weight}
							helperText={errors?.weight?.message}
							label="weight"
							id="weight"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="education"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.education}
							helperText={errors?.education?.message}
							label="Education"
							id="education"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="arabic_skill"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.arabic_skill}
							helperText={errors?.arabic_skill?.message}
							label="Arabic Skill"
							id="arabic_skill"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="english_skill"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.english_skill}
							helperText={errors?.english_skill?.message}
							label="English Skill"
							id="english_skill"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="salary"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.salary}
							helperText={errors?.salary?.message}
							label="Salary"
							id="salary"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="complexion"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.complexion}
							helperText={errors?.complexion?.message}
							label="Complexion"
							id="complexion"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="remarks"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.remarks}
							helperText={errors?.remarks?.message}
							label="Remarks"
							id="remarks"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<div className="text-center">
				<div>
					<FileUpload
						name="file"
						label="file"
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

export default CvBankForm;
