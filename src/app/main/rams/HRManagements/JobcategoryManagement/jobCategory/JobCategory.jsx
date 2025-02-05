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
import { useGetJobCategoryQuery } from '../JobCategorysApi';
import JobCategoryForm from './JobCategoryForm';
import JobCategoryHeader from './JobCategoryHeader';
import JobCategoryModel from './models/JobCategoryModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function JobCategory() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { jobCategoryId } = routeParams;

  const {
    data: jobCategory,
    isLoading,
    isError,
  } = useGetJobCategoryQuery(jobCategoryId, {
    skip: !jobCategoryId || jobCategoryId === 'new',
  });
  console.log('jobCategoryId', jobCategory, jobCategoryId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (jobCategoryId === 'new') {
      reset(JobCategoryModel({}));
    }
  }, [jobCategoryId, reset]);

  useEffect(() => {
    if (jobCategory) {
      reset({ ...jobCategory });
    }
  }, [jobCategory, reset, jobCategory?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested jobCategorys is not exists
   */
  if (isError && jobCategoryId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such jobCategory!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/jobCategory/jobCategorys'
          color='inherit'>
          Go to JobCategorys Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<JobCategoryHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <JobCategoryForm jobCategoryId={jobCategoryId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default JobCategory;
