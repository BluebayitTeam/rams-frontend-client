import { useTheme } from '@emotion/react';
import {
  ArrowBackIos,
  ArrowForwardIos,
  FlightTakeoff,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useGetProjectDashboardFlightChartQuery,
  useGetProjectDashboardFlightListQuery,
  useGetProjectDashboardStatusSummaryQuery,
} from '../../../ProjectDashboardApi';
import Chart from 'react-apexcharts';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { BASE_URL } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { StatusColor } from './StatusColor';

const useStyles = makeStyles((theme) => ({
  tablecell: {
    fontSize: '50px',
  },
}));

function StatusSummary(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: flightlistData, refetch } =
    useGetProjectDashboardStatusSummaryQuery({
      ...pageAndSize,
    });

  const todays = flightlistData || [];

  return (
    <Paper className='w-full rounded-40 shadow'>
      {/* sx={{ minWidth: 800 }} */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          {' '}
          <FlightTakeoff />
          Total Status Summary
        </Typography>
      </div>
      <Box>
        <Table>
          <TableHead>
            <TableRow style={{ fontSize: '16px' }}>
              <TableCell className='text-16 font-medium'> Status</TableCell>
              <TableCell className='text-16 font-medium'>Today</TableCell>
              <TableCell className='text-16 font-medium'>This Week</TableCell>
              <TableCell className='text-16 font-medium'>This Month</TableCell>
              <TableCell className='text-16 font-medium'>This Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todays?.map((order) => {
              return (
                <TableRow hover key={order?.status}>
                  <TableCell>
                    <StatusColor
                      color={
                        (order?.status === 'stamping_ok' && 'success') ||
                        (order?.status === 'manpower_ok' && 'info') ||
                        (order?.status === 'active_ticket' && 'secondary') ||
                        'warning'
                      }>
                      {order?.status === 'stamping_ok'
                        ? 'STAMPING OK'
                        : order?.status === 'manpower_ok'
                          ? 'MANPOWER OK'
                          : 'Flight Done'}
                    </StatusColor>
                  </TableCell>

                  {/* here ৳ sign is ( ) */}
                  <TableCell>
                    <span> {order?.today}</span>
                  </TableCell>
                  <TableCell>
                    <span> {order?.this_week}</span>
                  </TableCell>
                  <TableCell>
                    <span> {order?.this_month}</span>
                  </TableCell>
                  <TableCell>
                    <span> {order?.this_year}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export default memo(StatusSummary);
