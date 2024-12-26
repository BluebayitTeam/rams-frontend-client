import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';

import { useForm } from 'react-hook-form';
import { useGetProjectDashboardNotMedicalQuery } from '../../../ProjectDashboardApi';
import { ArrowRight } from '@mui/icons-material';

function Fit(props) {
  const dispatch = useDispatch();
  const { data } = useGetProjectDashboardNotMedicalQuery();

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
            data?.not_medical > 0 && router.push('/apps/notMedicals/report');
          }}>
          {data?.fit || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          data?.not_medical > 0 && router.push('/apps/notMedicals/report');
        }}>
        View All Not Medical
      </Button>
    </Paper>
  );
}

export default memo(Fit);
