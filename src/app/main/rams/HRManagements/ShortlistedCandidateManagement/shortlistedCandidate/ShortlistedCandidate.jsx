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
import { useGetShortlistedCandidateQuery } from '../ShortlistedCandidatesApi';
import ShortlistedCandidateForm from './ShortlistedCandidateForm';
import ShortlistedCandidateHeader from './ShortlistedCandidateHeader';
import ShortlistedCandidateModel from './models/ShortlistedCandidateModel';

import { Tab, Tabs } from '@mui/material';
import EducationTab from './tabs/EducationTab';
import ExperienceTab from './tabs/ExperienceTab';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function ShortlistedCandidate() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  console.log('routeParams45454', routeParams);
  const { ShortlistedCandidateId } = routeParams;

  const {
    data: ShortlistedCandidate,
    isLoading,
    isError,
  } = useGetShortlistedCandidateQuery(ShortlistedCandidateId, {
    skip: !ShortlistedCandidateId || ShortlistedCandidateId === 'new',
  });
  console.log(
    'ShortlistedCandidateId',
    ShortlistedCandidate,
    ShortlistedCandidateId
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
    if (ShortlistedCandidateId === 'new') {
      reset(ShortlistedCandidateModel({}));
    }
  }, [ShortlistedCandidateId, reset]);

  useEffect(() => {
    if (ShortlistedCandidate) {
      reset({ ...ShortlistedCandidate });
    }
  }, [ShortlistedCandidate, reset, ShortlistedCandidate?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested ShortlistedCandidates is not exists
   */
  if (isError && ShortlistedCandidateId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such ShortlistedCandidate!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/ShortlistedCandidate/ShortlistedCandidates'
          color='inherit'>
          Go to ShortlistedCandidates Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      {/* <FusePageCarded
        classes={{
          root: {},
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
            <Tab className='h-64' label='Personal Info' value='personal' />
            <Tab className='h-64' label='Education Info' value='education' />
            <Tab className='h-64' label='Job Experience' value='expericence' />
          </Tabs>
        }
        header={<ShortlistedCandidateHeader />}
        content={
          <div className='p-16 sm:p-24'>
            <div className={tabValue != 'personal' ? 'hidden' : ''}>
              <ShortlistedCandidateForm />
            </div>
            <div className={tabValue !== 'education' ? 'hidden' : ''}>
              <EducationTab />
            </div>
            <div className={tabValue !== 'expericence' ? 'hidden' : ''}>
              <ExperienceTab />
            </div>
          </div>
        }
        innerScroll
      /> */}

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
        header={<ShortlistedCandidateHeader />}
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
                <ShortlistedCandidateForm
                  ShortlistedCandidateId={ShortlistedCandidateId}
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

export default ShortlistedCandidate;
