/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStatuss, getMedicalCenters, getPassengers } from 'app/store/dataSlice';
import Image from 'src/app/@components/Image';
import { doneNotDone, medicalResults } from 'src/app/@data/data';

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

function MedicalForm(props) {
	const [previewImage, setPreviewImage] = useState();
	const [previewImage2, setPreviewImage2] = useState();
	const userID = localStorage.getItem('user_id');

	const medicalCenters = useSelector((state) => state.data.medicalCenters);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);

	const classes = useStyles(props);

	const methods = useFormContext();
	const routeParams = useParams();
	const { medicalId, fromSearch } = routeParams;
	const { control, formState, setValue, getValues, watch, reset } = methods;
	const { errors, isValid, dirtyFields } = formState;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getMedicalCenters());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setPreviewImage('');
		setPreviewImage2('');
	}, [getValues('medical_center')]);

	function handleSaveMedical() {
		dispatch(saveMedical(getValues())).then((res) => {
			if (res.payload?.data?.id) {
				localStorage.setItem('medicalAlert', 'saveMedical');
				history.push('/apps/medical-management/medical/new');
				reset({
					medical_card: doneNotDone.find((data) => data.default)?.id,
					medical_result: medicalResults.find((data) => data.default)?.id
				});
				dispatch(setAlert(saveAlertMsg));
			}
		});
	}

	function handleUpdateMedical() {
		dispatch(updateMedical(getValues())).then((res) => {
			if (res.payload?.data?.id) {
				if (fromSearch) {
					history.goBack();
				} else {
					localStorage.setItem('medicalAlert', 'updateMedical');
					history.push('/apps/medical-management/medical/new');
					reset({
						medical_card: doneNotDone.find((data) => data.default)?.id,
						medical_result: medicalResults.find((data) => data.default)?.id
					});
				}
			}
		});
	}

	const handleSubmitOnKeyDownEnter = (ev) => {
		if (ev.key === 'Enter') {
			if (routeParams.medicalId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
				handleSaveMedical();
			} else if (routeParams.medicalId !== 'new' && watch('passenger')) {
				handleUpdateMedical();
			}
		}
	};

	return (
		<div>
			<Controller
				name={medicalId === 'new' ? 'created_by' : 'updated_by'}
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
				name="medical_center"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? medicalCenters.find((data) => data.id == value) : null}
						options={medicalCenters}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Medical Center"
								label="Medical Center"
								// error={!!errors.medical_center || !value}
								helperText={errors?.medical_center?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="medical_serial_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							// error={!!errors.medical_serial_no}
							helperText={errors?.medical_serial_no?.message}
							label="Medical Serial No"
							id="medical_serial_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="medical_result"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? medicalResults.find((data) => data.id === value) : null}
						options={medicalResults}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Medical Result"
								label="Medical Result"
								// error={!!errors.medical_result || !value}
								helperText={errors?.medical_result?.message}
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
				name="medical_card"
				control={control}
				render={({ field: { onChange, value } }) => (
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
								placeholder="Select medical Card"
								label="Medical Card"
								// error={!!errors.medical_card}
								helperText={errors?.medical_card?.message}
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
				name="medical_exam_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.medical_exam_date}
							helperText={errors?.medical_exam_date?.message}
							label="Medical Exam Date"
							id="medical_exam_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="medical_report_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.medical_report_date}
							helperText={errors?.medical_report_date?.message}
							label="Medical Report Date"
							id="medical_report_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="medical_issue_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.medical_issue_date}
							helperText={errors?.medical_issue_date?.message}
							label="Medical Issue Date"
							id="medical_issue_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							onChange={(value) => {
								setValue('medical_expiry_date', increaseMonth(value, 3));
							}}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="medical_expiry_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.medical_expiry_date}
							helperText={errors?.medical_expiry_date?.message}
							label="Medical Expiry Date"
							id="medical_expiry_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? currentStatuss.find((data) => data.id == value) : null}
						options={currentStatuss}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select current status"
								label="Current Status"
								id="current_status"
								// error={!!errors.current_status}
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

			<Controller
				name="notes"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							value={field.value || ''}
							// error={!!errors.notes}
							helperText={errors?.notes?.message}
							label="Notes"
							id="notes"
							variant="outlined"
							multiline
							rows={4}
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<div className="flex justify-start -mx-16 flex-col md:flex-row">
				<Image
					name="slip_pic"
					previewImage={previewImage}
					setPreviewImage={setPreviewImage}
					label="Slip Picture"
				/>
				<Image
					name="medical_card_pic"
					previewImage={previewImage2}
					setPreviewImage={setPreviewImage2}
					label="Medical Card Picture"
				/>
			</div>
		</div>
	);
}

export default MedicalForm;
