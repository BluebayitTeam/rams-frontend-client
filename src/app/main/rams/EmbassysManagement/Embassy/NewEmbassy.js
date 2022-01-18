import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { doneNotDone } from 'app/@data/data';
import setIdIfValueIsObject from 'app/@helpers/setIdIfValueIsObject.js';
import { EMBASSY_BY_PASSENGER_ID } from 'app/constant/constants.js';
import { setAlert } from 'app/store/alertSlice';
import withReducer from 'app/store/withReducer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import EmbassyForm from './EmbassyForm.js';
import NewEmbassyHeader from './NewEmbassyHeader.js';

const useStyles = makeStyles(theme => ({
	container: {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		paddingTop: '0.8rem',
		paddingBottom: '0.7rem',
		boxSizing: 'content-box'
	},
	textField: {
		height: '4.8rem',
		'& > div': {
			height: '100%'
		}
	}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	passenger: yup.string().required('Passenger is required')
});

const Embassy = () => {
	const dispatch = useDispatch();
	// const embassy = useSelector(({ embassysManagement }) => embassysManagement.embassy);
	const passengers = useSelector(state => state.data.passengers);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { reset, control, formState } = methods;
	const { errors } = formState;

	const classes = useStyles();

	const history = useHistory();

	const { fromSearch, embassyId } = useParams();

	useEffect(() => {
		if (fromSearch) {
			axios
				.get(`${EMBASSY_BY_PASSENGER_ID}${embassyId}`)
				.then(res => {
					console.log('Res', res.data);

					//update scope
					if (res.data?.visa_entry?.id && res.data?.mofa?.id && res.data?.embassy?.id) {
						const visa_entry = res.data?.visa_entry;
						const mofa = res.data?.mofa;
						reset({
							...setIdIfValueIsObject(res.data.embassy),
							visa_number_readonly: visa_entry.visa_number,
							sponsor_id_no_readonly: visa_entry.sponsor_id_no,
							sponsor_name_english_readonly: visa_entry.sponsor_name_english,
							sponsor_name_arabic_readonly: visa_entry.sponsor_name_arabic,
							mofa_no_readonly: mofa.mofa_no,
							passenger: embassyId,
							updatePermission: true,
							createPermission: false
						});
					}
				})
				.catch(() => null);
		} else {
			reset({ stamping_status: doneNotDone.find(data => data.default)?.id });
		}
	}, [fromSearch]);

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				headerBgHeight="128px"
				classes={{
					toolbar: 'p-0',
					header: 'min-h-64 h-64'
				}}
				header={<NewEmbassyHeader />}
				contentToolbar={
					<Tabs
						// value={tabValue}
						// onChange={handleTabChange}
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
										disabled={!!fromSearch}
										value={value ? passengers.find(data => data.id == value) : null}
										options={passengers}
										getOptionLabel={option =>
											`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
										}
										onChange={(event, newValue) => {
											if (newValue?.id) {
												axios
													.get(`${EMBASSY_BY_PASSENGER_ID}${newValue?.id}`)
													.then(res => {
														console.log('Res', res.data);

														//update scope
														if (
															res.data?.visa_entry?.id &&
															res.data?.mofa?.id &&
															res.data?.embassy?.id
														) {
															const visa_entry = res.data?.visa_entry;
															const mofa = res.data?.mofa;
															reset({
																...setIdIfValueIsObject(res.data.embassy),
																visa_number_readonly: visa_entry.visa_number,
																sponsor_id_no_readonly: visa_entry.sponsor_id_no,
																sponsor_name_english_readonly:
																	visa_entry.sponsor_name_english,
																sponsor_name_arabic_readonly:
																	visa_entry.sponsor_name_arabic,
																mofa_no_readonly: mofa.mofa_no,
																passenger: newValue?.id,
																updatePermission: true,
																createPermission: false
															});
															history.push(
																`/apps/embassy-management/embassy/${
																	newValue?.passenger_id || newValue?.id
																}`
															);
														}
														//create scope
														else if (res.data?.visa_entry?.id && res.data?.mofa?.id) {
															const visa_entry = res.data?.visa_entry;
															const mofa = res.data?.mofa;
															reset({
																profession_english: visa_entry.profession_english,
																profession_arabic: visa_entry.profession_arabic,
																visa_number_readonly: visa_entry.visa_number,
																sponsor_id_no_readonly: visa_entry.sponsor_id_no,
																sponsor_name_english_readonly:
																	visa_entry.sponsor_name_english,
																sponsor_name_arabic_readonly:
																	visa_entry.sponsor_name_arabic,
																mofa_no_readonly: mofa.mofa_no,
																passenger: newValue?.id,
																createPermission: true,
																updatePermission: false
															});
															history.push(`/apps/embassy-management/embassy/new`);
														}
														//no data scope show alert
														else {
															history.push(`/apps/embassy-management/embassy/new`);
															reset({
																passenger: newValue?.id,
																stamping_status: doneNotDone.find(data => data.default)
																	?.id
															});

															const medical = `${
																res.data?.medical == false ? 'medical,' : ''
															}`;
															const mofa = `${
																res.data?.mofa == false
																	? medical
																		? 'Mofa,'
																		: 'Mofa'
																	: ''
															}`;
															const visaEntry = `${
																res.data?.visa_entry == false
																	? mofa
																		? 'Visa-Entry,'
																		: 'Visa-Entry'
																	: ''
															}`;
															const noDataItems = `${visaEntry} ${mofa} ${medical}`;
															const message =
																`please check "${noDataItems.trim()}" information`.replace(
																	/\s\s+/g,
																	' '
																);
															dispatch(
																setAlert({
																	alertType: 'warning',
																	alertValue: message
																})
															);
														}
													})
													.catch(() => {
														history.push(`/apps/embassy-management/embassy/new`);
														reset({
															passenger: newValue?.id,
															stamping_status: doneNotDone.find(data => data.default)?.id
														});
													});
											} else {
												history.push(`/apps/embassy-management/embassy/new`);
												reset({
													passenger: newValue?.id,
													stamping_status: doneNotDone.find(data => data.default)?.id
												});
											}
										}}
										renderInput={params => (
											<TextField
												{...params}
												className={classes.textField}
												placeholder="Select Passenger"
												label="Passenger"
												error={!!errors.passenger}
												required
												helperText={errors?.passenger?.message}
												variant="outlined"
												autoFocus
												InputLabelProps={{
													shrink: true
												}}
											/>
										)}
									/>
								)}
							/>
						</div>
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<EmbassyForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('embassysManagement', reducer)(Embassy);
