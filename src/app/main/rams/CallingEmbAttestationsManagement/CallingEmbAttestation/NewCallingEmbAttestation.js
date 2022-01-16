import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { doneNotDone } from 'app/@data/data';
import setIdIfValueIsObject from 'app/@helpers/setIdIfValueIsObject';
import { CALLINGEMBATTESTATION_BY_PASSENGER_ID } from 'app/constant/constants.js';
import withReducer from 'app/store/withReducer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { resetCallingEmbAttestation } from '../store/callingEmbAttestationSlice';
import reducer from '../store/index.js';
import CallingEmbAttestationForm from './CallingEmbAttestationForm.js';
import NewCallingEmbAttestationHeader from './NewCallingEmbAttestationHeader.js';

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

const CallingEmbAttestation = () => {
	const dispatch = useDispatch();
	// const callingEmbAttestation = useSelector(({ callingEmbAttestationsManagement }) => callingEmbAttestationsManagement.callingEmbAttestation);
	const passengers = useSelector(state => state.data.passengers);

	const [noCallingEmbAttestation, setNoCallingEmbAttestation] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { reset, control, formState } = methods;
	const { errors } = formState;

	const classes = useStyles();

	const history = useHistory();

	const { fromSearch, callingEmbAttestationId } = useParams();

	useEffect(() => {
		if (fromSearch) {
			axios
				.get(`${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${callingEmbAttestationId}`)
				.then(res => {
					console.log('Res', res.data);
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: callingEmbAttestationId });
					}
				})
				.catch(() => null);
		} else {
			reset({
				emb_attestation_status: doneNotDone.find(data => data.default)?.id,
				calling_status: doneNotDone.find(data => data.default)?.id,
				bio_submitted_status: doneNotDone.find(data => data.default)?.id
			});
		}
	}, [fromSearch]);

	useEffect(() => {
		return () => {
			/**
			 * Reset CallingEmbAttestation on component unload
			 */
			dispatch(resetCallingEmbAttestation());
			setNoCallingEmbAttestation(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noCallingEmbAttestation) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such callingEmbAttestation!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to CallingEmbAttestation Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				headerBgHeight="128px"
				classes={{
					toolbar: 'p-0',
					header: 'min-h-64 h-64'
				}}
				header={<NewCallingEmbAttestationHeader />}
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
								render={({ field: { onChange, value, name } }) => (
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
													.get(`${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${newValue?.id}`)
													.then(res => {
														console.log('Res', res.data);
														if (res.data.id) {
															reset({
																...setIdIfValueIsObject(res.data),
																passenger: newValue?.id
															});
															history.push(
																`/apps/callingEmbAttestation-management/callingEmbAttestation/${
																	newValue?.passenger_id || newValue?.id
																}`
															);
														} else {
															history.push(
																`/apps/callingEmbAttestation-management/callingEmbAttestation/new`
															);
															reset({
																passenger: newValue?.id,
																emb_attestation_status: doneNotDone.find(
																	data => data.default
																)?.id,
																calling_status: doneNotDone.find(data => data.default)
																	?.id,
																bio_submitted_status: doneNotDone.find(
																	data => data.default
																)?.id
															});
														}
													})
													.catch(() => {
														history.push(
															`/apps/callingEmbAttestation-management/callingEmbAttestation/new`
														);
														reset({
															passenger: newValue?.id,
															emb_attestation_status: doneNotDone.find(
																data => data.default
															)?.id,
															calling_status: doneNotDone.find(data => data.default)?.id,
															bio_submitted_status: doneNotDone.find(data => data.default)
																?.id
														});
													});
											} else {
												history.push(
													`/apps/callingEmbAttestation-management/callingEmbAttestation/new`
												);
												reset({
													passenger: newValue?.id,
													emb_attestation_status: doneNotDone.find(data => data.default)?.id,
													calling_status: doneNotDone.find(data => data.default)?.id,
													bio_submitted_status: doneNotDone.find(data => data.default)?.id
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
						<CallingEmbAttestationForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('callingEmbAttestationsManagement', reducer)(CallingEmbAttestation);
