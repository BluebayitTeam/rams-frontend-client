import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';
import { useParams } from 'react-router';
import increaseMonth from 'src/app/@helpers/increaseMonth';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9'
	}
}));

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

function MedicalForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { embassyId } = routeParams;
	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);
	// const embassyData = useSelector(({ embassysManagement }) => embassysManagement.embassy);

	const [previewOldVisaImage, setPreviewOldVisaImage] = useState('');
	const [previewStampVisaImage, setPreviewStampVisaImage] = useState('');
	// const embassyData = useSelector(({ embassysManagement }) => embassysManagement.embassy);

	useEffect(() => {
		setPreviewOldVisaImage('');
		setPreviewStampVisaImage('');
	}, [getValues('recruiting_agency')]);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getRecruitingAgencys());
	}, []);

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
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Recruiting Agency"
								label="Recruiting Agency"
								id="recruiting_agency"
								required
								helperText={errors?.recruiting_agency?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
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
				render={({ field }) => (
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
				)}
			/>

			<Controller
				name="profession_arabic"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.profession_arabic?.message}
						label="Profession Arabic"
						id="profession_arabic"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="salary"
				control={control}
				render={({ field }) => (
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
				)}
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
				name="medical_card"
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
								placeholder="Select Embassy Card"
								label="Embassy Card"
								helperText={errors?.medical_card?.message}
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
						onChange={(event) => {
							const { value } = event.target;
							field.onChange(value);
							setValue('visa_expiry_date', increaseMonth(value, 3));
						}}
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
						label="visa Expiry Date"
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
						label="Delivery Date"
						id="delivery_date"
						type="date"
						style={{ display: embassyData?.embassy?.delivery_date ? 'flex' : 'none' }}
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="visa_number_readonly"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.visa_number_readonly?.message}
						label="Visa No"
						id="visa_number_readonly"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id === value) : null}
						options={[{ id: 'all', name: 'Select Recruiting Agency' }, ...currentStatuss]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select current status"
								label="Current Status"
								id="current_status"
								helperText={errors?.current_status?.message}
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
				name="notes"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						helperText={errors?.notes?.message}
						label="Notes"
						id="notes"
						variant="outlined"
						multiline
						rows={4}
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<div className="flex justify-start mx-16 flex-col md:flex-row">
				<Image
					name="old_visa_image"
					previewImage={previewOldVisaImage}
					setPreviewImage={setPreviewOldVisaImage}
					label="Old Visa Image"
				/>

				<Image
					name="medical_card_pic"
					previewImage={previewStampVisaImage}
					setPreviewImage={setPreviewStampVisaImage}
					label="Stamp Visa Image"
				/>
			</div>
		</div>
	);
}

export default MedicalForm;
