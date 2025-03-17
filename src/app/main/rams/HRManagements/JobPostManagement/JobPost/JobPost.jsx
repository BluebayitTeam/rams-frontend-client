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
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { z } from 'zod';
import { useGetJobPostQuery } from '../JobPostsApi';
import JobPostForm from './JobPostForm';
import JobPostHeader from './JobPostHeader';
import JobPostModel from './models/JobPostModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function JobPost() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { JobPostId } = routeParams;

  const {
    data: JobPost,
    isLoading,
    isError,
  } = useGetJobPostQuery(JobPostId, {
    skip: !JobPostId || JobPostId === 'new',
  });


  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (JobPostId === 'new') {
      reset(JobPostModel({}));
    }
  }, [JobPostId, reset]);

  useEffect(() => {
    if (JobPost) {
      reset({ ...JobPost });
    }
  }, [JobPost, reset, JobPost?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested JobPosts is not exists
   */
  if (isError && JobPostId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such JobPost!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/JobPost/JobPosts'
          color='inherit'>
          Go to JobPosts Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('JOB_POST') && (
        <FusePageCarded
          header={<JobPostHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <JobPostForm JobPostId={JobPostId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default JobPost;
