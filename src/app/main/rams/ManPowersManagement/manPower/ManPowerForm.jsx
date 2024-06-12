import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses, Icon, Typography, Box } from '@mui/material';
import { getCurrentStatuss, getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import { useParams } from 'react-router';
import { PictureAsPdf } from '@mui/icons-material';
import { BASE_URL } from 'src/app/constant/constants';
import clsx from 'clsx';
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

function ManPowerForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const classes = useStyles(props);
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { manPowerId } = routeParams;
	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);
	const manpowers = useSelector((state) => state.data.manpowers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');
	const doc1File = watch('smart_card_image') || '';

	const [previewDoc1Image, setPreviewDoc1Image] = useState('');
	const [reload, setReload] = useState(false);
	const fileInputdoc1Ref = useRef(null);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getRecruitingAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setFileExtDoc1Name('');
		setPreviewDoc1Image('');
	}, [getValues('recruiting_agency')]);

	const current_status = sessionStorage.getItem('passengerCurrentStatus');

	const handleRemoveDOC1File = () => {
		setFileExtDoc1Name(null);
		setPreviewDoc1Image(null);
		setValue('smart_card_image', '');

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
				name="new_visa_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						error={!!errors.new_visa_no}
						helperText={errors?.new_visa_no?.message}
						label="New Visa No"
						id="new_visa_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="bank_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.bank_name}
							helperText={errors?.bank_name?.message}
							label="Bank Name"
							id="bank_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="bank_account_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.bank_account_no}
							helperText={errors?.bank_account_no?.message}
							label="Account No"
							id="bank_account_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="registration_id"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.registration_id}
							helperText={errors?.registration_id?.message}
							label="Registration ID"
							id="registration_id"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="man_power_status"
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
								placeholder="Select Man Power Status"
								label="Man Power Status"
								error={!!errors.man_power_status}
								helperText={errors?.man_power_status?.message}
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
				name="man_power_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.man_power_date}
						helperText={errors?.man_power_date?.message}
						label="Man Power Date"
						id="man_power_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
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
				name="delivery_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.submit_date}
						helperText={errors?.delivery_date?.message}
						label="Delivery Date"
						id="delivery_date"
						type="date"
						style={{ display: manpowers?.delivery_date ? 'flex' : 'none' }}
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
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
								placeholder={current_status === 'undefined' ? 'Select Current Status' : current_status}
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

			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Controller
					name="smart_card_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<Typography className="text-center">Old Visa</Typography>
								<label
									htmlFor="smart_card_image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="smart_card_image-button-file"
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
												alt="smart_card_image"
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
												alt="smart_card_image"
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

export default ManPowerForm;
