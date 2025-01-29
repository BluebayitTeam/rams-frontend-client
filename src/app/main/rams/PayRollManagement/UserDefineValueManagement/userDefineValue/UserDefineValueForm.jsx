import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { getDepartments, getEmployees, getPayheadOnlyUserDefineValue, getUnits } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';


function UserDefineValueForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const [selectedRadio, setSelectedRadio] = useState('');
	const [inputField, setInputField] = useState(false);
	const employees = useSelector(state => state.data.employees);
	const userDefinedValuePayhead = useSelector(state => state.data.userDefinedValuePayhead);
	const departments = useSelector(state => state.data?.departments);
	const units = useSelector(state => state.data?.units);
	const routeParams = useParams();
	const { userdefinevalueId } = routeParams;
	// const history = useHistory();
	const { control, formState, watch, getValues, setValue } = methods;
	const { errors } = formState;

	useEffect(() => {
		dispatch(getEmployees());
		dispatch(getPayheadOnlyUserDefineValue());
		dispatch(getDepartments());
		dispatch(getUnits());
	}, []);

	useEffect(() => {
		if (userdefinevalueId !== 'new') {
			setSelectedRadio(getValues().calculation_for);
			setInputField(true);
		}
	}, [userdefinevalueId, getValues().calculation_for]);


	console.log("all_values", getValues());

	return (
		<div>
			<div className='grid grid-cols-[200px_auto] gap-10'>
				{/* voucher_date */}
				<CustomDatePicker
					name="date"
					label="Date"
					required
					placeholder="DD-MM-YYYY"
				/>
				{/* calculation_for */}
				<Controller
					name="calculation_for"
					control={control}
					render={({ field }) => (
						<FormControl component="fieldset">
							<FormLabel component="legend">How would you like to show?</FormLabel>
							<RadioGroup
								row
								aria-label="position"
								name="position"
								defaultValue="top"
								onChange={event => {
									if (event.target.value == 'all') {
										setSelectedRadio(event.target.value);
										// setSelectedValues('All');
										// setSalaryTable(true);
										setInputField(true);

										setValue('department', []);
										setValue('employee', []);
									} else if (event.target.value == 'department') {
										setSelectedRadio(event.target.value);
										setInputField(true);

										setValue('employee', []);
										// setSelectedValues('');
									} else if (event.target.value == 'employees') {
										setSelectedRadio(event.target.value);
										setInputField(true);

										setValue('department', []);
										// setSelectedValues('');
									} else {
										setSelectedRadio(event.target.value);
										// setSelectedValues('');
									}
								}}
							>
								<FormControlLabel
									{...field}
									value="all"
									control={
										<Radio
											checked={field.value === 'all' ? field.value : false}
											style={{ color: '#22d3ee' }}
										/>
									}
									label="All"
								/>
								<FormControlLabel
									{...field}
									value="department"
									control={
										<Radio
											checked={field.value === 'department' ? field.value : false}
											style={{ color: 'green' }}
										/>
									}
									label="Department"
								/>
								<FormControlLabel
									{...field}
									value="employees"
									control={
										<Radio
											checked={field.value === 'employees' ? field.value : false}
											style={{ color: 'red' }}
										/>
									}
									label="Employees"
								/>
							</RadioGroup>
						</FormControl>
					)}
				/>
			</div>
			{selectedRadio === 'department' && (
				<Controller
					name="department"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16"
							freeSolo
							multiple
							filterSelectedOptions
							value={value ? departments.filter(data => value.includes(data.id)) : []}
							options={departments}
							getOptionLabel={option => `${option?.name}`}
							onChange={(event, newValue) => {
								const selectedValues = newValue.map(option => option.id);
								onChange(selectedValues);
							}}
							renderInput={params => {
								return (
									<TextField
										{...params}
										placeholder="Select departments"
										label="Departments"
										error={!!errors.department}
										required
										autoFocus
										helperText={errors?.department?.message}
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
								);
							}}
						/>
					)}
				/>
			)}
			{selectedRadio === 'employees' && (
				<Controller
					name="employee"
					control={control}
					render={({ field: { onChange, value, name } }) => (
						<Autocomplete
							className="mt-8 mb-16"
							freeSolo
							multiple
							filterSelectedOptions
							value={value ? employees.filter(data => value.includes(data.id)) : []}
							options={employees}
							getOptionLabel={option => `${option?.first_name} ${option?.last_name}`}
							onChange={(event, newValue) => {
								const selectedValues = newValue.map(option => option.id);
								onChange(selectedValues);
							}}
							renderInput={params => {
								return (
									<TextField
										{...params}
										placeholder="Select Employee"
										label="Employee"
										error={!!errors.employee}
										required
										autoFocus
										helperText={errors?.employee?.message}
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
								);
							}}
						/>
					)}
				/>
			)}

			{inputField && (
				<>
					<Controller
						name="payhead"
						control={control}
						render={({ field: { onChange, value, name } }) => (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								value={value ? userDefinedValuePayhead.find(data => data.id === value) : null}
								options={userDefinedValuePayhead}
								getOptionLabel={option => `${option?.name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={params => (
									<TextField
										{...params}
										placeholder="Select Payhead"
										label="Payhead"
										error={!!errors.payhead}
										required
										helperText={errors?.payhead?.message}
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
						name="value"
						control={control}
						render={({ field }) => {
							return (
								<TextField
									{...field}
									className="mt-8 mb-16"
									error={!!errors?.value}
									helperText={errors?.value?.message}
									label="Value"
									id="value"
									required
									autoFocus
									variant="outlined"
									InputLabelProps={field.value && { shrink: true }}
									fullWidth
								/>
							);
						}}
					/>
					<Controller
						name="unit"
						control={control}
						render={({ field: { onChange, value, name } }) => (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								value={value ? units.find(data => data.id === value) : null}
								options={units}
								getOptionLabel={option => `${option?.symbol}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={params => (
									<TextField
										{...params}
										placeholder="Select unit"
										label="Unit"
										error={!!errors.unit}
										required
										helperText={errors?.unit?.message}
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
								)}
							/>
						)}
					/>
				</>
			)}
		</div>
	);
}

export default UserDefineValueForm;
