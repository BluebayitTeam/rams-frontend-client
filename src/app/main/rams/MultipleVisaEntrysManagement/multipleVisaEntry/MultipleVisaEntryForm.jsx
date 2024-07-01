import { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
import { GET_PASSENGER_BY_AGENTID } from 'src/app/constant/constants';
import MultiplePassengersTable from './MultiplePassengersTable';

function MultipleVisaEntryForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, setValue, watch } = methods;
	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const agents = useSelector((state) => state.data.agents);
	const visaEntries = useSelector((state) => state.data.visaEntries);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [filterPassengers, setFilterPassengers] = useState([]);
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

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	const handleFilterPassenger = (id) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_PASSENGER_BY_AGENTID}${id}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setFilterPassengers(data?.passengers))
			.catch(() => {});
	};

	return (
		<div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<Controller
					name="visa_entry"
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
									helperText={errors?.visa_entry?.message}
									variant="outlined"
									InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
								/>
							)}
						/>
					)}
				/>
			</div>

			<Controller
				name="selection_or_checkbox"
				control={control}
				className="my-10"
				// defaultValue="" // Set the default value here
				render={({ field }) => (
					<RadioGroup
						value={field.value} // Set the value directly
						style={{
							flexDirection: 'row'
						}}
						id="selection_or_checkbox"
						onChange={(e) => {
							field.onChange(e.target.value); // Update the value in the field
							setMltPassengerList([]);
							setFilterPassengers([]);
							setValue('passenger', '');
							setValue('agent', '');
						}}
					>
						<FormLabel
							disabled
							style={{
								marginRight: '1rem',
								marginTop: '1.5rem'
							}}
						>
							Select an option
						</FormLabel>
						<FormControlLabel
							value="selection"
							control={<Radio />}
							label="Selection"
						/>
						<FormControlLabel
							value="checkbox"
							control={<Radio />}
							label="CheckBox"
						/>
					</RadioGroup>
				)}
			/>

			{watch('selection_or_checkbox') === 'checkbox' && (
				<div className="flex md:space-x-12 flex-col md:flex-row">
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

			{watch('selection_or_checkbox') === 'checkbox' && (
				<div>
					{filterPassengers.map((passenger) => (
						<FormControlLabel
							// onChange={passenger}
							// onChange={(event) =>
							// 	event.target.checked
							// 		? handleSaveMultipleVisaEntry(passenger.id)
							// 		: dispatch(removeMultipleVisaEntryRow(passenger.id))
							// }

							key={passenger.id}
							name={passenger.id}
							style={{ width: '45%' }}
							control={<Checkbox />}
							label={`${passenger.passenger_name} ${passenger.passenger_id}   ${passenger.passport_no}  ${passenger.post_office}`}
						/>
					))}
				</div>
			)}
			{watch('selection_or_checkbox') === 'selection' && (
				<div>
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

					{mltPassengerList?.length > 0 && (
						<div>
							<MultiplePassengersTable
								passengers={mltPassengerList}
								setMltPassengerList={setMltPassengerList}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default MultipleVisaEntryForm;
