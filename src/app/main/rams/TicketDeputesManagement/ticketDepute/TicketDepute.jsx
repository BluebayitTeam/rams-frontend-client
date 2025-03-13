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
import TicketDeputeHeader from './TicketDeputeHeader';
import TicketDeputeModel from './models/TicketDeputeModel';
import { useGetTicketDeputeQuery } from '../TicketDeputesApi';
import TicketDeputeForm from './TicketDeputeForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
	ticket_no: z
		.string()
		.nonempty('You must enter a ticket no'),
		customer_amount: z
		.string()
		.nonempty('You must enter a customer amount'),
		airline_amount: z
		.string()
		.nonempty('You must enter a airline amount'),
		
});

function TicketDepute() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ticketDeputeId } = routeParams;

	const {
		data: ticketDepute,
		isLoading,
		isError
	} = useGetTicketDeputeQuery(ticketDeputeId, {
		skip: !ticketDeputeId || ticketDeputeId === 'new'
	});
	console.log('ticketDeputeId', ticketDepute, ticketDeputeId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (ticketDeputeId === 'new') {
			reset(TicketDeputeModel({}));
		}
	}, [ticketDeputeId, reset]);

	useEffect(() => {
		if (ticketDepute) {
			reset({ ...ticketDepute });
		}
	}, [ticketDepute, reset, ticketDepute?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested ticketDeputes is not exists
	 */
	if (isError && ticketDeputeId !== 'new') {
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
					There is no such ticketDepute!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/ticketDepute/ticketDeputes"
					color="inherit"
				>
					Go to TicketDeputes Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('DEPARTURE_DETAILS') && (
        <FusePageCarded
          header={<TicketDeputeHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <TicketDeputeForm ticketDeputeId={ticketDeputeId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default TicketDepute;
