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
import { getCurrentStatus, newCurrentStatus, resetCurrentStatus } from '../store/currentStatusSlice';
import reducer from '../store/index';
import CurrentStatusForm from './CurrentStatusForm';
import NewCurrentStatusHeader from './NewCurrentStatusHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('Name is required')
});

const CurrentStatus = () => {
	const dispatch = useDispatch();
	const currentStatus = useSelector(({ currentStatussManagement }) => currentStatussManagement.currentStatus);

	const [noCurrentStatus, setNoCurrentStatus] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateCurrentStatusState() {
			const { currentStatusId } = routeParams;

			if (currentStatusId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newCurrentStatus());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getCurrentStatus(currentStatusId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoCurrentStatus(true);
					}
				});
			}
		}

		updateCurrentStatusState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!currentStatus) {
			return;
		}
		/**
		 * Reset the form on currentStatus state changes
		 */
		reset(currentStatus);
	}, [currentStatus, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset CurrentStatus on component unload
			 */
			dispatch(resetCurrentStatus());
			setNoCurrentStatus(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noCurrentStatus) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such currentStatus!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to CurrentStatus Page
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
				header={<NewCurrentStatusHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<CurrentStatusForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('currentStatussManagement', reducer)(CurrentStatus);
