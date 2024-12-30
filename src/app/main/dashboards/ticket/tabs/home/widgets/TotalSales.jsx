import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetTicketDashboardTotalSalesQuery } from '../../../TicketDashboardApi';

function TotalSales(props) {
  const dispatch = useDispatch();

  const { data } = useGetTicketDashboardTotalSalesQuery();

  console.log('dataCheck', data);

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          Total Sales
        </Typography>
      </div>
      <div className='text-center py-12'>
        <Typography className='text-72 font-semibold leading-none text-green tracking-tighter'>
          {data?.total_sells || 0}
        </Typography>
        <Typography className='text-20 text-green-800 font-normal'>
          Total Sales
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        // onClick={() => {
        // 	history.push(`/apps/allMembers/report`);
        // }}
      >
        View all tickets
      </Button>
    </Paper>
  );
}

export default memo(TotalSales);
