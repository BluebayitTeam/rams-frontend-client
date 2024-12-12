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
import PassengerSummaryUpdateClmHeader from './PassengerSummaryUpdateClmHeader';
import PassengerSummaryUpdateClmModel from './models/PassengerSummaryUpdateClmModel';
import { useGetPassengerSummaryUpdateClmQuery } from '../PassengerSummaryUpdateClmsApi';
import PassengerSummaryUpdateClmForm from './PassengerSummaryUpdateClmForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a passengerSummaryUpdateClm name')
    .min(5, 'The passengerSummaryUpdateClm name must be at least 5 characters'),
});

function PassengerSummaryUpdateClm() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { passengerSummaryUpdateClmId } = routeParams;

  const {
    data: passengerSummaryUpdateClm,
    isLoading,
    isError,
    refetch,
  } = useGetPassengerSummaryUpdateClmQuery(passengerSummaryUpdateClmId);
  console.log('passengerSummaryUpdateClmIdsdsdds', passengerSummaryUpdateClm, passengerSummaryUpdateClmId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (passengerSummaryUpdateClmId === 'new') {
      reset(PassengerSummaryUpdateClmModel({}));
    }
  }, [passengerSummaryUpdateClmId, reset]);

  useEffect(() => {
    refetch();

    if (passengerSummaryUpdateClm) {
      reset(passengerSummaryUpdateClm);
    }
  }, [reset, passengerSummaryUpdateClm?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested passengerSummaryUpdateClms is not exists
   */
  if (isError && passengerSummaryUpdateClmId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such passengerSummaryUpdateClm!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/passengerSummaryUpdateClm/passengerSummaryUpdateClms'
          color='inherit'>
          Go to PassengerSummaryUpdateClms Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<PassengerSummaryUpdateClmHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <PassengerSummaryUpdateClmForm passengerSummaryUpdateClms={passengerSummaryUpdateClm} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default PassengerSummaryUpdateClm;
