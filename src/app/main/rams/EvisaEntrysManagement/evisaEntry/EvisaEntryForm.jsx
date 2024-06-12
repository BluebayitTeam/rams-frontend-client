/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { Autocomplete, Box, Checkbox, FormControlLabel, Icon, TextField, Typography } from '@mui/material';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl } from '@mui/base';
import { activeCncl } from 'src/app/@data/data';
import clsx from 'clsx';
import { BASE_URL } from 'src/app/constant/constants';
import { PictureAsPdf } from '@mui/icons-material';
import MultiplePassengersTable from './MultiplePassengersTable';

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

function EvisaEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { evisaEntryId } = routeParams;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const [fileExtPCName, setFileExtPCName] = useState('');
	const fileInputRef = useRef(null);
	const slipPic = watch('file') || '';
	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('file', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);

	useEffect(() => {
		if (mltPassengerList) {
			setValue(
				'passenger_list',
				mltPassengerList?.map((data) => data.id)
			);
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerList]);

	useEffect(() => {
		if (mltPassengerList) {
			mltPassengerList?.length > 1 ? setValue('is_multi_entry', true) : setValue('is_multi_entry', false);
		}
	}, [mltPassengerList]);
	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCurrentStatuss());
	}, []);

	return (
		<div>
			{evisaEntryId === 'new' && (
				<Controller
					name="is_multi_entry"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								//
								label="Multi Entry"
								control={
									<Checkbox
										{...field}
										checked={field.value ? field.value : false}
									/>
								}
							/>
						</FormControl>
					)}
				/>
			)}

			<Controller
				name="passenger"
				control={control}
				render={({ field: { value, onChange } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full "
						freeSolo
						value={value ? passengers.find((data) => data.id === value) : null}
						options={passengers}
						getOptionLabel={(option) => `${option.passenger_name} - ${option.passport_no}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							setSelectedValueDisable(true);

							// Update mltPassengerList state with the selected passenger
							if (newValue && evisaEntryId === 'new') {
								setMltPassengerList((prevList) => [
									...prevList,
									passengers.find((data) => data?.id === newValue?.id)
								]);
							}
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Passenger"
								label="Passenger"
								error={!value}
								helperText={errors?.agency?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			{evisaEntryId === 'new' && watch('is_multi_entry') && (
				<div>
					<MultiplePassengersTable
						passengers={mltPassengerList}
						setMltPassengerList={setMltPassengerList}
					/>
				</div>
			)}

			<Controller
				name="visa_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
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
				name="issue_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.issue_date}
							helperText={errors?.issue_date?.message}
							label="Issue Date"
							id="issue_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="exp_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.exp_date}
							helperText={errors?.exp_date?.message}
							label="Exp Date"
							id="exp_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
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
								placeholder="Select Current Status"
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

export default EvisaEntryForm;
