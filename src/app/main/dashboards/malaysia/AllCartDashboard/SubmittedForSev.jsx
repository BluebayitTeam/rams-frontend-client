import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';

function SubmittedForSev(props) {
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
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          &nbsp;
        </Typography>
      </div>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.submitted_for_sev_count > 0 &&
            router.push(`/apps/malaysiaDashboards/report/submitted_for_sev`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#0041FF' }}>
          {dashboardData?.submitted_for_sev_count || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Submitted For Sev
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        className='cursor-pointer text-blue-800'
        onClick={() => {
          dashboardData?.submitted_for_sev_count > 0 &&
            router.push(`/apps/malaysiaDashboards/report/submitted_for_sev`);
        }}>
        View all Submitted For Sev
      </Button>
    </Paper>
  );
}

export default memo(SubmittedForSev);
