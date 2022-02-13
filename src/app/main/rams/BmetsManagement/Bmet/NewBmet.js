import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getBmet, newBmet, resetBmet } from '../store/bmetSlice';
import reducer from '../store/index.js';
import BmetForm from './BmetForm.js';
import NewBmetHeader from './NewBmetHeader.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const Bmet = () => {
	const dispatch = useDispatch();
	const bmet = useSelector(({ bmetsManagement }) => bmetsManagement.bmet);

	const [noBmet, setNoBmet] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateBmetState() {
			const { bmetId } = routeParams;

			if (bmetId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newBmet());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getBmet(bmetId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoBmet(true);
					}
				});
			}
		}

		updateBmetState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!bmet) {
			return;
		}
		/**
		 * Reset the form on bmet state changes
		 */
		reset(bmet);
	}, [bmet, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Bmet on component unload
			 */
			dispatch(resetBmet());
			setNoBmet(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noBmet) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such bmet!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Bmet Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-40 h-40'
				}}
				header={<NewBmetHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl border bg-grey-200 border-grey-600 rounded-xl">
						<BmetForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('bmetsManagement', reducer)(Bmet);
