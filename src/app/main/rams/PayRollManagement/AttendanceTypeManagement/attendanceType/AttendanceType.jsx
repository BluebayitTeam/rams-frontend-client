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
import { useGetAttendanceTypeQuery } from '../AttendanceTypesApi';
import AttendanceTypeForm from './AttendanceTypeForm';
import AttendanceTypeHeader from './AttendanceTypeHeader';
import AttendanceTypeModel from './models/AttendanceTypeModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  // name: z.string().nonempty(''),
});

function AttendanceType() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { attendanceTypeId } = routeParams;

  const {
    data: attendanceType,
    isLoading,
    isError,
  } = useGetAttendanceTypeQuery(attendanceTypeId, {
    skip: !attendanceTypeId || attendanceTypeId === 'new',
  });
  console.log('attendanceTypeId', attendanceType, attendanceTypeId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (attendanceTypeId === 'new') {
      reset(AttendanceTypeModel({}));
    }
  }, [attendanceTypeId, reset]);

  useEffect(() => {
    if (attendanceType) {
      reset({ ...attendanceType });
    }
  }, [attendanceType, reset, attendanceType?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested attendanceTypes is not exists
   */
  if (isError && attendanceTypeId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such attendanceType!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/attendanceType/attendanceTypes'
          color='inherit'>
          Go to AttendanceTypes Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<AttendanceTypeHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <AttendanceTypeForm attendanceTypeId={attendanceTypeId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default AttendanceType;
