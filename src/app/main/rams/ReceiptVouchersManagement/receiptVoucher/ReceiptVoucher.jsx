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
import ReceiptVoucherHeader from './ReceiptVoucherHeader';
import ReceiptVoucherModel from './models/ReceiptVoucherModel';
import { useGetReceiptVoucherQuery } from '../ReceiptVouchersApi';
import ReceiptVoucherForm from './ReceiptVoucherForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function ReceiptVoucher() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { receiptVoucherId, invoice_no } = routeParams;

	const {
		data: receiptVoucher,
		isLoading,
		isError
	} = useGetReceiptVoucherQuery(invoice_no, {
		skip: !receiptVoucherId || receiptVoucherId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (receiptVoucherId === 'new') {
			reset(ReceiptVoucherModel({}));
		}
	}, [receiptVoucherId, reset]);

	useEffect(() => {
		if (receiptVoucher) {
			const convertedReceiptVoucherItems = setIdIfValueIsObjArryData(receiptVoucher?.items);
			const convertedReceiptVoucher = setIdIfValueIsObject2(receiptVoucher);
			reset({
				...convertedReceiptVoucher,
				items: convertedReceiptVoucherItems
			});
		}
	}, [receiptVoucher, reset, receiptVoucher?.id]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested receiptVouchers is not exists
	 */
	if (isError && receiptVoucherId !== 'new') {
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
					There is no such receiptVoucher!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/receiptVoucher/receiptVouchers"
					color="inherit"
				>
					Go to ReceiptVouchers Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ReceiptVoucherHeader />}
				content={
					<div className="p-16 ">
						<div>
							<ReceiptVoucherForm receiptVoucherId={receiptVoucherId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ReceiptVoucher;
