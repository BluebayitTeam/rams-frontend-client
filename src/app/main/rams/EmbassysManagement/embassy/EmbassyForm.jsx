import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
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
	const medicalCenters = useSelector((state) => state.data.medicalCenters);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewOldVisaImage, setPreviewOldVisaImage] = useState('');
	const [previewStampVisaImage, setPreviewStampVisaImage] = useState('');
	const embassyData = useSelector(({ embassysManagement }) => embassysManagement.embassy);

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
				name="medical_center"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? medicalCenters?.find((data) => data.id === value) : null}
						// options={medicalCenters}
						options={[{ id: 'all', name: 'Select Embassy Center' }, ...medicalCenters]}
						getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Embassy Center"
								label="Embassy Center"
								id="medical_center"
								helperText={errors?.medical_center?.message}
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
				name="medical_serial_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.medical_serial_no?.message}
						label="Embassy Serial No"
						id="medical_serial_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="medical_result"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? medicalResults.find((data) => data.id === value) : null}
						options={medicalResults}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Embassy Result"
								label="Embassy Result"
								helperText={errors?.medical_result?.message}
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
				name="medical_exam_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.medical_exam_date}
						helperText={errors?.medical_exam_date?.message}
						label="Embassy Exam Date"
						id="medical_exam_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="medical_report_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.medical_report_date}
						helperText={errors?.medical_report_date?.message}
						label="Embassy Report Date"
						id="medical_report_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="medical_issue_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.medical_issue_date}
						helperText={errors?.medical_issue_date?.message}
						label="Embassy Issue Date"
						onChange={(event) => {
							const { value } = event.target;
							field.onChange(value);
							setValue('medical_expiry_date', increaseMonth(value, 3));
						}}
						id="medical_issue_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="medical_expiry_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.medical_expiry_date}
						helperText={errors?.medical_expiry_date?.message}
						label="Embassy Expiry Date"
						id="medical_expiry_date"
						type="date"
						InputLabelProps={{ shrink: true }}
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
						options={[{ id: 'all', name: 'Select Embassy Center' }, ...currentStatuss]}
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
