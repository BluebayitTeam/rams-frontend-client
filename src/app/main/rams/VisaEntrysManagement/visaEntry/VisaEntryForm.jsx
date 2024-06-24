/* eslint-disable jsx-a11y/alt-text */

import { Autocomplete, Box, Icon, TextField, Typography } from '@mui/material';
import { getAgents, getCountries, getDemandVisaEntrys } from 'app/store/dataSlice';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { PictureAsPdf } from '@mui/icons-material';

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

function VisaEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues } = methods;
	const { errors } = formState;

	const classes = useStyles(props);
	const demands = useSelector((state) => state.data.demandVisaEntrys);

	const countries = useSelector((state) => state.data.countries);
	const visaAgents = useSelector((state) => state.data.agents);

	const file = watch('file') || '';

	const slipPic = watch('file') || '';

	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const [fileExtPCName, setFileExtPCName] = useState('');

	const fileInputRef = useRef(null);

	useEffect(() => {
		dispatch(getDemandVisaEntrys());
		dispatch(getAgents());
		dispatch(getCountries());
	}, []);

	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('file', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};
	return (
		<div>
			<Controller
				name="demand"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? demands.find((data) => data.id === value) : null}
						options={demands}
						getOptionLabel={(option) => `${option?.profession}(${option.company_name})`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);

							setValue('profession_english', newValue?.profession?.name);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Demand"
								label="Demand"
								helperText={errors?.demand?.message}
								variant="outlined"
								autoFocus
								InputLabelProps={{
									shrink: true
								}}
								//
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
						className="mt-8 mb-16"
						freeSolo
						value={value ? countries.find((data) => data.id === value) : null}
						options={countries}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Country"
								label="Country"
								helperText={errors?.country?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="visa_agent"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? visaAgents.find((data) => data.id === value) : null}
						options={visaAgents}
						getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Visa Agent"
								label="Visa Agent"
								helperText={errors?.visa_agent?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								//
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="visa_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.visa_number || !field.value}
							helperText={errors?.visa_number?.message}
							label="Visa No"
							id="visa_number"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_id_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_id_no || !field.value}
							helperText={errors?.sponsor_id_no?.message}
							label="Sponsor ID No"
							id="sponsor_id_no"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="okala_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.okala_no}
							helperText={errors?.okala_no?.message}
							label="Okala No"
							id="okala_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="profession_english"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.profession_english}
							helperText={errors?.profession_english?.message}
							label="Profession English"
							id="profession_english"
							variant="outlined"
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="quantity"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.quantity}
							helperText={errors?.quantity?.message}
							label="Quantity"
							id="quantity"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="visa_issue_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.visa_issue_date}
							helperText={errors?.visa_issue_date?.message}
							label="Visa Issue Date"
							id="visa_issue_date"
							type="date"
							InputLabelProps={{ shrink: true }}
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
				name="group_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.group_no}
							helperText={errors?.group_no?.message}
							label="Group No"
							id="group_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_dob"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.sponsor_dob}
							helperText={errors?.sponsor_dob?.message}
							label="Sponsor Date of Birth"
							id="sponsor_dob"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_name_english"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_name_english}
							helperText={errors?.sponsor_name_english?.message}
							label="Sponsor/Company Name English"
							id="sponsor_name_english"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_name_arabic"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_name_arabic}
							helperText={errors?.sponsor_name_arabic?.message}
							label="Sponsor/Company Name Arabic"
							id="sponsor_name_arabic"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_mobile"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_mobile}
							helperText={errors?.sponsor_mobile?.message}
							label="Sponsor Mobile"
							id="sponsor_mobile"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="sponsor_address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.sponsor_address}
							helperText={errors?.sponsor_address?.message}
							label="Sponsor Address"
							id="sponsor_address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="notes"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.notes}
							helperText={errors?.notes?.message}
							label="Notes"
							id="notes"
							multiline
							rows={4}
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="file"
				control={control}
				render={({ field: { onChange } }) => (
					<div className="flex w-full flex-row items-center justify-center ml-16">
						<div className="flex-col">
							<Typography className="text-center"> File</Typography>
							<label
								htmlFor="file-button-file"
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<input
									accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
									className="hidden"
									id="file-button-file"
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
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden', display: 'flex' }}>
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
											alt="file"
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
											alt="file"
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
	);
}

export default VisaEntryForm;
