import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';

function OrientationTraining(props) {
  const dispatch = useDispatch();

  const { data, refetch } = useGetMalaysiaDashboardQuery();

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (data) {
      setDashboardData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.training > 0 &&
            router.push(`/apps/report-management/training-reports/malaysia`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#A86CD0' }}>
          {dashboardData?.training || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Orientation Training
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='small'
        className='cursor-pointer text-blue-800'
        variant='text'
        onClick={() => {
          dashboardData?.training > 0 &&
            router.push(`/apps/report-management/training-reports/malaysia`);
        }}>
        View all Orientation Training
      </Button>
    </Paper>
  );
}

export default memo(OrientationTraining);
