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
import { MOFA_BY_PASSENGER_ID } from 'src/app/constant/constants';
import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import MofaHeader from './MofaHeader';
import { useGetMofaQuery } from '../MofasApi';
import MofaForm from './MofaForm';

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
	passenger: z.string().nonempty('You must enter a mofa name').min(5, 'The mofa name must be at least 5 characters')
});

function Mofa() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { mofaId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);

	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});

	const {
		data: mofa,
		isLoading,
		isError
	} = useGetMofaQuery(mofaId, {
		skip: !mofaId || mofaId === 'new'
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
	// 	if (mofaId === 'new') {
	// 		reset(MofaModel({}));
	// 	}
	// }, [mofaId, reset]);

	// useEffect(() => {
	// 	if (mofa) {
	// 		reset({ ...mofa });
	// 	}
	// }, [mofa, reset]);

	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios
				.get(`${MOFA_BY_PASSENGER_ID}${mofaId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: mofaId });
					} else {
						reset({
							passenger: mofaId,
							mofa_status: doneNotDone.find((data) => data.default)?.id,
							remofa_status: doneNotDone.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: mofaId,
						mofa_status: doneNotDone.find((data) => data.default)?.id,
						remofa_status: doneNotDone.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			reset({
				mofa_status: doneNotDone.find((data) => data.default)?.id,
				remofa_status: doneNotDone.find((data) => data.default)?.id
			});
		}
	}, [fromSearch]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	// const updateCurrentStatus = (id) => {
	// 	const authTOKEN = {
	// 		headers: {
	// 			'Content-type': 'application/json',
	// 			Authorization: localStorage.getItem('jwt_access_token')
	// 		}
	// 	};
	// 	axios.get(`${GET_PASSENGER_BY_ID}${id}`, authTOKEN).then((res) => {
	// 		setValue('current_status', res.data?.current_status?.id);
	// 	});
	// };

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
						<Tab label="Mofa Information" />
					</Tabs>
				}
				header={<MofaHeader />}
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
													if (newValue?.id) {
														const authTOKEN = {
															headers: {
																'Content-type': 'application/json',
																Authorization: localStorage.getItem('jwt_access_token')
															}
														};
														axios
															.get(`${MOFA_BY_PASSENGER_ID}${newValue?.id}`, authTOKEN)
															.then((res) => {
																if (res.data.id) {
																	reset({
																		...setIdIfValueIsObject(res.data),
																		passenger: newValue?.id
																	});
																	navigate(
																		`/apps/mofa-management/mofas/${
																			newValue?.passenger?.id || newValue?.id
																		}`
																	);
																} else {
																	navigate(`/apps/mofa-management/mofas/new`);
																	reset({
																		passenger: newValue?.id,

																		mofa_agency: 'all',

																		remofa_status:
																			doneNotDone.find((data) => data.default)
																				?.id || '',
																		mofa_status:
																			doneNotDone.find((data) => data.default)
																				?.id || '',

																		why_remofa: '',
																		mofa_date: '',
																		remofa_charge: ''
																	});
																}
															})
															.catch(() => {
																reset({
																	passenger: newValue?.id,

																	mofa_agency: 'all',

																	remofa_status:
																		doneNotDone.find((data) => data.default)?.id ||
																		'',
																	mofa_status:
																		doneNotDone.find((data) => data.default)?.id ||
																		'',

																	why_remofa: '',
																	mofa_date: '',
																	remofa_charge: ''
																});
																navigate(`/apps/mofa-management/mofas/new`);
															});
													} else {
														navigate(`/apps/mofa-management/mofas/new`);
														reset({
															passenger: 'all',
															mofa_agency: 'all',

															remofa_status:
																doneNotDone.find((data) => data.default)?.id || '',
															mofa_status:
																doneNotDone.find((data) => data.default)?.id || '',

															why_remofa: '',
															mofa_date: '',
															remofa_charge: ''
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
								<MofaForm />
							</div>
						)}
						{tabValue === 1 && <MofaForm mofaId={mofaId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default Mofa;
