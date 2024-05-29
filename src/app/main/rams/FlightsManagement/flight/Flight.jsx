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
import { FLIGHT_BY_PASSENGER_ID } from 'src/app/constant/constants';
// import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { activeRetrnCncl } from 'src/app/@data/data';
import FlightHeader from './FlightHeader';
import { useGetFlightQuery } from '../FlightsApi';
import FlightForm from './FlightForm';

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
		.nonempty('You must enter a Flight name')
		.min(5, 'The Flight name must be at least 5 characters')
});

function Flight() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { FlightId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);
	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const {
		data: Flight,
		isLoading,
		isError
	} = useGetFlightQuery(FlightId, {
		skip: !FlightId || FlightId === 'new'
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
				.get(`${FLIGHT_BY_PASSENGER_ID}${FlightId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						// reset({ ...setIdIfValueIsObject(res.data), passenger: FlightId });
					} else {
						reset({
							passenger: FlightId,
							ticket_status: activeRetrnCncl.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: FlightId,
						ticket_status: activeRetrnCncl.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			reset({ ticket_status: activeRetrnCncl.find((data) => data.default)?.id });
		}
	}, [fromSearch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

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
						<Tab label="Flight Information" />
					</Tabs>
				}
				header={<FlightHeader />}
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
													// const authTOKEN = {
													// 	headers: {
													// 		'Content-type': 'application/json',
													// 		Authorization: localStorage.getItem('jwt_access_token')
													// 	}
													// };

													// dispatch(getManpower(newValue?.id));
													// axios
													// 	.get(`${GET_PASSENGER_BY_ID}${newValue?.id}`, authTOKEN)
													// 	.then(res => {
													// 		sessionStorage.setItem(
													// 			'passengerCurrentStatus',
													// 			res.data?.current_status?.name
													// 		);
													// 	});
													if (newValue?.id) {
														const authTOKEN = {
															headers: {
																'Content-type': 'application/json',
																Authorization: localStorage.getItem('jwt_access_token')
															}
														};
														axios
															.get(`${FLIGHT_BY_PASSENGER_ID}${newValue?.id}`, authTOKEN)
															.then((res) => {
																// update scope
																if (res.data.id) {
																	reset({
																		...setIdIfValueIsObject(res.data),
																		passenger: newValue?.id
																	});
																	navigate(
																		`/apps/Flight-management/Flights/${
																			newValue?.passenger?.id || newValue?.id
																		}`
																	);
																}
																// create scope
																else if (res.data?.embassy_exists) {
																	navigate(`/apps/Flight-management/Flights/new`);
																	reset({
																		passenger: newValue?.id,
																		ticket_status: activeRetrnCncl.find(
																			(data) => data.default
																		)?.id
																	});
																} else {
																	navigate(`/apps/Flight-management/Flights/new`);
																	reset({
																		passenger: newValue?.id,
																		ticket_status: activeRetrnCncl.find(
																			(data) => data.default
																		)?.id
																	});
																	// dispatch(
																	// 	setAlert({
																	// 		alertType: 'warning',
																	// 		alertValue: `please check "Embassy" information`
																	// 	})
																	// );
																}
															})
															.catch(() => {
																navigate(`/apps/Flight-management/Flights/new`);
																reset({
																	passenger: newValue?.id,
																	ticket_status: activeRetrnCncl.find(
																		(data) => data.default
																	)?.id
																});
																// dispatch(
																// 	setAlert({
																// 		alertType: 'warning',
																// 		alertValue: `please check "Embassy" information`
																// 	})
																// );
															});
													} else {
														navigate(`/apps/Flight-management/Flights/new`);
														reset({
															passenger: newValue?.id,
															ticket_status: activeRetrnCncl.find((data) => data.default)
																?.id
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
								<FlightForm />
							</div>
						)}
						{tabValue === 1 && <FlightForm FlightId={FlightId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Flight;
