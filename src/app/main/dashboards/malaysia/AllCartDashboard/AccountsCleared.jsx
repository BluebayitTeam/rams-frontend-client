import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function AccountsCleared(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetMalaysiaDashboardQuery();
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
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.accounts_cleared_count > 0 &&
            navigate(
              `/apps/accountsclearedMalaysiaReport/accountsclearedMalaysiaReports`
            );
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#738AB6' }}>
          {dashboardData?.accounts_cleared_count || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Accounts Cleared
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        className='cursor-pointer text-blue-800'
        variant='text'
        onClick={() => {
          dashboardData?.accounts_cleared_count > 0 &&
            navigate(
              `/apps/accountsclearedMalaysiaReport/accountsclearedMalaysiaReports`
            );
        }}>
        View all Accounts Cleared
      </Button>
    </Paper>
  );
}

export default memo(AccountsCleared);
