/* eslint-disable jsx-a11y/iframe-has-title */
import { styled } from '@mui/system';
import { Autocomplete, Icon, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { useParams } from 'react-router';
import clsx from 'clsx';
import { PictureAsPdf } from '@mui/icons-material';
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
	const classes = useStyles(props);
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const [previewPCImage, setpreviewPCImage] = useState('');
	const [previewDLImage, setpreviewDLImage] = useState('');
	const [previewDoc1Image, setpreviewDoc1Image] = useState('');
	const [previewDoc2Image, setpreviewDoc2Image] = useState('');
	const [fileExtName, setFileExtName] = useState('');
	const file = watch('file') || '';
	const { errors } = formState;
	const routeParams = useParams();
	const { officeWorkId } = routeParams;
	const currentStatuss = useSelector((state) => state.data.currentStatuss);

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
				<Controller
					name="pc_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-evenly">
							<div className="flex-col">
								<Typography className="text-center">PC Image</Typography>
								<label
									htmlFor={`${name}-button-file`}
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf"
										className="hidden"
										id={`${name}-button-file`}
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setpreviewPCImage(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											setFileExtName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

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
							</div>
							{!previewPCImage && file && (
								<div
									style={{
										width: 'auto',
										height: '150px',
										overflow: 'hidden',
										display: 'flex'
									}}
								>
									{(file?.name || file)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
										<PictureAsPdf
											style={{
												color: 'red',
												cursor: 'pointer',
												display: 'block',
												fontSize: '35px',
												margin: 'auto'
											}}
											onClick={() => window.open(`${BASE_URL}${pc_image}`)}
										/>
									) : (
										<img
											src={`${BASE_URL}${pc_image}`}
											style={{ height: '150px' }}
											alt="pc_image"
										/>
									)}
								</div>
							)}

							{previewPCImage && (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtName === 'pdf' ? (
										<iframe
											src={previewPCImage}
											frameBorder="0"
											scrolling="auto"
											height="150px"
											width="150px"
										/>
									) : (
										<img
											src={previewPCImage}
											style={{ height: '150px' }}
											alt="pc_image"
										/>
									)}
								</div>
							)}
						</div>
					)}
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
