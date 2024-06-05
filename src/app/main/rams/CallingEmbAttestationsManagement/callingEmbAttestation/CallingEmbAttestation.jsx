/* eslint-disable no-undef */
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, Tab, TextField, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { CALLINGEMBATTESTATION_BY_PASSENGER_ID, GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import moment from 'moment';
import CallingEmbAttestationHeader from './CallingEmbAttestationHeader';
import { useGetCallingEmbAttestationQuery } from '../CallingEmbAttestationsApi';
import CallingEmbAttestationForm from './CallingEmbAttestationForm';

const useStyles = makeStyles((theme) => ({
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

const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a callingEmbAttestation name')
		.min(5, 'The callingEmbAttestation name must be at least 5 characters')
});

function CallingEmbAttestation() {
	const emptyValue = {
		passenger: 'all',
		emb_attestation_status: '',
		calling_status: '',
		bio_submitted_status: '',
		interviewed_date: '',
		interviewed: '',
		submitted_for_sev_date: '',
		submitted_for_sev: '',
		sev_received_date: '',
		sev_received: '',
		submitted_for_permission_immigration_clearance_date: '',
		submitted_for_permission_immigration_clearance: '',
		immigration_clearance_date: '',
		immigration_clearance: '',
		handover_passport_ticket_date: '',
		handover_passport_ticket: '',
		accounts_cleared_date: '',
		accounts_cleared: '',
		dispatched_date: '',
		dispatched: '',
		repatriation_date: '',
		repatriation: ''
	};
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { callingEmbAttestationId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);
	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});

	const {
		data: callingEmbAttestation,
		isLoading,
		isError
	} = useGetCallingEmbAttestationQuery(callingEmbAttestationId, {
		skip: !callingEmbAttestationId || callingEmbAttestationId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);

	const {
		reset,
		watch,
		control,
		formState: { errors },
		setValue
	} = methods;

	useEffect(() => {
		if (fromSearch && callingEmbAttestationId) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios
				.get(`${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${callingEmbAttestationId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						handleReset({ ...setIdIfValueIsObject(res.data), passenger: callingEmbAttestationId });
					} else {
						handleReset({
							passenger: callingEmbAttestationId,
							emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
							calling_status: doneNotDone.find((data) => data.default)?.id,
							bio_submitted_status: doneNotDone.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					handleReset({
						passenger: callingEmbAttestationId,
						emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
						calling_status: doneNotDone.find((data) => data.default)?.id,
						bio_submitted_status: doneNotDone.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else if (callingEmbAttestationId === 'new') {
			handleReset({
				emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
				calling_status: doneNotDone.find((data) => data.default)?.id,
				bio_submitted_status: doneNotDone.find((data) => data.default)?.id
			});
		}
	}, [fromSearch, callingEmbAttestationId, reset]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	const formatDate = (date) => {
		return date && moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : '';
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	const handleReset = (defaultValues) => {
		reset(defaultValues);
		setFormKey((prevKey) => prevKey + 1); // Trigger re-render with new form key
	};

	const getCurrentStatus = (passengerId) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		axios.get(`${GET_PASSENGER_BY_ID}${passengerId}`, authTOKEN).then((res) => {
			setValue('current_status', res.data?.current_status?.id);
		});
	};
	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab label="Passenger Details" />
						<Tab label="CallingEmbAttestation Information" />
					</Tabs>
				}
				header={
					<CallingEmbAttestationHeader
						handleReset={handleReset}
						emptyValue={emptyValue}
					/>
				}
				content={
					<div className="p-16">
						{tabValue === 0 && (
							<div className="p-16">
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
												value={value ? passengers.find((data) => data.id === value) : null}
												options={[
													{
														id: 'all',
														passenger_id: '',
														office_serial: '',
														passport_no: '',
														passenger_name: 'Select Passenger'
													},
													...passengers
												]}
												getOptionLabel={(option) =>
													`${option?.passenger_id} ${option?.office_serial} ${option?.passport_no} ${option?.passenger_name}`
												}
												onChange={(event, newValue) => {
													const authTOKEN = {
														headers: {
															'Content-type': 'application/json',
															Authorization: localStorage.getItem('jwt_access_token')
														}
													};
													axios
														.get(`${GET_PASSENGER_BY_ID}${newValue?.id}`, authTOKEN)
														.then((res) => {
															sessionStorage.setItem(
																'passengerCurrentStatus',
																res.data?.current_status?.name
															);
														});

													if (newValue?.id) {
														axios
															.get(
																`${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${newValue?.id}`,
																authTOKEN
															)
															.then((res) => {
																if (res.data.id) {
																	handleReset({
																		...setIdIfValueIsObject(res.data),
																		interviewed_date: formatDate(
																			new Date(res?.data?.interviewed_date)
																		),
																		submitted_for_sev_date: formatDate(
																			new Date(res?.data?.submitted_for_sev_date)
																		),
																		sev_received_date: formatDate(
																			new Date(res?.data?.sev_received_date)
																		),
																		submitted_for_permission_immigration_clearance_date:
																			formatDate(
																				new Date(
																					res?.data?.submitted_for_permission_immigration_clearance_date
																				)
																			),
																		immigration_clearance_date: formatDate(
																			new Date(
																				res?.data?.immigration_clearance_date
																			)
																		),
																		handover_passport_ticket_date: formatDate(
																			new Date(
																				res?.data?.handover_passport_ticket_date
																			)
																		),
																		accounts_cleared_date: formatDate(
																			new Date(res?.data?.accounts_cleared_date)
																		),
																		dispatched_date: formatDate(
																			new Date(res?.data?.dispatched_date)
																		),
																		repatriation_date: formatDate(
																			new Date(res?.data?.repatriation_date)
																		),
																		passenger: newValue?.id
																	});
																	navigate(
																		`/apps/malaysiaStatus-management/malaysiaStatus/${res?.data?.id}`
																	);
																	sessionStorage.setItem('operation', 'update');
																} else {
																	navigate(
																		`/apps/malaysiaStatus-management/malaysiaStatus/new`
																	);
																	handleReset({
																		passenger: newValue?.id,
																		emb_attestation_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,
																		calling_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,
																		bio_submitted_status: doneNotDone.find(
																			(data) => data.default
																		)?.id
																	});
																}
															})
															.catch(() => {
																handleReset({
																	passenger: newValue?.id,
																	emb_attestation_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,
																	calling_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,
																	bio_submitted_status: doneNotDone.find(
																		(data) => data.default
																	)?.id
																});
																navigate(
																	`/apps/malaysiaStatus-management/malaysiaStatus/new`
																);
															});
													} else {
														navigate(`/apps/malaysiaStatus-management/malaysiaStatus/new`);
														handleReset({
															passenger: newValue?.id,
															emb_attestation_status: doneNotDone.find(
																(data) => data.default
															)?.id,
															calling_status: doneNotDone.find((data) => data.default)
																?.id,
															bio_submitted_status: doneNotDone.find(
																(data) => data.default
															)?.id
														});
													}
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														className={classes.textField}
														placeholder="Select Passenger"
														label="Passenger"
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
								<CallingEmbAttestationForm />
							</div>
						)}
						{tabValue === 1 && (
							<CallingEmbAttestationForm callingEmbAttestationId={callingEmbAttestationId} />
						)}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default CallingEmbAttestation;
