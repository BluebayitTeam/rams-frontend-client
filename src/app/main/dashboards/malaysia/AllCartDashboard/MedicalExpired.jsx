import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function MedicalExpired(props) {
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
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.medical_expiry_count_next_15_days > 0 &&
            navigate(
              `/apps/medicalExpireMalaysiaReport/medicalExpireMalaysiaReports/15`
            );
        }}>
        <Typography className='text-72 font-semibold leading-none text-blue tracking-tighter'>
          {dashboardData?.medical_expiry_count_next_15_days || 0}
        </Typography>
        <Typography className='text-13 text-blue-800 font-normal'>
          Medical will Expired with in 15 days
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(MedicalExpired);
