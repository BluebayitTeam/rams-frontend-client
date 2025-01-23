import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { ArrowRight } from '@mui/icons-material';
import { useGetProjectDashboardNotMedicalQuery } from '../ProjectDashboardApi';
import { useNavigate } from 'react-router';

function UnFit(props) {
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
          Unfits
        </Typography>
      </div>
      <div className='flex items-center justify-center pt-8 text-primary mx-auto'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-purple tracking-tighter'
          onClick={() => {
            dashboardData?.unfit > 0 &&
              navigate('/apps/medicalUnfitReport/medicalUnfitReports');
          }}>
          {dashboardData?.unfit || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          dashboardData?.unfit > 0 &&
            navigate('/apps/medicalUnfitReport/medicalUnfitReports');
        }}>
        View All Medical UnFit
      </Button>
    </Paper>
  );
}

export default memo(UnFit);
