import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles, Tabs, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { doneNotDone } from 'app/@data/data';
import setIdIfValueIsObject from 'app/@helpers/setIdIfValueIsObject';
import { TRAINING_BY_PASSENGER_ID } from 'app/constant/constants';
import withReducer from 'app/store/withReducer';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { resetTraining } from '../store/trainingSlice';
import NewTrainingHeader from './NewTrainingHeader';
import TrainingForm from './TrainingForm';

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

const Training = () => {
	const dispatch = useDispatch();
	// const training = useSelector(({ trainingsManagement }) => trainingsManagement.training);
	const passengers = useSelector(state => state.data.passengers);

	const [noTraining, setNoTraining] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { reset, control, formState } = methods;
	const { errors } = formState;

	const classes = useStyles();

	const history = useHistory();

	const { trainingId, fromSearch } = useParams();

	useEffect(() => {
		if (fromSearch) {
			axios
				.get(`${TRAINING_BY_PASSENGER_ID}${trainingId}`)
				.then(res => {
					console.log('Res', res.data);
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: trainingId });
					}
				})
				.catch(() => null);
		} else {
			reset({ training_card_status: doneNotDone.find(data => data.default)?.id });
		}
	}, [fromSearch]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Training on component unload
			 */
			dispatch(resetTraining());
			setNoTraining(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noTraining) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such training!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Training Page
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
				header={<NewTrainingHeader />}
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
													.get(`${TRAINING_BY_PASSENGER_ID}${newValue?.id}`)
													.then(res => {
														console.log('Res', res.data);
														if (res.data.id) {
															reset({
																...setIdIfValueIsObject(res.data),
																passenger: newValue?.id
															});
															history.push(
																`/apps/training-management/training/${
																	newValue?.passenger_id || newValue?.id
																}`
															);
														} else {
															history.push(`/apps/training-management/training/new`);
															reset({
																passenger: newValue?.id,
																training_card_status: doneNotDone.find(
																	data => data.default
																)?.id
															});
														}
													})
													.catch(() => {
														history.push(`/apps/training-management/training/new`);
														reset({
															passenger: newValue?.id,
															training_card_status: doneNotDone.find(data => data.default)
																?.id
														});
													});
											} else {
												history.push(`/apps/training-management/training/new`);
												reset({
													passenger: newValue?.id,
													training_card_status: doneNotDone.find(data => data.default)?.id
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
						<TrainingForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('trainingsManagement', reducer)(Training);
