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
import QualificationHeader from './QualificationHeader';
import QualificationModel from './models/QualificationModel';
import { useGetQualificationQuery } from '../QualificationsApi';
import QualificationForm from './QualificationForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z.string().nonempty('You must enter an agent name'),
});

function Qualification() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { qualificationId } = routeParams;

  const {
    data: qualification,
    isLoading,
    isError,
  } = useGetQualificationQuery(qualificationId, {
    skip: !qualificationId || qualificationId === 'new',
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
    if (qualificationId === 'new') {
      reset(QualificationModel({}));
    }
  }, [qualificationId, reset]);

  useEffect(() => {
    if (qualification) {
      reset({ ...qualification });
    }
  }, [qualification, reset, qualification?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested qualifications is not exists
   */
  if (isError && qualificationId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such qualification!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/qualification/qualifications'
          color='inherit'>
          Go to Qualifications Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('QUALIFICATION_DETAILS') && (
        <FusePageCarded
          header={<QualificationHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <QualificationForm qualificationId={qualificationId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Qualification;
