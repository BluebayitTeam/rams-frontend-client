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
import { useGetAssignPayheadQuery } from '../AssignPayheadsApi';
import AssignPayheadForm from './AssignPayheadForm';
import AssignPayheadHeader from './AssignPayheadHeader';
import AssignPayheadModel from './models/AssignPayheadModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  date: z
    .string()
    .nonempty('Date is required') // Ensures the field is not empty
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date format', // Ensures the value is a valid date
    }),
  payheads: z
    .array(z.number())
    .min(1, 'At least one payhead must be selected') // Ensures at least one payhead is selected
    .nonempty('Payheads are required'),
});

function AssignPayhead() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { assignPayheadId } = routeParams;

  const {
    data: assignPayhead,
    isLoading,
    isError,
  } = useGetAssignPayheadQuery(assignPayheadId, {
    skip: !assignPayheadId || assignPayheadId === 'new',
  });
  console.log('assignPayheadId', assignPayhead, assignPayheadId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (assignPayheadId === 'new') {
      reset(AssignPayheadModel({}));
    }
  }, [assignPayheadId, reset]);

  useEffect(() => {
    if (assignPayhead) {
      console.log('assignPayhead', assignPayhead);
      reset({
        employees: assignPayhead.employees,
        payheads: assignPayhead.payheads,
        ...assignPayhead.payhead_assignments,
      });
    }
  }, [assignPayhead, reset, assignPayhead?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested assignPayheads is not exists
   */
  if (isError && assignPayheadId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such assignPayhead!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/assignPayhead/assignPayheads'
          color='inherit'>
          Go to AssignPayheads Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<AssignPayheadHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <AssignPayheadForm assignPayheadId={assignPayheadId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default AssignPayhead;
