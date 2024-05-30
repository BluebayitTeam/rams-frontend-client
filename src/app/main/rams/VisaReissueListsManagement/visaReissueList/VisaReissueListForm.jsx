import { Autocomplete, TextField } from '@mui/material';
import { getAgencys, getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

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

function VisaCancelListForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { visaCancelListId } = routeParams;
	const agencys = useSelector((state) => state.data.agencies);
	const okalaGivenBys = useSelector((state) => state.data.agents);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	// const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewdoc1Image, setpreviewdoc1Image] = useState('');
	const [previewdoc2Image, setpreviewdoc2Image] = useState('');
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		if (visaCancelListId === 'new') {
			console.log('asndasdbss', getValues());
			console.log('visaCancelListId', visaCancelListId);
			setValue('current_status', 'all');
			setValue('doc1_image', '');
			setValue('doc2_image', '');
			setpreviewdoc1Image('');
			setpreviewdoc2Image('');
		}
	}, [visaCancelListId]);

	return (
		<div>
			<Controller
				name="agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? agencys.find((data) => data.id === value) : null}
						// options={agencys}
						// getOptionLabel={(option) => `${option.name}`}
						options={[{ id: 'all', name: 'Select name' }, ...agencys]}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Agency"
								label="Agency"
								error={!!errors.agency || !value}
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

			<Controller
				name="submission_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.submission_date}
						helperText={errors?.submission_date?.message}
						label="Submission Date"
						required
						id="submission_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
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
						options={[{ id: 'all', name: 'Select current_status' }, ...currentStatuss]}
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
		</div>
	);
}

export default VisaCancelListForm;
