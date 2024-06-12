/* eslint-disable jsx-a11y/iframe-has-title */
import { Autocomplete, Box, Icon, TextField, Typography } from '@mui/material';
import { getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { doneNotDone } from 'src/app/@data/data';
import increaseMonth from 'src/app/@helpers/increaseMonth';
import { PictureAsPdf } from '@mui/icons-material';
import { BASE_URL } from 'src/app/constant/constants';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';
import clsx from 'clsx';

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

function EmbassyForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const classes = useStyles(props);
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { embassyId } = routeParams;

	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);
	const embassyData = useSelector((state) => state.data.embassys);
	// const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');
	const doc1File = watch('old_visa_image') || '';

	const [previewDoc1Image, setPreviewDoc1Image] = useState('');
	const [fileExtPCName, setFileExtPCName] = useState('');
	const fileInputdoc1Ref = useRef(null);
	const fileInputRef = useRef(null);
	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const slipPic = watch('stamp_visa_pdf') || '';
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getRecruitingAgencys());
	}, []);

	useEffect(() => {
		setFileExtDoc1Name('');
		setPreviewDoc1Image('');
		setFileExtPCName('');
	}, [getValues('musaned_no')]);

	const handleRemoveDOC1File = () => {
		setFileExtDoc1Name(null);
		setPreviewDoc1Image(null);
		setValue('old_visa_image', '');

		if (fileInputdoc1Ref.current) {
			fileInputdoc1Ref.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};

	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('stamp_visa_pdf', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};

	return (
		<div>
			<Controller
				name="recruiting_agency"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? recruitingAgencys.find((data) => data.id === value) : null}
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
								// error={!!errors.recruiting_agency || !value}
								helperText={errors?.recruiting_agency?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// onKeyDown={handleSubmitOnKeyDownEnter}
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
							// error={!!errors.profession_english}
							helperText={errors?.profession_english?.message}
							label="Profession English"
							id="profession_english"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
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
							// onKeyDown={handleSubmitOnKeyDownEnter}
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
							// onKeyDown={handleSubmitOnKeyDownEnter}
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
						value={value ? doneNotDone.find((data) => data.id == value) : null}
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

			{/* <Controller
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
						InputLabelProps={{ shrink: true }}
						style={{ display: embassyData?.embassy?.delivery_date ? 'flex' : 'none' }}
						fullWidth
					/>
				)}
			/> */}

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
						InputLabelProps={{ shrink: true }}
						style={{ display: embassyData?.embassy?.delivery_date ? 'flex' : 'none' }}
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
				name="okala_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						error={!!errors.name_official}
						helperText={errors?.name_official?.message}
						label="Okala No."
						id="okala_no"
						variant="outlined"
						InputProps={{
							readOnly: true
						}}
						fullWidth
					/>
				)}
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
				<Controller
					name="old_visa_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center">Old Visa File</Typography>
								<label
									htmlFor="old_visa_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="old_visa_image-button-file"
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
												alt="old_visa_image"
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
												alt="old_visa_image"
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

				<Controller
					name="stamp_visa_pdf"
					control={control}
					render={({ field: { onChange } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center">Stamp Visa Image</Typography>
								<label
									htmlFor="stamp_visa_pdf-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="stamp_visa_pdf-button-file"
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
												alt="stamp_visa_pdf"
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
												alt="stamp_visa_pdf"
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
			</div>
		</div>
	);
}

export default EmbassyForm;
