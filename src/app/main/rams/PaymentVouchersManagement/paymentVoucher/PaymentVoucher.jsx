import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import setIdIfValueIsObjArryData from 'src/app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'src/app/@helpers/setIdIfValueIsObject2';
import PaymentVoucherHeader from './PaymentVoucherHeader';
import PaymentVoucherModel from './models/PaymentVoucherModel';
import { useGetPaymentVoucherQuery } from '../PaymentVouchersApi';
import PaymentVoucherForm from './PaymentVoucherForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function PaymentVoucher() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { paymentVoucherId, invoice_no } = routeParams;

	const {
		data: paymentVoucher,
		isLoading,
		isError
	} = useGetPaymentVoucherQuery(invoice_no, {
		skip: !paymentVoucherId || paymentVoucherId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (paymentVoucherId === 'new') {
			reset(PaymentVoucherModel({}));
		}
	}, [paymentVoucherId, reset]);

	useEffect(() => {
		if (paymentVoucher) {
			const convertedPaymentVoucherItems = setIdIfValueIsObjArryData(paymentVoucher?.items);
			const convertedPaymentVoucher = setIdIfValueIsObject2(paymentVoucher);
			reset({
				...convertedPaymentVoucher,
				items: convertedPaymentVoucherItems
			});
		}
	}, [paymentVoucher, reset, paymentVoucher?.id]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested paymentVouchers is not exists
	 */
	if (isError && paymentVoucherId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such paymentVoucher!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/paymentVoucher/paymentVouchers"
					color="inherit"
				>
					Go to PaymentVouchers Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PaymentVoucherHeader />}
				content={
					<div className="p-16 ">
						<div>
							<PaymentVoucherForm paymentVoucherId={paymentVoucherId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PaymentVoucher;
