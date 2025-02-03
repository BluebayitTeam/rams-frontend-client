import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetTicketDashboardTotalRefundQuery } from '../TicketDashboardApi';
import { useNavigate } from 'react-router';

function TotalRefund(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetTicketDashboardTotalRefundQuery();
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
    <Paper
      className='w-full rounded-20 shadow flex flex-col justify-between cursor-pointer '
      onClick={() => {
        navigate(`/apps/ticketrefundReport/ticketrefundReports`);
      }}>
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          Total Refund
        </Typography>
      </div>
      <div className='text-center py-12'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-red tracking-tighter'
          onClick={() => {
            dashboardData?.total_refunds > 0 &&
              navigate(`/apps/ticketrefundReport/ticketrefundReports`);
          }}>
          {dashboardData?.total_refunds || 0}
        </Typography>
        <Typography className='text-20 text-red-800 font-normal cursor-pointer'>
          Total Refunds
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='medium'
        variant='text'
        onClick={() => {
          navigate(`/apps/ticketrefundReport/ticketrefundReports`);
        }}>
        View all tickets
      </Button>
    </Paper>
  );
}

export default memo(TotalRefund);
