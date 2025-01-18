import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function SevReceived(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetMalaysiaDashboardQuery();
  const navigate = useNavigate();
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
          dashboardData?.sev_received_count > 0 &&
            navigate(`/apps/malaysiaDashboards/report/sev_received`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#0A707E' }}>
          {dashboardData?.sev_received_count || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          SEV Received
        </Typography>
      </div>
      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        className='cursor-pointer text-blue-800'
        onClick={() => {
          dashboardData?.sev_received_count > 0 &&
            navigate(`/apps/malaysiaDashboards/report/sev_received`);
        }}>
        View all SEV Received
      </Button>
    </Paper>
  );
}

export default memo(SevReceived);
