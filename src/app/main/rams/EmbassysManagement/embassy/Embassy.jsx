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
import { EMBASSY_BY_PASSENGER_ID, GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import EmbassyHeader from './EmbassyHeader';
// import { useGetEmbassyQuery } from '../EmbassysApi';
import EmbassyForm from './EmbassyForm';
import { useGetEmbassyQuery } from '../EmbassysApi';

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
	passenger: z
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

	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios
				.get(`${EMBASSY_BY_PASSENGER_ID}${embassyId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: embassyId });
					} else {
						reset({
							passenger: embassyId,
							musaned_status: doneNotDone.find((data) => data.default)?.id,
							okala_status: doneNotDone.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: embassyId,
						musaned_status: doneNotDone.find((data) => data.default)?.id,
						okala_status: doneNotDone.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			reset({
				musaned_status: doneNotDone.find((data) => data.default)?.id,
				okala_status: doneNotDone.find((data) => data.default)?.id
			});
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
															.get(`${EMBASSY_BY_PASSENGER_ID}${newValue?.id}`, authTOKEN)
															.then((res) => {
																if (res.data.id) {
																	reset({
																		...setIdIfValueIsObject(res.data),
																		passenger: newValue?.id
																	});
																	navigate(
																		`/apps/embassy-management/embassys/${
																			newValue?.passenger?.id || newValue?.id
																		}`
																	);
																} else {
																	navigate(`/apps/embassy-management/embassys/new`);
																	reset({
																		passenger: newValue?.id,
																		musaned_no: '',
																		musaned_date: '',
																		musaned_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,
																		okala_status: doneNotDone.find(
																			(data) => data.default
																		)?.id,

																		musaned_given_by: 'all',
																		okala_no: '',
																		okala_date: '',
																		okala_given_by: 'all'
																	});
																}
															})
															.catch(() => {
																reset({
																	passenger: newValue?.id,
																	musaned_no: '',
																	musaned_date: '',
																	musaned_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,
																	okala_status: doneNotDone.find(
																		(data) => data.default
																	)?.id,

																	musaned_given_by: 'all',
																	okala_no: '',
																	doc1_image: '',
																	doc2_image: '',
																	okala_date: '',
																	okala_given_by: 'all'
																});
																navigate(`apps/embassy-management/embassys/new`);
															});
													} else {
														reset({
															passenger: newValue?.id,
															musaned_no: '',
															musaned_date: '',
															musaned_status: doneNotDone.find((data) => data.default)
																?.id,
															okala_status: doneNotDone.find((data) => data.default)?.id,

															musaned_given_by: 'all',
															okala_no: '',
															okala_date: '',
															okala_given_by: 'all'
														});
														navigate(`apps/embassy-management/embassys/new`);
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
