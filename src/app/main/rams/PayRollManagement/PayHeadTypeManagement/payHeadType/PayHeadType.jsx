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
import { useGetPayHeadTypeQuery } from '../PayHeadTypesApi';
import PayHeadTypeForm from './PayHeadTypeForm';
import PayHeadTypeHeader from './PayHeadTypeHeader';
import PayHeadTypeModel from './models/PayHeadTypeModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty(''),
});

function PayHeadType() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { payHeadTypeId } = routeParams;

  const {
    data: payHeadType,
    isLoading,
    isError,
  } = useGetPayHeadTypeQuery(payHeadTypeId, {
    skip: !payHeadTypeId || payHeadTypeId === 'new',
  });
  console.log('payHeadTypeId', payHeadType, payHeadTypeId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (payHeadTypeId === 'new') {
      reset(PayHeadTypeModel({}));
    }
  }, [payHeadTypeId, reset]);

  useEffect(() => {
    if (payHeadType) {
      reset({ ...payHeadType });
    }
  }, [payHeadType, reset, payHeadType?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested payHeadTypes is not exists
   */
  if (isError && payHeadTypeId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such payHeadType!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/payHeadType/payHeadTypes'
          color='inherit'>
          Go to PayHeadTypes Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<PayHeadTypeHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <PayHeadTypeForm payHeadTypeId={payHeadTypeId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default PayHeadType;
