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
import { getReceivableBill, newReceivableBill, resetReceivableBill } from '../store/receivableBillSlice';
import NewReceivableBillHeader from './NewReceivableBillHeader.js';
import ReceivableBillForm from './ReceivableBillForm.js';

const schema = yup.object().shape({
	passenger: yup.string().required('Passenger is required'),
	branch: yup.string().required('Branch is required'),
	sub_ledger: yup.string().required('Sub Ledger is required')
});

const ReceivableBill = () => {
	const dispatch = useDispatch();
	const receivableBill = useSelector(({ receivableBillsManagement }) => receivableBillsManagement.receivableBill);
	const [noReceivableBill, setNoReceivableBill] = useState(false);
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
		function updateReceivableBillState() {
			const { receivableBillId, receivableBillName } = routeParams;

			if (receivableBillId === 'new') {
				localStorage.removeItem('event');
				/**
				 * Create New User data
				 */
				dispatch(newReceivableBill());
				dispatch(setUserBasedBranch(userId));
			} else {
				/**
				 * Get User data
				 */

				dispatch(getReceivableBill(receivableBillName)).then(action => {
					console.log(action.payload);
					/**
					 * If the requested product is not exist show message
					 */
					if (!action.payload) {
						setNoReceivableBill(true);
					}
				});
			}
		}

		updateReceivableBillState();
	}, [dispatch, routeParams]);

	useEffect(() => {}, []);

	useEffect(() => {
		if (!receivableBill) {
			return;
		}
		/**
		 * Reset the form on receivableBill state changes
		 */
		const convertedReceivableBillItems = setIdIfValueIsObjArryData(receivableBill?.items);
		const convertedReceivableBill = setIdIfValueIsObject2(receivableBill);
		reset({ ...convertedReceivableBill, items: convertedReceivableBillItems });
	}, [receivableBill, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset ReceivableBill on component unload
			 */
			dispatch(resetReceivableBill());
			setNoReceivableBill(false);
		};
	}, [dispatch]);

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noReceivableBill) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such receivable bill!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/e-commerce/products"
					color="inherit"
				>
					Go to Receivable Bill Page
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
				header={<NewReceivableBillHeader letFormSave={letFormSave} extraItem={extraItem} />}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<ReceivableBillForm setLetFormSave={setLetFormSave} setExtraItem={setExtraItem} />
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
};
export default withReducer('receivableBillsManagement', reducer)(ReceivableBill);
