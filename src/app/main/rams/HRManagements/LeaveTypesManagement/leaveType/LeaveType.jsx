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
import { useGetLeaveTypeQuery } from '../LeaveTypesApi';
import LeaveTypeForm from './LeaveTypeForm';
import LeaveTypeHeader from './LeaveTypeHeader';
import LeaveTypeModel from './models/LeaveTypeModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function LeaveType() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { LeaveTypeId } = routeParams;

  const {
    data: LeaveType,
    isLoading,
    isError,
  } = useGetLeaveTypeQuery(LeaveTypeId, {
    skip: !LeaveTypeId || LeaveTypeId === 'new',
  });
  console.log('LeaveTypeId', LeaveType, LeaveTypeId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (LeaveTypeId === 'new') {
      reset(LeaveTypeModel({}));
    }
  }, [LeaveTypeId, reset]);

  useEffect(() => {
    if (LeaveType) {
      reset({ ...LeaveType });
    }
  }, [LeaveType, reset, LeaveType?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested LeaveTypes is not exists
   */
  if (isError && LeaveTypeId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such LeaveType!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/LeaveType/LeaveTypes'
          color='inherit'>
          Go to LeaveTypes Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<LeaveTypeHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <LeaveTypeForm LeaveTypeId={LeaveTypeId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default LeaveType;
