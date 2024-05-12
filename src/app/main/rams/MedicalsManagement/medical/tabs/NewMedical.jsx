/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import { GET_PASSENGER_BY_ID, MEDICAL_BY_PASSENGER_ID } from 'src/app/constant/constants';
// import setIdIfValueIsObject from 'app/@helpers/setIdIfValueIsObject';
import axios from 'axios';
import history from '@history';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';

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

function NewMedical(props) {
	const classes = useStyles(props);
	const methods = useFormContext();
	// const routeParams = useParams();
	const { control, formState, getValues, setError, reset, setValue } = methods;
	const { errors } = formState;

	const passengers = useSelector((state) => state.data.passengers);
	const { fromSearch } = useParams();

	const updateCurrentStatus = (id) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		axios.get(`${GET_PASSENGER_BY_ID}${id}`, authTOKEN).then((res) => {
			setValue('current_status', res.data?.current_status?.id);
		});
	};

	return (
		<FormProvider>
			<div className="flex justify-center w-full px-16 ">
				<Controller
					name="passenger"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className={`w-full max-w-320 h-48 ${classes.container}`}
							freeSolo
							value={value ? passengers.find((data) => data.id === value) : null}
							options={passengers}
							getOptionLabel={(option) =>
								`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
							}
							onChange={(event, newValue) => {
								updateCurrentStatus(newValue?.id);

								if (newValue?.id) {
									const authTOKEN = {
										headers: {
											'Content-type': 'application/json',
											Authorization: localStorage.getItem('jwt_access_token')
										}
									};
									axios
										.get(`${MEDICAL_BY_PASSENGER_ID}${newValue?.id}`, authTOKEN)
										.then((res) => {
											if (res.data.id) {
												reset({
													...setIdIfValueIsObject(res.data),
													passenger: newValue?.id
												});
												history.push(
													`/apps/medical/medical/${newValue?.passenger_id || newValue?.id}`
												);
											} else {
												history.push(`/apps/medical/medicals/new`);
												reset({
													passenger: newValue?.id,
													medical_card: doneNotDone.find((data) => data.default)?.id,
													medical_result: medicalResults.find((data) => data.default)?.id
												});
											}
										})
										.catch(() => {
											history.push(`/apps/medical/medicals/new`);
											reset({
												passenger: newValue?.id,
												medical_card: doneNotDone.find((data) => data.default)?.id,
												medical_result: medicalResults.find((data) => data.default)?.id
											});
										});
								} else {
									history.push(`/apps/medical/medicals/new`);
									reset({
										passenger: newValue?.id,
										medical_card: doneNotDone.find((data) => data.default)?.id,
										medical_result: medicalResults.find((data) => data.default)?.id
									});
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select passengers"
									label="passengers"
									// error={!!errors.country || !value}
									helperText={errors?.passengers?.message}
									variant="outlined"
									InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

									// onKeyDown={handleSubmitOnKeyDownEnter}
								/>
							)}
						/>
					)}
				/>
			</div>
		</FormProvider>
	);
}

export default NewMedical;
