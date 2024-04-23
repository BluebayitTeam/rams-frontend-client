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
import moment from 'moment';
import SubscriptionLoanHeader from './SubscriptionLoanHeader';
import SubscriptionLoanModel from './models/SubscriptionLoanModel';
import { useGetSubscriptionLoanQuery } from '../SubscriptionLoansApi';
import SubscriptionLoanForm from './SubscriptionLoanForm';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function SubscriptionLoan() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { subscriptionLoanId } = routeParams;

	const {
		data: subscriptionLoan,
		isLoading,
		isError
	} = useGetSubscriptionLoanQuery(subscriptionLoanId, {
		skip: !subscriptionLoanId || subscriptionLoanId === 'new'
	});
	console.log('subscriptionLoanId', subscriptionLoan, subscriptionLoanId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (subscriptionLoanId === 'new') {
			reset(SubscriptionLoanModel({}));
		}
	}, [subscriptionLoanId, reset]);

	useEffect(() => {
		if (subscriptionLoan) {
			console.log('subscriptionLoan', subscriptionLoan);

			reset({
				...subscriptionLoan,
				loan_end_date: moment(subscriptionLoan?.loan_end_date).toISOString()
			});
		}
	}, [subscriptionLoan, reset, subscriptionLoan?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested subscriptionLoans is not exists
	 */
	if (isError && subscriptionLoanId !== 'new') {
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
					There is no such subscriptionLoan!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/subscriptionLoan/subscriptionLoans"
					color="inherit"
				>
					Go to Subscription Loans Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<SubscriptionLoanHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<SubscriptionLoanForm subscriptionLoanId={subscriptionLoanId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default SubscriptionLoan;
