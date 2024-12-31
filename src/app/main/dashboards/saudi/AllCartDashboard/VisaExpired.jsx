import { memo, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useGetSaudiDashboardTotalSaudiQuery } from '../SaudiDashboardApi';
import router from '@history';

function VisaExpired(props) {
  const [dashboardData, setDashboardData] = useState(null);
  const { data, refetch } = useGetSaudiDashboardTotalSaudiQuery({
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
          dashboardData?.ksa_visa_exp_count_next_15_days > 0 &&
            router.push(`/apps/registeredSaudis/report/on_process`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none tracking-tighter'
          style={{ color: '#656D41' }}>
          {dashboardData?.ksa_visa_exp_count_next_15_days || 0}
        </Typography>
        <Typography
          className='text-13 font-normal'
          style={{ color: '#656D41' }}>
          Visa will Expire within 15 days
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(VisaExpired);
