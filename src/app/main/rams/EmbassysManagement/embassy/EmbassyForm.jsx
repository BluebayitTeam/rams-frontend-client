import { Autocomplete, TextField } from '@mui/material';
import { getAgents, getCurrentStatuss, getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';

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

function MusanedOkalaForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { embassyId } = routeParams;
	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);

	const [previewOldVisaImage, setPreviewOldVisaImage] = useState('');
	const [previewStampVisaImage, setPreviewStampVisaImage] = useState('');
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgents());
		dispatch(getRecruitingAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		if (embassyId === 'new') {
			setValue('current_status', 'all');
			setValue('old_visa_image', '');
			setValue('stamp_visa_image', '');
			setPreviewOldVisaImage('');
			setPreviewOldVisaImage('');
		}
	}, [embassyId]);

	return (
		<div>
			<Controller
				name="recruiting_agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? recruitingAgencys?.find((data) => data.id === value) : null}
						// options={recruitingAgencys}
						options={[{ id: 'all', name: 'Select Recruiting Agency' }, ...recruitingAgencys]}
						getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Recruiting Agency"
								label="Recruiting Agency"
								error={!!errors.recruiting_agency}
								helperText={errors?.recruiting_agency?.message}
								variant="outlined"
								required
								InputLabelProps={params.value && { shrink: true }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="submit_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.submit_date}
						helperText={errors?.submit_date?.message}
						label="Submit Date"
						id="submit_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="profession_english"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.profession_english?.message}
							label="Profession English"
							id="profession_english"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="profession_arabic"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.profession_arabic}
							helperText={errors?.profession_arabic?.message}
							label="Profession Arabic"
							id="profession_arabic"
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
				name="stamping_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id === value) : null}
						options={doneNotDone}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Stamping Status"
								label="Stamping Status"
								// error={!!errors.stamping_status}
								helperText={errors?.stamping_status?.message}
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
				name="stamping_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.stamping_date}
						helperText={errors?.stamping_date?.message}
						label="Stamping Date"
						id="stamping_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="visa_expiry_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.visa_expiry_date}
						helperText={errors?.visa_expiry_date?.message}
						label="Visa Expiry Date"
						id="visa_expiry_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="delivery_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.delivery_date}
						helperText={errors?.delivery_date?.message}
						label="delivery date"
						id="delivery_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="visa_number_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.visa_number_readonly}
							helperText={errors?.visa_number_readonly?.message}
							label="Visa No"
							id="visa_number_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_id_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_id_no_readonly}
							helperText={errors?.sponsor_id_no_readonly?.message}
							label="Sponsor ID No"
							id="sponsor_id_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_name_english_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_name_english_readonly}
							helperText={errors?.sponsor_name_english_readonly?.message}
							label="Sponsor Name English"
							id="sponsor_name_english_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_name_arabic_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_name_arabic_readonly}
							helperText={errors?.sponsor_name_arabic_readonly?.message}
							label="Sponsor Name Arabic"
							id="sponsor_name_arabic_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>

			<Controller
				name="mofa_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.mofa_no_readonly}
							helperText={errors?.mofa_no_readonly?.message}
							label="Mofa No"
							id="mofa_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>
			<Controller
				name="police_clearance_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.police_clearance_no_readonly}
							helperText={errors?.police_clearance_no_readonly?.message}
							label="Police Clearance No"
							id="police_clearance_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>
			<Controller
				name="oakala_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.oakala_no_readonly}
							helperText={errors?.oakala_no_readonly?.message}
							label="Okala No"
							id="oakala_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>
			<Controller
				name="driving_license_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.driving_license_no_readonly}
							helperText={errors?.driving_license_no_readonly?.message}
							label="Driving license No"
							id="driving_license_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>
			<Controller
				name="musaned_okala_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.musaned_okala_no_readonly}
							helperText={errors?.musaned_okala_no_readonly?.message}
							label="Musaned Okala No"
							id="musaned_okala_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>
			<Controller
				name="certificate_experience_no_readonly"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.certificate_experience_no_readonly}
							helperText={errors?.certificate_experience_no_readonly?.message}
							label="Certificate & Experience No"
							id="certificate_experience_no_readonly"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					);
				}}
			/>

			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Image
					name="old_visa_image"
					previewImage={previewOldVisaImage}
					setPreviewImage={setPreviewOldVisaImage}
					label="Old Visa Image"
				/>
				<Image
					name="stamp_visa_image"
					previewImage={previewStampVisaImage}
					setPreviewImage={setPreviewStampVisaImage}
					label="Stamp Visa Image"
				/>
			</div>
		</div>
	);
}

export default MusanedOkalaForm;
