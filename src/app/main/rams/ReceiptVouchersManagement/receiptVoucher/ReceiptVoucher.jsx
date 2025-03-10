import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import setIdIfValueIsObjArryData from 'src/app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'src/app/@helpers/setIdIfValueIsObject2';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { z } from 'zod';
import { useGetReceiptVoucherQuery } from '../ReceiptVouchersApi';
import ReceiptVoucherForm from './ReceiptVoucherForm';
import ReceiptVoucherHeader from './ReceiptVoucherHeader';
import ReceiptVoucherModel from './models/ReceiptVoucherModel';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function ReceiptVoucher() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { receiptVoucherId, invoice_no } = routeParams;
	const [letFormSave, setLetFormSave] = useState(false);

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
					There is no such Receipt Voucher!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/receiptVoucher/receiptVouchers"
					color="inherit"
				>
					Go to Receipt Vouchers Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			{hasPermission('RECEIPT_VOUCHER_DETAILS') && (
				<FusePageCarded
					header={<ReceiptVoucherHeader letFormSave={letFormSave} />}
					content={
						<div className='p-16 '>
							<div>
								<ReceiptVoucherForm setLetFormSave={setLetFormSave} receiptVoucherId={receiptVoucherId} />
							</div>
						</div>
					}
					scroll={isMobile ? 'normal' : 'content'}
				/>
			)}
		</FormProvider>
	);
}

export default ReceiptVoucher;
