import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PaymentDetailHeader from './PaymentDetailHeader';
import PaymentDetailModel from './models/PaymentDetailModel';
import { useGetPaymentDetailQuery } from '../PaymentDetailsApi';
import PaymentDetailForm from './PaymentDetailForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a paymentDetail name')
		.min(5, 'The paymentDetail name must be at least 5 characters')
});

function PaymentDetail() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { paymentDetailId } = routeParams;

	const {
		data: paymentDetail,
		isLoading,
		isError
	} = useGetPaymentDetailQuery(paymentDetailId, {
		skip: !paymentDetailId || paymentDetailId === 'new'
	});
	console.log('paymentDetailId', paymentDetail, paymentDetailId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (paymentDetailId === 'new') {
			reset(PaymentDetailModel({}));
		}
	}, [paymentDetailId, reset]);

	useEffect(() => {
		if (paymentDetail) {
			reset({ ...paymentDetail });
		}
	}, [paymentDetail, reset, paymentDetail?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested paymentDetails is not exists
	 */
	if (isError && paymentDetailId !== 'new') {
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
					There is no such paymentDetail!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/paymentDetail/paymentDetails"
					color="inherit"
				>
					Go to PaymentDetails Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PaymentDetailHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PaymentDetailForm paymentDetailId={paymentDetailId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PaymentDetail;
