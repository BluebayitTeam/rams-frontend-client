/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, Tooltip, tooltipClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getAgents, getCountries, getProfessions } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

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

function ComplainForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { complainId } = routeParams;
	const classes = useStyles(props);

	const professions = useSelector((state) => state.data.professions);
	const countries = useSelector((state) => state.data.countries);
	const visaAgents = useSelector((state) => state.data.agents);
	const agents = useSelector((state) => state.data.agents);

	const image = watch('image');

	const [previewImage, setPreviewImage] = useState(null);
	useEffect(() => {
		dispatch(getProfessions());
		dispatch(getCountries());
		dispatch(getAgents());
	}, []);

	useEffect(() => {}, [watch('date_of_birth')]);

	const handleChnageCountry = (selectedCountry) => {
		const countryID = countries.find((data) => data.name === selectedCountry)?.id;
		setValue('country', countryID);
	};

	return (
		<div>
			<Controller
				name="complainer"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// error={!!errors.complainer || !field.value}
							helperText={errors?.complainer?.message}
							label="Complainer"
							id="complainer"
							variant="outlined"
							InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
							fullWidth
							autoFocus
						/>
					);
				}}
			/>
			<Controller
				name="mobile_of_complainer"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.mobile_of_complainer || !field.value}
							helperText={errors?.mobile_of_complainer?.message}
							label="Mobile"
							id="mobile_of_complainer"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="worker"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.worker || !field.value}
							helperText={errors?.worker?.message}
							label="Worker"
							id="worker"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="relation"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// //error={!!errors.relation || !field.value}
							helperText={errors?.relation?.message}
							label="Relation"
							id="relation"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="passport"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// //error={!!errors.passport || !field.value}
							helperText={errors?.passport?.message}
							label="Passport"
							id="passport"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="visa_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.visa_no || !field.value}
							helperText={errors?.visa_no?.message}
							label="Visa No"
							id="visa_no"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="flight_date"
				control={control}
				render={({ field }) => {
					return (
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
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>
			<Controller
				name="id_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.id_no || !field.value}
							helperText={errors?.id_no?.message}
							label="Id No"
							id="id_no"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="complainer_address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							// //error={!!errors.complainer_address || !field.value}
							helperText={errors?.complainer_address?.message}
							label="Address"
							id="complainer_address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="mobile_of_company"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.mobile_of_company || !field.value}
							helperText={errors?.mobile_of_company?.message}
							label="Mobile"
							id="mobile_of_company"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
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
								id="country"
								//	//error={!!errors.country || !value}
								//
								helperText={errors?.country?.message}
								variant="outlined"
								// autoFocus
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
				name="guardian"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							/// /error={!!errors.guardian || !field.value}
							helperText={errors?.guardian?.message}
							label="guardian"
							id="guardian"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="guardian_address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.guardian_address || !field.value}
							helperText={errors?.guardian_address?.message}
							label="Address"
							id="guardian_address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="company"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full "
						freeSolo
						value={value ? agents.find((data) => data.id == value) : null}
						options={agents}
						getOptionLabel={(option) => `${option.first_name}  -${option.agent_code}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Company"
								label="Company"
								//	//error={!!errors.company || !value}
								//
								id="company"
								helperText={errors?.company?.message}
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
				name="position"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.position || !field.value}
							helperText={errors?.position?.message}
							label="Position"
							id="position"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="agent"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full "
						freeSolo
						value={value ? agents.find((data) => data.id == value) : null}
						options={agents}
						getOptionLabel={(option) => `${option.first_name}  -${option.agent_code}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Agent"
								label="Agent"
								//		//error={!!errors.agent || !value}

								id="agent"
								helperText={errors?.agent?.message}
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
				name="sponsor_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.sponsor_name || !field.value}
							helperText={errors?.sponsor_name?.message}
							label="Sponsor"
							id="sponsor_name"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
			<Controller
				name="solution"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							//	//error={!!errors.solution || !field.value}
							helperText={errors?.solution?.message}
							label="Solution"
							id="solution"
							//
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="complain"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							/// /error={!!errors.complain}
							helperText={errors?.complain?.message}
							label="Complain"
							id="complain"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>
		</div>
	);
}

export default ComplainForm;
