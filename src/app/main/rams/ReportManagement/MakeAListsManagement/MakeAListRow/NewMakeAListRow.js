import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Tabs, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getPassengers } from 'app/store/dataSlice';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { addMakeAListRow, getMakeAListRows, resetMakeAListRows } from '../store/makeAListRowSlice';
import MakeAListRowsTable from './MakeAListRowsTable';
import NewMakeAListRowHeader from './NewMakeAListRowHeader';

/**
 * Form Validation Schema
 */

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

const schema = yup.object().shape({});

const MakeAListRow = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });
	const passengers = useSelector(state => state.data.passengers);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();
	const { makeAListId } = routeParams;

	const { control } = methods;

	useEffect(() => {
		dispatch(getPassengers());
	}, []);

	useDeepCompareEffect(() => {
		return () => dispatch(resetMakeAListRows());
	}, [dispatch, routeParams]);

	/**
	 * Show Message if the requested products is not exists
	 */

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-52 h-52',
					content: 'flex',
					contentCard: 'overflow-hidden'
				}}
				header={<NewMakeAListRowHeader />}
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
								render={({ field: { value, onChange } }) => (
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
											onChange(newValue?.id);
											newValue?.id &&
												dispatch(
													addMakeAListRow({
														passenger: newValue?.id,
														make_list: makeAListId
													})
												).then(() =>
													dispatch(getMakeAListRows({ listId: makeAListId, pageAndSize }))
												);
										}}
										renderInput={params => (
											<TextField
												{...params}
												className={classes.textField}
												placeholder="Select Passenger"
												label="Passenger"
												required
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
				content={<MakeAListRowsTable pageAndSize={pageAndSize} setPageAndSize={setPageAndSize} />}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('makeAListsManagement', reducer)(MakeAListRow);
