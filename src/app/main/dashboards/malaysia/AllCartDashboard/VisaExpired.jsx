import { memo, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import router from '@history';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function VisaExpired(props) {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const { data, refetch } = useGetMalaysiaDashboardQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setDashboardData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between'>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.calling_exp_count_next_15_days > 0 &&
            navigate(
              `/apps/visaExpireMalaysiaReport/visaExpireMalaysiaReports/15`
            );
        }}>
        <Typography
          className='text-72 font-semibold leading-none tracking-tighter'
          style={{ color: '#656D41' }}>
          {dashboardData?.calling_exp_count_next_15_days || 0}
        </Typography>
        <Typography className='text-13 font-normal cursor-pointer text-blue-800'>
          Visa will Expire with in 15 days
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(VisaExpired);
