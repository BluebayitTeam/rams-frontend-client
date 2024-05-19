import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useParams } from 'react-router';

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

function OfficeWorkForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const [previewPCImage, setpreviewPCImage] = useState('');
	const [previewDLImage, setpreviewDLImage] = useState('');
	const [previewDoc1Image, setpreviewDoc1Image] = useState('');
	const [previewDoc2Image, setpreviewDoc2Image] = useState('');

	const { errors } = formState;
	const routeParams = useParams();
	const { officeWorkId } = routeParams;
	// const classes = useStyles(props);
	// const officeWorkCenters = useSelector((state) => state.data.officeWorkCenters);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	// const image = watch('image');

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setpreviewPCImage('');
		setpreviewDLImage('');
		setpreviewDoc1Image('');
		setpreviewDoc2Image('');
	}, [getValues('police_clearance_no')]);

	// console.log('wbkjwb', getValues());
	useEffect(() => {
		if (officeWorkId === 'new') {
			reset({
				passenger: 'all',
				police_clearance_no: '',
				police_clearance_date: '',
				police_clearance_status: '',
				driving_license_no: '',
				driving_license_date: '',
				driving_license_status: '',
				finger_no: '',
				finger_status: '',
				finger_date: '',
				certificate_experience: '',
				current_status: 'all'
			});
			setpreviewPCImage('');
			setpreviewDLImage('');
			setpreviewDoc1Image('');
			setpreviewDoc2Image('');
		} else {
			// Fetch and set data based on medicalId if needed
			// reset(formData);
		}
	}, [officeWorkId, reset, currentStatuss]);

	return (
		<div>
			<Controller
				name="police_clearance_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.police_clearance_no}
							helperText={errors?.police_clearance_no?.message}
							label="Police Clearance No."
							id="police_clearance_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="police_clearance_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.police_clearance_date}
							helperText={errors?.police_clearance_date?.message}
							label="Police Clearance date"
							id="police_clearance_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="police_clearance_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-16 mb-16"
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
								placeholder="Select Police Clearance Status"
								label="Police Clearance Status"
								error={!!errors.police_clearance_status}
								helperText={errors?.police_clearance_status?.message}
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
				name="driving_license_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.driving_license_no}
							helperText={errors?.driving_license_no?.message}
							label="Driving License No."
							id="driving_license_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="driving_license_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.driving_license_date}
							helperText={errors?.driving_license_date?.message}
							label="Driving License Date"
							id="driving_license_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="driving_license_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id == value) : null}
						options={doneNotDone}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Driving License Status"
								label="Driving License Status"
								error={!!errors.driving_license_status}
								helperText={errors?.driving_license_status?.message}
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
				name="finger_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.finger_no}
							helperText={errors?.finger_no?.message}
							label="Finger No."
							id="finger_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="finger_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id == value) : null}
						options={doneNotDone}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Finger Status"
								label="Finger Status"
								error={!!errors.finger_status}
								helperText={errors?.finger_status?.message}
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
				name="finger_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.finger_date}
							helperText={errors?.finger_date?.message}
							label="Finger Date"
							id="finger_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="certificate_experience"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.certificate_experience}
							helperText={errors?.certificate_experience?.message}
							label="Certificate & Experience"
							id="certificate_experience"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id === value) : null}
						// options={currentStatuss}
						options={[{ id: 'all', name: 'Select current status' }, ...currentStatuss]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="select current status"
								label="Current Status"
								error={!!errors.current_status}
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

			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Image
					name="pc_image"
					previewImage={previewPCImage}
					setPreviewImage={setpreviewPCImage}
					label="PC Image"
				/>
				<Image
					name="dl_image"
					previewImage={previewDLImage}
					setPreviewImage={setpreviewDLImage}
					label="DL Image"
				/>
			</div>
			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Image
					name="doc1_image"
					previewImage={previewDoc1Image}
					setPreviewImage={setpreviewDoc1Image}
					label="Document 1"
				/>
				<Image
					name="doc2_image"
					previewImage={previewDoc2Image}
					setPreviewImage={setpreviewDoc2Image}
					label="Document 2"
				/>
			</div>
		</div>
	);
}

export default OfficeWorkForm;
