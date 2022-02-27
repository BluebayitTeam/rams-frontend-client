import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { getMakeAListRows, resetMakeAListRows } from '../store/makeAListRowSlice';
import MakeAListRowForm from './MakeAListRowForm';
import NewMakeAListRowHeader from './NewMakeAListRowHeader';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({});

const MakeAListRow = () => {
	const dispatch = useDispatch();
	const makeAListRow = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeAListRow);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateMakeAListRowState() {
			const { makeAListId } = routeParams;
			dispatch(getMakeAListRows(makeAListId));
		}
		updateMakeAListRowState();
		return () => dispatch(resetMakeAListRows());
	}, [dispatch, routeParams]);

	useEffect(() => {
		return () => {
			/**
			 * Reset MakeAListRow on component unload
			 */
			// dispatch(resetMakeAListRows());
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<NewMakeAListRowHeader />}
				content={
					<div className="px-16 sm:px-24 max-w-2xl min-h-full">
						<MakeAListRowForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('makeAListsManagement', reducer)(MakeAListRow);
