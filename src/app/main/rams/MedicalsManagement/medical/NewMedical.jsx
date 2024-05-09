function NewMedical(props) {
	return <FusePageCarded
					headerBgHeight="128px"
					classes={{
						toolbar: 'p-0',
						header: 'min-h-64 h-64'
					}}
					contentToolbar={
						<Tabs
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64 p-0' }}
						>
							<div className="flex justify-center w-full px-16">
								<Controller
									name="passenger"
									control={control}
									render={({ field: { value } }) => (
										<Autocomplete
											className={`w-full max-w-320 h-48 ${classes.container}`}
											freeSolo
											autoHighlight
											disabled={!!fromSearch}
											value={value ? passengers.find(data => data.id == value) : null}
											options={passengers}
											getOptionLabel={option =>
												`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
											}
											onChange={(event, newValue) => {
												updateCurrentStatus(newValue?.id);
												if (newValue?.id) {
													const authTOKEN = {
														headers: {
															'Content-type': 'application/json',
															Authorization: localStorage.getItem('jwt_access_token')
														}
													};
													axios
														.get(`${MEDICAL_BY_PASSENGER_ID}${newValue?.id}`, authTOKEN)
														.then(res => {
															if (res.data.id) {
																reset({
																	...setIdIfValueIsObject(res.data),
																	passenger: newValue?.id
																});
																history.push(
																	`/apps/medical-management/medical/${
																		newValue?.passenger_id || newValue?.id
																	}`
																);
															} else {
																history.push(`/apps/medical-management/medical/new`);
																reset({
																	passenger: newValue?.id,
																	medical_card: doneNotDone.find(data => data.default)
																		?.id,
																	medical_result: medicalResults.find(
																		data => data.default
																	)?.id
																});
															}
														})
														.catch(() => {
															history.push(`/apps/medical-management/medical/new`);
															reset({
																passenger: newValue?.id,
																medical_card: doneNotDone.find(data => data.default)
																	?.id,
																medical_result: medicalResults.find(
																	data => data.default
																)?.id
															});
														});
												} else {
													history.push(`/apps/medical-management/medical/new`);
													reset({
														passenger: newValue?.id,
														medical_card: doneNotDone.find(data => data.default)?.id,
														medical_result: medicalResults.find(data => data.default)?.id
													});
												}
											}}
											renderInput={params => (
												<TextField
													{...params}
													className={classes.textField}
													placeholder="Select Passenger"
													label="Passenger"
													//error={!!errors.passenger || !value}
													required
													helperText={errors?.passenger?.message}
													variant="outlined"
													autoFocus
													InputLabelProps={
														value ? { shrink: true } : { style: { color: 'red' } }
													}
												/>
											)}
										/>
									)}
								/>
							</div>
						</Tabs>
					
					
					
		</FormProvider>;
}

export default NewMedical;
