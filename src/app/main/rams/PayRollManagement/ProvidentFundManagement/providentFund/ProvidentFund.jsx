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
import setIdIfValueIsObjArryData from 'src/app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'src/app/@helpers/setIdIfValueIsObject2';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { z } from 'zod';
import { useGetProvidentFundQuery } from '../ProvidentFundsApi';
import ProvidentFundForm from './ProvidentFundForm';
import ProvidentFundHeader from './ProvidentFundHeader';
import ProvidentFundModel from './models/ProvidentFundModel';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function ProvidentFund() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { providentFundId, invoice_no } = routeParams;

  const {
    data: providentFund,
    isLoading,
    isError,
  } = useGetProvidentFundQuery(invoice_no, {
    skip: !providentFundId || providentFundId === 'new',
  });

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (providentFundId === 'new') {
      reset(ProvidentFundModel({}));
      // dispatch(newProvidentFund());
      // dispatch(setUserBasedBranch(userId));
    }
  }, [providentFundId, reset]);

  useEffect(() => {
    if (providentFund) {
      const convertedProvidentFundItems = setIdIfValueIsObjArryData(
        providentFund?.items
      );
      const convertedProvidentFund = setIdIfValueIsObject2(providentFund);
      reset({
        ...convertedProvidentFund,
        items: convertedProvidentFundItems,
      });
    }
  }, [providentFund, reset, providentFund?.id]);

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

  const handleReset = () => {
    reset({});
    setFormKey((prevKey) => prevKey + 1);
  };
  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('PAYMENT_VOUCHER_DETAILS') && (
        <FusePageCarded
          header={<ProvidentFundHeader />}
          content={
            <div className='p-16 '>
              <div>
                <ProvidentFundForm
                  providentFundId={providentFundId}
                  handleReset={handleReset}
                />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default ProvidentFund;
