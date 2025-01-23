import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowRight } from '@mui/icons-material';
import { useGetProjectDashboardManpowerQuery } from '../ProjectDashboardApi';
import { useNavigate } from 'react-router';

function Manpower(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetProjectDashboardManpowerQuery();
  const navigate = useNavigate();
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
          Manpower
        </Typography>
      </div>
      <div className='flex items-center justify-center pt-8 text-primary mx-auto'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-purple tracking-tighter'
          onClick={() => {
            dashboardData?.waiting > 0 &&
              navigate('/apps/manpowerWaitingReport/manpowerWaitingReports');
          }}>
          {dashboardData?.waiting || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          dashboardData?.waiting > 0 &&
            navigate('/apps/manpowerWaitingReport/manpowerWaitingReports');
        }}>
        View All Manpower
      </Button>
    </Paper>
  );
}

export default memo(Manpower);
