import { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents, getPassengers, getVisaEntrys } from 'app/store/dataSlice';
// Ensure correct import path
import MultiplePassengersTable from './MultiplePassengersTable';

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
	const { control, formState, watch, setValue, getValues } = methods;
	// const [createMultipleVisaEntry] = useCreateMultipleVisaEntryMutation();
	const { errors } = formState;
	const classes = useStyles(props);
	const passengers = useSelector((state) => state.data.passengers);
	const agents = useSelector((state) => state.data.agents);
	const visaEntries = useSelector((state) => state.data.visaEntries);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [checked, setChecked] = useState(false);
	const [checked1, setChecked1] = useState(false);

	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [documentSends, setDocumentSends] = useState([]);
	const [keyData, setKeyData] = useState([]);
	const handleCheckboxSend = (name, checked) => {
		const updatedDocumentSends = documentSends.map((documentSend) =>
			documentSend.key === name ? { ...documentSend, isChecked: checked } : documentSend
		);
		setDocumentSends(updatedDocumentSends);

		const updatedKeyData = [...keyData];
		const documentSend = updatedDocumentSends.find((data) => data?.key === name);

		if (documentSend) {
			const keyIndex = updatedKeyData.indexOf(documentSend.key);

			if (checked && keyIndex === -1) {
				updatedKeyData.push(documentSend.key);
			} else if (!checked && keyIndex !== -1) {
				updatedKeyData.splice(keyIndex, 1);
			}
		}

		setKeyData(updatedKeyData);
		setValue('checkbox', updatedKeyData);
	};
	const handleChange = (e) => {
		const { name, checked } = e.target;
		handleCheckboxSend(name, checked);
	};

	useEffect(() => {
		if (mltPassengerDeletedId) {
			setMltPassengerList(mltPassengerList?.filter((item) => item.id !== mltPassengerDeletedId));
			setMltPassengerDeletedId(null);
		}
	}, [mltPassengerDeletedId]);

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
	console.log('test', getValues());

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
						onDelete={(passengerId) => handleDelete(passengerId)} // Function to handle delete
					/>
				</div>
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
