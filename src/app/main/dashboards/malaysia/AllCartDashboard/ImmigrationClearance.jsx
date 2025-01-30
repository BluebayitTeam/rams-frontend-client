import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function ImmigrationClearance(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.immigration_clearance > 0 &&
            navigate(`/apps/malaysiaDashboards/report/immigration_clearance`);
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#656C42' }}>
          {dashboardData?.immigration_clearance || 0}
        </Typography>
        <Typography className='text-20 text-blue-800 font-normal'>
          Immigration Clearance
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='small'
        variant='text'
        className='cursor-pointer text-blue-800'
        onClick={() => {
          dashboardData?.immigration_clearance > 0 &&
            navigate(
              `/apps/immigrationclearanceMalaysiaReport/immigrationclearanceMalaysiaReports`
            );
        }}>
        View all Immigration Clearance
      </Button>
    </Paper>
  );
}

export default memo(ImmigrationClearance);
