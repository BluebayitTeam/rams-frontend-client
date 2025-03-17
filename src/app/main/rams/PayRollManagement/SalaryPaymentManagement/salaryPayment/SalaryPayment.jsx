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
import { useGetSalaryPaymentQuery } from '../SalaryPaymentsApi';
import SalaryPaymentForm from './SalaryPaymentForm';
import SalaryPaymentHeader from './SalaryPaymentHeader';
import SalaryPaymentModel from './models/SalaryPaymentModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  date: z
    .string()
    .nonempty('Date is required')
    .refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date format',
    }),
  payment_month: z.string(),
  calculation_for: z.string(),
  payment_type: z.string(),
  payment_account: z.number(),
  // payheads: z
  //   .array(z.number())
  //   .min(1, 'At least one payhead must be selected') 
  //   .nonempty('Payheads are required'),
}).refine(
  (data) =>
    data.calculation_for === "all" ||
    (data.calculation_for === "department" && data.department !== undefined) ||
    (data.calculation_for === "employees" && data.employee !== undefined),
  // {
  //   message:
  //     "Must provide 'department' array if calculation_for is 'department', or 'employee' array if calculation_for is 'employees'",
  //   path: ["calculation_for"],
  // }
)

function SalaryPayment() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { salaryPaymentId } = routeParams;

  const {
    data: salaryPayment,
    isLoading,
    isError,
  } = useGetSalaryPaymentQuery(salaryPaymentId, {
    skip: !salaryPaymentId || salaryPaymentId === 'new',
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
    if (salaryPaymentId === 'new') {
      reset(SalaryPaymentModel({}));
    }
  }, [salaryPaymentId, reset]);

  useEffect(() => {
    if (salaryPayment) {

      reset({
        payment_month: salaryPayment?.payment_month,
        date: salaryPayment?.date,
        employee: salaryPayment?.employee,
        payment_account: salaryPayment.payment_account,

        ...salaryPayment,
      });
    }
  }, [salaryPayment, reset]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested salaryPayments is not exists
   */
  if (isError && salaryPaymentId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such salaryPayment!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/salaryPayment/salaryPayments'
          color='inherit'>
          Go to SalaryPayments Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<SalaryPaymentHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <SalaryPaymentForm salaryPaymentId={salaryPaymentId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default SalaryPayment;
