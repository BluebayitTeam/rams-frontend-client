import { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
import MultiplePassengersTable from './MultiplePassengersTable';
// Ensure correct import path

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
	const { control, formState, setValue } = methods;
	const { errors } = formState;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const agents = useSelector((state) => state.data.agents);
	console.log('fksahdkhsdkfh', agents);
	const visaEntries = useSelector((state) => state.data.visaEntries);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [checked, setChecked] = useState(false);
	const [checked1, setChecked1] = useState(false);
	const [filterPassengers, setFilterPassengers] = useState([]);
	const [isChecked, setisChecked] = useState(false);

	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
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

	const handleSelectionChange = (event) => {
		setChecked1(event.target.checked);
	};

	const handleCheckboxChange = (event) => {
		setChecked(event.target.checked);
	};

	const handlePassengerSelect = (newPassenger) => {
		if (newPassenger) {
			if (!mltPassengerList.some((passenger) => passenger.id === newPassenger.id)) {
				setMltPassengerList([...mltPassengerList, newPassenger]);
			}
		}
	};
	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	const handleFilterPassenger = (id) => {
		const filteredPassengers = passengers.filter((passenger) => passenger.agent.id === id);

		setFilterPassengers(filteredPassengers);
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

			{checked && (
				<div
					className="flex md:space-x-12 flex-col md:flex-row"
					style={{ display: checked ? '' : 'none' }}
				>
					<Controller
						name="agent"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full md:w-6/12"
								freeSolo
								value={value ? agents.find((data) => data.id === value) : null}
								options={agents}
								getOptionLabel={(option) => `${option.first_name}  -${option.agent_code}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
									handleFilterPassenger(newValue?.id);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select Agent"
										label="Agent"
										helperText={errors?.agent?.message}
										variant="outlined"
										autoFocus
										InputLabelProps={{
											shrink: true
										}}
									/>
								)}
							/>
						)}
					/>
				</div>
			)}
			<div style={{ display: checked ? '' : 'none' }}>
				{' '}
				{filterPassengers.map((passenger) => (
					<FormControlLabel
						onChange={passenger}
						// onChange={() => handleSaveMultipleVisaEntry(passenger.id)}
						// onChange={(event) =>
						// 	event.target.checked
						// 		? handleSaveMultipleVisaEntry(passenger.id)
						// 		: dispatch(removeMultipleVisaEntryRow(passenger.id))
						// }
						key={passenger.id}
						checked5={isChecked}
						name={passenger.id}
						style={{ width: '45%' }}
						control={<Checkbox />}
						label={`${passenger.passenger_name} ${passenger.passenger_id}   ${passenger.passport_no}  ${passenger.post_office}`}
					/>
				))}
			</div>

			{checked1 && (
				<Controller
					name="passenger"
					control={control}
					render={({ field: { value, onChange } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full"
							freeSolo
							value={value ? passengers.find((data) => data.id === value) : null}
							options={passengers}
							getOptionLabel={(option) => `${option.passenger_name} - ${option.passport_no}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
								handlePassengerSelect(newValue);
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

			{mltPassengerList?.length > 0 && (
				<div>
					<MultiplePassengersTable
						passengers={mltPassengerList}
						setMltPassengerList={setMltPassengerList}
					/>
				</div>
			)}
		</div>
	);
}

export default MultipleVisaEntryForm;
