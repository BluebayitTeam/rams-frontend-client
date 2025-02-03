import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGetSaudiDashboardTotalSaudiQuery } from '../SaudiDashboardApi';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router';

function Embassy(props) {
  const dispatch = useDispatch();

  const { data, refetch } = useGetSaudiDashboardTotalSaudiQuery();

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
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          navigate(`/apps/embassySaudiReport/embassySaudiReports/`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#FF69B6' }}>
          {dashboardData?.embassy || 0}
        </Typography>
        <Typography className='text-20  font-normal text-blue'>
          Embassy
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        className='text-blue-800'
        onClick={() => {
          navigate(`/apps/embassySaudiReport/embassySaudiReports/`);
        }}>
        View all Embassy
      </Button>
    </Paper>
  );
}

export default memo(Embassy);
