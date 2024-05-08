/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, Icon, TextField, Tooltip, Typography, tooltipClasses } from '@mui/material';
import { getAgents, getCountries, getDemandCallingEntrys } from 'app/store/dataSlice';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { PictureAsPdf } from '@mui/icons-material';

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

function CallingEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { callingEntryId } = routeParams;
	const classes = useStyles(props);
	const demands = useSelector((state) => state.data.demandCallingEntrys);
	const professions = useSelector((state) => state.data.professions);
	const countries = useSelector((state) => state.data.countries);
	const visaAgents = useSelector((state) => state.data.agents);
	const getCountryCode1 = watch('country_code1');

	const file = watch('file') || '';

	const [previewFile, setPreviewFile] = useState('');
	const [fileExtName, setFileExtName] = useState('');
	useEffect(() => {
		setFileExtName('');
		setPreviewFile('');
	}, [watch('demand')]);
	useEffect(() => {
		dispatch(getDemandCallingEntrys());
		dispatch(getAgents());
		dispatch(getCountries());
	}, []);

	useEffect(() => {
		const country = countries.find((data) => data.name === 'Malaysia' || data.name === 'malaysia')?.id;
		setValue('country', country);
	}, [countries, watch('country')]);
	return (
		<div>
			<Controller
				name="demand"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? demands.find((data) => data.id === value) : null}
						options={demands}
						getOptionLabel={(option) => `${option.profession?.name}(${option.company_name})`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							// dispatch(getCallingEntryByDemand(newValue?.id));
							// setProfession(newValue?.profession?.name);
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
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? countries.find((data) => data.id == value) : null}
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

								//
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
				render={({ field: { onChange, value } }) => (
					<div className="flex w-full flex-row items-center justify-evenly">
						<div className="flex-col">
							<Typography className="text-center">File</Typography>
							<label
								htmlFor={`${name}-button-file`}
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
								)}
							>
								<input
									accept="image/x-png,image/gif,image/jpeg,application/pdf"
									className="hidden"
									id={`${name}-button-file`}
									type="file"
									onChange={async (e) => {
										const reader = new FileReader();
										reader.onload = () => {
											if (reader.readyState === 2) {
												setPreviewFile(reader.result);
											}
										};
										reader.readAsDataURL(e.target.files[0]);

										const file = e.target.files[0];

										setFileExtName(e.target.files[0]?.name?.split('.')?.pop()?.toLowerCase());

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
						{!previewFile && file && (
							<div
								style={{
									width: 'auto',
									height: '150px',
									overflow: 'hidden',
									display: 'flex'
								}}
							>
								{(file?.name || file)?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
									<PictureAsPdf
										style={{
											color: 'red',
											cursor: 'pointer',
											display: 'block',
											fontSize: '35px',
											margin: 'auto'
										}}
										onClick={() => window.open(`${BASE_URL}${file}`)}
									/>
								) : (
									<img
										src={`${BASE_URL}${file}`}
										style={{ height: '150px' }}
									/>
								)}
							</div>
						)}

						{previewFile && (
							<div style={{ width: 'auto', height: '150px', overflow: 'hidden' }}>
								{fileExtName === 'pdf' ? (
									<iframe
										src={previewFile}
										frameBorder="0"
										scrolling="auto"
										height="150px"
										width="150px"
									/>
								) : (
									<img
										src={previewFile}
										style={{ height: '150px' }}
									/>
								)}
							</div>
						)}
					</div>
				)}
			/>
		</div>
	);
}

export default CallingEntryForm;
