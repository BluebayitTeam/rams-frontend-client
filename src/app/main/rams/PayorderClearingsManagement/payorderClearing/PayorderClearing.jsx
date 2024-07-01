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
import PayorderClearingHeader from './PayorderClearingHeader';
import PayorderClearingModel from './models/PayorderClearingModel';
import { useGetPayorderClearingQuery } from '../PayorderClearingsApi';
import PayorderClearingForm from './PayorderClearingForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a payorderClearing name')
		.min(5, 'The payorderClearing name must be at least 5 characters')
});

function PayorderClearing() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { payorderClearingId } = routeParams;

	const {
		data: payorderClearing,
		isLoading,
		isError
	} = useGetPayorderClearingQuery(payorderClearingId, {
		skip: !payorderClearingId || payorderClearingId === 'new'
	});
	console.log('payorderClearingId', payorderClearing, payorderClearingId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (payorderClearingId === 'new') {
			reset(PayorderClearingModel({}));
		}
	}, [payorderClearingId, reset]);

	useEffect(() => {
		if (payorderClearing) {
			reset({ ...payorderClearing });
		}
	}, [payorderClearing, reset, payorderClearing?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested payorderClearings is not exists
	 */
	if (isError && payorderClearingId !== 'new') {
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
					There is no such payorderClearing!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/payorderClearing/payorderClearings"
					color="inherit"
				>
					Go to PayorderClearings Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<PayorderClearingHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<PayorderClearingForm payorderClearingId={payorderClearingId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default PayorderClearing;
