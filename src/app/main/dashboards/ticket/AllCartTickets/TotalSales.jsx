import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetTicketDashboardTotalSalesQuery } from '../TicketDashboardApi';
import { useNavigate } from 'react-router';

function TotalSales(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetTicketDashboardTotalSalesQuery();
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
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          Total Sales
        </Typography>
      </div>
      <div className='text-center py-12'>
        <Typography
          className='text-72 font-semibold leading-none text-green tracking-tighter'
          onClick={() => {
            dashboardData?.total_sells > 0 &&
              navigate(
                `/apps/ticketSaleDashboardReport/ticketSaleDashboardReports`
              );
          }}>
          {dashboardData?.total_sells || 0}
        </Typography>
        <Typography className='text-20 text-green-800 font-normal'>
          Total Sales
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          navigate(
            `/apps/ticketSaleDashboardReport/ticketSaleDashboardReports`
          );
        }}>
        View all tickets
      </Button>
    </Paper>
  );
}

export default memo(TotalSales);
