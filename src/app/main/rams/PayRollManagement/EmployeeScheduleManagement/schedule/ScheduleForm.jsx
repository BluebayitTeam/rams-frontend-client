import _ from '@lodash';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { getDepartments, getEmployeeByDept, getEmployees, getShifts } from 'app/store/dataSlice';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';

const useStyles = makeStyles(theme => ({
	pageContainer: {
		display: 'flex',
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	clmsContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		maxHeight: 'calc(75vh - 180px)',
		transition: '1s',
		alignContent: 'flex-start',
		marginTop: '5px',
		marginBottom: '5px'
	},
	clmsContainerShift: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		maxHeight: 'calc(50vh - 180px)',
		transition: '1s',
		alignContent: 'flex-start',
		marginTop: '5px',
		marginBottom: '5px'
	},
	dept: {
		backgroundColor: 'red'
	}
}));

function ScheduleForm(props) {
	const dispatch = useDispatch();
	// const employees = useSelector(({ schedulesManagement }) => schedulesManagement?.employeeList);
	const departments = useSelector(state => state.data.departments);
	const shifts = useSelector(state => state.data.shifts);
	const employees = useSelector(state => state.data.employeeByDept);
	const methods = useFormContext();
	const [color, setColor] = useState({});
	const classes = useStyles(props);
	const { control, formState, setValue, getValues, reset, watch } = methods;
	const { errors, isValid, dirtyFields } = formState;
	const userID = localStorage.getItem('user_id');
	const routeParams = useParams();
	const { scheduleId } = routeParams;

	const [shiftChecked, setShiftChecked] = useState({});
	const handleChange = id => {
		setShiftChecked({ [id]: true });
	};

	useEffect(() => {
		dispatch(getEmployees());
		dispatch(getDepartments());
		dispatch(getShifts());
	}, []);

	useEffect(() => {
		setValue(`color`, color.hex || '#0032faff');
	}, [color.hex]);

	const getEmployeeByDepartment = id => {
		dispatch(getEmployeeByDept(id));
	};

	return (
		<div>
			{
				scheduleId === 'new' && (
					<>
						<div>
							<Controller
								name="department"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										className="mt-8 mb-16"
										freeSolo
										value={value ? departments.find(department => department.id === value) : null}
										options={departments}
										getOptionLabel={option => `${option.name}`}
										onChange={(event, newValue) => {
											onChange(newValue?.id);
											getEmployeeByDepartment(newValue?.id);
										}}
										//defaultValue={{ id: null, name: "Select a deparment" }}
										renderInput={params => (
											<TextField
												{...params}
												placeholder="Select a employee department"
												label="Department"
												variant="outlined"
												InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
											/>
										)}
									/>
								)}
							/>
							{employees?.length !== 0 && employees ? (
								<div>
									<h5> Employees</h5>
									<div className={classes.pageContainer}>
										<div className={classes.clmsContainer}>
											<Controller
												name={`all`}
												control={control}
												render={({ field }) => (
													<FormControl>
														<FormControlLabel
															required
															label={`ALL`}
															control={
																<Checkbox
																	{...field}
																	color="primary"
																	onChange={event => {
																		field.onChange(event);

																		let uniqPermissinsIds = _.uniq(getValues()?.employee_ids);

																		if (event.target.checked) {
																			employees?.map((employee, indx) => {
																				uniqPermissinsIds.push(employee.id);
																			});
																			reset({
																				...getValues(),
																				employee_ids: _.uniq(uniqPermissinsIds)
																			});
																		} else {
																			reset({ ...getValues(), employee_ids: [] });
																		}
																	}}
																	checked={field.value ? field.value : false}
																/>
															}
														/>
													</FormControl>
												)}
											/>

											{employees?.map(employee => {
												return (
													<Controller
														key={employee?.id}
														name={`employee${employee?.id}`}
														control={control}
														render={({ field }) => (
															<FormControl>
																<FormControlLabel
																	required
																	label={`${employee?.first_name} ${employee?.last_name}(${employee?.email || 'No Email'
																		})`}
																	control={
																		<Checkbox
																			{...field}
																			color="primary"
																			// onChange={(event) => handleOnChange(event)}
																			checked={
																				getValues()?.employee_ids?.find(
																					id => id == employee?.id
																				) || false
																			}
																			onChange={event => {
																				if (event.target.checked) {
																					const unicEmployeeIds = _.uniq(
																						getValues()?.employee_ids
																					);
																					reset({
																						...getValues(),
																						employee_ids: [
																							...unicEmployeeIds,
																							employee?.id
																						]
																					});
																				} else {
																					let removableId =
																						getValues()?.employee_ids?.indexOf(
																							employee?.id
																						);
																					let employeeIdAll = _.uniq(
																						getValues()?.employee_ids
																					);
																					employeeIdAll.splice(removableId, 1);
																					reset({
																						...getValues(),
																						employee_ids: employeeIdAll
																					});
																				}
																			}}
																		/>
																	}
																/>
															</FormControl>
														)}
													/>
												);
											})}
										</div>
									</div>
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { delay: 0.1 } }}
									className="flex flex-1 items-end justify-center  h-full"
								>
									<Typography mt="100px" color="textSecondary" variant="h5">
										There are no Employees!
									</Typography>
								</motion.div>
							)}
						</div>
					</>
				)
			}
			<Controller
				name="shift"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						freeSolo
						value={value ? shifts.find(department => department.id === value) : null}
						options={shifts}
						getOptionLabel={option => `${option.name}`}
						onChange={(event, newValue) => {
							onChange(newValue?.id);
						}}
						renderInput={params => (
							<TextField
								{...params}
								placeholder="Select a Shift"
								label="Shift"
								variant="outlined"
								InputLabelProps={value ? { shrink: true } : { style: { color: 'red' } }}
							/>
						)}
					/>
				)}
			/>



			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '9px' }}>

				<CustomDatePicker
					name="start_date"
					label="Start Date"
					required="true"
				// placeholder="DD-MM-YYYY"
				/>
				<CustomDatePicker
					name="end_date"
					label="End Date"
					required="true"
				// placeholder="DD-MM-YYYY"
				/>
			</div>
		</div>
	);
}

export default ScheduleForm;
