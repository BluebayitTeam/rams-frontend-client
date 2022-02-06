import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import reducer from '../store/index.js';
import { getLedger, newLedger, resetLedger } from '../store/ledgerSlice';
import LedgerForm from './LedgerForm.js';
import NewLedgerHeader from './NewLedgerHeader.js';

/**
 * Form Validation Schema
 */
const schemaObj = {
	name: yup.string().required('Name is required')
};
const schema = yup.object().shape({
	...schemaObj
});

const Ledger = () => {
	const dispatch = useDispatch();
	const ledger = useSelector(({ ledgersManagement }) => ledgersManagement.ledger);

	const [noLedger, setNoLedger] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset, setError } = methods;

	useEffect(() => {
		setTimeout(() => {
			for (let key in schemaObj) {
				setError(key, {
					type: 'manual'
				});
			}
		}, 0);
	}, []);

	useDeepCompareEffect(() => {
		function updateLedgerState() {
			const { ledgerId } = routeParams;

			if (ledgerId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newLedger());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getLedger(ledgerId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoLedger(true);
					}
				});
			}
		}

		updateLedgerState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!ledger) {
			return;
		}
		/**
		 * Reset the form on ledger state changes
		 */
		reset(ledger);
	}, [ledger, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Ledger on component unload
			 */
			dispatch(resetLedger());
			setNoLedger(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noLedger) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such ledger!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Ledger Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<NewLedgerHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<LedgerForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('ledgersManagement', reducer)(Ledger);
