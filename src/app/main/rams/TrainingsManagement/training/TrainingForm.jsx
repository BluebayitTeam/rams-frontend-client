/* eslint-disable jsx-a11y/iframe-has-title */
import { styled } from '@mui/system';
import { Autocomplete, Box, Icon, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material';
import { getCurrentStatuss, getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import { useParams } from 'react-router';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { TRAINING_BY_PASSENGER_ID, BASE_URL } from 'src/app/constant/constants';
import axios from 'axios';
import clsx from 'clsx';
import { PictureAsPdf } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';

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

function TrainingForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { trainingId } = routeParams;
	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	// const [previewDoc1Image, setpreviewDoc1Image] = useState('');
	const [previewCertificateImage, setpreviewCertificateImage] = useState('');
	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const fileInputRef = useRef(null);
	const fileInputdoc1Ref = useRef(null);
	const [fileExtPCName, setFileExtPCName] = useState('');
	const classes = useStyles(props);
	const [reload, setReload] = useState(false);
	const slipPic = watch('doc1_image') || '';

	const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');
	const doc1File = watch('certificate_image') || '';
	const [previewDoc1Image, setPreviewDoc1Image] = useState('');
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getRecruitingAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		// setpreviewDoc1Image('');
		setpreviewCertificateImage('');
	}, [getValues('recruiting_agency')]);
	// useEffect(() => {
	// 	if (trainingId === 'new') {
	// 		reset({
	// 			passenger: 'all',
	// 			training_card_status: doneNotDone.find((data) => data.default)?.id,
	// 			recruiting_agency: 'all',
	// 			training_center: '',
	// 			admission_date: '',
	// 			serial_no: '',
	// 			certificate_no: '',
	// 			certificate_date: '',
	// 			batch_number: '',
	// 			current_status: 'all'
	// 		});
	// 	} else {
	// 		console.log('valueForm', getValues());
	// 		// Fetch and set data based on trainingId if needed
	// 		// reset(formData);
	// 	}
	// }, [trainingId, reset, recruitingAgencys, currentStatuss]);

	useEffect(() => {
		if ((trainingId !== 'new', !reload)) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios.get(`${TRAINING_BY_PASSENGER_ID}${trainingId}`, authTOKEN).then((res) => {
				if (res.data.id) {
					console.log('fromData', res.data);
					reset({
						...setIdIfValueIsObject({
							...res?.data,
							passenger: parseInt(trainingId, 10),

							training_card_status: doneNotDone.find((data) => data.default)?.id,
							recruiting_agency: res?.data?.recruiting_agency?.id
						})
					});
				}

				setReload(true);
			});
		} else {
			// console.log('valueForm', getValues());
			// Fetch and set data based on trainingId if needed
			// reset(formData);
		}
	}, [trainingId, reset, reload]);

	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('doc1_image', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};

	const handleRemoveDOC1File = () => {
		setFileExtDoc1Name(null);
		setPreviewDoc1Image(null);
		setValue('certificate_image', '');

		if (fileInputdoc1Ref.current) {
			fileInputdoc1Ref.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};

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
						options={recruitingAgencys}
						getOptionLabel={(option) => `${option.name}`}
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
				name="training_center"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.training_center?.message}
						label="Training Center"
						id="training_center"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="admission_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.admission_date}
						helperText={errors?.admission_date?.message}
						label="Admission Date"
						id="admission_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="serial_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						error={!!errors.serial_no}
						helperText={errors?.serial_no?.message}
						label="Serial No"
						id="serial_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="certificate_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						error={!!errors.certificate_no}
						helperText={errors?.certificate_no?.message}
						label="Certificate No"
						id="certificate_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="certificate_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.certificate_date}
						helperText={errors?.certificate_date?.message}
						label="Certificate Date"
						id="certificate_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="training_card_status"
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
								placeholder="Select Training Card Status"
								label="Training Card Status"
								error={!!errors.training_card_status}
								helperText={errors?.training_card_status?.message}
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
				name="batch_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.batch_number}
							helperText={errors?.batch_number?.message}
							label="Batch Number"
							id="batch_number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>
			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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

			<div className="flex justify-start mx-16 flex-col md:flex-row">
				<Controller
					name="doc1_image"
					control={control}
					render={({ field: { onChange } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center"> Doc1 Image</Typography>
								<label
									htmlFor="doc1_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="doc1_image-button-file"
										type="file"
										onChange={async (e) => {
											const reader = new FileReader();
											reader.onload = () => {
												if (reader.readyState === 2) {
													setPreviewslipPicFile(reader.result);
												}
											};
											reader.readAsDataURL(e.target.files[0]);

											const file = e.target.files[0];

											if (file) {
												const fileExtension = file.name.split('.').pop().toLowerCase();
												setFileExtPCName(fileExtension);
												onChange(file);
											}

											// Force reset the input value to allow re-uploading the same file
											e.target.value = '';
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
							{!previewslipPicFile && slipPic && (
								<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
									<div
										id="cancelIcon"
										style={{
											position: 'absolute',
											top: '0',
											right: '0',
											zIndex: 1,
											color: 'red',
											cursor: 'pointer',
											backgroundColor: 'white',
											width: '20px',
											height: '20px',
											borderRadius: '50%',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<HighlightOffIcon onClick={handleRemoveslipPicFile} />
									</div>
									<div
										style={{ width: 'auto', height: '150px', overflow: 'hidden', display: 'flex' }}
									>
										{typeof slipPic === 'string' &&
										['pdf', 'doc', 'docx'].includes(slipPic.split('.').pop().toLowerCase()) ? (
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: '100%'
												}}
											>
												{slipPic.toLowerCase().includes('pdf') ? (
													<PictureAsPdf
														style={{
															color: 'red',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${slipPic}`)}
													/>
												) : (
													<DescriptionIcon
														style={{
															color: 'blue',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${slipPic}`)}
													/>
												)}
											</div>
										) : (
											<img
												src={`${BASE_URL}${slipPic}`}
												style={{ height: '100px' }}
												alt="doc1_image"
											/>
										)}
									</div>
								</div>
							)}

							{previewslipPicFile ? (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtPCName && ['pdf', 'doc', 'docx'].includes(fileExtPCName) ? (
										<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
											<div
												id="cancelIcon"
												style={{
													position: 'absolute',
													top: '0',
													right: '0',
													zIndex: 1,
													color: 'red',
													cursor: 'pointer',
													backgroundColor: 'white',
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<HighlightOffIcon onClick={handleRemoveslipPicFile} />
											</div>
											{fileExtPCName === 'pdf' ? (
												<iframe
													src={previewslipPicFile}
													frameBorder="0"
													scrolling="auto"
													height="150px"
													width="150px"
												/>
											) : (
												<DescriptionIcon
													style={{
														color: 'blue',
														cursor: 'pointer',
														display: 'block',
														fontSize: '137px',
														margin: 'auto'
													}}
													onClick={() => window.open(previewslipPicFile)}
												/>
											)}
										</div>
									) : (
										<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
											<div
												id="cancelIcon"
												style={{
													position: 'absolute',
													top: '0',
													right: '0',
													zIndex: 1,
													color: 'red',
													cursor: 'pointer',
													backgroundColor: 'white',
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<HighlightOffIcon onClick={handleRemoveslipPicFile} />
											</div>
											<img
												src={previewslipPicFile}
												style={{ height: '140px', width: '150px' }}
												alt="doc1_image"
											/>
										</div>
									)}
								</div>
							) : (
								!slipPic && (
									<Box
										height={180}
										width={180}
										my={4}
										display="flex"
										alignItems="center"
										gap={4}
										p={2}
										style={{
											width: '150px',
											height: '70px',
											border: '1px solid red'
										}}
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<Typography className="text-sm font-700">
											<span className="mr-4 text-xs text-red-500">
												Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
											</span>
										</Typography>
									</Box>
								)
							)}
						</div>
					)}
				/>

				<Controller
					name="certificate_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center">Certificate Image</Typography>
								<label
									htmlFor="certificate_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="certificate_image-button-file"
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

											if (file) {
												const fileExtension = file.name.split('.').pop().toLowerCase();
												setFileExtDoc1Name(fileExtension);
												onChange(file);
											}

											// Force reset the input value to allow re-uploading the same file
											e.target.value = '';
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
								<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
									<div
										id="cancelIcon"
										style={{
											position: 'absolute',
											top: '0',
											right: '0',
											zIndex: 1,
											color: 'red',
											cursor: 'pointer',
											backgroundColor: 'white',
											width: '20px',
											height: '20px',
											borderRadius: '50%',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<HighlightOffIcon onClick={handleRemoveDOC1File} />
									</div>
									<div
										style={{ width: 'auto', height: '150px', overflow: 'hidden', display: 'flex' }}
									>
										{typeof doc1File === 'string' &&
										['pdf', 'doc', 'docx'].includes(doc1File.split('.').pop().toLowerCase()) ? (
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: '100%'
												}}
											>
												{doc1File.toLowerCase().includes('pdf') ? (
													<PictureAsPdf
														style={{
															color: 'red',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${doc1File}`)}
													/>
												) : (
													<DescriptionIcon
														style={{
															color: 'blue',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${doc1File}`)}
													/>
												)}
											</div>
										) : (
											<img
												src={`${BASE_URL}${doc1File}`}
												style={{ height: '100px' }}
												alt="certificate_image"
											/>
										)}
									</div>
								</div>
							)}

							{previewDoc1Image ? (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{previewDoc1Image && ['pdf', 'doc', 'docx'].includes(fileExtDoc1Name) ? (
										<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
											<div
												id="cancelIcon"
												style={{
													position: 'absolute',
													top: '0',
													right: '0',
													zIndex: 1,
													color: 'red',
													cursor: 'pointer',
													backgroundColor: 'white',
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<HighlightOffIcon onClick={handleRemoveDOC1File} />
											</div>
											{fileExtDoc1Name === 'pdf' ? (
												<iframe
													src={previewDoc1Image}
													frameBorder="0"
													scrolling="auto"
													height="150px"
													width="150px"
												/>
											) : (
												<DescriptionIcon
													style={{
														color: 'blue',
														cursor: 'pointer',
														display: 'block',
														fontSize: '137px',
														margin: 'auto'
													}}
													onClick={() => window.open(previewDoc1Image)}
												/>
											)}
										</div>
									) : (
										<div style={{ display: 'flex', position: 'relative', width: 'fit-content' }}>
											<div
												id="cancelIcon"
												style={{
													position: 'absolute',
													top: '0',
													right: '0',
													zIndex: 1,
													color: 'red',
													cursor: 'pointer',
													backgroundColor: 'white',
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<HighlightOffIcon onClick={handleRemoveDOC1File} />
											</div>
											<img
												src={previewDoc1Image}
												style={{ height: '140px', width: '150px' }}
												alt="certificate_image"
											/>
										</div>
									)}
								</div>
							) : (
								!doc1File && (
									<Box
										height={180}
										width={180}
										my={4}
										display="flex"
										alignItems="center"
										gap={4}
										p={2}
										style={{
											width: '150px',
											height: '70px',
											border: '1px solid red'
										}}
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<Typography className="text-sm font-700">
											<span className="mr-4 text-xs text-red-500">
												Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
											</span>
										</Typography>
									</Box>
								)
							)}
						</div>
					)}
				/>
			</div>
		</div>
	);
}

export default TrainingForm;
