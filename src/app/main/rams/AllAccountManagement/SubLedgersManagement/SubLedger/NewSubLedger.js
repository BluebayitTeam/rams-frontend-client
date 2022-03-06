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
import { getSubLedger, newSubLedger, resetSubLedger } from '../store/subLedgerSlice';
import NewSubLedgerHeader from './NewSubLedgerHeader';
import SubLedgerForm from './SubLedgerForm';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('Name is required')
});

const SubLedger = () => {
	const dispatch = useDispatch();
	const subLedger = useSelector(({ subLedgersManagement }) => subLedgersManagement.subLedger);

	const [noSubLedger, setNoSubLedger] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updateSubLedgerState() {
			const { subLedgerId } = routeParams;

			if (subLedgerId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newSubLedger());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getSubLedger(subLedgerId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoSubLedger(true);
					}
				});
			}
		}

		updateSubLedgerState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!subLedger) {
			return;
		}
		/**
		 * Reset the form on subLedger state changes
		 */
		reset(subLedger);
	}, [subLedger, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset SubLedger on component unload
			 */
			dispatch(resetSubLedger());
			setNoSubLedger(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noSubLedger) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such subLedger!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to SubLedger Page
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
				header={<NewSubLedgerHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<SubLedgerForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('subLedgersManagement', reducer)(SubLedger);
