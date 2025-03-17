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
import { useGetCalculationTypeQuery } from '../CalculationTypesApi';
import CalculationTypeForm from './CalculationTypeForm';
import CalculationTypeHeader from './CalculationTypeHeader';
import CalculationTypeModel from './models/CalculationTypeModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string(),
  payhead_type: z.number(),
});

function CalculationType() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { calculationTypeId } = routeParams;

  const {
    data: calculationType,
    isLoading,
    isError,
  } = useGetCalculationTypeQuery(calculationTypeId, {
    skip: !calculationTypeId || calculationTypeId === 'new',
  });
  console.log('calculationTypeId', calculationType, calculationTypeId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (calculationTypeId === 'new') {
      reset(CalculationTypeModel({}));
    }
  }, [calculationTypeId, reset]);

  useEffect(() => {
    if (calculationType) {
      reset({ ...calculationType });
    }
  }, [calculationType, reset, calculationType?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested calculationTypes is not exists
   */
  if (isError && calculationTypeId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such calculationType!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/calculationType/calculationTypes'
          color='inherit'>
          Go to CalculationTypes Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<CalculationTypeHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <CalculationTypeForm calculationTypeId={calculationTypeId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default CalculationType;
