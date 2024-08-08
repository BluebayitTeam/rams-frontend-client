import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getCities } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

function PoliceStationForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;
	const citys = useSelector((state) => state.data.cities);
	useEffect(() => {
		dispatch(getCities());
	}, []);
	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Name"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message}
					/>
				)}
			/>

			<Controller
				name="city"
				control={control}
				render={({ field: { onChange, value, name } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? citys.find((data) => data.id === value) : null}
						options={citys}
						getOptionLabel={(option) => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select City"
								label="City"
								helperText={errors?.city?.message}
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}

								// onKeyDown={handleSubmitOnKeyDownEnter}
							/>
						)}
					/>
				)}
			/>
		</div>
	);
}

export default PoliceStationForm;
