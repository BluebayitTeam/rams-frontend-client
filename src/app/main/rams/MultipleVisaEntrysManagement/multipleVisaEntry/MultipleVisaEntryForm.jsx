/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Autocomplete, Checkbox, FormControlLabel, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN,
	CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER
} from 'src/app/constant/constants';
import Swal from 'sweetalert2';
import MultiplePassengersTable from './MultiplePassengersTable';
import { useCreateMultipleVisaEntryMutation } from '../MultipleVisaEntrysApi';

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

function MultipleVisaEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const [createMultipleVisaEntry] = useCreateMultipleVisaEntryMutation();

	const { errors } = formState;
	const routeParams = useParams();
	const { multipleVisaEntryId } = routeParams;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const visa_entries = useSelector((state) => state.data.visaEntries);
	const [selectedValueDisable, setSelectedValueDisable] = useState(false);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [showError, setShowError] = useState(false);
	const [availableVisa, setAvailableVisa] = useState(null);
	const [checked, setChecked] = useState(false);
	const [checked1, setChecked1] = useState(false);
	const [checked3, setChecked3] = useState(false);
	const [isChecked, setisChecked] = useState(false);
	console.log('mltPassengerList', mltPassengerList, mltPassengerDeletedId);

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getVisaEntrys());
		dispatch(getAgents());
	}, []);
	const handleChange5 = (event) => {
		setChecked(event.target.checked);
	};
	const handleChange1 = (event) => {
		setChecked1(event.target.checked);
	};
	const handleChange3 = (event) => {
		setChecked3(event.target.checked);
	};

	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList]);

	const handleCheckAvailableVisa = (id, qty) => {
		setShowError(true);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN}${id}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setAvailableVisa(qty - data.visa_entry_passenger_count))
			.catch((err) => {});
	};

	function handleSaveMultipleStatusUpdate(id) {
		if (mltPassengerList?.length >= availableVisa) {
			Swal.fire({
				position: 'top-center',
				icon: 'warning',
				title: `Number of Pax Full for this Calling No`,
				showConfirmButton: false,
				timer: 5000
			});
		} else {
			fetch(`${CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER}/${id}/${watch('visa_entry')}`)
				.then((response) => response.json())
				.then((data) => {
					if (data?.same_visa_entry) {
						Swal.fire({
							position: 'top-center',
							icon: 'warning',
							title: `This Passenger Has Already Been Assigned the same Calling Visa`,
							showConfirmButton: false,
							timer: 5000
						});
					} else if (data?.visa_entry_exist) {
						Swal.fire({
							title: 'Calling Visa Already Assigned for This Passenger',
							text: 'Please Remove the Previous Calling Visa.',
							icon: 'error',
							showConfirmButton: false,
							timer: 5000
						});
					} else {
						setMltPassengerList((prevList) => [...prevList, passengers.find((data) => data?.id === id)]);
					}
				})
				.catch(() => {});
		}
	}

	return (
		<div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="visa_no"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full "
							freeSolo
							value={value ? visa_entries.find((data) => data.id === value) : null}
							options={visa_entries}
							getOptionLabel={(option) => `${option.visa_number} `}
							onChange={(event, newValue) => {
								// onChange({ id: newValue.id });
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Visa No."
									label="Visa No."
									// error={!value}
									autoFocus
									helperText={errors?.agency?.message}
									variant="outlined"
									InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
								/>
							)}
						/>
					)}
				/>
			</div>

			{watch('visa_entry') && (
				<h6 className={`pb-10 ps-5 text-${availableVisa > 0 ? 'green' : 'red'}`}>
					{availableVisa > 0 ? `Available Calling: ${availableVisa}` : 'Calling Not Available'}
				</h6>
			)}

			{/* <Controller
				name="current_status"
				control={control}
				render={({ field: { onChange, value } }) => (
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
								placeholder="Select Current Status"
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
			/> */}
			{/* <Controller
				name="passenger"
				control={control}
				render={({ field: { value, onChange } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full "
						freeSolo
						value={value ? passengers.find((data) => data.id === value) : null}
						options={passengers}
						getOptionLabel={(option) => `${option.passenger_name} - ${option.passport_no}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							setSelectedValueDisable(true);

							// Update mltPassengerList state with the selected passenger
							if (newValue) {
								handleSaveMultipleStatusUpdate(newValue?.id);
							}
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Passenger"
								label="Passenger"
								error={!value}
								helperText={errors?.agency?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/> */}

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<FormControlLabel
					control={
						<Checkbox
							checked1={checked}
							onChange={handleChange1}
						/>
					}
					label="Selection"
					name="select"
					className="mt-8 mb-16 w-full md:w-6/12"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={checked}
							onChange={handleChange5}
						/>
					}
					label="CheckBox"
					name="select"
					className="mt-8 mb-16 w-full md:w-6/12"
				/>
			</div>

			{mltPassengerList?.length > 0 && (
				<div>
					<MultiplePassengersTable
						passengers={mltPassengerList}
						setMltPassengerList={setMltPassengerList}
					/>
				</div>
			)}

			{showError && mltPassengerList?.length >= availableVisa && (
				<h4 style={{ color: 'red' }}>Number of Pax Full for this Calling No</h4>
			)}
		</div>
	);
}

export default MultipleVisaEntryForm;
