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
import { useGetCandidateApplicationQuery } from '../CandidateApplicationsApi';
import CandidateApplicationForm from './CandidateApplicationForm';
import CandidateApplicationHeader from './CandidateApplicationHeader';
import CandidateApplicationModel from './models/CandidateApplicationModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function CandidateApplication() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { CandidateApplicationId } = routeParams;

  const {
    data: CandidateApplication,
    isLoading,
    isError,
  } = useGetCandidateApplicationQuery(CandidateApplicationId, {
    skip: !CandidateApplicationId || CandidateApplicationId === 'new',
  });
  console.log(
    'CandidateApplicationId',
    CandidateApplication,
    CandidateApplicationId
  );

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (CandidateApplicationId === 'new') {
      reset(CandidateApplicationModel({}));
    }
  }, [CandidateApplicationId, reset]);

  useEffect(() => {
    if (CandidateApplication) {
      reset({ ...CandidateApplication });
    }
  }, [CandidateApplication, reset, CandidateApplication?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested CandidateApplications is not exists
   */
  if (isError && CandidateApplicationId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such CandidateApplication!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/CandidateApplication/CandidateApplications'
          color='inherit'>
          Go to CandidateApplications Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<CandidateApplicationHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <CandidateApplicationForm
                CandidateApplicationId={CandidateApplicationId}
              />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default CandidateApplication;
