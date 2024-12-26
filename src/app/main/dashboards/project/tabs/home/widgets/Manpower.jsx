import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';

import { useForm } from 'react-hook-form';

import { ArrowRight } from '@mui/icons-material';
import { useGetProjectDashboardManpowerQuery } from '../../../ProjectDashboardApi';

function Manpower(props) {
  const dispatch = useDispatch();
  const { data } = useGetProjectDashboardManpowerQuery();

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
            data?.waiting > 0 && router.push('/apps/notMedicals/report');
          }}>
          {data?.waiting || 0}
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRight fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          data?.waiting > 0 && router.push('/apps/notMedicals/report');
        }}>
        View All Manpower
      </Button>
    </Paper>
  );
}

export default memo(Manpower);
