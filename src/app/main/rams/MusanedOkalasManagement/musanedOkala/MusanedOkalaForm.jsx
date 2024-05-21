import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getAgents, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';

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
	const [previewdoc1Image, setpreviewdoc1Image] = useState('');
	const [previewdoc2Image, setpreviewdoc2Image] = useState('');
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgents());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		if (getValues().musanedOkala_no === undefined) {
			setValue('musanedOkala_no', 'E');
		}
	}, [getValues()]);

	useEffect(() => {
		setpreviewdoc1Image('');
		setpreviewdoc2Image('');
	}, [getValues('musaned_no')]);

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
						getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
						// getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
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

			{/* <Controller
				name="remusanedOkala_charge"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						helperText={errors?.remusanedOkala_charge?.message}
						label="Re MusanedOkala Charge"
						id="remusanedOkala_charge"
						variant="outlined"
						multiline
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/> */}

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
			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Image
					name="doc1_image"
					previewImage={previewdoc1Image}
					setPreviewImage={setpreviewdoc1Image}
					label="Document 1"
				/>
				<Image
					name="doc2_image"
					previewImage={previewdoc2Image}
					setPreviewImage={setpreviewdoc2Image}
					label="Document 2"
				/>
			</div>
		</div>
	);
}

export default MusanedOkalaForm;
