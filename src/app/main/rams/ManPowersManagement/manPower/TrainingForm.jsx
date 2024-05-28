import { styled } from '@mui/system';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getCurrentStatuss, getPassengers, getRecruitingAgencys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { doneNotDone } from 'src/app/@data/data';
import Image from 'src/app/@components/Image';
import { useParams } from 'react-router';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { TRAINING_BY_PASSENGER_ID } from 'src/app/constant/constants';
import axios from 'axios';

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

function TrainingForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { trainingId } = routeParams;
	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewDoc1Image, setpreviewDoc1Image] = useState('');
	const [previewCertificateImage, setpreviewCertificateImage] = useState('');
	const [reload, setReload] = useState(false);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getRecruitingAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setpreviewDoc1Image('');
		setpreviewCertificateImage('');
	}, [getValues('recruiting_agency')]);
	useEffect(() => {
		if (trainingId === 'new') {
			reset({
				passenger: 'all',
				training_card_status: doneNotDone.find((data) => data.default)?.id,
				recruiting_agency: 'all',
				training_center: '',
				admission_date: '',
				serial_no: '',
				certificate_no: '',
				certificate_date: '',
				batch_number: '',
				current_status: 'all',
				setpreviewDoc1Image: '',
				setpreviewCertificateImage: ''
			});
		} else {
			console.log('valueForm', getValues());
			// Fetch and set data based on trainingId if needed
			// reset(formData);
		}
	}, [trainingId, reset, recruitingAgencys, currentStatuss]);

	useEffect(() => {
		if ((trainingId !== 'new', !reload)) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios.get(`${TRAINING_BY_PASSENGER_ID}${trainingId}`, authTOKEN).then((res) => {
				if (res.data.id) {
					console.log('fromData', res.data);
					reset({
						...setIdIfValueIsObject({
							...res?.data,
							passenger: parseInt(trainingId, 10),

							training_card_status: doneNotDone.find((data) => data.default)?.id,
							recruiting_agency: res?.data?.recruiting_agency?.id
						})
					});
				}

				setReload(true);
			});
		} else {
			// console.log('valueForm', getValues());
			// Fetch and set data based on trainingId if needed
			// reset(formData);
		}
	}, [trainingId, reset, reload]);

	return (
		<div>
			<Controller
				name="recruiting_agency"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? recruitingAgencys?.find((data) => data.id === value) : null}
						// options={recruitingAgencys}
						options={[{ id: 'all', name: 'Select Recruiting Agency' }, ...recruitingAgencys]}
						getOptionLabel={(option) => option?.id !== 'all' && `${option?.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Recruiting Agency"
								label="Recruiting Agency"
								error={!!errors.recruiting_agency}
								helperText={errors?.recruiting_agency?.message}
								variant="outlined"
								required
								InputLabelProps={params.value && { shrink: true }}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="training_center"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						value={field.value || ''}
						className="mt-8 mb-16"
						helperText={errors?.training_center?.message}
						label="Training Center"
						id="training_center"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="admission_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.admission_date}
						helperText={errors?.admission_date?.message}
						label="Admission Date"
						id="admission_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="serial_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						error={!!errors.serial_no}
						helperText={errors?.serial_no?.message}
						label="Serial No"
						id="serial_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="certificate_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						error={!!errors.certificate_no}
						helperText={errors?.certificate_no?.message}
						label="Certificate No"
						id="certificate_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="certificate_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.certificate_date}
						helperText={errors?.certificate_date?.message}
						label="Certificate Date"
						id="certificate_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="training_card_status"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? doneNotDone.find((data) => data.id == value) : null}
						options={doneNotDone}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Training Card Status"
								label="Training Card Status"
								error={!!errors.training_card_status}
								helperText={errors?.training_card_status?.message}
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
				name="batch_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.batch_number}
							helperText={errors?.batch_number?.message}
							label="Batch Number"
							id="batch_number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
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
						options={[{ id: 'all', name: 'Select Training Center' }, ...currentStatuss]}
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

			<div className="flex justify-start mx-16 flex-col md:flex-row">
				<Image
					name="doc1_image"
					previewImage={previewDoc1Image}
					setPreviewImage={setpreviewDoc1Image}
					label="Doc1 Image"
				/>
				<Image
					name="certificate_image"
					previewImage={previewCertificateImage}
					setPreviewImage={setpreviewCertificateImage}
					label="Certificate Image"
				/>
			</div>
		</div>
	);
}

export default TrainingForm;
