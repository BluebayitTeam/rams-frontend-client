import { Autocomplete, Checkbox, FormControlLabel, Icon, InputAdornment, TextField } from '@mui/material';
import { getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import MultiplePassengersTable from './MultiplePassengersTable';
import { columns } from './data/column';

function DocmentSendForm() {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, setValue, getValues } = methods;
	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);
	const [showError, setShowError] = useState(false);
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
		dispatch(getPassengers());
	}, [dispatch]);

	useEffect(() => {
		setDocumentSends(columns);
	}, []);

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
	return (
		<div>
			<div>
				{documentSends.map((documentSend) => (
					<FormControlLabel
						key={documentSend.key}
						onChange={handleChange}
						checked={documentSend?.isChecked || false}
						name={documentSend.key}
						style={{ width: '45%' }}
						control={<Checkbox />}
						label={`${documentSend.label} `}
					/>
				))}
			</div>

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

			<div>
				<br />

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16"
							type="text"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon
											className="text-20"
											color="action"
										>
											user
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							fullWidth
							InputLabelProps={field.value && { shrink: true }}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default DocmentSendForm;
