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
import { MANPOWER_BY_PASSENGER_ID } from 'src/app/constant/constants';
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

function ManPowerForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError, getValues, reset } = methods;
	const { errors } = formState;
	const routeParams = useParams();
	const { manPowerId } = routeParams;
	const recruitingAgencys = useSelector((state) => state.data.recruitingAgencys);
	const manpowers = useSelector((state) => state.data.manpowers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const [previewImage, setPreviewImage] = useState('');

	const [reload, setReload] = useState(false);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getRecruitingAgencys());
		dispatch(getCurrentStatuss());
	}, []);

	useEffect(() => {
		setPreviewImage('');
	}, [getValues('recruiting_agency')]);
	useEffect(() => {
		if (manPowerId === 'new') {
			reset({
				passenger: 'all',
				man_power_status: doneNotDone.find((data) => data.default)?.id,
				recruiting_agency: 'all',
				new_visa_no: '',
				bank_name: '',
				bank_account_no: '',
				// new_visa_no: '',
				registration_id: '',
				man_power_date: '',
				submit_date: '',
				current_status: 'all',
				smart_card_image: '',
				delivery_date: ''
			});
		} else {
			console.log('valueForm', getValues());
			// Fetch and set data based on manPowerId if needed
			// reset(formData);
		}
	}, [manPowerId, reset, recruitingAgencys, currentStatuss]);

	useEffect(() => {
		if ((manPowerId !== 'new', !reload)) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios.get(`${MANPOWER_BY_PASSENGER_ID}${manPowerId}`, authTOKEN).then((res) => {
				if (res.data.id) {
					console.log('fromData', res.data);
					reset({
						...setIdIfValueIsObject({
							...res?.data,
							passenger: parseInt(manPowerId, 10),

							man_power_status: doneNotDone.find((data) => data.default)?.id,
							recruiting_agency: res?.data?.recruiting_agency?.id
						})
					});
				}

				setReload(true);
			});
		} else {
			// console.log('valueForm', getValues());
			// Fetch and set data based on manPowerId if needed
			// reset(formData);
		}
	}, [manPowerId, reset, reload]);

	const current_status = sessionStorage.getItem('passengerCurrentStatus');

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
				name="new_visa_no"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						value={field.value || ''}
						error={!!errors.new_visa_no}
						helperText={errors?.new_visa_no?.message}
						label="New Visa No"
						id="new_visa_no"
						variant="outlined"
						InputLabelProps={field.value && { shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="bank_name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.bank_name}
							helperText={errors?.bank_name?.message}
							label="Bank Name"
							id="bank_name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="bank_account_no"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.bank_account_no}
							helperText={errors?.bank_account_no?.message}
							label="Account No"
							id="bank_account_no"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="registration_id"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							value={field.value || ''}
							className="mt-8 mb-16"
							error={!!errors.registration_id}
							helperText={errors?.registration_id?.message}
							label="Registration ID"
							id="registration_id"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							// onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="man_power_status"
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
								placeholder="Select Man Power Status"
								label="Man Power Status"
								error={!!errors.man_power_status}
								helperText={errors?.man_power_status?.message}
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
				name="man_power_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.man_power_date}
						helperText={errors?.man_power_date?.message}
						label="Man Power Date"
						id="man_power_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="submit_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.submit_date}
						helperText={errors?.submit_date?.message}
						label="Submit Date"
						id="submit_date"
						type="date"
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="delivery_date"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						error={!!errors.submit_date}
						helperText={errors?.delivery_date?.message}
						label="Delivery Date"
						id="delivery_date"
						type="date"
						style={{ display: manpowers?.delivery_date ? 'flex' : 'none' }}
						InputLabelProps={{ shrink: true }}
						fullWidth
					/>
				)}
			/>

			<Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value } }) => (
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
								placeholder={current_status === 'undefined' ? 'Select Current Status' : current_status}
								label="Current Status"
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

			<div className="flex justify-center sm:justify-start flex-wrap -mx-16">
				<Image
					name="smart_card_image"
					previewImage={previewImage}
					setPreviewImage={setPreviewImage}
					label="Smart Card Image"
				/>
			</div>
		</div>
	);
}

export default ManPowerForm;
