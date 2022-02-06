import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import fillSpaceByUnderscore from 'app/@helpers/fillSpaceByUnderscore';
import { MEDICALCENTER_WHEN_UPDATE } from 'app/constant/constants';
import axios from 'axios';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { saveMedicalCenter, updateMedicalCenter } from '../store/medicalCenterSlice';

const useStyles = makeStyles(theme => ({
	hidden: {
		display: 'none'
	}
}));

function MedicalCenterForm(props) {
	const userID = localStorage.getItem('user_id');

	const madicalId = useSelector(({ medicalCentersManagement }) => medicalCentersManagement.medicalCenter?.id);

	const classes = useStyles(props);

	const methods = useFormContext();
	const routeParams = useParams();
	const { medicalCenterId } = routeParams;
	const { control, formState, getValues, setError } = methods;
	const { errors, isValid, dirtyFields } = formState;
	const history = useHistory();
	const handleDelete = localStorage.getItem('medicalCenterEvent');
	const dispatch = useDispatch();

	function handleSaveMedicalCenter() {
		dispatch(saveMedicalCenter(getValues())).then(res => {
			console.log('saveMedicalCenterRes', res);
			if (res.payload?.data?.id) {
				localStorage.setItem('medicalCenterAlert', 'saveMedicalCenter');
				history.push('/apps/medicalCenter-management/medicalCenters');
			} else if (res.payload?.data?.detail) {
				setError('name', { type: 'manual', message: res.payload.data.detail });
			}
		});
	}

	function handleUpdateMedicalCenter() {
		dispatch(updateMedicalCenter(getValues())).then(res => {
			console.log('updateMedicalCenterRes', res);
			if (res.payload?.data?.id) {
				localStorage.setItem('medicalCenterAlert', 'updateMedicalCenter');
				history.push('/apps/medicalCenter-management/medicalCenters');
			} else if (res.payload?.data?.detail) {
				setError('name', { type: 'manual', message: res.payload.data.detail });
			}
		});
	}

	const handleSubmitOnKeyDownEnter = ev => {
		if (ev.key === 'Enter') {
			if (routeParams.medicalCenterId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
				handleSaveMedicalCenter();
				console.log('saved');
			} else if (handleDelete !== 'Delete' && routeParams?.medicalCenterName) {
				handleUpdateMedicalCenter();
				console.log('updated');
			}
		}
	};

	return (
		<div>
			<Controller
				name={medicalCenterId === 'new' ? 'created_by' : 'updated_by'}
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
				name="name"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.name}
							helperText={errors?.name?.message}
							label="Name"
							id="name"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							required
							onChange={e => {
								if (e.target.value && madicalId) {
									axios
										.get(
											`${MEDICALCENTER_WHEN_UPDATE}?id=${madicalId}&name=${fillSpaceByUnderscore(
												e.target.value
											)}`
										)
										.then(res => {
											if (res.data.name_exists) {
												setError('name', { type: 'manual', message: 'name already exists' });
											}
										});
								}
								field.onChange(e.target.value);
							}}
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							id="email"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="contact_person"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.contact_person}
							helperText={errors?.contact_person?.message}
							label="Contact Person"
							id="contact_person"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="mobile"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.mobile}
							helperText={errors?.mobile?.message}
							label="Mobile"
							id="mobile"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="phone_number"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.phone_number}
							helperText={errors?.phone_number?.message}
							label="Phone Number"
							id="phone_number"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="web_address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.web_address}
							helperText={errors?.web_address?.message}
							label="Web Address"
							id="web_address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="google_map_link"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.google_map_link}
							helperText={errors?.google_map_link?.message}
							label="google Map Link"
							id="google_map_link"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<Controller
				name="address"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16"
							error={!!errors.address}
							helperText={errors?.address?.message}
							label="Address"
							id="address"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>
		</div>
	);
}

export default MedicalCenterForm;
