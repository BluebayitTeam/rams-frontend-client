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
import { getMakeAListClms, resetMakeAListClms } from '../store/makeAListClmSlice';
import MakeAListClmForm from './MakeAListClmForm';
import NewMakeAListClmHeader from './NewMakeAListClmHeader';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({});

const MakeAListClm = () => {
	const dispatch = useDispatch();
	const makeAListClm = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeAListClm);

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateMakeAListClmState() {
			const { makeAListId } = routeParams;
			dispatch(getMakeAListClms(makeAListId));
		}
		updateMakeAListClmState();
		return () => dispatch(resetMakeAListClms());
	}, [dispatch, routeParams]);

	useEffect(() => {
		return () => {
			/**
			 * Reset MakeAListClm on component unload
			 */
			// dispatch(resetMakeAListClms());
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
				header={<NewMakeAListClmHeader />}
				content={
					<div className="px-16 sm:px-24 max-w-2xl min-h-full">
						<MakeAListClmForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('makeAListsManagement', reducer)(MakeAListClm);
