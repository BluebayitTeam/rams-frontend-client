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
import { useGetPayrollVoucherQuery } from '../PayrollVouchersApi';
import PayrollVoucherForm from './PayrollVoucherForm';
import PayrollVoucherHeader from './PayrollVoucherHeader';
import PayrollVoucherModel from './models/PayrollVoucherModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function PayrollVoucher() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { payrollVoucherId } = routeParams;

  const {
    data: payrollVoucher,
    isLoading,
    isError,
  } = useGetPayrollVoucherQuery(payrollVoucherId, {
    skip: !payrollVoucherId || payrollVoucherId === 'new',
  });
  console.log('payrollVoucherId', payrollVoucher, payrollVoucherId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (payrollVoucherId === 'new') {
      reset(PayrollVoucherModel({}));
    }
  }, [payrollVoucherId, reset]);

  useEffect(() => {
    if (payrollVoucher) {
      reset({
        voucher_date: payrollVoucher?.date,
        ...payrollVoucher,
      });
    }
  }, [payrollVoucher, reset, payrollVoucher?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested payrollVouchers is not exists
   */
  if (isError && payrollVoucherId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such payrollVoucher!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/payrollVoucher/payrollVouchers'
          color='inherit'>
          Go to PayrollVouchers Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<PayrollVoucherHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <PayrollVoucherForm payrollVoucherId={payrollVoucherId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default PayrollVoucher;
