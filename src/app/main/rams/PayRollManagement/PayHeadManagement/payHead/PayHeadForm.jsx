import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { getAttendanceTypes, getCalculationTypes, getComputes, getGroupsByPayheadTypeId, getPayheadTypes, getPayheads } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import { incomeType } from 'src/app/@data/data';
import { getPayrollMakeStyles } from './getPayrollMakeStyles';

const useStyles = makeStyles(theme => ({
	...getPayrollMakeStyles(theme)
}));


function PayHeadForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const [calculationsPeriod, setCalculationsPeriod] = useState(false);
	const [onAttendance, setOnAttendance] = useState(false);
	const [notApplicable, setNotApplicable] = useState(false);
	const [computedValue, setComputedValue] = useState(false);
	const [payheadsFormula, setPayheadsFormula] = useState(false);
	const [valueIcon, setValueIcon] = useState(false);
	const { control, formState, getValues, setValue, reset, watch } = methods;
	const { errors } = formState;
	const classes = useStyles(props);
	const compute = useSelector(state => state.data.computes);
	const payheads = useSelector(state => state.data?.payheads);
	const payheadTypes = useSelector((state) => state.data?.payheadTypes);
	const calculationTypes = useSelector((state) => state.data?.calculationTypes);
	const attendanceTypes = useSelector((state) => state.data?.attendanceTypes);
	const groups = useSelector((state) => state.data.groups);


	console.log("all_values", getValues())
	const { fields, remove } = useFieldArray({
		control,
		name: 'items',
		keyName: 'key',
		defaultValues: [
			{
				effective_from: '',
				amount_from: 0,
				amount_upto: 0,
				slab_type: 0,
				value: 0
			}
		]
	});

	useEffect(() => {
		dispatch(getPayheadTypes());
		dispatch(getCalculationTypes());
		dispatch(getAttendanceTypes());
		dispatch(getPayheads());
		dispatch(getComputes());
	}, []);

	console.log("fields_items", fields);

	return (
		<>
			<Grid container spacing={12}>
				{
					!notApplicable && (
						<Grid item xs={4}>
							<div>
								{/* Payhead Name */}
								<Controller
									name="name"
									control={control}
									render={({ field }) => {
										// setValue('payslip_display_name', field.value);
										return (
											<TextField
												{...field}
												className="mt-8 mb-16"
												required
												label="Payhead Name"
												autoFocus
												id="name"
												variant="outlined"
												fullWidth
												error={!!errors.name}
												helperText={errors?.name?.message}
											/>
										)
									}}
								/>
								{/* Payhead type */}
								<CustomDropdownField
									name='payhead_type'
									label='Select Payhead Type'
									options={payheadTypes}
									optionLabelFormat={(option) =>
										`${option.name || ''}`
									}
									onChange={(newValue) => {
										if (newValue?.name == 'Not Applicable') {
											setNotApplicable(true);
										} else {
											setNotApplicable(false);
										}
										dispatch(getGroupsByPayheadTypeId(newValue?.id))
									}}
									required
								/>
								{/* Income type */}
								<CustomDropdownField
									name='income_type'
									label='Select Income Type'
									options={incomeType}
									optionLabelFormat={(option) =>
										`${option.name || ''}`
									}
									required
								/>
								{/* Group type */}
								<CustomDropdownField
									name='group'
									label='Select Group'
									options={groups}
									optionLabelFormat={(option) =>
										`${option.name || ''}`
									}
									required
								/>
								{/* affect net salary */}
								<Controller
									name="affect_net_salary"
									control={control}
									render={({ field }) => (
										<FormControl>
											<FormControlLabel
												label="Affect net salary"
												control={
													<Checkbox {...field} checked={field.value ? field.value : false} />
												}
											/>
										</FormControl>
									)}
								/>
								{/* Pay Slip display name */}
								<Controller
									name="payslip_display_name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mt-8 mb-16"
											required
											label="Payslip Display Name"
											autoFocus
											id="payslip_display_name"
											variant="outlined"
											fullWidth
											error={!!errors.payslip_display_name}
											helperText={errors?.payslip_display_name?.message}
										/>
									)}
								/>
								{/* Use for gratuity calculation */}
								<Controller
									name="usefor_gratuity_calculation"
									control={control}
									render={({ field }) => (
										<FormControl>
											<FormControlLabel
												label="Use for calculation of gratuity"
												control={
													<Checkbox {...field} checked={field.value ? field.value : false} />
												}
											/>
										</FormControl>
									)}
								/>
								{/* calculation_type */}
								<CustomDropdownField
									name='calculation_type'
									label='Select Calculation Type'
									options={calculationTypes}
									optionLabelFormat={(option) =>
										`${option.name || ''}`
									}
									onChange={(newValue) => {
										if (newValue?.name === 'As Computed Value') {
											setComputedValue(true);
											setOnAttendance(false);
											setCalculationsPeriod(false);
										} else if (newValue?.name === 'Flat Rate') {
											setCalculationsPeriod(true);
											setComputedValue(false);
											setOnAttendance(false);
										} else if (
											newValue?.name === 'On Attendance' ||
											newValue?.name === 'On Production'
										) {
											setOnAttendance(true);
											setCalculationsPeriod(false);
											setComputedValue(false);
											dispatch(getAttendanceTypes(newValue?.id));
										} else {
											setOnAttendance(false);
											setCalculationsPeriod(false);
											setComputedValue(false);
										}
									}}
									required
								/>
								{onAttendance && (
									<>
										{/* attendance_type */}
										<CustomDropdownField
											name='attendance_type'
											label='Select Attendance Type'
											options={attendanceTypes}
											optionLabelFormat={(option) =>
												`${option.name || ''}`
											}
											required
										/></>
								)}
								{calculationsPeriod && (
									<>
										{/* calculation_period */}
										<CustomDropdownField
											name='calculation_period'
											label='Select Calculation Period'
											options={attendanceTypes}
											optionLabelFormat={(option) =>
												`${option.name || ''}`
											}
											required
										/>
									</>
								)}

							</div>
						</Grid>
					)
				}
				{
					notApplicable && (
						<Grid item xs={4}>
							<div>
								{/* PayHead name */}
								<Controller
									name="name"
									control={control}
									render={({ field }) => {
										// setValue('payslip_display_name', field.value);
										return (
											<TextField
												{...field}
												className="mt-8 mb-16"
												required
												label="PayHead Name"
												autoFocus
												id="name"
												variant="outlined"
												fullWidth
												error={!!errors.name}
												helperText={errors?.name?.message}
											/>
										)
									}}
								/>
								{/* Payhead type */}
								<CustomDropdownField
									name='payhead_type'
									label='Select Payhead Type'
									options={payheadTypes}
									optionLabelFormat={(option) =>
										`${option.name || ''}`
									}
									onChange={(newValue) => {
										if (newValue?.name == 'Not Applicable') {
											setNotApplicable(true);
										} else {
											setNotApplicable(false);
										}
										dispatch(getGroupsByPayheadTypeId(newValue?.id))
									}}
									required
								/>
								{/* Group type */}
								<CustomDropdownField
									name='group'
									label='Select Group'
									options={groups}
									optionLabelFormat={(option) =>
										`${option.name || ''}`
									}
									required
								/>
							</div>
						</Grid>
					)
				}
				{computedValue && (
					<Grid item xs={8}>
						<div className="ml-16">
							<h3 className="text-center mb-32"> Computation Information</h3>
							<Grid container>
								<Grid item xs={4} className="flex items-center">
									<div>
										<p>Compute</p>
									</div>
								</Grid>
								<Grid item xs={8}>
									{/* Compute */}
									<CustomDropdownField
										name='compute'
										label='Select Compute'
										options={compute}
										optionLabelFormat={(option) =>
											`${option.name || ''}`
										}
										onChange={(newValue) => {
											if (newValue?.name == 'On Specified Formula') {
												setPayheadsFormula(true);
											} else {
												setPayheadsFormula(false);
											}
										}}
										required
									/>
								</Grid>
							</Grid>

							{payheadsFormula && (
								<Grid container>
									<Grid item xs={4} className="flex items-center">
										<div>
											<p>Specified Formula</p>
										</div>
									</Grid>
									<Grid item xs={8}>
										{/* Specified Formula Payhead */}
										<Controller
											name="formula_payheads"
											control={control}
											render={({ field: { onChange, value } }) => {
												return (
													<Autocomplete
														className="mt-8 mb-16"
														freeSolo
														multiple
														filterSelectedOptions
														value={
															value
																? payheads.filter(data => value.includes(data.id))
																: []
														}
														options={payheads}
														getOptionLabel={option => `${option?.name}`}
														onChange={(event, newValue) => {
															const selectedValues = newValue.map(option => option.id);
															onChange(selectedValues);
														}}
														renderInput={params => (
															<TextField
																{...params}
																placeholder="Select Payhead"
																label="Payhead"
																error={!!errors.payheads}
																required
																helperText={errors?.payheads?.message}
																variant="outlined"
																InputLabelProps={{
																	shrink: true
																}}
															/>
														)}
													/>
												);
											}}
										/>
									</Grid>
								</Grid>
							)}

							{/* table */}
							<Grid xs={12}>
								<div className={classes.mainContainer}>
									<TableContainer component={Paper} className={classes.tblContainer}>
										<Table className={classes.table} aria-label="simple table">
											<TableHead className={classes.tableHead}>
												<TableRow>
													<TableCell className={classes.tableCell}>No.</TableCell>
													<TableCell className={classes.tableCell} align="center">
														Effective from
													</TableCell>
													<TableCell className={classes.tableCell} align="center">
														More than amount
													</TableCell>
													<TableCell className={classes.tableCell} align="center">
														Amount upto
													</TableCell>
													<TableCell className={classes.tableCell} align="center">
														Slab type
													</TableCell>
													<TableCell className={classes.tableCell} align="center">
														Value
													</TableCell>
													<TableCell className={classes.tableCell} align="center">
														Action
													</TableCell>
												</TableRow>
											</TableHead>

											<TableBody>
												<p>table body</p>
												{fields.map((item, idx) => {
													console.log("fields_items", fields);
													return (
														<TableRow key={item.key}>
															<TableCell
																className={classes.tableCellInBody}
																component="th"
																scope="row"
															>
																{idx + 1}
															</TableCell>
															{idx === 0 && (
																<TableCell
																	rowSpan={fields.length + 1}
																	style={{ border: '1px solid black' }}
																	className={classes.tableCell}
																>
																	<Controller
																		className="p-0"
																		name={`effective_from`}
																		control={control}
																		render={({ field }) => {
																			return (
																				<CustomDatePicker
																					className="p-0"
																					// previous_date_disable={true}
																					field={field}
																					style={{ maxWidth: '130px' }}
																					label="Effective from"
																				/>
																			);
																		}}
																	/>
																</TableCell>
															)}

															<TableCell className={classes.tableCellInBody}>
																<Controller
																	name={`items.${idx}.amount_from`}
																	control={control}
																	render={({ field }) => {
																		return (
																			<TextField
																				{...field}
																				className="mt-8 mb-16"
																				label="More than amount"
																				id="amount_from"
																				variant="outlined"
																				InputLabelProps={{ shrink: true }}
																				fullWidth
																			/>
																		);
																	}}
																/>
															</TableCell>
															<TableCell className={classes.tableCellInBody}>
																<Controller
																	name={`items.${idx}.amount_upto`}
																	control={control}
																	render={({ field }) => {
																		return (
																			<TextField
																				{...field}
																				className="mt-8 mb-16"
																				label="Amount upto"
																				id="amount_upto"
																				variant="outlined"
																				InputLabelProps={{ shrink: true }}
																				fullWidth
																				onChange={e => {
																					field.onChange(e);
																					// setUptoAmount(e.target.value);
																				}}
																			/>
																		);
																	}}
																/>
															</TableCell>
															<TableCell className={classes.tableCellInBody}>
																<Controller
																	name={`items.${idx}.slab_type`}
																	control={control}
																	render={({ field: { onChange, value, name } }) => (
																		<Autocomplete
																			className="mt-8 mb-16 p-0"
																			fullWidth
																			freeSolo
																			value={
																				value
																					? payheadValue.find(
																						data => data.id === value
																					)
																					: null
																			}
																			options={payheadValue}
																			getOptionLabel={option => `${option?.name}`}
																			onChange={(event, newValue) => {
																				onChange(newValue?.id);
																				if (newValue?.id == 'percentage') {
																					setValueIcon(true);
																				} else {
																					setValueIcon(false);
																				}
																			}}
																			renderInput={params => (
																				<TextField
																					{...params}
																					label="Slab type"
																					id="slab_type"
																					variant="outlined"
																					InputLabelProps={{ shrink: true }}
																					fullWidth
																				/>
																			)}
																			PopperProps={{
																				style: { width: '250px' } // Adjust the width here as needed
																			}}
																		/>
																	)}
																/>
															</TableCell>
															<TableCell className={classes.tableCellInBody}>
																<Controller
																	name={`items.${idx}.value`}
																	control={control}
																	render={({ field }) => {
																		return (
																			<TextField
																				{...field}
																				className="mt-8 mb-16"
																				label="Value"
																				id="value"
																				variant="outlined"
																				InputLabelProps={{ shrink: true }}
																				fullWidth
																				InputProps={{
																					endAdornment: valueIcon ? (
																						<InputAdornment position="end">
																							%
																						</InputAdornment>
																					) : (
																						''
																					)
																				}}
																			/>
																		);
																	}}
																/>
															</TableCell>
															{idx === 0 && (
																<TableCell
																	className="p-0 md:p-0"
																	align="center"
																	component="th"
																	scope="row"
																	style={{ minWidth: '80px' }}
																>
																	<div
																		variant="outlined"
																		className={classes.btnContainer}
																		onClick={() => {
																			const values = getValues();
																			reset({
																				...values,
																				items: [
																					...values?.items,
																					{
																						effective_from: '',
																						amount_from: 0,
																						amount_upto: 0,
																						slab_type: 0,
																						value: 0
																					}
																				]
																			});
																		}}
																		onBlur={() => { }}
																	>
																		<AddIcon />
																	</div>
																</TableCell>
															)}
															{idx !== 0 && (
																<TableCell
																	className="p-0 md:p-0"
																	align="center"
																	component="th"
																	scope="row"
																	style={{ minWidth: '80px' }}
																>
																	<div>
																		<DeleteIcon
																			onClick={() => {
																				remove(idx);
																			}}
																			className="h-52 cursor-pointer"
																			style={{ color: 'red' }}
																		/>
																	</div>
																</TableCell>
															)}
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</TableContainer>
								</div>
							</Grid>
						</div>
					</Grid>
				)}
			</Grid>
		</>
	);
}

export default PayHeadForm;




// "date": "2025-01-22",
// 	"name": "string",
// 		"income_type": "string",
// 			"affect_net_salary": true,
// 				"payslip_display_name": "string",
// 					"currency_of_ledger": "string",
// 						"usefor_gratuity_calculation": true,
// 							"alterset_incometax_details": true,
// 								"attendance_leave_with_pay": "string",
// 									"leave_without_pay": "string",
// 										"calculation_period": "string",
// 											"calculation_basis": "string",
// 												"effective_from": "2025-01-22",
// 													"exclude_esi_eligibility": true,
// 														"is_deletable": true,
// 															"is_default": true,
// 																"payhead_type": 0,
// 																	"group": 0,
// 																		"calculation_type": 0,
// 																			"attendance_type": 0