import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetTicketDashboardTotalTicketQuery } from '../../../TicketDashboardApi';

function TotalTicket(props) {
  const dispatch = useDispatch();
  const { data } = useGetTicketDashboardTotalTicketQuery();
  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          Total Ticket
        </Typography>
      </div>
      <div className='text-center py-12'>
        <Typography className='text-72 font-semibold leading-none text-blue tracking-tighter'>
          {data?.total_elements || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Total Tickets
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

export default memo(TotalTicket);
