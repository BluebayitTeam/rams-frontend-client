import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';

function MedicalDone(props) {
  const dispatch = useDispatch();

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
      <div className='text-center py-12'>
        <Typography className='text-72 font-semibold leading-none text-blue tracking-tighter'>
          {dashboardData?.medical_done || 0}
        </Typography>
        <Typography className='text-20 text-blue font-normal'>
          Medical Done
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        className='cursor-pointer text-blue-800'
        // onClick={() => {
        // 	history.push(`/apps/allMembers/report`);
        // }}
      >
        View all MedicalDone
      </Button>
    </Paper>
  );
}

export default memo(MedicalDone);
