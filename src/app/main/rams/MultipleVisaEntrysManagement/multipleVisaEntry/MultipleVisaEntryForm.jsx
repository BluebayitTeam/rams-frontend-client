import { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
import Swal from 'sweetalert2';
import {
	CHECK_AVAILABLE_VISA_FOR_CALLING_ASSIGN,
	CHECK_CALLING_ASSIGN_EXIST_IN_PASSENGER
} from 'src/app/constant/constants';
// Ensure correct import path
import { useCreateMultipleVisaEntryMutation } from '../MultipleVisaEntrysApi';

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
	const { control, formState, watch, setValue } = methods;
	const [createMultipleVisaEntry] = useCreateMultipleVisaEntryMutation();
	const { errors } = formState;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const agents = useSelector((state) => state.data.agents);
	const visaEntries = useSelector((state) => state.data.visaEntries);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [availableVisa, setAvailableVisa] = useState(null);
	const [checked, setChecked] = useState(false);
	const [checked1, setChecked1] = useState(false);
	const [showPassengerTable, setShowPassengerTable] = useState(false); // State to control showing passenger table

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getVisaEntrys());
		dispatch(getAgents());
	}, []);

	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList]);

	const handleCheckAvailableVisa = (id, qty) => {
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

	const handleSaveMultipleStatusUpdate = (id) => {
		// Check if the passenger already exists in the list
		const isAlreadySelected = mltPassengerList.some((passenger) => passenger.id === id);

		if (!isAlreadySelected) {
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
						const selectedPassenger = passengers.find((passenger) => passenger.id === id);

						if (selectedPassenger) {
							setMltPassengerList((prevList) => [...prevList, selectedPassenger]);
							setShowPassengerTable(true); // Show table when a passenger is added
						}
					}
				})
				.catch(() => {});
		}
	};

	const handleDeletePassenger = (id) => {
		setMltPassengerList(mltPassengerList.filter((passenger) => passenger.id !== id));
		setShowPassengerTable(mltPassengerList.length > 1); // Hide table when last passenger is removed
	};

	const handleSelectionChange = (event) => {
		setChecked1(event.target.checked);
	};

	const handleCheckboxChange = (event) => {
		setChecked(event.target.checked);
	};

	return (
		<div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="visa_no"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full "
							freeSolo
							value={value ? visaEntries.find((data) => data.id === value) : null}
							options={visaEntries}
							getOptionLabel={(option) => `${option.visa_number} `}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Visa No."
									label="Visa No."
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

			<div className="flex md:space-x-12 flex-col md:flex-row">
				<FormControlLabel
					control={
						<Checkbox
							checked={checked1}
							onChange={handleSelectionChange}
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
							onChange={handleCheckboxChange}
						/>
					}
					label="CheckBox"
					name="select"
					className="mt-8 mb-16 w-full md:w-6/12"
				/>
			</div>

			{checked1 && (
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
								handleSaveMultipleStatusUpdate(newValue?.id);
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
			)}

			{checked && (
				<Controller
					name="agent"
					control={control}
					render={({ field: { value, onChange } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full"
							freeSolo
							value={value ? agents.find((data) => data.id === value) : null}
							options={agents}
							getOptionLabel={(option) => `${option.agent_name} - ${option.agent_code}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Agent"
									label="Agent"
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
			)}
		</div>
	);
}

export default MultipleVisaEntryForm;
