import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import { resetVisaSubmissionList } from '../store/visaSubmissionListSlice';
import VisaSubmissionLists from '../VisaSubmissionLists/VisaSubmissionLists.js';
import NewVisaSubmissionListHeader from './NewVisaSubmissionListHeader.js';
import VisaSubmissionListForm from './VisaSubmissionListForm.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	agency: yup.string().nullable().required('Agency is required'),
	passenger: yup.string().nullable().required('Passenger is required'),
	submission_date: yup.date().required('Submission Date is required')
});

const VisaSubmissionList = () => {
	const dispatch = useDispatch();

	const [reFechListData, setReFechListData] = useState(0);

	const [noVisaSubmissionList, setNoVisaSubmissionList] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		return () => {
			/**
			 * Reset VisaSubmissionList on component unload
			 */
			dispatch(resetVisaSubmissionList());
			setNoVisaSubmissionList(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noVisaSubmissionList) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such visaSubmissionList!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to VisaSubmissionList Page
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
				header={<NewVisaSubmissionListHeader setReFechListData={setReFechListData} />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<VisaSubmissionListForm />
						<br />
						<br />
						<br />
						<VisaSubmissionLists reFechListData={reFechListData} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('visaSubmissionListsManagement', reducer)(VisaSubmissionList);
