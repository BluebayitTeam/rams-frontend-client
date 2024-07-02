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
import ReceivableBillHeader from './ReceivableBillHeader';
import ReceivableBillModel from './models/ReceivableBillModel';
import { useGetReceivableBillQuery } from '../ReceivableBillsApi';
import ReceivableBillForm from './ReceivableBillForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a receivableBill name')
		.min(5, 'The receivableBill name must be at least 5 characters')
});

function ReceivableBill() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { receivableBillId, invoice_no } = routeParams;

	const {
		data: receivableBill,
		isLoading,
		isError
	} = useGetReceivableBillQuery(invoice_no, {
		skip: !receivableBillId || receivableBillId === 'new'
	});
	console.log('receivableBillId', receivableBill, receivableBillId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (receivableBillId === 'new') {
			reset(ReceivableBillModel({}));
		}
	}, [receivableBillId, reset]);

	useEffect(() => {
		if (receivableBill) {
			reset(receivableBill);
		}
	}, [receivableBill, reset, receivableBill?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested receivableBills is not exists
	 */
	if (isError && receivableBillId !== 'new') {
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
					There is no such receivable Bill!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/receivableBill/receivableBills"
					color="inherit"
				>
					Go to Receivable Bills Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ReceivableBillHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<ReceivableBillForm receivableBillId={receivableBillId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default ReceivableBill;
