import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgencys, getCurrentStatuss, getPassengers } from '../../../../store/dataSlice';
import { getVisaSubmissionList } from '../store/visaSubmissionListSlice';

const useStyles = makeStyles(theme => ({
	searchContainer: ({ isPassenger }) => ({
		color: theme.palette.primary.main,
		background: 'transparent',
		borderColor: theme.palette.primary.main,
		cursor: isPassenger && 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid',
		height: '52px',
		width: '52px',
		marginTop: '8px',
		borderRadius: '5px',
		'&:hover': {
			color: isPassenger ? theme.palette.primary.dark : theme.palette.primary.main,
			background: isPassenger ? theme.palette.primary.light : 'transparent',
			borderColor: isPassenger ? theme.palette.primary.dark : theme.palette.primary.main
		},
		'&:active': {
			color: isPassenger ? theme.palette.primary.light : theme.palette.primary.main,
			background: isPassenger ? theme.palette.primary.dark : 'transparent',
			borderColor: isPassenger ? theme.palette.primary.light : theme.palette.primary.main
		}
	})
}));

function VisaSubmissionListForm() {
	const agencys = useSelector(state => state.data.agencies);
	const passengers = useSelector(state => state.data.passengers);

	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const dispatch = useDispatch();

	const classes = useStyles({ isPassenger: watch('passenger') });

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	return (
		<div>
			<Controller
				name="agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? agencys.find(data => data.id == value) : null}
						options={agencys}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select Agency"
								label="Agency"
								error={!!errors.agency || !value}
								helperText={errors?.agency?.message}
								variant="outlined"
								required
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<div className="flex flex-nowrap">
				<Controller
					name="passenger"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16"
							freeSolo
							fullWidth
							autoHighlight
							value={value ? passengers.find(data => data.id == value) : null}
							options={passengers}
							getOptionLabel={option =>
								`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
							}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Passenger"
									label="Passenger"
									error={!!errors.passenger || !value}
									helperText={errors?.passenger?.message}
									variant="outlined"
									required
									InputLabelProps={{
										shrink: true
									}}
								/>
							)}
						/>
					)}
				/>
				<div
					className={classes.searchContainer}
					onClick={() =>
						watch('passenger') && dispatch(getVisaSubmissionList({ passenger: watch('passenger') }))
					}
				>
					<Search />
				</div>
			</div>

			<Controller
				name="submission_date"
				control={control}
				render={({ field }) => {
					return <CustomDatePicker field={field} label="Submission Date" required />;
				}}
			/>
		</div>
	);
}

export default VisaSubmissionListForm;
