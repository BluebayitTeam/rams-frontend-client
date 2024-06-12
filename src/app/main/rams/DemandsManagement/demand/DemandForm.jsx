/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, Box, Icon, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material';
import { getAgents, getCountries, getProfessions } from 'app/store/dataSlice';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { activeCncl } from 'src/app/@data/data';
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

function DemandForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { demandId } = routeParams;
	const classes = useStyles(props);
	const professions = useSelector((state) => state.data.professions);
	const countries = useSelector((state) => state.data.countries);
	const visaAgents = useSelector((state) => state.data.agents);
	const getCountryCode1 = watch('country_code1');
	const image = watch('image');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const file = watch('file') || '';
	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const [fileExtPCName, setFileExtPCName] = useState('');

	const slipPic = watch('file') || '';
	const fileInputRef = useRef(null);
	useEffect(() => {
		dispatch(getProfessions());
		dispatch(getCountries());
		dispatch(getAgents());
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
				name="country"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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
								// error={!!errors.country || !value}
								helperText={errors?.country?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="visa_agent"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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
								// error={!!errors.visa_agent || !value}
								helperText={errors?.visa_agent?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="company_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.company_name || !field.value}
							helperText={errors?.company_name?.message}
							label="Company Name"
							id="company_name"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="profession"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? professions.find((data) => data.id === value) : null}
						options={professions}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Profession"
								label="Profession"
								helperText={errors?.profession?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="demand_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.demand_no?.message}
							label="Demand No"
							id="demand_no"
							type="number"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
							helperText={errors?.quantity?.message}
							label="Quantity"
							id="quantity"
							type="number"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
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
							className="mt-8 mb-16"
							helperText={errors?.salary?.message}
							label="Salary"
							id="salary"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="purchase_rate"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.purchase_rate?.message}
							label="Purchase Rate"
							id="purchase_rate"
							type="number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="purchase_foreign_corrency"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.purchase_foreign_corrency?.message}
							label="Purchase Foreign Corrency"
							id="purchase_foreign_corrency"
							type="number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="office_rate"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							helperText={errors?.office_rate?.message}
							label="Office Rate"
							id="office_rate"
							type="number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? activeCncl.find((data) => data.id === value) : null}
						options={activeCncl}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Status"
								label="Status"
								id="status"
								helperText={errors?.status?.message}
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

export default DemandForm;
