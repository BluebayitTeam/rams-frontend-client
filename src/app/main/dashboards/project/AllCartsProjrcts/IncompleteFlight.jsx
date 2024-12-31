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

import Chart from 'react-apexcharts';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { BASE_URL } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { StatusColor } from './StatusColor';
import { useGetProjectDashboardIncompleteFlightQuery } from '../ProjectDashboardApi';

const useStyles = makeStyles((theme) => ({
  tablecell: {
    fontSize: '50px',
  },
}));

function IncompleteFlight(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: flightIncompleteData, refetch } =
    useGetProjectDashboardIncompleteFlightQuery({
      ...pageAndSize,
    });

  const status = flightIncompleteData || [];

  const handlePagination = (event, handlePage) => {
    setPageAndSize((prev) => ({ ...prev, page: handlePage }));
    setPage(handlePage);
    refetch();
  };

  return (
    <Paper className='w-full rounded-40 shadow' style={{ marginTop: '60px' }}>
      {/* sx={{ minWidth: 800 }} */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          {' '}
          <FlightTakeoff />
          Incomplete Total Flight
        </Typography>
      </div>
      <Box>
        <Table>
          <TableHead>
            <TableRow style={{ fontSize: '16px' }}>
              <TableCell className='text-16 font-medium'>
                Flight Status
              </TableCell>
              <TableCell className='text-16 font-medium'>Count</TableCell>
              <TableCell className='text-16 font-medium'>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {status.map((flight) => {
              return (
                <TableRow hover key={flight?.status}>
                  <TableCell>
                    <StatusColor
                      color={
                        (flight?.status === 'unpaid' && 'secondary') ||
                        (flight?.status === 'returned' && 'info') ||
                        (flight?.status === 'canceled' && 'error') ||
                        'error'
                      }>
                      {flight?.status}
                    </StatusColor>
                  </TableCell>

                  <TableCell>{flight?.count}</TableCell>
                  {/* here ৳ sign is (&#2547;) */}
                  <TableCell>
                    <span>&#2547; {flight?.amount}</span>
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

export default memo(IncompleteFlight);
