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
import { GET_PASSENGER_BY_ID, MEDICAL_BY_PASSENGER_ID } from 'src/app/constant/constants';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import moment from 'moment';
import EmbassyHeader from './EmbassyHeader';
import { useGetEmbassyQuery } from '../EmbassysApi';
import EmbassyForm from './EmbassyForm';

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
		.nonempty('You must enter a embassy name')
		.min(5, 'The embassy name must be at least 5 characters')
});

function Embassy() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { embassyId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);
	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const {
		data: embassy,
		isLoading,
		isError
	} = useGetEmbassyQuery(embassyId, {
		skip: !embassyId || embassyId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);

	const {
		reset,
		watch,
		control,
		formState: { errors },
		setValue
	} = methods;

	// useEffect(() => {
	// 	if (embassyId === 'new') {
	// 		reset(EmbassyModel({}));
	// 	}
	// }, [embassyId, reset]);

	// useEffect(() => {
	// 	if (embassy) {
	// 		reset({ ...embassy });
	// 	}
	// }, [embassy, reset]);

	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};

			axios
				.get(`${MEDICAL_BY_PASSENGER_ID}${embassyId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						// reset({ ...setIdIfValueIsObject(res.data), passenger: embassyId });
					} else {
						reset({
							passenger: embassyId,
							medical_card: doneNotDone.find((data) => data.default)?.id,
							medical_result: medicalResults.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: embassyId,
						medical_card: doneNotDone.find((data) => data.default)?.id,
						medical_result: medicalResults.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			reset({
				medical_card: doneNotDone.find((data) => data.default)?.id,
				medical_result: medicalResults.find((data) => data.default)?.id
			});
		}
	}, [fromSearch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	const updateCurrentStatus = (id) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		axios.get(`${GET_PASSENGER_BY_ID}${id}`, authTOKEN).then((res) => {
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
						<Tab label="Embassy Information" />
					</Tabs>
				}
				header={<EmbassyHeader />}
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
												// options={passengers}
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
															.then((res) => {
																if (res.data.id) {
																	reset({
																		...setIdIfValueIsObject({
																			...res?.data,
																			medical_center:
																				res?.data?.medical_center?.id,
																			medical_exam_date: moment(
																				new Date(res?.data?.medical_exam_date)
																			).format('YYYY-MM-DD'),
																			medical_report_date: moment(
																				new Date(res?.data?.medical_report_date)
																			).format('YYYY-MM-DD'),
																			medical_issue_date: moment(
																				new Date(res?.data?.medical_issue_date)
																			).format('YYYY-MM-DD'),
																			medical_expiry_date: moment(
																				new Date(res?.data?.medical_expiry_date)
																			).format('YYYY-MM-DD')
																		}),
																		passenger: newValue?.id
																	});
																	navigate(
																		`/apps/embassy/embassys/${
																			newValue?.newValue?.id || newValue?.id
																		}`
																	);
																} else {
																	navigate(`/apps/embassy/embassys/new`);
																	reset({
																		medical_center: 'all',
																		passenger: newValue?.id,
																		medical_serial_no: '',
																		medical_result:
																			medicalResults.find((data) => data.default)
																				?.id || '',
																		medical_card:
																			doneNotDone.find((data) => data.default)
																				?.id || '',
																		medical_exam_date: '',
																		medical_report_date: '',
																		medical_issue_date: '',
																		medical_expiry_date: '',
																		notes: '',
																		slip_pic: '',
																		medical_card_pic: '',
																		current_status: 'all'
																	});
																}
															})
															.catch(() => {
																reset({
																	passenger: newValue?.id,
																	medical_center: 'all',
																	medical_serial_no: '',
																	medical_result:
																		medicalResults.find((data) => data.default)
																			?.id || '',
																	medical_card:
																		doneNotDone.find((data) => data.default)?.id ||
																		'',
																	medical_exam_date: '',
																	medical_report_date: '',
																	medical_issue_date: '',
																	medical_expiry_date: '',
																	notes: '',
																	slip_pic: '',
																	medical_card_pic: '',
																	current_status: 'all'
																});
																navigate(`/apps/embassy/embassys/new`);
															});
													} else {
														navigate(`/apps/embassy/embassys/new`);
														reset({
															passenger: 'all',
															medical_center: 'all',
															medical_serial_no: '',
															medical_result:
																medicalResults.find((data) => data.default)?.id || '',
															medical_card:
																doneNotDone.find((data) => data.default)?.id || '',
															medical_exam_date: '',
															medical_report_date: '',
															medical_issue_date: '',
															medical_expiry_date: '',
															notes: '',
															slip_pic: '',
															medical_card_pic: '',
															current_status: 'all'
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
								<EmbassyForm />
							</div>
						)}
						{tabValue === 1 && <EmbassyForm embassyId={embassyId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Embassy;
