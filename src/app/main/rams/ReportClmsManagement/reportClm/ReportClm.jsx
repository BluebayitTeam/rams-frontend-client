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
import ReportClmHeader from './ReportClmHeader';
import ReportClmModel from './models/ReportClmModel';
import { useGetReportClmQuery } from '../ReportClmsApi';
import ReportClmForm from './ReportClmForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a reportClm name')
    .min(5, 'The reportClm name must be at least 5 characters'),
});

function ReportClm() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { reportClmId } = routeParams;

  const {
    data: reportClm,
    isLoading,
    isError,
    refetch,
  } = useGetReportClmQuery(reportClmId, {
    skip: !reportClmId || reportClmId === 'new',
  });
  console.log('reportClmIdsdsdds', reportClm, reportClmId);

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
    if (reportClmId === 'new') {
      reset(ReportClmModel({}));
    }
  }, [reportClmId, reset]);

  useEffect(() => {
    refetch();

    if (reportClm) {
      reset(reportClm);
    }
  }, [reset, reportClm?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested reportClms is not exists
   */
  if (isError && reportClmId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such reportClm!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/reportClm/reportClms'
          color='inherit'>
          Go to ReportClms Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ReportClmHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <ReportClmForm reportClms={reportClm} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default ReportClm;
