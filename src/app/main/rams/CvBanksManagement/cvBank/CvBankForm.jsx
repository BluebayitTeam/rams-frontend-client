/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getCountries, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from 'src/app/@components/FileUploader';
import { BASE_URL } from 'src/app/constant/constants';
import { genders } from 'src/app/@data/data';

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

	const countrys = useSelector((state) => state.data.countries);

	const classes = useStyles(props);

	const methods = useFormContext();
	const routeParams = useParams();
	const { cvBankId } = routeParams;
	const { control, formState, watch, getValues, setValue } = methods;
	const { errors } = formState;

	const [file, setFile] = useState(null);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {}, [watch('date_of_birth')]);

	useEffect(() => {
		const currentImage = getValues('image');

		if (currentImage && !currentImage.name) {
			setFile(`${BASE_URL}/${currentImage}`);
		}
	}, [cvBankId, watch('image')]);

	return (
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
				name="country"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? countrys.find((data) => data.id === value) : null}
						options={countrys}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select  Country"
								label="Country"
								// error={!!errors.country || !value}
								helperText={errors?.country?.message}
								variant="outlined"
								required
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="profession"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.profession}
							helperText={errors?.profession?.message}
							label="Profession"
							id="profession"
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
							// error={!!errors.experience_task}
							helperText={errors?.experience_task?.message}
							label="Experience Task"
							id="experience_task"
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
							// error={!!errors.experience_period}
							helperText={errors?.experience_period?.message}
							label="Experience Period"
							id="experience_period"
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
						name="image"
						label="Resume"
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
