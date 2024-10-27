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
import DepartmentHeader from './DepartmentHeader';
import DepartmentModel from './models/DepartmentModel';
import { useGetDepartmentQuery } from '../DepartmentsApi';
import DepartmentForm from './DepartmentForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter an agent name'),
});

function Department() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { departmentId } = routeParams;

  const {
    data: department,
    isLoading,
    isError,
  } = useGetDepartmentQuery(departmentId, {
    skip: !departmentId || departmentId === 'new',
  });
  console.log('departmentId', department, departmentId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (departmentId === 'new') {
      reset(DepartmentModel({}));
    }
  }, [departmentId, reset]);

  useEffect(() => {
    if (department) {
      reset({ ...department });
    }
  }, [department, reset, department?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested departments is not exists
   */
  if (isError && departmentId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such department!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/department/departments'
          color='inherit'>
          Go to Departments Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('DEPARTURE_DETAILS') && (
        <FusePageCarded
          header={<DepartmentHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <DepartmentForm departmentId={departmentId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Department;
