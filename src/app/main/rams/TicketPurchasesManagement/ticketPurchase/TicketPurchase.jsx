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
import TicketPurchaseHeader from './TicketPurchaseHeader';
import TicketPurchaseModel from './models/TicketPurchaseModel';
import { useGetTicketPurchaseQuery } from '../TicketPurchasesApi';
import TicketPurchaseForm from './TicketPurchaseForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	
});

function TicketPurchase() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ticketPurchaseId } = routeParams;

	const {
		data: ticketPurchase,
		isLoading,
		isError
	} = useGetTicketPurchaseQuery(ticketPurchaseId, {
		skip: !ticketPurchaseId || ticketPurchaseId === 'new'
	});
	console.log('ticketPurchaseId', ticketPurchase, ticketPurchaseId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (ticketPurchaseId === 'new') {
			reset(TicketPurchaseModel({}));
		}
	}, [ticketPurchaseId, reset]);

	useEffect(() => {
		if (ticketPurchase) {
			reset({
        ...ticketPurchase,
        passenger: ticketPurchase?.passenger?.id,
        ticket_agency: ticketPurchase?.ticket_agency?.id,
        country: ticketPurchase?.ticket_agency?.id,
      });
		}
	}, [ticketPurchase, reset, ticketPurchase?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested ticketPurchases is not exists
	 */
	if (isError && ticketPurchaseId !== 'new') {
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
					There is no such ticketPurchase!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/ticketPurchase/ticketPurchases"
					color="inherit"
				>
					Go to TicketPurchases Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('DEPARTURE_DETAILS') && (
        <FusePageCarded
          header={<TicketPurchaseHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <TicketPurchaseForm ticketPurchaseId={ticketPurchaseId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default TicketPurchase;
