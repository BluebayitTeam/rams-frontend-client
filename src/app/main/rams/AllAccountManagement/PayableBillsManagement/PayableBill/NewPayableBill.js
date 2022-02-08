import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@material-ui/core';
import useUserInfo from 'app/@customHooks/useUserInfo.js';
import setIdIfValueIsObjArryData from 'app/@helpers/setIdIfValueIsObjArryData.js';
import setIdIfValueIsObject2 from 'app/@helpers/setIdIfValueIsObject2.js';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { setUserBasedBranch } from '../../PaymentVouchersManagement/store/paymentVoucherSlice.js';
import reducer from '../store/index.js';
import { getPayableBill, newPayableBill, resetPayableBill } from '../store/payableBillSlice';
import NewPayableBillHeader from './NewPayableBillHeader';
import PayableBillForm from './PayableBillForm.js';

const schema = yup.object().shape({
	passenger: yup.string().required('Passenger is required'),
	branch: yup.string().required('Branch is required'),
	sub_ledger: yup.string().required('Sub Ledger is required')
});

const PayableBill = () => {
	const dispatch = useDispatch();
	const payableBill = useSelector(({ payableBillsManagement }) => payableBillsManagement.payableBill);
	const [noPayableBill, setNoPayableBill] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const routeParams = useParams();

	const { reset } = methods;

	const [letFormSave, setLetFormSave] = useState(false);
	const [extraItem, setExtraItem] = useState({ ledger: null, debit_amount: 0, credit_amount: 0 });

	const { userId } = useUserInfo();

	useDeepCompareEffect(() => {
		function updatePayableBillState() {
			const { payableBillId, payableBillName } = routeParams;

			if (payableBillId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newPayableBill());
				dispatch(setUserBasedBranch(userId));
			} else {
				/**
				 * Get User data
				 */

				dispatch(getPayableBill(payableBillName)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoPayableBill(true);
					}
				});
			}
		}

		updatePayableBillState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!payableBill) {
			return;
		}
		/**
		 * Reset the form on payableBill state changes
		 */
		const convertedPayableBillItems = setIdIfValueIsObjArryData(payableBill?.items);
		const convertedPayableBill = setIdIfValueIsObject2(payableBill);
		reset({ ...convertedPayableBill, items: convertedPayableBillItems });
	}, [payableBill, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset PayableBill on component unload
			 */
			dispatch(resetPayableBill());
			setNoPayableBill(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noPayableBill) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such payable bill!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Payable Bill Page
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
				header={<NewPayableBillHeader letFormSave={letFormSave} extraItem={extraItem} />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<PayableBillForm setLetFormSave={setLetFormSave} setExtraItem={setExtraItem} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('payableBillsManagement', reducer)(PayableBill);
