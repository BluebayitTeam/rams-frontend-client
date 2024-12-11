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
import TicketeditModel from './models/TicketeditModel';
import { useGetTicketeditQuery } from '../TicketeditsApi';
import TicketeditForm from './TicketeditForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import TicketeditHeader from './TicketeditHeader';
// import TicketeditHeader from './TicketeditHeader';
/**
 * Form Validation Schema
 */
const schema = z.object({
	
});

function Ticketedit() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { ticketeditId } = routeParams;

	const {
		data: ticketedit,
		isLoading,
		isError
	} = useGetTicketeditQuery(ticketeditId, {
		skip: !ticketeditId || ticketeditId === 'new'
	});
	console.log('ticketeditId', ticketedit, ticketeditId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (ticketeditId === 'new') {
			reset(TicketeditModel({}));
		}
	}, [ticketeditId, reset]);

	useEffect(() => {
		if (ticketedit) {
			reset({ ...ticketedit });
		}
	}, [ticketedit, reset, ticketedit?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested ticketedits is not exists
	 */
	if (isError && ticketeditId !== 'new') {
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
					There is no such ticketedit!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/ticketedit/ticketedits"
					color="inherit"
				>
					Go to Ticketedits Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('DEPARTURE_DETAILS') && (
        <FusePageCarded
          header={<TicketeditHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <TicketeditForm
                  ticketedit={ticketedit}
                  ticketeditId={ticketeditId}
                />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Ticketedit;
