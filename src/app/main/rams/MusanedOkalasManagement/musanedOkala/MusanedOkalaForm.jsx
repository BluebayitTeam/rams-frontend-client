/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { Autocomplete, Icon, TextField, Typography, Box } from '@mui/material';
import { getAgents, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { doneNotDone } from 'src/app/@data/data';
import clsx from 'clsx';
import DescriptionIcon from '@mui/icons-material/Description';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { PictureAsPdf } from '@mui/icons-material';
import { BASE_URL } from 'src/app/constant/constants';

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

function MusanedOkalaForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { musanedOkalaId } = routeParams;
	const musanedGivenBys = useSelector((state) => state.data.agents);
	const okalaGivenBys = useSelector((state) => state.data.agents);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	// const currentStatuss = useSelector((state) => state.data.currentStatuss);

	const doc1File = watch('doc1_image') || '';
	const doc2File = watch('doc2_image') || '';
	const classes = useStyles(props);
	const [previewDoc2File, setPreviewDoc2File] = useState('');

	const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');

	const [previewDoc1Image, setPreviewDoc1Image] = useState('');

	const [fileExtDoc2Name, setFileExtDoc2Name] = useState('');

	const fileInputdoc1Ref = useRef(null);
	const fileInputdoc2Ref = useRef(null);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgents());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setFileExtDoc1Name('');
		setPreviewDoc1Image('');
	}, [getValues('musaned_no')]);

	const handleRemoveDOC1File = () => {
		setFileExtDoc1Name(null);
		setPreviewDoc1Image(null);
		setValue('doc1_image', '');

		if (fileInputdoc1Ref.current) {
			fileInputdoc1Ref.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};
	const handleRemoveDOC2File = () => {
		setFileExtDoc2Name(null);
		setPreviewDoc2File(null);
		setValue('doc2_image', '');

		if (fileInputdoc2Ref.current) {
			fileInputdoc2Ref.current.value = '';
		}

		console.log('sfsdferwer', getValues());
	};
	return (
		<div>
			<Controller
				name="musaned_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						error={!!errors.name_official}
						helperText={errors?.name_official?.message}
						label="Musaned No."
						id="musaned_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="musaned_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.musaned_date}
						helperText={errors?.musaned_date?.message}
						label="Musaned Date"
						id="musaned_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="musaned_given_by"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? musanedGivenBys?.find((data) => data.id === value) : null}
						// options={musanedOkalaAgencys}
						options={musanedGivenBys}
						// getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Musaned Given By"
								label="Musaned Given By"
								id="musaned_given_by"
								error={!!errors.musaned_given_by}
								helperText={errors?.musaned_given_by?.message}
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
				name="musaned_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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
								placeholder="Select Musaned Status"
								label="Musaned Status"
								id="musaned_status"
								helperText={errors?.musaned_status?.message}
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
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="okala_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.okala_date}
						helperText={errors?.okala_date?.message}
						label="Okala Date"
						id="okala_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="okala_given_by"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? okalaGivenBys.find((data) => data.id === value) : null}
						options={okalaGivenBys}
						getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select okala Given By"
								label="okala Given By"
								id="okala_given_by"
								error={!!errors.okala_given_by}
								helperText={errors?.okala_given_by?.message}
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
				name="okala_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
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
								placeholder="Select Okala Status"
								label="Okala Status"
								id="okala_status"
								helperText={errors?.okala_status?.message}
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
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id === value) : null}
						options={currentStatuss}
						// getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Current Status"
								label="Current Status"
								id="current_status"
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

			{/* <div className="flex justify-start -mx-16 flex-col md:flex-row">
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
			</div> */}
			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Controller
					name="doc1_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
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
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
											/>
										)}
									</div>
								</div>
							)}

							{previewDoc1Image ? (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtDoc1Name && ['pdf', 'doc', 'docx'].includes(fileExtDoc1Name) ? (
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
					name="doc2_image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
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
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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

											if (file) {
												const fileExtension = file.name.split('.').pop().toLowerCase();
												setFileExtDoc2Name(fileExtension);
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
							{!previewDoc2File && doc2File && (
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
										<HighlightOffIcon onClick={handleRemoveDOC2File} />
									</div>
									<div
										style={{ width: 'auto', height: '150px', overflow: 'hidden', display: 'flex' }}
									>
										{typeof doc2File === 'string' &&
										['pdf', 'doc', 'docx'].includes(doc2File.split('.').pop().toLowerCase()) ? (
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													height: '100%'
												}}
											>
												{doc2File.toLowerCase().includes('pdf') ? (
													<PictureAsPdf
														style={{
															color: 'red',
															cursor: 'pointer',
															display: 'block',
															fontSize: '137px',
															margin: 'auto'
														}}
														onClick={() => window.open(`${BASE_URL}${doc2File}`)}
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
														onClick={() => window.open(`${BASE_URL}${doc2File}`)}
													/>
												)}
											</div>
										) : (
											<img
												src={`${BASE_URL}${doc2File}`}
												style={{ height: '100px' }}
											/>
										)}
									</div>
								</div>
							)}

							{previewDoc2File ? (
								<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
									{fileExtDoc2Name && ['pdf', 'doc', 'docx'].includes(fileExtDoc2Name) ? (
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
												<HighlightOffIcon onClick={handleRemoveDOC2File} />
											</div>
											{fileExtDoc2Name === 'pdf' ? (
												<iframe
													src={previewDoc2File}
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
													onClick={() => window.open(previewDoc2File)}
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
												<HighlightOffIcon onClick={handleRemoveDOC2File} />
											</div>
											<img
												src={previewDoc2File}
												style={{ height: '140px', width: '150px' }}
											/>
										</div>
									)}
								</div>
							) : (
								!doc2File && (
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

export default MusanedOkalaForm;
