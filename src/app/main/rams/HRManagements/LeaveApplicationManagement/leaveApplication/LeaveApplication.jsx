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
import { z } from 'zod';
import { useGetLeaveApplicationQuery } from '../LeaveApplicationsApi';
import LeaveApplicationForm from './LeaveApplicationForm';
import LeaveApplicationHeader from './LeaveApplicationHeader';
import LeaveApplicationModel from './models/LeaveApplicationModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function LeaveApplication() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { LeaveApplicationId } = routeParams;

  const {
    data: LeaveApplication,
    isLoading,
    isError,
  } = useGetLeaveApplicationQuery(LeaveApplicationId, {
    skip: !LeaveApplicationId || LeaveApplicationId === 'new',
  });

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (LeaveApplicationId === 'new') {
      reset(LeaveApplicationModel({}));
    }
  }, [LeaveApplicationId, reset]);

  useEffect(() => {
    if (LeaveApplication) {
      console.log('LeaveApplication1212121', LeaveApplication);
      reset({ ...LeaveApplication });
    }
  }, [LeaveApplication, reset, LeaveApplication?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested LeaveApplications is not exists
   */
  if (isError && LeaveApplicationId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such LeaveApplication!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/LeaveApplication/LeaveApplications'
          color='inherit'>
          Go to LeaveApplications Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<LeaveApplicationHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <LeaveApplicationForm LeaveApplicationId={LeaveApplicationId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default LeaveApplication;
