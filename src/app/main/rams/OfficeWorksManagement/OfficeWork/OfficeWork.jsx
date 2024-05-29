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
import { GET_PASSENGER_BY_ID, OFFICEWORK_BY_PASSENGER_ID } from 'src/app/constant/constants';
import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import OfficeWorkHeader from './OfficeWorkHeader';
import { useGetOfficeWorkQuery } from '../OfficeWorksApi';
import OfficeWorkForm from './OfficeWorkForm';

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
	police_clearance_no: z
		.string()
		.nonempty('You must enter a officeWork name')
		.min(5, 'The officeWork name must be at least 5 characters')
});

function OfficeWork() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { officeWorkId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);
	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const {
		data: officeWork,
		isLoading,
		isError
	} = useGetOfficeWorkQuery(officeWorkId, {
		skip: !officeWorkId || officeWorkId === 'new'
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
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios
				.get(`${OFFICEWORK_BY_PASSENGER_ID}${officeWorkId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						// reset({ ...setIdIfValueIsObject(res.data), passenger: officeWorkId });
					}
				})
				.catch(() => null);
		} else {
			reset({
				police_clearance_status: doneNotDone.find((data) => data.default)?.id,
				driving_license_status: doneNotDone.find((data) => data.default)?.id,
				finger_status: doneNotDone.find((data) => data.default)?.id
			});
		}
	}, [fromSearch]);

	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios
				.get(`${OFFICEWORK_BY_PASSENGER_ID}${officeWorkId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						// reset({ ...setIdIfValueIsObject(res.data), passenger: officeWorkId });
					} else {
						reset({
							passenger: officeWorkId,
							police_clearance_status: doneNotDone.find((data) => data.default)?.id,
							driving_license_status: doneNotDone.find((data) => data.default)?.id,
							finger_status: doneNotDone.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: officeWorkId,
						police_clearance_status: doneNotDone.find((data) => data.default)?.id,
						driving_license_status: doneNotDone.find((data) => data.default)?.id,
						finger_status: doneNotDone.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			reset({
				police_clearance_status: doneNotDone.find((data) => data.default)?.id,
				driving_license_status: doneNotDone.find((data) => data.default)?.id,
				finger_status: doneNotDone.find((data) => data.default)?.id
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
			// setValue(`current_status`, res.data?.current_status?.id);
			sessionStorage.setItem('passengerCurrentStatus', res.data?.current_status?.name);
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
						<Tab label="OfficeWork Information" />
					</Tabs>
				}
				header={<OfficeWorkHeader />}
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
												id="passenger"
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
													const authTOKEN = {
														headers: {
															'Content-type': 'application/json',
															Authorization: localStorage.getItem('jwt_access_token')
														}
													};
													axios
														.get(`${GET_PASSENGER_BY_ID}${newValue?.id}`, authTOKEN)
														.then((res) => {
															setValue('current_status', res.data?.current_status?.id);
															setValue('passenger', res.data?.id);
														});

													if (newValue?.id) {
														const authTOKEN = {
															headers: {
																'Content-type': 'application/json',
																Authorization: localStorage.getItem('jwt_access_token')
															}
														};
														axios
															.get(
																`${OFFICEWORK_BY_PASSENGER_ID}${newValue?.id}`,
																authTOKEN
															)
															.then((res) => {
																if (res.data.id) {
																	reset({
																		...setIdIfValueIsObject(res.data)
																	});
																	navigate(
																		`/apps/officeWork/officeWorks/${
																			newValue?.passenger?.id || newValue?.id
																		}`
																	);
																} else {
																	navigate(`/apps/officeWork/officeWorks/new`);
																	reset({
																		passenger: newValue?.id,
																		police_clearance_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,
																		driving_license_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,
																		finger_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,

																		police_clearance_no: '',
																		police_clearance_date: '',

																		driving_license_no: '',
																		driving_license_date: '',

																		finger_no: '',

																		finger_date: '',
																		certificate_experience: ''
																	});
																}
															})
															.catch(() => {
																reset({
																	passenger: newValue?.id,
																	police_clearance_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,
																	driving_license_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,
																	finger_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,

																	police_clearance_no: '',
																	police_clearance_date: '',

																	driving_license_no: '',
																	driving_license_date: '',

																	finger_no: '',

																	finger_date: '',
																	certificate_experience: ''
																});
																navigate(`/apps/officeWork/officeWorks/new`);
															});
													} else {
														navigate(`/apps/officeWork/officeWorks/new`);
														reset({
															passenger: newValue?.id,
															police_clearance_status: doneNotDone.find(
																(data) => data.default
															)?.id,
															driving_license_status: doneNotDone.find(
																(data) => data.default
															)?.id,
															finger_status: doneNotDone.find((data) => data.default)?.id,

															police_clearance_no: '',
															police_clearance_date: '',

															driving_license_no: '',
															driving_license_date: '',

															finger_no: '',

															finger_date: '',
															certificate_experience: ''
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
								<OfficeWorkForm />
							</div>
						)}
						{tabValue === 1 && <OfficeWorkForm officeWorkId={officeWorkId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default OfficeWork;
