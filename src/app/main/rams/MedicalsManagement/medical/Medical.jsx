import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect } from 'react';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { GET_PASSENGER_BY_ID, MEDICAL_BY_PASSENGER_ID } from 'src/app/constant/constants';
import axios from 'axios';
import { Autocomplete, Tabs, TextField } from '@mui/material';
import {
	MEDICAL_CREATE,
	MEDICAL_DELETE,
	MEDICAL_DETAILS,
	MEDICAL_UPDATE
} from 'src/app/constant/permission/permission';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPermissions } from 'app/store/dataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@mui/styles';
import history from '@history';
import { useParams } from 'react-router';
import MedicalForm from './MedicalForm';
import NewMedical from './tabs/NewMedical';
import PagenotFound from '../../Pagenotfound/PagenotFound';

// import MedicalForm from './MedicalForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a medical name')
		.min(5, 'The medical name must be at least 5 characters')
});
const useStyles = makeStyles((theme) => ({
	hidden: {
		display: 'none'
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function Medical() {
	const dispatch = useDispatch();

	const UserPermissions = useSelector((state) => state.data.UserPermissions);
	useEffect(() => {
		dispatch(getUserPermissions());
		return () => sessionStorage.removeItem('operation');
	}, []);
	const passengers = useSelector((state) => state.data.passengers);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { reset, control, formState, setValue } = methods;
	const { errors } = formState;

	const classes = useStyles();

	const { fromSearch, medicalId } = useParams();

	useEffect(() => {
		if (fromSearch) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};

			axios
				.get(`${MEDICAL_BY_PASSENGER_ID}${medicalId}`, authTOKEN)
				.then((res) => {
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: medicalId });
					} else {
						reset({
							passenger: medicalId,
							medical_card: doneNotDone.find((data) => data.default)?.id,
							medical_result: medicalResults.find((data) => data.default)?.id
						});
						sessionStorage.setItem('operation', 'save');
					}
				})
				.catch(() => {
					reset({
						passenger: medicalId,
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
			{UserPermissions?.includes(MEDICAL_CREATE) ||
			UserPermissions?.includes(MEDICAL_UPDATE) ||
			UserPermissions?.includes(MEDICAL_DELETE) ||
			UserPermissions?.includes(MEDICAL_DETAILS) ? (
				<FusePageCarded
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
											value={value ? passengers.find((data) => data.id === value) : null}
											options={passengers}
											getOptionLabel={(option) =>
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
														.then((res) => {
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
																	medical_card: doneNotDone.find(
																		(data) => data.default
																	)?.id,
																	medical_result: medicalResults.find(
																		(data) => data.default
																	)?.id
																});
															}
														})
														.catch(() => {
															history.push(`/apps/medical-management/medical/new`);
															reset({
																passenger: newValue?.id,
																medical_card: doneNotDone.find((data) => data.default)
																	?.id,
																medical_result: medicalResults.find(
																	(data) => data.default
																)?.id
															});
														});
												} else {
													history.push(`/apps/medical-management/medical/new`);
													reset({
														passenger: newValue?.id,
														medical_card: doneNotDone.find((data) => data.default)?.id,
														medical_result: medicalResults.find((data) => data.default)?.id
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
					}
					header={
						(UserPermissions?.includes(MEDICAL_CREATE) ||
							UserPermissions?.includes(MEDICAL_UPDATE) ||
							UserPermissions?.includes(MEDICAL_DELETE) ||
							UserPermissions?.includes(MEDICAL_DETAILS)) && <NewMedical />
					}
					content={
						UserPermissions?.includes(MEDICAL_CREATE) ||
						UserPermissions?.includes(MEDICAL_UPDATE) ||
						UserPermissions?.includes(MEDICAL_DELETE) ? (
							<div className="p-16 ">
								<MedicalForm />
							</div>
						) : (
							<PagenotFound />
						)
					}
					innerScroll
				/>
			) : (
				<PagenotFound />
			)}
		</FormProvider>
	);
}

export default Medical;
