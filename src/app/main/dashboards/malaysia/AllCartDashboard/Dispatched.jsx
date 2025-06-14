import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function Dispatched(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          dashboardData?.dispatched_count > 0 &&
            navigate(
              `/apps/dispatchedMalaysiaReport/dispatchedMalaysiaReports`
            );
        }}>
        <Typography
          className='text-72 font-semibold leading-none tracking-tighter'
          style={{ color: '#4FB640' }}>
          {dashboardData?.dispatched_count || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Dispatched
        </Typography>
      </div>
      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        className='cursor-pointer text-blue-800'
        variant='text'
        onClick={() => {
          dashboardData?.dispatched_count > 0 &&
            navigate(
              `/apps/dispatchedMalaysiaReport/dispatchedMalaysiaReports`
            );
        }}>
        View all Dispatched
      </Button>
    </Paper>
  );
}

export default memo(Dispatched);
