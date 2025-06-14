import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowRight } from '@mui/icons-material';
import { useGetProjectDashboardNotMedicalQuery } from '../ProjectDashboardApi';
import { useNavigate } from 'react-router';

function NotMedical(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetProjectDashboardNotMedicalQuery();
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
          Not Medical
        </Typography>
      </div>
      <div className='flex items-center justify-center pt-8 text-primary mx-auto'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-red tracking-tighter'
          onClick={() => {
            dashboardData?.not_medical > 0 &&
              navigate('/apps/notMedicalReport/notMedicalReports');
          }}>
          {dashboardData?.not_medical || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          dashboardData?.not_medical > 0 &&
            navigate('/apps/notMedicalReport/notMedicalReports');
        }}>
        View All Not Medical
      </Button>
    </Paper>
  );
}

export default memo(NotMedical);
