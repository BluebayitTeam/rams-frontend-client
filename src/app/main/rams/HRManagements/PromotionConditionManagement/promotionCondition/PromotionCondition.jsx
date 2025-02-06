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
import { useGetPromotionConditionQuery } from '../PromotionConditionsApi';
import PromotionConditionForm from './PromotionConditionForm';
import PromotionConditionHeader from './PromotionConditionHeader';
import PromotionConditionModel from './models/PromotionConditionModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function PromotionCondition() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { promotionConditionId } = routeParams;

  const {
    data: promotionCondition,
    isLoading,
    isError,
  } = useGetPromotionConditionQuery(promotionConditionId, {
    skip: !promotionConditionId || promotionConditionId === 'new',
  });
  console.log('promotionConditionId', promotionCondition, promotionConditionId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (promotionConditionId === 'new') {
      reset(PromotionConditionModel({}));
    }
  }, [promotionConditionId, reset]);

  useEffect(() => {
    if (promotionCondition) {
      reset({ ...promotionCondition });
    }
  }, [promotionCondition, reset, promotionCondition?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested promotionConditions is not exists
   */
  if (isError && promotionConditionId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such promotionCondition!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/promotionCondition/promotionConditions'
          color='inherit'>
          Go to PromotionConditions Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<PromotionConditionHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <PromotionConditionForm promotionConditionId={promotionConditionId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default PromotionCondition;
