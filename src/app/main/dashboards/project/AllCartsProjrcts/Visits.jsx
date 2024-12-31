import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';

import { useForm } from 'react-hook-form';
import { ArrowRight } from '@mui/icons-material';
import { useGetProjectDashboardNotMedicalQuery } from '../ProjectDashboardApi';

function Visits(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetProjectDashboardNotMedicalQuery();
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
      <div className='flex items-center justify-center px-4 pt-8'>
        <Typography className='text-28 px-16 font-medium' color='textSecondary'>
          Visits
        </Typography>
      </div>
      <div className='flex items-center justify-center pt-8 text-primary mx-auto'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-orange tracking-tighter'
          onClick={() => {
            dashboardData?.visit > 0 && router.push('/apps/notMedicals/report');
          }}>
          {dashboardData?.visit || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          dashboardData?.visit > 0 && router.push('/apps/notMedicals/report');
        }}>
        View All Medical Visits
      </Button>
    </Paper>
  );
}

export default memo(Visits);
