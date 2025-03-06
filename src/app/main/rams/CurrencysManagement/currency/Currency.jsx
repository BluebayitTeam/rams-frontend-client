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
import CurrencyHeader from './CurrencyHeader';
import CurrencyModel from './models/CurrencyModel';
import { useGetCurrencyQuery } from '../CurrencysApi';
import CurrencyForm from './CurrencyForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter a currency name'),
});

function Currency() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { currencyId } = routeParams;

  const {
    data: currency,
    isLoading,
    isError,
  } = useGetCurrencyQuery(currencyId, {
    skip: !currencyId || currencyId === 'new',
  });
  console.log('currencyId', currency, currencyId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (currencyId === 'new') {
      reset(CurrencyModel({}));
    }
  }, [currencyId, reset]);

  useEffect(() => {
    if (currency) {
      reset({ ...currency });
    }
  }, [currency, reset, currency?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested currencys is not exists
   */
  if (isError && currencyId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such currency!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/currency/currencys'
          color='inherit'>
          Go to Currencys Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('CURRENCY_DETAILS') && (
        <FusePageCarded
          header={<CurrencyHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <CurrencyForm currencyId={currencyId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Currency;
