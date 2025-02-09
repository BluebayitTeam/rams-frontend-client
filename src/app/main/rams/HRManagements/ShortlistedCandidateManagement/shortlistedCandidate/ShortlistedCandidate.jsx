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

import ShortlistedCandidateHeader from './ShortlistedCandidateHeader';
import ShortlistedCandidateModel from './models/ShortlistedCandidateModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function ShortlistedCandidate() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
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
      <FusePageCarded
        header={<ShortlistedCandidateHeader />}
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default ShortlistedCandidate;
