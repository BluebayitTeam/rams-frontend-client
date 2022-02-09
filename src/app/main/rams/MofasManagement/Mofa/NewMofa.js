import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { doneNotDone } from 'app/@data/data';
import setIdIfValueIsObject from 'app/@helpers/setIdIfValueIsObject.js';
import { MOFA_BY_PASSENGER_ID } from 'app/constant/constants.js';
import withReducer from 'app/store/withReducer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import MofaForm from './MofaForm.js';
import NewMofaHeader from './NewMofaHeader.js';

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

const Mofa = () => {
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

	const { fromSearch, mofaId } = useParams();

	useEffect(() => {
		if (fromSearch) {
			axios
				.get(`${MOFA_BY_PASSENGER_ID}${mofaId}`)
				.then(res => {
					console.log('Res', res.data);
					if (res.data.id) {
						reset({ ...setIdIfValueIsObject(res.data), passenger: mofaId });
					}
				})
				.catch(() => null);
		} else {
			reset({
				mofa_status: doneNotDone.find(data => data.default)?.id,
				re_mofa_status: doneNotDone.find(data => data.default)?.id
			});
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
				header={<NewMofaHeader />}
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
										value={value ? passengers.find(data => data.id == value) : null}
										options={passengers}
										getOptionLabel={option =>
											`${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
										}
										onChange={(event, newValue) => {
											if (newValue?.id) {
												axios
													.get(`${MOFA_BY_PASSENGER_ID}${newValue?.id}`)
													.then(res => {
														console.log('Res', res.data);
														if (res.data.id) {
															reset({
																...setIdIfValueIsObject(res.data),
																passenger: newValue?.id
															});
															history.push(
																`/apps/mofa-management/mofa/${
																	newValue?.passenger_id || newValue?.id
																}`
															);
														} else {
															history.push(`/apps/mofa-management/mofa/new`);
															reset({
																passenger: newValue?.id,
																mofa_status: doneNotDone.find(data => data.default)?.id,
																re_mofa_status: doneNotDone.find(data => data.default)
																	?.id
															});
														}
													})
													.catch(() => {
														history.push(`/apps/mofa-management/mofa/new`);
														reset({
															passenger: newValue?.id,
															mofa_status: doneNotDone.find(data => data.default)?.id,
															re_mofa_status: doneNotDone.find(data => data.default)?.id
														});
													});
											} else {
												history.push(`/apps/mofa-management/mofa/new`);
												reset({
													passenger: newValue?.id,
													mofa_status: doneNotDone.find(data => data.default)?.id,
													re_mofa_status: doneNotDone.find(data => data.default)?.id
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
												autoFocus
												InputLabelProps={{
													shrink: true
												}}
												// onKeyDown={handleSubmitOnKeyDownEnter}
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
						<MofaForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('mofasManagement', reducer)(Mofa);
