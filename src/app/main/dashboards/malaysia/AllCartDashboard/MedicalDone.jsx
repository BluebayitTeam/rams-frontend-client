import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function MedicalDone(props) {
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
          navigate(`/apps/medicalMalaysiaReport/medicalMalaysiaReports/`);
        }}>
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
        onClick={() => {
          navigate(`/apps/medicalMalaysiaReport/medicalMalaysiaReports/`);
        }}>
        View all MedicalDone
      </Button>
    </Paper>
  );
}

export default memo(MedicalDone);
