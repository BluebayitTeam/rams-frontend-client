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
import DesignationHeader from './DesignationHeader';
import DesignationModel from './models/DesignationModel';
import { useGetDesignationQuery } from '../DesignationsApi';
import DesignationForm from './DesignationForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter an agent name'),
});

function Designation() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { designationId } = routeParams;

  const {
    data: designation,
    isLoading,
    isError,
  } = useGetDesignationQuery(designationId, {
    skip: !designationId || designationId === 'new',
  });
  console.log('designationId', designation, designationId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (designationId === 'new') {
      reset(DesignationModel({}));
    }
  }, [designationId, reset]);

  useEffect(() => {
    if (designation) {
      reset({ ...designation });
    }
  }, [designation, reset, designation?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested designations is not exists
   */
  if (isError && designationId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such designation!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/designation/designations'
          color='inherit'>
          Go to Designations Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('DESIGNATION_DETAILS') && (
        <FusePageCarded
          header={<DesignationHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <DesignationForm designationId={designationId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Designation;
