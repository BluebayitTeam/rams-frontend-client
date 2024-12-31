import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';
import { useGetSaudiDashboardTotalSaudiQuery } from '../SaudiDashboardApi';

function VisaExpired(props) {
  const dispatch = useDispatch();

  const { data } = useGetSaudiDashboardTotalSaudiQuery();
  console.log('DataCheck', data);

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          data?.ksa_visa_exp_count_next_15_days > 0 &&
            router.push(`/apps/registeredSaudis/report/on_process`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#656D41' }}>
          {data?.ksa_visa_exp_count_next_15_days || 0}
        </Typography>
        <Typography
          className='text-13  font-normal'
          style={{ color: '#656D41' }}>
          Visa will Expired within 15 days
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(VisaExpired);
