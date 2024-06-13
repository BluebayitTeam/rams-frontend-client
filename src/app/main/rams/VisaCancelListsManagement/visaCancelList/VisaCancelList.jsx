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
import { GET_PASSENGER_BY_ID, VISACANCELLIST_BY_PASSENGER_ID } from 'src/app/constant/constants';
import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';

// import { useGetVisaCancelListQuery } from '../VisaCancelListsApi';
import moment from 'moment';
import VisaCancelListForm from './VisaCancelListForm';
import { useGetVisaCancelListQuery } from '../VisaCancelListsApi';
import VisaCancelListHeader from './VisaCancelListHeader';

// import { useGetVisaCancelListQuery } from '../VisaCancelListsApi';

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
		.nonempty('You must enter a visaCancelList name')
		.min(5, 'The visaCancelList name must be at least 5 characters')
});

function VisaCancelList() {
	const emptyValue = { passenger: '', agency: '', submission_date: '', current_status: '' };
	// const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { visaCancelListId, fromSearch } = routeParams;
	const passengers = useSelector((state) => state.data.passengers);

	const classes = useStyles();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: emptyValue,
		resolver: zodResolver(schema)
	});

	const {
		data: visaCancelList,
		isLoading,
		isError
	} = useGetVisaCancelListQuery(visaCancelListId, {
		skip: !visaCancelListId || visaCancelListId === 'new'
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
	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			axios
				.get(`${VISACANCELLIST_BY_PASSENGER_ID}${visaCancelListId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						handleReset({ ...setIdIfValueIsObject(res.data), passenger: visaCancelListId });
					} else {
						handleReset({
							passenger: visaCancelListId,
							musaned_status: doneNotDone.find((data) => data.default)?.id,
							okala_status: doneNotDone.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					handleReset({
						passenger: visaCancelListId,
						musaned_status: doneNotDone.find((data) => data.default)?.id,
						okala_status: doneNotDone.find((data) => data.default)?.id
					});
					sessionStorage.setItem('operation', 'save');
				});
		} else {
			handleReset({
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
						<Tab label="VisaCancelList Information" />
					</Tabs>
				}
				header={
					<VisaCancelListHeader
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
												// options={passengers}
												options={passengers}
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
																`${VISACANCELLIST_BY_PASSENGER_ID}${newValue?.id}`,
																authTOKEN
															)
															.then((res) => {
																if (res.data.id) {
																	reset({
																		...setIdIfValueIsObject(res.data),
																		passenger: newValue?.id,
																		agency: res?.data?.agency?.id,
																		submission_date: moment(
																			new Date(res?.data?.submission_date)
																		).format('YYYY-MM-DD')
																	});
																	navigate(
																		`/apps/visaCancelList-management/visaCancelLists/${
																			newValue?.passenger?.id || newValue?.id
																		}`
																	);
																} else {
																	navigate(
																		`/apps/visaCancelList-management/visaCancelList/new`
																	);
																	handleReset({
																		passenger: newValue?.id
																	});
																	getCurrentStatus(newValue?.id);
																}
															})
															.catch(() => {
																handleReset({
																	passenger: newValue?.id
																});
																getCurrentStatus(newValue?.id);

																navigate(
																	`/apps/visaCancelList-management/visaCancelLists/new`
																);
															});
													} else {
														handleReset({
															passenger: newValue?.id
														});
														getCurrentStatus(newValue?.id);

														navigate(`/apps/visaCancelList-management/visaCancelLists/new`);
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
								<VisaCancelListForm />
							</div>
						)}
						{tabValue === 1 && <VisaCancelListForm visaCancelListId={visaCancelListId} />}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default VisaCancelList;
