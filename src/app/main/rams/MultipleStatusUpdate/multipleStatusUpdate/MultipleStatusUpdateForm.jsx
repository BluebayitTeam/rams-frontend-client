import { Autocomplete, TextField } from '@mui/material';
import { getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import MultiplePassengersTable from './MultiplePassengersTable';

function MultipleStatusUpdateForm() {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, setValue, getValues } = methods;
	const { errors } = formState;
	const passengers = useSelector((state) => state.data.passengers);
	const [mltPassengerList, setMltPassengerList] = useState([]);
	const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);

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
