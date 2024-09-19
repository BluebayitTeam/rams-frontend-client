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
import CurrentStatusHeader from './CurrentStatusHeader';
import CurrentStatusModel from './models/CurrentStatusModel';
import { useGetCurrentStatusQuery } from '../CurrentStatussApi';
import CurrentStatusForm from './CurrentStatusForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a currentStatus name')
		.min(5, 'The currentStatus name must be at least 5 characters')
});

function CurrentStatus() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { currentStatusId } = routeParams;

	const {
		data: currentStatus,
		isLoading,
		isError
	} = useGetCurrentStatusQuery(currentStatusId, {
		skip: !currentStatusId || currentStatusId === 'new'
	});
	console.log('currentStatusId', currentStatus, currentStatusId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (currentStatusId === 'new') {
			reset(CurrentStatusModel({}));
		}
	}, [currentStatusId, reset]);

	useEffect(() => {
		if (currentStatus) {
			reset({ ...currentStatus });
		}
	}, [currentStatus, reset, currentStatus?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested currentStatuss is not exists
	 */
	if (isError && currentStatusId !== 'new') {
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
					There is no such currentStatus!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/currentStatus/currentStatuss"
					color="inherit"
				>
					Go to CurrentStatuss Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('CURRENT_STATUS_DETAILS') && (
        <FusePageCarded
          header={<CurrentStatusHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <CurrentStatusForm currentStatusId={currentStatusId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default CurrentStatus;
