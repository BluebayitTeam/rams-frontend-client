import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { useGetSaudiDashboardTotalSaudiQuery } from '../SaudiDashboardApi';

function OnProcess(props) {
  const dispatch = useDispatch();

  const { data } = useGetSaudiDashboardTotalSaudiQuery();

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          On Process
        </Typography>
      </div>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          props?.widget?.on_process > 0 &&
            router.push(`/apps/registeredSaudis/report/on_process`);
        }}>
        <Typography className='text-72 font-semibold leading-none text-pink tracking-tighter'>
          {data?.total_refunds || 0}
        </Typography>
        <Typography className='text-20 text-pink-800 font-normal'>
          On Process
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(OnProcess);
