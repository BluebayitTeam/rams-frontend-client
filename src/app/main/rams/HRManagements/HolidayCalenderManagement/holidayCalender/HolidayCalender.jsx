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
import { useGetHolidayCalenderQuery } from '../HolidayCalendersApi';
import HolidayCalenderForm from './HolidayCalenderForm';
import HolidayCalenderHeader from './HolidayCalenderHeader';
import HolidayCalenderModel from './models/HolidayCalenderModel';
/**
 * Form Validation Schema
 */

const schema = z.object({
  name: z.string(),
  dates: z.array(z.string()).min(1),
  description: z.string(),
  holiday_type: z.string(),
});

function HolidayCalender() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { holidayCalenderId } = routeParams;

  const {
    data: holidayCalender,
    isLoading,
    isError,
  } = useGetHolidayCalenderQuery(holidayCalenderId, {
    skip: !holidayCalenderId || holidayCalenderId === 'new',
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
    if (holidayCalenderId === 'new') {
      reset(HolidayCalenderModel({}));
    }
  }, [holidayCalenderId, reset]);

  useEffect(() => {
    if (holidayCalender) {
      reset({ ...holidayCalender });
    }
  }, [holidayCalender, reset, holidayCalender?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested holidayCalenders is not exists
   */
  if (isError && holidayCalenderId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such holidayCalender!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/holidayCalender/holidayCalenders'
          color='inherit'>
          Go to HolidayCalenders Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('HOLYDAY_CALENDAR') && (
        <FusePageCarded
          header={<HolidayCalenderHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <HolidayCalenderForm holidayCalenderId={holidayCalenderId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default HolidayCalender;
