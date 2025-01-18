import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function PendingAttachment(props) {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  const { data, refetch } = useGetMalaysiaDashboardQuery();
  useEffect(() => {
    if (data) {
      setDashboardData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Paper className='w-full  flex flex-col justify-between '>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          navigate(
            `/apps/saudiDashboards/report/${props?.widget?.country?.id}`
          );
        }}>
        <Typography className='text-72 font-semibold leading-none text-green tracking-tighter'>
          {dashboardData?.interview_done || 0}
        </Typography>
        <Typography className='text-12 text-blue-800 font-normal'>
          Pending Attachments
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(PendingAttachment);
