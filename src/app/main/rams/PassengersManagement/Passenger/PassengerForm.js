import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Autocomplete } from '@material-ui/lab';
import CustomDatePicker from 'app/@components/CustomDatePicker';
import Image from 'app/@components/Image.jsx';
import useTextSeparator from 'app/@customHooks/useTextSeparator';
import { genders, maritalStatuses, passportTypes, religions } from 'app/@data/data';
import increaseYear from 'app/@helpers/increaseYear';
import replaceSpaceToUnderscore from 'app/@helpers/replaceSpaceToUnderscore';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL, CHECK_PASSPORT_NO_WHEN_CREATE, CHECK_PASSPORT_NO_WHEN_UPDATE } from '../../../../constant/constants';
import {
	getAgencys,
	getAgents,
	getCities,
	getCountries,
	getCurrentStatuss,
	getDemands,
	getPassengerTypes,
	getProfessions,
	getThanas,
	getThanasBasedOnCity,
	getVisaEntrys
} from '../../../../store/dataSlice';
import { savePassenger, updatePassenger } from '../store/passengerSlice';
import ImageToText from './ImageToText';

const useStyles = makeStyles(theme => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function PassengerForm(props) {
	const [previewImage1, setPreviewImage1] = useState();
	const [previewImage2, setPreviewImage2] = useState();
	const userID = localStorage.getItem('user_id');
	const agents = useSelector(state => state.data.agents);
	const demands = useSelector(state => state.data.demands);
	const professions = useSelector(state => state.data.professions);
	const agencys = useSelector(state => state.data.agencies);
	const targetCountrys = useSelector(state => state.data.countries);
	const passengerTypes = useSelector(state => state.data.passengerTypes);
	const currentStatuss = useSelector(state => state.data.currentStatuss);
	const visaEntrys = useSelector(state => state.data.visaEntries);
	const thanas = useSelector(state => state.data.thanas);
	const districts = useSelector(state => state.data.cities);
	const classes = useStyles(props);
	const methods = useFormContext();
	const { control, formState, watch, getValues, setError, setValue, reset } = methods;
	const { errors, isValid, dirtyFields } = formState;
	const routeParams = useParams();
	const { passengerId } = routeParams;
	const history = useHistory();
	const handleDelete = localStorage.getItem('passengerEvent');
	const dispatch = useDispatch();

	const { passengerName } = useParams();

	const passportPic = watch('passport_pic');

	const [passportText, setPassportText] = useState('');

	const {
		passenger_name,
		father_name,
		mother_name,
		spouse_name,
		passport_no,
		passport_expiry_date,
		passport_issue_date,
		permanentAddress,
		date_of_birth,
		nid,
		village,
		post_office,
		police_station,
		district,
		gender,
		marital_status,
		contact_no
	} = useTextSeparator(passportText);

	const childSubmitFunc = useRef(null);

	useEffect(() => {
		if (!_.isEmpty(passengerTypes) && routeParams?.passengerType) {
			const getPassengerType = passengerTypes.find(data => {
				const passengerTypeName = new RegExp(data.name, 'i');
				const isMatch = replaceSpaceToUnderscore(routeParams.passengerType).match(passengerTypeName);
				if (isMatch) return true;
				else return false;
			})?.id;
			setValue('passenger_type', getPassengerType);
		}
	}, [passengerTypes]);

	useEffect(() => {
		if (!_.isEmpty(thanas)) {
			const getPspIssPlace = thanas.find(data => data.name === 'Dhaka' || data.name === 'dhaka')?.id;

			setValue('passport_issue_place', getPspIssPlace);
		}
	}, [thanas]);

	useEffect(() => {
		console.log('insideEffect');
		console.log('separetedText', {
			passenger_name,
			father_name,
			mother_name,
			spouse_name,
			passport_no,
			passport_expiry_date,
			passport_issue_date,
			permanentAddress,
			date_of_birth,
			nid,
			village,
			post_office,
			police_station,
			district,
			gender,
			marital_status,
			contact_no
		});

		const getPlaceOfResidence = districts.find(data => {
			const districtName = new RegExp(data.name, 'i');
			const isMatch = district.match(districtName);
			if (isMatch) return true;
			else return;
		})?.name;

		const getDistrict = districts.find(data => {
			const districtName = new RegExp(data.name, 'i');
			const isMatch = district.match(districtName);
			if (isMatch) return true;
			else return false;
		})?.id;

		const getPoliceStation = thanas.find(data => {
			const PoliceStationName = new RegExp(data.name, 'i');
			const isMatch = police_station.match(PoliceStationName);
			if (isMatch) return true;
			else return;
		})?.id;

		reset({
			...getValues(),
			passenger_name,
			father_name,
			mother_name,
			spouse_name,
			passport_no,
			passport_expiry_date,
			passport_issue_date,
			permanentAddress,
			date_of_birth,
			nid,
			village,
			post_office,
			police_station: getPoliceStation,
			passport_issue_place: getPoliceStation,
			district: getDistrict,
			gender,
			marital_status,
			place_of_residence: getPlaceOfResidence,
			contact_no
		});
	}, [
		passenger_name,
		father_name,
		mother_name,
		spouse_name,
		passport_no,
		passport_expiry_date,
		passport_issue_date,
		permanentAddress,
		date_of_birth,
		nid,
		village,
		post_office,
		police_station,
		district,
		gender,
		marital_status,
		contact_no
	]);

	useEffect(() => {
		dispatch(getAgents());
		dispatch(getDemands());
		dispatch(getAgencys());
		dispatch(getCountries());
		dispatch(getPassengerTypes());
		dispatch(getCurrentStatuss());
		dispatch(getVisaEntrys());
		dispatch(getThanas());
		dispatch(getCities());
		dispatch(getProfessions());
	}, []);

	function checkPassportNoDuplicate(passportNo) {
		if (routeParams.passengerId === 'new') {
			axios.get(`${CHECK_PASSPORT_NO_WHEN_CREATE}?passport_no=${passportNo}`).then(res => {
				if (res.data.passport_no_exists) {
					setError('passport_no', {
						type: 'manual',
						message: 'Passport No Already Exists'
					});
				}
			});
		} else if (handleDelete !== 'Delete' && routeParams?.passengerName) {
			axios.get(`${CHECK_PASSPORT_NO_WHEN_UPDATE}?passport_no=${passportNo}&id=${getValues().id}`).then(res => {
				console.log('passportCheckRes', res);
				if (res.data.passport_no_exists) {
					setError('passport_no', {
						type: 'manual',
						message: 'Passport No Already Exists'
					});
					props.setDisableUpdate(true);
				} else {
					props.setDisableUpdate(false);
				}
			});
		}
	}

	function handleSavePassenger() {
		dispatch(
			savePassenger({
				...getValues(),
				passport_issue_place: thanas.find(data => data?.id == getValues()?.passport_issue_place)?.name
			})
		).then(res => {
			console.log('savePassengerRes', res);
			if (res.payload?.data?.id) {
				localStorage.setItem('passengerAlert', 'savePassenger');
				history.push(`/apps/passenger-management/passengers/${routeParams.passengerType}`);
			}
		});
	}

	useEffect(() => {
		passport_no && checkPassportNoDuplicate(passport_no);
	}, [passport_no]);

	function handleUpdatePassenger() {
		dispatch(
			updatePassenger({
				...getValues(),
				passport_issue_place: thanas.find(data => data?.id == getValues()?.passport_issue_place)?.name
			})
		).then(res => {
			console.log('updatePassengerRes', res);
			if (res.payload?.data?.id) {
				if (passengerName === 'fromSearch') {
					history.goBack();
				} else {
					localStorage.setItem('passengerAlert', 'updatePassenger');
					history.push(`/apps/passenger-management/passengers/${routeParams.passengerType}`);
				}
			}
		});
	}

	const handleSubmitOnKeyDownEnter = ev => {
		if (ev.key === 'Enter') {
			if (routeParams.passengerId === 'new' && !(_.isEmpty(dirtyFields) || !isValid)) {
				handleSavePassenger();
				console.log('saved');
			} else if (handleDelete !== 'Delete' && routeParams?.passengerName && !props.disableUpdate) {
				handleUpdatePassenger();
				console.log('updated');
			}
		}
	};

	return (
		<div>
			<Controller
				name={passengerId === 'new' ? 'created_by' : 'updated_by'}
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

			<div className="flex flex-col md:flex-row w-full mt-8 mb-16">
				<Controller
					name="passport_pic"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-row justify-between w-full items-center">
							<label
								htmlFor="button-file-1"
								style={{ boxShadow: '0px 0px 20px -10px}' }}
								className={clsx(
									classes.productImageUpload,
									'flex items-center justify-center relative w-80 h-60 rounded-12 overflow-hidden cursor-pointer hover:shadow-lg'
								)}
							>
								<input
									accept="image/*"
									className="hidden"
									id="button-file-1"
									type="file"
									onChange={async e => {
										const reader = new FileReader();
										reader.onload = () => {
											if (reader.readyState === 2) {
												setPreviewImage1(reader.result);
											}
										};
										reader.readAsDataURL(e.target.files[0]);

										const file = e.target.files[0];
										onChange(file);
										childSubmitFunc.current(URL.createObjectURL(e.target.files[0]));
									}}
								/>
								<Icon fontSize="large" color="action">
									cloud_upload
								</Icon>
							</label>

							<ImageToText
								text={passportText}
								setText={setPassportText}
								childSubmitFunc={childSubmitFunc}
							/>
						</div>
					)}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="agent"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? agents.find(data => data.id == value) : null}
							options={agents}
							getOptionLabel={option => `${option.first_name} ${option.last_name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Agent"
									label="Agent"
									error={!!errors.agent || !value}
									required
									helperText={errors?.agent?.message}
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
					name="passenger_type"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							disabled={true}
							value={value ? passengerTypes.find(data => data.id == value) : null}
							options={passengerTypes}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Passenger Type"
									label="Passenger Type"
									error={!!errors.passenger_type || !value}
									required
									helperText={errors?.passenger_type?.message}
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
									// onKeyDown={handleSubmitOnKeyDownEnter}
								/>
							)}
						/>
					)}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="passenger_name"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								error={!!errors.passenger_name || !field.value}
								helperText={errors?.passenger_name?.message}
								label="Passenger Name"
								id="passenger_name"
								required
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>

				<Controller
					name="father_name"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Father Name"
								id="father_name"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="mother_name"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Mother Name"
								id="mother_name"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
				<Controller
					name="spouse_name"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Spouse Name"
								id="spouse_name"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="date_of_birth"
					control={control}
					render={({ field }) => (
						<CustomDatePicker
							field={field}
							label="Date Of Birth"
							className="mt-8 mb-16 w-full md:w-6/12"
							required
						/>
					)}
				/>
				<Controller
					name="gender"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? genders.find(data => data.id == value) : null}
							options={genders}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Gender"
									label="Gender"
									error={!!errors.gender || !value}
									required
									helperText={errors?.gender?.message}
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="marital_status"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? maritalStatuses.find(data => data.id == value) : null}
							options={maritalStatuses}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Marital Status"
									label="Marital Status"
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
					name="contact_no"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Contact No"
								id="contact_no"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="district"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? districts.find(data => data.id == value) : null}
							options={districts}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
								dispatch(getThanasBasedOnCity(newValue?.id));
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select District"
									label="District"
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
					name="police_station"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? thanas.find(data => data.id == value) : null}
							options={thanas}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Police Station"
									label="Police Station"
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="post_office"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Post Office"
								id="post_office"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
				<Controller
					name="village"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Village"
								id="village"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="nid"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="NID"
								id="nid"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
				<Controller
					name="place_of_birth"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Place Of Birth"
								id="place_of_birth"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="religion"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? religions.find(data => data.id == value) : null}
							options={religions}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Religion"
									label="Religion"
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
					name="profession"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? professions.find(data => data.id == value) : null}
							options={professions}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Profession"
									label="Profession"
									error={!!errors.profession || !value}
									required
									helperText={errors?.profession?.message}
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="agency"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
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
									required
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
					name="demand"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? demands.find(data => data.id == value) : null}
							options={demands}
							getOptionLabel={option => `${option.company_name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Demand"
									label="Demand"
									error={!!errors.demand || !value}
									required
									helperText={errors?.demand?.message}
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="target_country"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? targetCountrys.find(data => data.id == value) : null}
							options={targetCountrys}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Target Country"
									label="Target Country"
									error={!!errors.target_country || !value}
									required
									helperText={errors?.target_country?.message}
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
					name="visa_entry"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? visaEntrys.find(data => data.id == value) : null}
							options={visaEntrys}
							getOptionLabel={option => `${option.visa_number}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Visa Entry"
									label="Visa Entry"
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="current_status"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? currentStatuss.find(data => data.id == value) : null}
							options={currentStatuss}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Current Status"
									label="Current Status"
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
					name="emergency_contact_no"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Emergency Contact No"
								id="emergency_contact_no"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<div className="flex">
				<Typography color="textSecondary" className="text-base mt-3 mb-2">
					Passport Information
				</Typography>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="passport_no"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								error={!!errors.passport_no || !field.value}
								helperText={errors?.passport_no?.message}
								label="Passport No"
								id="passport_no"
								required
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
								onChange={(event, newValue) => {
									field.onChange(event.target.value);
									checkPassportNoDuplicate(event.target.value);
								}}
							/>
						);
					}}
				/>

				<Controller
					name="passport_type"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? passportTypes.find(data => data.id == value) : null}
							options={passportTypes}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Passport Type"
									label="Passport Type"
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="passport_issue_date"
					control={control}
					render={({ field }) => {
						return (
							<CustomDatePicker
								field={field}
								label="Passport Issue Date"
								className="mt-8 mb-16 w-full md:w-6/12"
								onChange={value => {
									setValue('passport_expiry_date', increaseYear(value, 5));
								}}
							/>
						);
					}}
				/>
				<Controller
					name="passport_expiry_date"
					control={control}
					render={({ field }) => {
						return (
							<CustomDatePicker
								field={field}
								label="Passport Expiry Date"
								className="mt-8 mb-16 w-full md:w-6/12"
								readOnly
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="passport_issue_place"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full md:w-6/12"
							freeSolo
							value={value ? thanas.find(data => data.id == value || data.name == value) : null}
							options={thanas}
							getOptionLabel={option => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={params => (
								<TextField
									{...params}
									placeholder="Select Passport Issue Place"
									label="Passport Issue Place"
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
					name="place_of_residence"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full md:w-6/12"
								label="Place Of Residence"
								id="place_of_residence"
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
								onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						);
					}}
				/>
			</div>

			<Controller
				name="office_serial"
				control={control}
				render={({ field }) => {
					return (
						<TextField
							{...field}
							className="mt-8 mb-16 w-full"
							label="Office Serial"
							id="office_serial"
							variant="outlined"
							InputLabelProps={field.value && { shrink: true }}
							fullWidth
							onKeyDown={handleSubmitOnKeyDownEnter}
						/>
					);
				}}
			/>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="notes"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16 w-full"
								label="Notes"
								id="notes"
								variant="outlined"
								multiline
								rows={3}
								InputLabelProps={field.value && { shrink: true }}
								fullWidth
							/>
						);
					}}
				/>
			</div>

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<div className="flex flex-wrap w-full md:w-6/12 my-2 justify-evenly items-center">
					{passportPic && !previewImage1 && (
						<div style={{ width: '100px', height: '100px' }}>
							<img src={`${BASE_URL}${passportPic}`} />
						</div>
					)}

					<div style={{ width: '100px', height: '100px' }}>
						<img
							src={previewImage1}
							//alt="no image found"
						/>
					</div>
				</div>

				<div className="flex flex-wrap w-full md:w-6/12 my-2 justify-evenly">
					<Image
						name="passenger_pic"
						label="Passenger Picture"
						previewImage={previewImage2}
						setPreviewImage={setPreviewImage2}
					/>
				</div>
			</div>
		</div>
	);
}

export default PassengerForm;
