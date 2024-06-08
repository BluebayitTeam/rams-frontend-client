/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import { styled } from '@mui/system';
import { Autocomplete, Icon, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
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
	const pcFile = watch('pc_image') || '';
	const dlFile = watch('dl_image') || '';
	const doc1File = watch('doc1_image') || '';
	const doc2File = watch('doc2_image') || '';

	const [previewPCFile, setPreviewPCFile] = useState('');
	const [previewDLFile, setPreviewDLFile] = useState('');
	const [previewDoc2File, setPreviewDoc2File] = useState('');

	const [fileExtPCName, setFileExtPCName] = useState('');
	const [fileExtDLName, setFileExtDLName] = useState('');
	const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');

	const [previewDoc1Image, setPreviewDoc1Image] = useState('');
	// const [previewDoc2File, setPreviewDoc2File] = useState(null);
	const [fileExtDoc2Name, setFileExtDoc2Name] = useState(null);
	// const [fileExtName, setFileExtName] = useState(null);
	const file = watch('file') || '';
	const { errors } = formState;
	const routeParams = useParams();
	const { officeWorkId } = routeParams;
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	console.log(`fndsf`, getValues());
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setFileExtPCName('');
		setFileExtDLName('');

		setPreviewPCFile('');
		setPreviewDLFile('');
		setFileExtDoc1Name('');
		setPreviewDoc1Image('');
		// setpreviewDoc2Image('');
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
								<Typography className="text-center">PC File</Typography>
								<label
									htmlFor="pc_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf"
										className="hidden"
										id="pc_image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewPCFile(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											setFileExtPCName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

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
							{!previewPCFile && pcFile && (
								<div
									style={{
										width: 'auto',
										height: '150px',
										overflow: 'hidden',
										display: 'flex'
									}}
								>
									{(pcFile?.name || pcFile)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
										<PictureAsPdf
											style={{
												color: 'red',
												cursor: 'pointer',
												display: 'block',
												fontSize: '35px',
												margin: 'auto'
											}}
											onClick={() => window.open(`${BASE_URL}${pcFile}`)}
										/>
									) : (
										<img
											src={`${BASE_URL}${pcFile}`}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}

							{previewPCFile && (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtPCName === 'pdf' ? (
										<iframe
											src={previewPCFile}
											frameBorder="0"
											scrolling="auto"
											height="150px"
											width="150px"
										/>
									) : (
										<img
											src={previewPCFile}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}
						</div>
					)}
				/>

				<Controller
					name="dl_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-evenly">
							<div className="flex-col">
								<Typography className="text-center">DL File</Typography>
								<label
									htmlFor="dl_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf"
										className="hidden"
										id="dl_image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewDLFile(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											setFileExtDLName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

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
							{!previewDLFile && dlFile && (
								<div
									style={{
										width: 'auto',
										height: '150px',
										overflow: 'hidden',
										display: 'flex'
									}}
								>
									{(dlFile?.name || dlFile)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
										<PictureAsPdf
											style={{
												color: 'red',
												cursor: 'pointer',
												display: 'block',
												fontSize: '35px',
												margin: 'auto'
											}}
											onClick={() => window.open(`${BASE_URL}${dlFile}`)}
										/>
									) : (
										<img
											src={`${BASE_URL}${dlFile}`}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}

							{previewDLFile && (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtDLName === 'pdf' ? (
										<iframe
											src={previewDLFile}
											frameBorder="0"
											scrolling="auto"
											height="150px"
											width="150px"
										/>
									) : (
										<img
											src={previewDLFile}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}
						</div>
					)}
				/>
			</div>
			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Controller
					name="doc1_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-evenly">
							<div className="flex-col">
								<Typography className="text-center">Document 1</Typography>
								<label
									htmlFor="doc1_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf"
										className="hidden"
										id="doc1_image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewDoc1Image(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											setFileExtDoc1Name(
												e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase()
											);

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
							{!previewDoc1Image && doc1File && (
								<div
									style={{
										width: 'auto',
										height: '150px',
										overflow: 'hidden',
										display: 'flex'
									}}
								>
									{(doc1File?.name || doc1File)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
										<PictureAsPdf
											style={{
												color: 'red',
												cursor: 'pointer',
												display: 'block',
												fontSize: '35px',
												margin: 'auto'
											}}
											onClick={() => window.open(`${BASE_URL}${doc1File}`)}
										/>
									) : (
										<img
											src={`${BASE_URL}${doc1File}`}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}

							{previewDoc1Image && (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtDoc1Name === 'pdf' ? (
										<iframe
											src={previewDoc1Image}
											frameBorder="0"
											scrolling="auto"
											height="150px"
											width="150px"
										/>
									) : (
										<img
											src={previewDoc1Image}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}
						</div>
					)}
				/>

				<Controller
					name="doc2_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-evenly">
							<div className="flex-col">
								<Typography className="text-center">Document 2</Typography>
								<label
									htmlFor="doc2_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf"
										className="hidden"
										id="doc2_image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewDoc2File(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											setFileExtDoc2Name(
												e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase()
											);

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
							{!previewDoc2File && doc2File && (
								<div
									style={{
										width: 'auto',
										height: '150px',
										overflow: 'hidden',
										display: 'flex'
									}}
								>
									{(doc2File?.name || doc2File)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
										<PictureAsPdf
											style={{
												color: 'red',
												cursor: 'pointer',
												display: 'block',
												fontSize: '35px',
												margin: 'auto'
											}}
											onClick={() => window.open(`${BASE_URL}${doc2File}`)}
										/>
									) : (
										<img
											src={`${BASE_URL}${doc2File}`}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}

							{previewDoc2File && (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtDoc2Name === 'pdf' ? (
										<iframe
											src={previewDoc2File}
											frameBorder="0"
											scrolling="auto"
											height="150px"
											width="150px"
										/>
									) : (
										<img
											src={previewDoc2File}
											style={{ height: '150px' }}
										/>
									)}
								</div>
							)}
						</div>
					)}
				/>
			</div>
		</div>
	);
}

export default OfficeWorkForm;
