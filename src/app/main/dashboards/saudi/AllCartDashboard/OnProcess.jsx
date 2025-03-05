import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useGetSaudiDashboardTotalSaudiQuery } from '../SaudiDashboardApi';
import { useNavigate } from 'react-router';

function OnProcess(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const { data, refetch } = useGetSaudiDashboardTotalSaudiQuery();
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
          dashboardData?.on_process > 0 &&
            navigate(
              `/apps/registeredSaudiReport/registeredSaudiReports/on_process`
            );
        }}>
        <Typography className='text-72 font-semibold leading-none text-pink tracking-tighter'>
          {dashboardData?.on_process > 0 ? dashboardData.on_process : 0}
        </Typography>
        <Typography className='text-14 text-pink-800 font-normal'>
          On Process
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(OnProcess);
