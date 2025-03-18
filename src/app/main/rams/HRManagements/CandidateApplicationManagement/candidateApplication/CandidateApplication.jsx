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

import { Tab, Tabs } from '@mui/material';
import CandidateApplicationModel from './models/CandidateApplicationModel';
import EducationTab from './tabs/EducationTab';
import ExperienceTab from './tabs/ExperienceTab';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string(),
  gender: z.string(),
  job_post: z.number(),
  application_status: z.string(),
  reference_email: z.string().email("Invalid reference email format"),
  education: z.array(z.object({})).min(1, "At least one education entry required"),
  experience: z.array(z.object({})).optional(),
  resume: z
    .instanceof(File)
    .optional(),
  cover_letter: z
    .instanceof(File)
    .optional(),
})
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

  const [tabValue, setTabValue] = useState(0);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      education: [
        {
          degree: '',
          institution: '',
          gpa: '',
          comment: '',
        },
      ],
      experience: [
        {
          company_name: '',
          working_period: '',
          duties: '',
          supervisor_email: '',
        },
      ],
    },
    resolver: zodResolver(schema),
  });
  const { reset, watch, getValues } = methods;
  const form = watch();

  useEffect(() => {
    if (CandidateApplicationId === 'new' && !CandidateApplication) {
      reset(CandidateApplicationModel({}));
    }
  }, [CandidateApplicationId]);

  useEffect(() => {
    if (CandidateApplicationId !== 'new' && CandidateApplication?.id) {
      reset({ ...CandidateApplication });
    }
  }, [CandidateApplication]);

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
          There is no such Candidate Application!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/CandidateApplication/CandidateApplications'
          color='inherit'>
          Go to Candidate Applications Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}

      <FusePageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-80 h-80',
        }}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            classes={{ root: 'w-full h-64' }}>
            <Tab className='h-64' label='Basic Info' />
            <Tab className='h-64' label='Education info' />
            <Tab className='h-64' label='Experience info' />
          </Tabs>
        }
        header={<CandidateApplicationHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor='secondary'
              textColor='secondary'
              variant='scrollable'
              scrollButtons='auto'
              classes={{ root: 'w-full h-64 border-b-1' }}>
              <Tab className='h-64' label='Basic Info' />

              <Tab className='h-64' label='Education info' />
              <Tab className='h-64' label='Experience info' />
            </Tabs>
            <div className='p-16'>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <CandidateApplicationForm
                  CandidateApplicationId={CandidateApplicationId}
                />
              </div>
              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <EducationTab />
              </div>{' '}
              <div className={tabValue !== 2 ? 'hidden' : ''}>
                <ExperienceTab />
              </div>
            </div>
          </>
        }
        innerScroll
      />
      {/* )} */}
    </FormProvider>
  );
}

export default CandidateApplication;
