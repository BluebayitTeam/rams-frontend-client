/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, Icon, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getAgents, getCountries, getProfessions } from 'app/store/dataSlice';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { activeCncl } from 'src/app/@data/data';

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
	const [previewImage, setPreviewImage] = useState();
	useEffect(() => {
		dispatch(getProfessions());
		dispatch(getCountries());
		dispatch(getAgents());
	}, []);
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

			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Controller
					name="image"
					control={control}
					render={({ field: { onChange, value } }) => (
						<label
							htmlFor="button-file"
							className={clsx(
								classes.productImageUpload,
								'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
							)}
						>
							<input
								accept="image/*"
								className="hidden"
								id="button-file"
								type="file"
								onChange={async (e) => {
									const reader = new FileReader();
									reader.onload = () => {
										if (reader.readyState === 2) {
											setPreviewImage(reader.result);
										}
									};
									reader.readAsDataURL(e.target.files[0]);

									const file = e.target.files[0];
									onChange(file);
								}}
							/>
							<Icon
								fontSize="large"
								color="action"
								label="Demand Image"
							>
								cloud_upload
							</Icon>
						</label>
					)}
				/>
				{image && !previewImage && <img src={`${BASE_URL}${image}`} />}

				<div style={{ width: '300px', height: '300px' }}>
					<img src={previewImage} />
				</div>
			</div>
		</div>
	);
}

export default DemandForm;
