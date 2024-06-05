/* eslint-disable no-undef */
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
	const emptyValue = {
		passenger: '',
		ticket_status: '',
		ticket_agency: '',
		carrier_air_way: '',
		flight_no: '',
		ticket_no: '',
		sector_name: '',

		flight_time: '',
		arrival_time: '',
		issue_date: '',
		flight_date: '',
		notes: '',
		current_status: ''
	};
	const routeParams = useParams();
	const { flightId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);
	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});

	const {
		data: Flight,
		isLoading,
		isError
	} = useGetFlightQuery(flightId, {
		skip: !flightId || flightId === 'new'
	});

	const [tabValue, setTabValue] = useState(0);
	const [formKey, setFormKey] = useState(0);
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
				.get(`${FLIGHT_BY_PASSENGER_ID}${flightId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						handleReset({
							...setIdIfValueIsObject(res.data),
							passenger: flightId
						});
					} else {
						handleReset({
							passenger: flightId,
							ticket_status: activeRetrnCncl.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					handleReset({
						passenger: flightId,
						ticket_status: activeRetrnCncl.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			handleReset({ ticket_status: activeRetrnCncl.find((data) => data.default)?.id });
		}
	}, [fromSearch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

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
		<FormProvider
			{...methods}
			key={formKey}
		>
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
				header={
					<FlightHeader
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
										render={({ field: { onChange, value } }) => (
											<Autocomplete
												className={`w-full max-w-320 h-48 ${classes.container}`}
												freeSolo
												autoHighlight
												disabled={!!fromSearch}
												value={value ? passengers.find((data) => data.id == value) : null}
												options={passengers}
												getOptionLabel={(option) =>
													`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
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
															setValue('passenger', res.data?.id);
															setValue('current_status', res.data?.current_status?.id);
														});

													if (newValue?.id) {
														axios
															.get(`${FLIGHT_BY_PASSENGER_ID}${newValue?.id}`, authTOKEN)
															.then((res) => {
																if (res.data.id) {
																	handleReset({
																		...setIdIfValueIsObject(res.data)
																	});
																	navigate(
																		`/apps/flight-management/flights/${
																			newValue?.passenger_id || newValue?.id
																		}`
																	);
																} else {
																	navigate(`/apps/flight-management/flights/new`);
																	handleReset({
																		ticket_status: activeRetrnCncl.find(
																			(data) => data.default
																		)?.id
																	});
																}
															})
															.catch(() => {
																navigate(`/apps/flight-management/flights/new`);
																handleReset({
																	ticket_status: activeRetrnCncl.find(
																		(data) => data.default
																	)?.id
																});
															});
													} else {
														navigate(`/apps/flight-management/flights/new`);
														handleReset({
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
														// error={!!errors.passenger || !value}
														autoFocus
														helperText={errors?.passenger?.message}
														variant="outlined"
														InputLabelProps={
															value ? { shrink: true } : { style: { color: 'red' } }
														}

														// onKeyDown={handleSubmitOnKeyDownEnter}
													/>
												)}
											/>
										)}
									/>
								</div>
								<FlightForm />
							</div>
						)}
						{tabValue === 1 && <FlightForm flightId={flightId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Flight;
