import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { doneNotDone } from 'app/@data/data';
import setIdIfValueIsObject from 'app/@helpers/setIdIfValueIsObject';
import { MANPOWER_BY_PASSENGER_ID } from 'app/constant/constants';
import { setAlert } from 'app/store/alertSlice';
import withReducer from 'app/store/withReducer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import ManPowerForm from './ManPowerForm';
import NewManPowerHeader from './NewManPowerHeader';

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

const ManPower = () => {
	const dispatch = useDispatch();
	// const manPower = useSelector(({ manPowersManagement }) => manPowersManagement.manPower);
	const passengers = useSelector(state => state.data.passengers);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { reset, control, formState } = methods;
	const { errors } = formState;

	const classes = useStyles();

	const history = useHistory();

	const { fromSearch, manPowerId } = useParams();

	useEffect(() => {
		if (fromSearch) {
			axios
				.get(`${MANPOWER_BY_PASSENGER_ID}${manPowerId}`)
				.then(res => {
					console.log('Res', res.data);
					//update scope
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: manPowerId });
					}
				})
				.catch(() => null);
		} else {
			reset({ man_power_status: doneNotDone.find(data => data.default)?.id });
		}
	}, [fromSearch]);

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				headerBgHeight="128px"
				classes={{
					toolbar: 'p-0',
					header: 'min-h-64 h-64'
				}}
				header={<NewManPowerHeader />}
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
								render={({ field: { value } }) => (
									<Autocomplete
										className={`w-full max-w-320 h-48 ${classes.container}`}
										freeSolo
										autoHighlight
										disabled={!!fromSearch}
										value={value ? passengers.find(data => data.id == value) : null}
										options={passengers}
										getOptionLabel={option =>
											`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
										}
										onChange={(event, newValue) => {
											if (newValue?.id) {
												axios
													.get(`${MANPOWER_BY_PASSENGER_ID}${newValue?.id}`)
													.then(res => {
														console.log('Res', res.data);
														//update scope
														if (res.data.id) {
															reset({
																...setIdIfValueIsObject(res.data),
																passenger: newValue?.id
															});
															history.push(
																`/apps/manPower-management/manPower/${
																	newValue?.passenger_id || newValue?.id
																}`
															);
														}
														//create scope
														else if (res.data?.embassy_exists) {
															history.push(`/apps/manPower-management/manPower/new`);
															reset({
																passenger: newValue?.id,
																createPermission: true,
																man_power_status: doneNotDone.find(data => data.default)
																	?.id
															});
														} else {
															history.push(`/apps/manPower-management/manPower/new`);
															reset({
																passenger: newValue?.id,
																man_power_status: doneNotDone.find(data => data.default)
																	?.id
															});
															dispatch(
																setAlert({
																	alertType: 'warning',
																	alertValue: `please check "Embassy" information`
																})
															);
														}
													})
													.catch(() => {
														history.push(`/apps/manPower-management/manPower/new`);
														reset({
															passenger: newValue?.id,
															man_power_status: doneNotDone.find(data => data.default)?.id
														});
														dispatch(
															setAlert({
																alertType: 'warning',
																alertValue: `please check "Embassy" information`
															})
														);
													});
											} else {
												history.push(`/apps/manPower-management/manPower/new`);
												reset({
													passenger: newValue?.id,
													man_power_status: doneNotDone.find(data => data.default)?.id
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
						<ManPowerForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('manPowersManagement', reducer)(ManPower);
