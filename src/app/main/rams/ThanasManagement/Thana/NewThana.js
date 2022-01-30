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
import { getThana, newThana, resetThana } from '../store/thanaSlice';
import NewThanaHeader from './NewThanaHeader';
import ThanaForm from './ThanaForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	city: yup.string().required('City is required'),

	name: yup.string().required('Name is required')
});

const Thana = () => {
	const dispatch = useDispatch();
	const thana = useSelector(({ thanasManagement }) => thanasManagement.thana);

	const [noThana, setNoThana] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateThanaState() {
			const { thanaId } = routeParams;

			if (thanaId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newThana());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getThana(thanaId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoThana(true);
					}
				});
			}
		}

		updateThanaState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!thana) {
			return;
		}
		/**
		 * Reset the form on thana state changes
		 */
		reset(thana);
	}, [thana, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Thana on component unload
			 */
			dispatch(resetThana());
			setNoThana(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noThana) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such thana!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Thana Page
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
				header={<NewThanaHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<ThanaForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('thanasManagement', reducer)(Thana);
