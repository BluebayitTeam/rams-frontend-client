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
import { getPaymentVoucher, newPaymentVoucher, resetPaymentVoucher } from '../store/paymentVoucherSlice';
import NewPaymentVoucherHeader from './NewPaymentVoucherHeader.js';
import PaymentVoucherForm from './PaymentVoucherForm.js';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	passenger: yup.string().required('Passenger is required'),
	branch: yup.string().required('Branch is required'),
	sub_ledger: yup.string().required('Sub Ledger is required')
});

const PaymentVoucher = () => {
	const dispatch = useDispatch();
	const paymentVoucher = useSelector(({ paymentVouchersManagement }) => paymentVouchersManagement.paymentVoucher);
	const [noPaymentVoucher, setNoPaymentVoucher] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const routeParams = useParams();

	const { reset } = methods;

	useDeepCompareEffect(() => {
		function updatePaymentVoucherState() {
			const { paymentVoucherId } = routeParams;

			if (paymentVoucherId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newPaymentVoucher());
			} else {
				/**
				 * Get User data
				 */

				dispatch(getPaymentVoucher(paymentVoucherId)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoPaymentVoucher(true);
					}
				});
			}
		}

		updatePaymentVoucherState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!paymentVoucher) {
			return;
		}
		/**
		 * Reset the form on paymentVoucher state changes
		 */
		reset(paymentVoucher);
	}, [paymentVoucher, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset PaymentVoucher on component unload
			 */
			dispatch(resetPaymentVoucher());
			setNoPaymentVoucher(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noPaymentVoucher) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such paymentVoucher!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to PaymentVoucher Page
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
				header={<NewPaymentVoucherHeader />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<PaymentVoucherForm />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('paymentVouchersManagement', reducer)(PaymentVoucher);
