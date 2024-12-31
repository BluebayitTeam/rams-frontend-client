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
} from '../../../ProjectDashboardApi';
import Chart from 'react-apexcharts';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { BASE_URL } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  tablecell: {
    fontSize: '50px',
  },
}));

function LatestFlight(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: flightlistData, refetch } =
    useGetProjectDashboardFlightListQuery({
      ...pageAndSize,
    });

  const latest_flights = flightlistData?.latest_flights || [];

  const handlePagination = (event, handlePage) => {
    setPageAndSize((prev) => ({ ...prev, page: handlePage }));
    setPage(handlePage);
    refetch();
  };

  return (
    <Paper className='w-full rounded-40 shadow'>
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          <FlightTakeoff />
          Latest Flight
        </Typography>
      </div>
      <Box>
        <Table>
          <TableHead>
            <TableRow style={{ fontSize: '16px' }}>
              <TableCell className='text-16 font-medium'>
                Passenger Picture
              </TableCell>
              <TableCell className='text-16 font-medium'>
                Passenger Name
              </TableCell>
              <TableCell className='text-16 font-medium'>Agent Name</TableCell>

              <TableCell sortDirection='desc' className='text-16 font-medium'>
                <Tooltip enterDelay={300} title='Sort'>
                  <TableSortLabel direction='desc'>Date</TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latest_flights?.map((flight) => {
              return (
                <TableRow hover key={flight?.id}>
                  <TableCell>
                    {flight?.passenger?.passenger_pic ? (
                      <img
                        src={`${BASE_URL}${flight?.passenger?.passenger_pic}`}
                        style={{
                          height: '40px',
                          width: '40px',
                          borderRadius: '20px',
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </TableCell>
                  <TableCell>{flight.passenger?.passenger_name}</TableCell>
                  <TableCell>{flight.agent?.first_name}</TableCell>
                  <TableCell style={{ whiteSpace: 'nowrap' }}>
                    {flight?.flight_date &&
                      moment(new Date(flight?.flight_date)).format(
                        'DD-MM-YYYY'
                      )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}>
        <Pagination
          count={flightlistData?.total_pages}
          page={page}
          color='primary'
          showFirstButton
          showLastButton
          variant='outlined'
          shape='rounded'
          onChange={handlePagination}
        />

        <Button
          color='primary'
          endIcon={<ArrowRightIcon fontSize='small' />}
          size='medium'
          variant='text'
          onClick={() => {
            history.push(`/apps/latestFlights/report`);
          }}>
          View all Flights
        </Button>
      </Box>
    </Paper>
  );
}

export default memo(LatestFlight);
