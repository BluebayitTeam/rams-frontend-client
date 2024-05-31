/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Autocomplete, TextField, Tooltip, tooltipClasses } from '@mui/material';
import { getCurrentStatuss, getPassengers } from 'app/store/dataSlice';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN,
	CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER
} from 'src/app/constant/constants';
import Swal from 'sweetalert2';
import MultiplePassengersTable from './DocmentSendPassengersTable';
import { useCreateDocmentSendMutation } from '../DocmentSendsApi';

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

function DocmentSendForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch, setValue, setError } = methods;
	const [createDocmentSend] = useCreateDocmentSendMutation();

	const { errors } = formState;
	const routeParams = useParams();
	const { docmentSendId } = routeParams;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);
	const docmentSends = useSelector((state) => state.data.docmentSends);
	const [selectedValueDisable, setSelectedValueDisable] = useState(false);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [showError, setShowError] = useState(false);
	const [availableVisa, setAvailableVisa] = useState(null);

	console.log('mltPassengerList', mltPassengerList, mltPassengerDeletedId);

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getCurrentStatuss());
		// dispatch(getDocmentSends());
	}, []);

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
			<Controller
				name="visa_entry"
				control={control}
				render={({ field: { value, onChange } }) => (
					<Autocomplete
						className="mt-8 mb-16 w-full "
						freeSolo
						value={value ? docmentSends.find((data) => data.id === value) : null}
						options={docmentSends}
						getOptionLabel={(option) =>
							`${option.visa_number}-${option.profession_english} - Qty:${option.quantity}-${option.demand?.company_name}`
						}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
							handleCheckAvailableVisa(newValue?.id, newValue?.quantity);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select Calling Visa"
								label="Calling Visa"
								error={!value}
								helperText={errors?.visa_entry?.message}
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			{watch('visa_entry') && (
				<h6 className={`pb-10 ps-5 text-${availableVisa > 0 ? 'green' : 'red'}`}>
					{availableVisa > 0 ? `Available Calling: ${availableVisa}` : 'Calling Not Available'}
				</h6>
			)}

			<Controller
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
			/>
			<Controller
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
			/>

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

export default DocmentSendForm;
