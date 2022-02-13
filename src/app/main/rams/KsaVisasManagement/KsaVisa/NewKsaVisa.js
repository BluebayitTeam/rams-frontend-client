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
import reducer from '../store/index.js';
import { getKsaVisa, newKsaVisa, resetKsaVisa } from '../store/ksaVisaSlice';
import KsaVisaForm from './KsaVisaForm';
import NewKsaVisaHeader from './NewKsaVisaHeader';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const KsaVisa = () => {
	const dispatch = useDispatch();
	const ksaVisa = useSelector(({ ksaVisasManagement }) => ksaVisasManagement.ksaVisa);

	const [noKsaVisa, setNoKsaVisa] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateKsaVisaState() {
			const { ksaVisaId } = routeParams;

			if (ksaVisaId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newKsaVisa());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getKsaVisa(ksaVisaId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoKsaVisa(true);
					}
				});
			}
		}

		updateKsaVisaState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!ksaVisa) {
			return;
		}
		/**
		 * Reset the form on ksaVisa state changes
		 */
		reset(ksaVisa);
	}, [ksaVisa, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset KsaVisa on component unload
			 */
			dispatch(resetKsaVisa());
			setNoKsaVisa(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noKsaVisa) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such ksaVisa!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to KsaVisa Page
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
				header={<NewKsaVisaHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl border bg-grey-200 border-grey-600 rounded-xl mx-auto md:mt-2">
						<KsaVisaForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('ksaVisasManagement', reducer)(KsaVisa);
