import { Autocomplete, Box, Icon, TextField, Typography } from '@mui/material';
import { getAgents, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { BASE_URL, FLIGHT_BY_PASSENGER_ID } from 'src/app/constant/constants';
import axios from 'axios';
import { activeRetrnCncl } from 'src/app/@data/data';
import { PictureAsPdf } from '@mui/icons-material';
import clsx from 'clsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DescriptionIcon from '@mui/icons-material/Description';

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

function FlightForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { flightId } = routeParams;
	const ticketAgencys = useSelector((state) => state.data.agents);

	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const current_status = sessionStorage.getItem('passengerCurrentStatus');
	const classes = useStyles(props);
	const [reload, setReload] = useState(false);
	const [previewslipPicFile, setPreviewslipPicFile] = useState('');
	const [fileExtPCName, setFileExtPCName] = useState('');
	const fileInputRef = useRef(null);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgents());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		if ((flightId !== 'new', !reload)) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios.get(`${FLIGHT_BY_PASSENGER_ID}${flightId}`, authTOKEN).then((res) => {
				if (res.data.id) {
					reset({
						...setIdIfValueIsObject({
							...res?.data,
							passenger: parseInt(flightId, 10),

							ticket_status: activeRetrnCncl.find((data) => data.default)?.id,
							ticket_agency: res?.data?.ticket_agency?.id
						})
					});
				}

				setReload(true);
			});
		}
	}, [flightId, reset, reload]);

	const handleRemoveslipPicFile = () => {
		setPreviewslipPicFile(null);

		setFileExtPCName(null);

		setValue('ticket_file', '');

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};
	const slipPic = watch('ticket_file') || '';

	return (
		<div>
			<Controller
				name="ticket_agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? ticketAgencys?.find((data) => data?.id === value) : null}
						options={ticketAgencys}
						getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Ticket Agency"
								label="Ticket Agency"
								error={!!errors.ticket_agency}
								helperText={errors?.ticket_agency?.message}
								variant="outlined"
								required
								InputLabelProps={params.value && { shrink: true }}
							/>
						)}
					/>
				)}
			/>
			<Controller
				name="carrier_air_way"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.carrier_air_way?.message}
							label="Carrier Air Way"
							id="carrier_air_way"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="flight_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.flight_no?.message}
							label="Flight No"
							id="flight_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="ticket_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.ticket_no?.message}
							label="Ticket No"
							id="ticket_no"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="sector_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.sector_name?.message}
							label="Sector Name"
							id="sector_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="ticket_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? activeRetrnCncl.find((data) => data.id === value) : null}
						options={activeRetrnCncl}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Ticket Status"
								label="Ticket Status"
								helperText={errors?.ticket_status?.message}
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
				name="flight_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.flight_time?.message}
							label="Flight Time"
							id="flight_time"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="arrival_time"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.arrival_time?.message}
							label="Arrival Time"
							id="arrival_time"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="issue_date"
				control={control}
				render={({ field }) => (
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
					/>
				)}
			/>
			<Controller
				name="flight_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.flight_date}
						helperText={errors?.flight_date?.message}
						label="Flight Date"
						id="flight_date"
						type="date"
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

			<Controller
				name="notes"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value?.length > 10 ? field.value?.slice(0, 10) : field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.notes?.message}
							label="Notes"
							id="notes"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="ticket_file"
				control={control}
				render={({ field: { onChange } }) => (
					<div className="flex w-full flex-row items-center justify-center ml-16">
						<div className="flex-col">
							<Typography className="text-center"> Ticket File</Typography>
							<label
								htmlFor="ticket_file-button-file"
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<input
									accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
									className="hidden"
									id="ticket_file-button-file"
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
											alt="ticket_file"
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
											alt="ticket_file"
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

export default FlightForm;
