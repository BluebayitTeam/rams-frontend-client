/* eslint-disable jsx-a11y/alt-text */

import { Autocomplete, TextField } from '@mui/material';
import { getCurrentStatuss, getOfficeCenters, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone, officeResults } from 'src/app/@data/data';
import increaseMonth from 'src/app/@helpers/increaseMonth';
import Image from 'src/app/@components/Image';

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

function OfficeForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues } = methods;
	const [previewImage, setPreviewImage] = useState();
	const [previewImage2, setPreviewImage2] = useState();

	const { errors } = formState;
	// const routeParams = useParams();
	// const { officeId } = routeParams;
	// const classes = useStyles(props);
	const officeCenters = useSelector((state) => state.data.officeCenters);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	// const image = watch('image');

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getOfficeCenters());

		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setPreviewImage('');
		setPreviewImage2('');
	}, [getValues('office_center')]);

	return (
		<div>
			<Controller
				name="office_center"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? officeCenters?.find((data) => data.id === value) : null}
						options={officeCenters}
						getOptionLabel={(option) => `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Office Center"
								label="Office Center"
								id="office_center"
								helperText={errors?.office_center?.message}
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
				name="office_serial_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							helperText={errors?.office_serial_no?.message}
							label="Office Serial No"
							id="office_serial_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
						/>
					);
				}}
			/>

			<Controller
				name="office_result"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? officeResults.find((data) => data.id === value) : null}
						options={officeResults}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Office Result"
								label="Office Result"
								// error={!!errors.office_result || !value}
								helperText={errors?.office_result?.message}
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
				name="office_card"
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
								placeholder="Select office Card"
								label="Office Card"
								// error={!!errors.office_card}
								helperText={errors?.office_card?.message}
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
				name="office_exam_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.office_exam_date}
							helperText={errors?.office_exam_date?.message}
							label="Office Exam Date"
							id="office_exam_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="office_report_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.office_report_date}
							helperText={errors?.office_report_date?.message}
							label="Office Report Date"
							id="office_report_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="office_issue_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.office_issue_date}
							helperText={errors?.office_issue_date?.message}
							label="Office Issue Date"
							id="office_issue_date"
							type="date"
							InputLabelProps={{ shrink: true }}
							onChange={(value) => {
								setValue('office_expiry_date', increaseMonth(value, 3));
							}}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="office_expiry_date"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.office_expiry_date}
							helperText={errors?.office_expiry_date?.message}
							label="Office Expiry Date"
							id="office_expiry_date"
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
						value={value ? currentStatuss.find((data) => data.id === value) : null}
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

			<div className="flex justify-start mx-16 flex-col md:flex-row">
				<Image
					name="slip_pic"
					previewImage={previewImage}
					setPreviewImage={setPreviewImage}
					label="Slip Picture"
				/>
				<Image
					name="office_card_pic"
					previewImage={previewImage2}
					setPreviewImage={setPreviewImage2}
					label="Office Card Picture"
				/>
			</div>
		</div>
	);
}

export default OfficeForm;
