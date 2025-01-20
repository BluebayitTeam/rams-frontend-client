import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetTicketDashboardTotalDeputeQuery } from '../TicketDashboardApi';
import { useNavigate } from 'react-router';

function TotalDepute(props) {
  const dispatch = useDispatch();

  const { data, refetch } = useGetTicketDashboardTotalDeputeQuery();

  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
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
          Total Depute
        </Typography>
      </div>
      <div className='text-center py-12'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-orange tracking-tighter'
          onClick={() => {
            navigate(`/apps/ticketdeputeReport/ticketdeputeReports`);
          }}>
          {dashboardData?.total_refunds || 0}
        </Typography>
        <Typography className='text-20 text-orange-800 font-normal'>
          Total Deputes
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          navigate(`/apps/ticketdeputeReport/ticketdeputeReports`);
        }}>
        View all tickets
      </Button>
    </Paper>
  );
}

export default memo(TotalDepute);
