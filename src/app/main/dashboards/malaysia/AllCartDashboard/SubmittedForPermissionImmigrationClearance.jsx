import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import history from '@history';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';

function SubmittedForPermissionImmigrationClearance(props) {
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
      <div className='flex items-center justify-between px-4 pt-8'>
        <Typography className='text-16 px-16 font-medium' color='textSecondary'>
          {/* {props.widget?.title} */}
          &nbsp;
        </Typography>
      </div>
      <div
        className='text-center py-12 cursor-pointer'
        onClick={() => {
          dashboardData?.submitted_for_permission_immigration_clearance_count >
            0 &&
            router.push(
              `/apps/malaysiaDashboards/report/submitted_for_permission_immigration_clearance`
            );
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#FF69B6' }}>
          {props?.widget
            ?.submitted_for_permission_immigration_clearance_count || 0}
        </Typography>
        <Typography className='text-14 text-blue-800 font-normal'>
          Submitted For Permission Immigration Clearance
        </Typography>
      </div>

      <Button
        color='primary'
        endIcon={<ArrowRightIcon fontSize='small' />}
        size='small'
        variant='text'
        className='cursor-pointer'
        onClick={() => {
          dashboardData?.submitted_for_permission_immigration_clearance_count >
            0 &&
            router.push(
              `/apps/malaysiaDashboards/report/submitted_for_permission_immigration_clearance`
            );
        }}>
        View all Submitted For Permission Immigration Clearance
      </Button>
    </Paper>
  );
}

export default memo(SubmittedForPermissionImmigrationClearance);
