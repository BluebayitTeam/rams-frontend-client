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
import { useGetScheduleQuery } from '../SchedulesApi';
import ScheduleForm from './ScheduleForm';
import ScheduleHeader from './ScheduleHeader';
import ScheduleModel from './models/ScheduleModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  department: z.number(),
  shift: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  // name: z.string().nonempty(''),
});

function Schedule() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { scheduleId } = routeParams;

  const {
    data: schedule,
    isLoading,
    isError,
  } = useGetScheduleQuery(scheduleId, {
    skip: !scheduleId || scheduleId === 'new',
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
    if (scheduleId === 'new') {
      reset(ScheduleModel({}));
    }
  }, [scheduleId, reset]);

  useEffect(() => {
    if (schedule) {
      reset({ ...schedule });
    }
  }, [schedule, reset, schedule?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested schedules is not exists
   */
  if (isError && scheduleId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such schedule!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/schedule/schedules'
          color='inherit'>
          Go to Schedules Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {/* {hasPermission('DEPARTURE_DETAILS') && ( */}
      <FusePageCarded
        header={<ScheduleHeader />}
        content={
          <div className='p-16 '>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <ScheduleForm scheduleId={scheduleId} />
            </div>
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
      {/* )} */}
    </FormProvider>
  );
}

export default Schedule;
