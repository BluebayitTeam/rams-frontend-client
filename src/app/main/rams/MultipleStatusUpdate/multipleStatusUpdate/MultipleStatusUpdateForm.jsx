import { Autocomplete, FormControlLabel, Radio, TextField } from '@mui/material';
import { getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import MultiplePassengersTable from './MultiplePassengersTable';

function MultipleStatusUpdateForm() {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, setValue, getValues } = methods;
	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [selectedValue, setSelectedValue] = useState('current_status');
	const [selectedValueDisable, setSelectedValueDisable] = useState(false);
	const currentStatuss = useSelector((state) => state.data.currentStatuss);

	const handleChangeCurrentStatus = (event) => {
		setSelectedValue(event.target.value);
	};
	sessionStorage.setItem('MultipleStatusUpdateFormselectedValue', selectedValue);
	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

	useEffect(() => {
		dispatch(getPassengers());
	}, [dispatch]);

	useEffect(() => {
		setValue(
			'passengers',
			mltPassengerList?.map((data) => data.id)
		);
	}, [mltPassengerList, setValue]);

	const handlePassengerSelect = (newPassenger) => {
		if (newPassenger) {
			if (!mltPassengerList.some((passenger) => passenger.id === newPassenger.id)) {
				setMltPassengerList([...mltPassengerList, newPassenger]);
			}
		}
	};

	return (
		<div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<FormControlLabel
					value="current_status"
					checked={selectedValue === 'current_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="current_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							disabled={selectedValue !== 'current_status'}
							value={value ? currentStatuss.find((data) => data.id === value) : null}
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
									error={!!errors.current_status || (selectedValue === 'current_status' && !value)}
									helperText={errors?.current_status?.message}
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
				<FormControlLabel
					value="medical_result"
					checked={selectedValue === 'medical_result'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="medical_result"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							value={value ? medicalResults.find((data) => data.id === value) : null}
							options={medicalResults}
							disabled={selectedValue !== 'medical_result'}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Medical Status"
									label="Medical Status"
									error={!!errors.current_status || (selectedValue === 'medical_result' && !value)}
									helperText={errors?.current_status?.message}
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
				<FormControlLabel
					value="stamping_status"
					checked={selectedValue === 'stamping_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="stamping_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							value={value ? doneNotDone.find((data) => data.id === value) : null}
							options={doneNotDone}
							disabled={selectedValue !== 'stamping_status'}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Visa Status"
									label="Visa Status"
									error={!!errors.stamping_status || (selectedValue === 'stamping_status' && !value)}
									helperText={errors?.stamping_status?.message}
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
				<FormControlLabel
					value="training_card_status"
					checked={selectedValue === 'training_card_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="training_card_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							value={value ? doneNotDone.find((data) => data.id === value) : null}
							options={doneNotDone}
							disabled={selectedValue !== 'training_card_status'}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Training Status"
									label="Training Status"
									error={
										!!errors.training_card_status ||
										(selectedValue === 'training_card_status' && !value)
									}
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
			</div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<FormControlLabel
					value="man_power_status"
					checked={selectedValue === 'man_power_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="man_power_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							disabled={selectedValue !== 'man_power_status'}
							value={value ? doneNotDone.find((data) => data.id === value) : null}
							options={doneNotDone}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Manpower Status"
									label="Manpower Status"
									error={
										!!errors.man_power_status || (selectedValue === 'man_power_status' && !value)
									}
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
			</div>
			<div className="flex md:space-x-12 flex-col md:flex-row">
				<FormControlLabel
					value="police_clearance_status"
					checked={selectedValue === 'police_clearance_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="police_clearance_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							disabled={selectedValue !== 'police_clearance_status'}
							value={value ? doneNotDone.find((data) => data.id === value) : null}
							options={doneNotDone}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Police Clearance Status"
									label="Police Clearance Status"
									error={
										!!errors.police_clearance_status ||
										(selectedValue === 'police_clearance_status' && !value)
									}
									helperText={errors?.police_clearance_status?.message}
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
				<FormControlLabel
					value="driving_license_status"
					checked={selectedValue === 'driving_license_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="driving_license_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							disabled={selectedValue !== 'driving_license_status'}
							value={value ? doneNotDone.find((data) => data.id === value) : null}
							options={doneNotDone}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Driving License Status"
									label="Driving License Status"
									error={
										!!errors.driving_license_status ||
										(selectedValue === 'driving_license_status' && !value)
									}
									helperText={errors?.driving_license_status?.message}
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
				<FormControlLabel
					value="finger_status"
					checked={selectedValue === 'finger_status'}
					onChange={handleChangeCurrentStatus}
					control={<Radio />}
					className="mt-8 mb-16 w-min	"
				/>
				<Controller
					name="finger_status"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-11/12	"
							freeSolo
							disabled={selectedValue !== 'finger_status'}
							value={value ? doneNotDone.find((data) => data.id === value) : null}
							options={doneNotDone}
							getOptionLabel={(option) => `${option.name}`}
							onChange={(event, newValue) => {
								onChange(newValue?.id);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select Finger Status"
									label="Finger Status"
									error={!!errors.finger_status || (selectedValue === 'finger_status' && !value)}
									helperText={errors?.finger_status?.message}
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

			<Controller
				name="date"
				control={control}
				render={({ field }) => (
					<CustomDatePicker
						field={field}
						label="Date"
						required
						className="mt-8 mb-16 w-full"
						error={!!errors.date}
						helperText={errors?.date?.message}
						placeholder="DD-MM-YYYY"
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
						getOptionLabel={(option) =>
							`${option.passenger_name} ${option.passenger_id}   ${option.passport_no}  ${option.post_office}`
						}
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
	);
}

export default MultipleStatusUpdateForm;
