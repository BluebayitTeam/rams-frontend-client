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
import TicketRefundHeader from './TicketRefundHeader';
import TicketRefundModel from './models/TicketRefundModel';
import { useGetTicketRefundQuery } from '../TicketRefundsApi';
import TicketRefundForm from './TicketRefundForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	
});

function TicketRefund() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ticketRefundId } = routeParams;

	const {
		data: ticketRefund,
		isLoading,
		isError
	} = useGetTicketRefundQuery(ticketRefundId, {
		skip: !ticketRefundId || ticketRefundId === 'new'
	});
	console.log('ticketRefundId', ticketRefund, ticketRefundId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (ticketRefundId === 'new') {
			reset(TicketRefundModel({}));
		}
	}, [ticketRefundId, reset]);

	useEffect(() => {
		if (ticketRefund) {
			reset({ ...ticketRefund });
		}
	}, [ticketRefund, reset, ticketRefund?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested ticketRefunds is not exists
	 */
	if (isError && ticketRefundId !== 'new') {
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
					There is no such ticketRefund!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/ticketRefund/ticketRefunds"
					color="inherit"
				>
					Go to TicketRefunds Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('DEPARTURE_DETAILS') && (
        <FusePageCarded
          header={<TicketRefundHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <TicketRefundForm ticketRefundId={ticketRefundId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default TicketRefund;
