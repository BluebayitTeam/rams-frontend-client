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
import { useGetUserDefineValueQuery } from '../UserDefineValueApi';
import UserDefineValueForm from './UserDefineValueForm';
import UserDefineValueHeader from './UserDefineValueHeader';
import UserDefineValueModel from './models/UserDefineValueModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  calculation_for: z.string(),
  date: z.string(),
  value: z.string(),
  unit: z.number(),
  payhead: z.number(),
  department: z.array(z.number()).optional(),
  employee: z.array(z.number()).optional()
}).refine((data) => {
  if (data.calculation_for === "department") {
    return Array.isArray(data.department) && data.department.length > 0;
  }
  if (data.calculation_for === "employees") {
    return Array.isArray(data.employee) && data.employee.length > 0;
  }
  return true;
}, {
  // message: "Department or Employee is required based on calculation_for",
  // path: ["department", "employee"]
}
);


function UserDefineValue() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { userDefineValueId } = routeParams;

  const {
    data: userDefineValue,
    isLoading,
    isError,
  } = useGetUserDefineValueQuery(userDefineValueId, {
    skip: !userDefineValueId || userDefineValueId === 'new',
  });
  // console.log('userDefineValueId', userDefineValue, userDefineValueId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;

  const form = watch();

  useEffect(() => {
    if (userDefineValueId === 'new') {
      reset(UserDefineValueModel({}));
    }
  }, [userDefineValueId, reset]);

  // useEffect(() => {
  //   if (userDefineValue) {
  //     reset({ ...userDefineValue });
  //   }
  // }, [userDefineValue, reset, userDefineValue?.id]);


  useEffect(() => {
    if (!userDefineValue) {
      return;
    }
    /**
     * Reset the form on userDefineValue state changes
     */
    reset({
      calculation_for: userDefineValue?.payhead_assignments?.calculation_for,
      date: userDefineValue?.payhead_assignments?.date,
      department: userDefineValue?.payhead_assignments?.department,
      id: userDefineValue?.payhead_assignments?.id,
      unit: userDefineValue?.payhead_assignments?.unit,
      value: userDefineValue?.payhead_assignments?.value,
      payhead: userDefineValue?.payhead_assignments?.payheads,
      employee: userDefineValue?.payhead_assignments?.employees
    });
  }, [userDefineValue, reset, userDefineValue?.id]);


  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested userDefineValues is not exists
   */
  if (isError && userDefineValueId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such User Define Value!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/userDefineValue/userDefineValues'
          color='inherit'>
          Go to User Define Values Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('USER_DEFINED_VALUE') && (
        <FusePageCarded
          header={<UserDefineValueHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <UserDefineValueForm userDefineValueId={userDefineValueId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default UserDefineValue;
