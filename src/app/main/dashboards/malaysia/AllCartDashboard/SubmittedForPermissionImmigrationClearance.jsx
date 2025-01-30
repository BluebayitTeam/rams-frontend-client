import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ArrowRightIcon } from '@mui/x-date-pickers';
import { useGetMalaysiaDashboardQuery } from '../MalaysiaDashboardApi';
import { useNavigate } from 'react-router';

function SubmittedForPermissionImmigrationClearance(props) {
  const dispatch = useDispatch();
  const { data, refetch } = useGetMalaysiaDashboardQuery();
  const navigate = useNavigate();
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
          dashboardData?.submitted_for_permission_immigration_clearance_count >
            0 &&
            navigate(
              `/apps/submittedforpermissionMalaysiaReport/submittedforpermissionMalaysiaReports`
            );
        }}>
        <Typography
          className='text-72 font-semibold leading-none  tracking-tighter'
          style={{ color: '#FF69B6' }}>
          {dashboardData?.submitted_for_permission_immigration_clearance_count ||
            0}
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
        className='cursor-pointer text-blue-800'
        onClick={() => {
          dashboardData?.submitted_for_permission_immigration_clearance_count >
            0 &&
            navigate(
              `/apps/submittedforpermissionMalaysiaReport/submittedforpermissionMalaysiaReports`
            );
        }}>
        View all Submitted For Permission Immigration Clearance
      </Button>
    </Paper>
  );
}

export default memo(SubmittedForPermissionImmigrationClearance);
