/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getCountries, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from 'src/app/@components/FileUploader';
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

function CvFemaleForm(props) {
	const dispatch = useDispatch();
	const userID = localStorage.getItem('user_id');

	const countrys = useSelector((state) => state.data.countries);
	// const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const AllPassengers = useSelector((state) => state.data.passengers);
	const passengers = AllPassengers.filter((data) => data?.gender === 'female' || data?.gender === 'Female');
	const classes = useStyles(props);

	const methods = useFormContext();
	const routeParams = useParams();
	const { cvFemaleId } = routeParams;
	const { control, formState, watch, getValues, reset, setValue } = methods;
	const { errors, isValid, dirtyFields } = formState;
	const [file, setFile] = useState(null);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {}, [watch('date_of_birth')]);

	useEffect(() => {
		const currentImage = getValues('image');

		if (currentImage && !currentImage.name) {
			setFile(`${BASE_URL}/${currentImage}`);
		}
	}, [cvFemaleId, watch('image')]);

	return (
		<div>
			<Controller
				name={cvFemaleId === 'new' ? 'created_by' : 'updated_by'}
				control={control}
				defaultValue={userID}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className={classes.hidden}
							label="created by"
							id="created_by"
							error={false}
							helperText=""
							variant="outlined"
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="passenger"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						fullWidth
						autoHighlight
						value={value ? passengers.find((data) => data.id === value) : null}
						options={passengers}
						getOptionLabel={(option) => `${option.passenger_id} ${option.passenger_name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Passenger"
								label="Passenger"
								// error={!!errors.passenger || !value}
								helperText={errors?.passenger?.message}
								variant="outlined"
								autoFocus
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
								// required
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
						className="mt-8 mb-16 w-full  "
						freeSolo
						value={value ? countrys.find((data) => data.id === value) : null}
						options={countrys}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select  Country"
								label="Country"
								// error={!!errors.country || !value}
								helperText={errors?.country?.message}
								variant="outlined"
								required
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="profession"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.profession}
							helperText={errors?.profession?.message}
							label="Profession"
							id="profession"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="experience_task"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.experience_task}
							helperText={errors?.experience_task?.message}
							label="Experience Task"
							id="experience_task"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="experience_period"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.experience_period}
							helperText={errors?.experience_period?.message}
							label="Experience Period"
							id="experience_period"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="place_of_birth"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.place_of_birth}
							helperText={errors?.place_of_birth?.message}
							label="Place Of Birth"
							id="place_of_birth"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="place_of_residence"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.place_of_residence}
							helperText={errors?.place_of_residence?.message}
							label="Place Of Residence"
							id="place_of_residence"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="number_of_children"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.number_of_children}
							helperText={errors?.number_of_children?.message}
							label="Number Of Children"
							id="number_of_children"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="height"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.height}
							helperText={errors?.height?.message}
							label="Height"
							id="height"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="weight"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.weight}
							helperText={errors?.weight?.message}
							label="weight"
							id="weight"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="education"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.education}
							helperText={errors?.education?.message}
							label="Education"
							id="education"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="post"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.post}
							helperText={errors?.post?.message}
							label="Post"
							id="post"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="arabic_skill"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.arabic_skill}
							helperText={errors?.arabic_skill?.message}
							label="Arabic Skill"
							id="arabic_skill"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="english_skill"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.english_skill}
							helperText={errors?.english_skill?.message}
							label="English Skill"
							id="english_skill"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
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
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.salary}
							helperText={errors?.salary?.message}
							label="Salary"
							id="salary"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="complexion"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.complexion}
							helperText={errors?.complexion?.message}
							label="Complexion"
							id="complexion"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="remarks"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.remarks}
							helperText={errors?.remarks?.message}
							label="Remarks"
							id="remarks"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			{/* <div className="flex justify-center sm:justify-start flex-wrap -mx-0.5">
				<Controller
					name="image"
					control={control}
					render={({ field: { onChange } }) => (
						<div className="flex w-full flex-row items-center justify-center ml-16">
							<div className="flex-col">
								<label
									htmlFor="image-button-file"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
										className="hidden"
										id="image-button-file"
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
			</div> */}
			<div className="text-center">
				<div>
					<FileUpload
						name="image"
						// label="File"
						control={control}
						setValue={setValue}
						setFile={setFile}
						file={file}
						BASE_URL={BASE_URL}
						classes={classes}
					/>
				</div>
			</div>
		</div>
	);
}

export default CvFemaleForm;
