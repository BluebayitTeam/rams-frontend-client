import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function HandoverPassportTicket(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, refetch } = useGetMalaysiaDashboardQuery();
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
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.handover_passport_ticket_count > 0 &&
            navigate(
              `/apps/malaysiaDashboards/report/handover_passport_ticket`
            );
        }}>
        <Typography
          className='text-72 font-semibold leading-none tracking-tighter'
          style={{ color: '#753130' }}>
          {dashboardData?.handover_passport_ticket_count || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Handover Passport & Ticket
        </Typography>
      </div>
      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='small'
        className='cursor-pointer text-blue-800'
        variant='text'
        onClick={() => {
          dashboardData?.handover_passport_ticket_count > 0 &&
            navigate(
              `/apps/handpassportMalaysiaReport/handpassportMalaysiaReports`
            );
        }}>
        View all Handover Passport & Ticket
      </Button>
    </Paper>
  );
}

export default memo(HandoverPassportTicket);
