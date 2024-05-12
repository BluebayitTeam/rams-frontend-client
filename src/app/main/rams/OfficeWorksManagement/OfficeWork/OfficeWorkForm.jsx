/* eslint-disable jsx-a11y/alt-text */

import { Autocomplete, TextField } from '@mui/material';
import { getCurrentStatuss, getOfficeWorkCenters, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';
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

function OfficeWorkForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues } = methods;
	const [previewPCImage, setpreviewPCImage] = useState('');
	const [previewDLImage, setpreviewDLImage] = useState('');
	const [previewDoc1Image, setpreviewDoc1Image] = useState('');
	const [previewDoc2Image, setpreviewDoc2Image] = useState('');

	const { errors } = formState;
	// const routeParams = useParams();
	// const { officeWorkId } = routeParams;
	// const classes = useStyles(props);
	const officeWorkCenters = useSelector((state) => state.data.officeWorkCenters);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	// const image = watch('image');

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getOfficeWorkCenters());

		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setpreviewPCImage('');
		setpreviewDLImage('');
		setpreviewDoc1Image('');
		setpreviewDoc2Image('');
	}, [getValues('police_clearance_no')]);

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
						<CustomDatePicker
							field={field}
							label="Police Clearance Date"
						/>
					);
				}}
			/>

			<Controller
				name="police_clearance_status"
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
						<CustomDatePicker
							field={field}
							label="Driving License Date"
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
						<CustomDatePicker
							field={field}
							label="Finger Date"
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
						value={value ? currentStatuss.find((data) => data.id == value) : null}
						options={currentStatuss}
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
