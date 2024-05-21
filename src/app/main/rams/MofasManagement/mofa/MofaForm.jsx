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

function MofaForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { mofaId } = routeParams;
	const mofaAgencys = useSelector((state) => state.data.agencies);
	// const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewImage, setPreviewImage] = useState();
	const [previewImage2, setPreviewImage2] = useState();

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
	}, []);

	useEffect(() => {
		if (getValues().mofa_no === undefined) {
			setValue('mofa_no', 'E');
		}
	}, [getValues()]);

	// useEffect(() => {
	// 	setPreviewImage('');
	// 	setPreviewImage2('');
	// }, [getValues('mofa_agency')]);

	// const increaseMonth = (dateString, months) =>
	// 	new Date(new Date(dateString).setMonth(new Date(dateString).getMonth() + months))
	// 		.toISOString()
	// 		.slice(0, 10)
	// 		.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$3-$2');

	return (
		<div>
			<Controller
				name="mofa_agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? mofaAgencys?.find((data) => data.id === value) : null}
						// options={mofaAgencys}
						options={[{ id: 'all', name: 'Select Mofa Agency' }, ...mofaAgencys]}
						getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Mofa Agency"
								label="Mofa Agency"
								id="mofa_agency"
								helperText={errors?.mofa_agency?.message}
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
				name="mofa_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.mofa_no?.message}
						label="Mofa No"
						id="mofa_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="mofa_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.mofa_date}
						helperText={errors?.mofa_date?.message}
						label="Mofa Date"
						id="mofa_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="remofa_charge"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						helperText={errors?.remofa_charge?.message}
						label="Re Mofa Charge"
						id="remofa_charge"
						variant="outlined"
						multiline
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="remofa_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id === value) : null}
						options={[{ id: 'all', name: 'Select Re Mofa Status' }, ...doneNotDone]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Re Mofa Status"
								label="Re Mofa Status"
								id="remofa_status"
								helperText={errors?.remofa_status?.message}
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
				name="why_remofa"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						helperText={errors?.why_remofa?.message}
						label="Why Re Mofa"
						id="why_remofa"
						variant="outlined"
						multiline
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="mofa_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id === value) : null}
						options={[{ id: 'all', name: 'Select Mofa Status' }, ...doneNotDone]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Mofa Status"
								label="Mofa Status"
								id="mofa_status"
								helperText={errors?.mofa_status?.message}
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

export default MofaForm;
