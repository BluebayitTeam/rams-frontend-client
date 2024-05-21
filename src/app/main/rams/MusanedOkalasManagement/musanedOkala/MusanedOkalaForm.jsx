import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getAgencys, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { doneNotDone } from 'src/app/@data/data';

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
	const musanedOkalaAgencys = useSelector((state) => state.data.agencies);
	// const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewImage, setPreviewImage] = useState();
	const [previewImage2, setPreviewImage2] = useState();

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
	}, []);

	useEffect(() => {
		if (getValues().musanedOkala_no === undefined) {
			setValue('musanedOkala_no', 'E');
		}
	}, [getValues()]);

	// useEffect(() => {
	// 	setPreviewImage('');
	// 	setPreviewImage2('');
	// }, [getValues('musanedOkala_agency')]);

	// const increaseMonth = (dateString, months) =>
	// 	new Date(new Date(dateString).setMonth(new Date(dateString).getMonth() + months))
	// 		.toISOString()
	// 		.slice(0, 10)
	// 		.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$3-$2');

	return (
		<div>
			<Controller
				name="musanedOkala_agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? musanedOkalaAgencys?.find((data) => data.id === value) : null}
						// options={musanedOkalaAgencys}
						options={[{ id: 'all', name: 'Select MusanedOkala Agency' }, ...musanedOkalaAgencys]}
						getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select MusanedOkala Agency"
								label="MusanedOkala Agency"
								id="musanedOkala_agency"
								helperText={errors?.musanedOkala_agency?.message}
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
				name="musanedOkala_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.musanedOkala_no?.message}
						label="MusanedOkala No"
						id="musanedOkala_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="musanedOkala_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.musanedOkala_date}
						helperText={errors?.musanedOkala_date?.message}
						label="MusanedOkala Date"
						id="musanedOkala_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
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
			/>

			<Controller
				name="remusanedOkala_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id === value) : null}
						options={[{ id: 'all', name: 'Select Re MusanedOkala Status' }, ...doneNotDone]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Re MusanedOkala Status"
								label="Re MusanedOkala Status"
								id="remusanedOkala_status"
								helperText={errors?.remusanedOkala_status?.message}
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
				name="why_remusanedOkala"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						helperText={errors?.why_remusanedOkala?.message}
						label="Why Re MusanedOkala"
						id="why_remusanedOkala"
						variant="outlined"
						multiline
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="musanedOkala_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id === value) : null}
						options={[{ id: 'all', name: 'Select MusanedOkala Status' }, ...doneNotDone]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select MusanedOkala Status"
								label="MusanedOkala Status"
								id="musanedOkala_status"
								helperText={errors?.musanedOkala_status?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>
		</div>
	);
}

export default MusanedOkalaForm;
