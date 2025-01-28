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
import { useGetProvidentFundQuery } from '../ProvidentFundsApi';
import ProvidentFundForm from './ProvidentFundForm';
import ProvidentFundHeader from './ProvidentFundHeader';
import ProvidentFundModel from './models/ProvidentFundModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function ProvidentFund() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { providentFundId } = routeParams;

  const {
    data: providentFund,
    isLoading,
    isError,
  } = useGetProvidentFundQuery(providentFundId, {
    skip: !providentFundId || providentFundId === 'new',
  });
  console.log('providentFundId', providentFund, providentFundId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (providentFundId === 'new') {
      reset(ProvidentFundModel({}));
    }
  }, [providentFundId, reset]);

  useEffect(() => {
    if (providentFund) {
      reset({
        voucher_date: providentFund?.date,
        ...providentFund,
      });
    }
  }, [providentFund, reset, providentFund?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested providentFunds is not exists
   */
  if (isError && providentFundId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such providentFund!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/providentFund/providentFunds'
          color='inherit'>
          Go to ProvidentFunds Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<ProvidentFundHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <ProvidentFundForm providentFundId={providentFundId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default ProvidentFund;
