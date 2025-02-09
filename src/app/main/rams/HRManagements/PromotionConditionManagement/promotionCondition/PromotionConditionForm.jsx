import { Autocomplete, TextField } from '@mui/material';
import { getDepartments, getDesignations, getEmployees, getJobcategory, getRoles } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';
import { promotionConditionGroups } from 'src/app/@data/data';


function PromotionConditionForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, formState, getValues, watch } = methods;
	const { errors, isValid, dirtyFields } = formState;
	const jobCategorys = useSelector(state => state.data.jobCategorys);
	const designations = useSelector(state => state.data.designations);
	const employees = useSelector(state => state.data.employees);
	const roles = useSelector(state => state.data.roles);
	const departments = useSelector(state => state.data.departments);

	// const handleDelete = localStorage.getItem('promotionConditionEvent');

	useEffect(() => {
		dispatch(getJobcategory());
		dispatch(getDesignations());
		dispatch(getRoles());
		dispatch(getDepartments());
		dispatch(getEmployees());
	}, []);

	return (
		<div>
			{/* Condition Group */}
			<CustomDropdownField
				name="condition_group"
				label="Condition Group"
				options={promotionConditionGroups}
				optionLabelFormat={(option) => `${option?.name}`}
				onChange={(newValue) =>
					setValue('condition_group', newValue)
				}
				required
			/>
			{/* employee */}
			{watch('condition_group') === 'employee' && (
				<Controller
					name="employee"
					control={control}
					render={({ field: { onChange, value, name } }) => {
						return (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								multiple
								filterSelectedOptions
								value={value ? employees.filter(data => value.includes(data.id)) : []}
								options={employees}
								getOptionLabel={option => `${option?.first_name} ${option?.last_name}`}
								onChange={(event, newValue) => {
									const selectedValues = newValue?.map(option => option.id);
									onChange(selectedValues);
								}}
								renderInput={params => {
									return (
										<TextField
											{...params}
											placeholder="Select Employee"
											label="Employee"
											error={!!errors?.employee}
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
						);
					}}
				/>
			)}
			{/* department */}
			{watch('condition_group') === 'department' && (
				<Controller
					name="department"
					control={control}
					render={({ field: { onChange, value, name } }) => {
						return (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								multiple
								filterSelectedOptions
								value={value ? departments.filter(data => value.includes(data.id)) : []}
								options={departments}
								getOptionLabel={option => `${option?.name} `}
								onChange={(event, newValue) => {
									const selectedValues = newValue?.map(option => option.id);
									onChange(selectedValues);
								}}
								renderInput={params => {
									return (
										<TextField
											{...params}
											placeholder="Select Department"
											label="Department"
											error={!!errors?.department}
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
						);
					}}
				/>
			)}
			{/* role */}
			{watch('condition_group') === 'role' && (
				<Controller
					name="role"
					control={control}
					render={({ field: { onChange, value, name } }) => {
						return (
							<Autocomplete
								className="mt-8 mb-16"
								freeSolo
								multiple
								filterSelectedOptions
								value={value ? roles.filter(data => value.includes(data.id)) : []}
								options={roles}
								getOptionLabel={option => `${option?.name}`}
								onChange={(event, newValue) => {
									const selectedValues = newValue?.map(option => option.id);
									onChange(selectedValues);
								}}
								renderInput={params => {
									return (
										<TextField
											{...params}
											placeholder="Select Role"
											label="Role"
											error={!!errors?.role}
											required
											autoFocus
											helperText={errors?.role?.message}
											variant="outlined"
											InputLabelProps={{
												shrink: true
											}}
										/>
									);
								}}
							/>
						);
					}}
				/>
			)}
			{/* Current Designation */}
			<CustomDropdownField
				name="current_designation"
				label="Current Designation"
				options={designations}
				optionLabelFormat={(option) => `${option?.name}`}
				onChange={(newValue) =>
					setValue('current_designation', newValue)
				}
				required
			/>
			{/* Promoted Designation */}
			<CustomDropdownField
				name="promoted_designation"
				label="Promoted Designation"
				options={designations}
				optionLabelFormat={(option) => `${option?.name}`}
				onChange={(newValue) =>
					setValue('promoted_designation', newValue)
				}
				required
			/>
			{/* Duration */}
			<CustomTextField
				name="duration"
				label="Duration (In Month)"
				required
			/>
			{/* Increment Amount */}
			<CustomTextField
				name="increment_amount"
				label="Increment Amount"
				required
			/>
			{/* Note */}
			<CustomTextField
				name="note"
				label="Note"
			/>

		</div>
	);
}

export default PromotionConditionForm;
