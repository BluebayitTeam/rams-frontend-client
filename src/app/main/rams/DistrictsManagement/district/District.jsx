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
import DistrictHeader from './DistrictHeader';
import DistrictModel from './models/DistrictModel';
import { useGetDistrictQuery } from '../DistrictsApi';
import DistrictForm from './DistrictForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter a district name'),
  country: z.number().refine((val) => val !== null && val !== undefined, {
    message: 'You must enter a country',
  }),
});

function District() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { districtId } = routeParams;

  const {
    data: district,
    isLoading,
    isError,
  } = useGetDistrictQuery(districtId, {
    skip: !districtId || districtId === 'new',
  });
  console.log('districtId', district, districtId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (districtId === 'new') {
      reset(DistrictModel({}));
    }
  }, [districtId, reset]);

  useEffect(() => {
    if (district) {
      reset({ ...district });
    }
  }, [district, reset, district?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested districts is not exists
   */
  if (isError && districtId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such district!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/district/districts'
          color='inherit'>
          Go to Districts Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<DistrictHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <DistrictForm districtId={districtId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default District;
