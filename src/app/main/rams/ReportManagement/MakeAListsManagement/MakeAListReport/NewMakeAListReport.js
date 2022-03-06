import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { resetMakeAListReports } from '../store/makeAListReportSlice';
import MakeAListReport from './MakeAListReport';
import NewMakeAListReportHeader from './NewMakeAListReportHeader';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({});

const NewMakeAListReport = () => {
	const dispatch = useDispatch();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		return () => dispatch(resetMakeAListReports());
	}, [dispatch, routeParams]);

	/**
	 * Show Message if the requested products is not exists
	 */

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				headerBgHeight="102px"
				className="bg-grey-300"
				classes={{
					content: 'bg-grey-300',
					contentCard: 'overflow-hidden',
					header: 'min-h-52 h-52'
				}}
				header={<NewMakeAListReportHeader />}
				content={<MakeAListReport />}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('makeAListsManagement', reducer)(NewMakeAListReport);
