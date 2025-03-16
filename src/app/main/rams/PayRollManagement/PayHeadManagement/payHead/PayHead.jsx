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
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { z } from 'zod';
import { useGetPayHeadQuery } from '../PayHeadsApi';
import PayHeadForm from './PayHeadForm';
import PayHeadHeader from './PayHeadHeader';
import PayHeadModel from './models/PayHeadModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  calculation_type: z.number().int(),
  group: z.number().int(),
  income_type: z.number().int(),
  name: z.string(),
  payhead_type: z.number().int(),
  payslip_display_name: z.string(),
  attendance_type: z.number().int().optional(),
});

function PayHead() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { payHeadId } = routeParams;

  const {
    data: payHead,
    isLoading,
    isError,
  } = useGetPayHeadQuery(payHeadId, {
    skip: !payHeadId || payHeadId === 'new',
  });
  console.log('payHeadId', payHead, payHeadId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (payHeadId === 'new') {
      reset(PayHeadModel({}));
    }
  }, [payHeadId, reset]);

  useEffect(() => {
    if (payHead) {
      reset({ ...payHead });
    }
  }, [payHead, reset, payHead?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested payHeads is not exists
   */
  if (isError && payHeadId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such payHead!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/payHead/payHeads'
          color='inherit'>
          Go to PayHeads Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('PAYHEAD') && (
        <FusePageCarded
          header={<PayHeadHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <PayHeadForm payHeadId={payHeadId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default PayHead;
