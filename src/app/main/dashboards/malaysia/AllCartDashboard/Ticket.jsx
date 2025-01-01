import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';

function Ticket(props) {
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
          dashboardData?.active_ticket > 0 &&
            router.push(`/apps/report-management/flight-reports/ticket`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none tracking-tighter'
          style={{ color: '#9F1C84' }}>
          {dashboardData?.active_ticket || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Ticket
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        className='cursor-pointer text-blue-800'
        variant='text'
        onClick={() => {
          dashboardData?.active_ticket > 0 &&
            router.push(`/apps/report-management/flight-reports/ticket`);
        }}>
        View all Ticket
      </Button>
    </Paper>
  );
}

export default memo(Ticket);
