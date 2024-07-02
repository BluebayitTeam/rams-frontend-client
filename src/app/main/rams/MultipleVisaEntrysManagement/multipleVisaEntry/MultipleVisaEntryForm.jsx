import { useEffect, useState } from 'react';
import {
	Autocomplete,
	Checkbox,
	FormControlLabel,
	FormLabel,
	Pagination,
	Radio,
	RadioGroup,
	TextField
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
import { GET_PASSENGER_BY_AGENTID } from 'src/app/constant/constants';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Input from '@mui/material/Input';
import { motion } from 'framer-motion';
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
	const [page, setPage] = useState(1);
	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getVisaEntrys());
		dispatch(getAgents());
	}, []);

	// data send
	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList]);

	const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);

	const handleCheckboxChange = (event, passengerId) => {
		if (event.target.checked) {
			// Add the passenger ID to the state
			setSelectedPassengerIds([...selectedPassengerIds, passengerId]);
		} else {
			// Remove the passenger ID from the state
			setSelectedPassengerIds(selectedPassengerIds.filter((id) => id !== passengerId));
		}
	};
	useEffect(() => {
		setValue('passengers', selectedPassengerIds);
	}, [selectedPassengerIds]);

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

	const handlePageChange = (event, value) => {
		setPage(value);
		// Add any additional logic for fetching new data based on the page number
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
				<div className="flex flex-col md:space-y-12">
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full sm:max-w-400 mb-24 mt-24 mx-24 space-x-8 px-16  border-1 shadow-0"
					>
						<FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
						<Input
							placeholder="Search By Passport Number"
							className="flex flex-1"
							disableUnderline
							fullWidth
							inputProps={{ 'aria-label': 'Search' }}
							onKeyDown={(ev) => {
								if (ev.key === 'Enter') {
									props?.setSearchKey(ev?.target?.value);
								} else if (ev.key === 'Backspace' && ev?.target?.value?.length === 1) {
									props?.setSearchKey('');
								}
							}}
						/>
					</Paper>
					<Controller
						name="agent"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full md:w-6/12"
								freeSolo
								value={value ? agents.find((data) => data.id === value) : null}
								options={agents}
								getOptionLabel={(option) => `${option.first_name} - ${option.agent_code}`}
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
										InputLabelProps={{ shrink: true }}
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
							key={passenger.id}
							name={passenger.id}
							style={{ width: '45%', marginTop: '24px' }}
							control={
								<Checkbox
									checked={selectedPassengerIds.includes(passenger.id)}
									onChange={(e) => handleCheckboxChange(e, passenger.id)}
								/>
							}
							label={`${passenger.passenger_name} ${passenger.passenger_id}   ${passenger.passport_no}  ${passenger.post_office}`}
						/>
					))}
					<div className="mt-24 mb-24 w-full md:w-6/12">
						<Pagination
							count={10}
							page={page}
							onChange={(event, value) => setPage(value)}
							color="primary"
						/>
					</div>
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
