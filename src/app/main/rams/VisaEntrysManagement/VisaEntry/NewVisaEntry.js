import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index';
import { getVisaEntry, newVisaEntry, resetVisaEntry } from '../store/visaEntrySlice';
import NewVisaEntryHeader from './NewVisaEntryHeader';
import VisaEntryForm from './VisaEntryForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	demand: yup.string().required('Demand is required'),

	visa_agent: yup.string().required('Visa Agent is required'),

	country: yup.string().required('Country is required'),

	visa_number: yup.string().required('Visa Number is required'),

	profession_english: yup.string().required('Profession English is required'),

	quantity: yup.string().required('Quantity is required'),

	sponsor_id_no: yup.string().required('Sponsor ID No is required')
});

const VisaEntry = () => {
	const dispatch = useDispatch();
	const visaEntry = useSelector(({ visaEntrysManagement }) => visaEntrysManagement.visaEntry);

	const [noVisaEntry, setNoVisaEntry] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateVisaEntryState() {
			const { visaEntryId } = routeParams;

			if (visaEntryId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newVisaEntry());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getVisaEntry(visaEntryId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoVisaEntry(true);
					}
				});
			}
		}

		updateVisaEntryState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!visaEntry) {
			return;
		}
		/**
		 * Reset the form on visaEntry state changes
		 */
		reset(visaEntry);
	}, [visaEntry, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset VisaEntry on component unload
			 */
			dispatch(resetVisaEntry());
			setNoVisaEntry(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noVisaEntry) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such visaEntry!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to VisaEntry Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-80 h-80'
				}}
				header={<NewVisaEntryHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<VisaEntryForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('visaEntrysManagement', reducer)(VisaEntry);
