import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { ArrowRight } from '@mui/icons-material';
import { useGetProjectDashboardNotMedicalQuery } from '../ProjectDashboardApi';
import { useNavigate } from 'react-router';

function Fit(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetProjectDashboardNotMedicalQuery();
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
      <div className='flex items-center justify-center px-4 pt-8'>
        <Typography className='text-28 px-16 font-medium' color='textSecondary'>
          Fits
        </Typography>
      </div>
      <div className='flex items-center justify-center pt-8 text-primary mx-auto'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-blue tracking-tighter'
          onClick={() => {
            dashboardData?.fit > 0 &&
              navigate('/apps/medicalFitReport/medicalFitReports');
          }}>
          {dashboardData?.fit || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          data?.fit > 0 && navigate('/apps/medicalFitReport/medicalFitReports');
        }}>
        View All Medical Fit
      </Button>
    </Paper>
  );
}

export default memo(Fit);
