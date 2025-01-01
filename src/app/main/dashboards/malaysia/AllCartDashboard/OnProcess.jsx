import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';

function OnProcess(props) {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState(null);
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
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.process > 0 &&
            router.push(`/apps/registeredSaudis/report/process`);
        }}>
        <Typography className='text-72 font-semibold leading-none text-pink tracking-tighter'>
          {dashboardData?.process || 0}
        </Typography>
        <Typography className='text-14 text-pink-800 font-normal'>
          On Process
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(OnProcess);
