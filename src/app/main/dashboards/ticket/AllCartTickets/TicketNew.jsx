import { AirplaneTicket } from '@mui/icons-material';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
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
import { ArrowRightIcon } from '@mui/x-date-pickers';
import moment from 'moment';
import { useGetTicketDashboardTotalTicketQuery } from '../TicketDashboardApi';

function TicketNew(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: ticketNew, refetch } = useGetTicketDashboardTotalTicketQuery({
    ...pageAndSize,
  });

  const handlePagination = (event, handlePage) => {
    setPageAndSize({ ...pageAndSize, page: handlePage });
    setPage(handlePage - 1);
    refetch();
  };

  return (
    <Paper
      className='w-full rounded-40 shadow'
      sx={{ position: 'relative', height: '100%' }}>
      {/* Header */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          <AirplaneTicket />
          New Ticket
        </Typography>
      </div>

      {/* Table Content */}
      <Box sx={{ overflowY: 'auto', paddingBottom: '60px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ fontSize: '18px' }}>
              <TableCell className='text-18 font-extrabold'>
                <b>Date</b>
              </TableCell>
              <TableCell
                sortDirection='desc'
                className='text-18 font-extrabold'>
                <Tooltip enterDelay={300} title='Sort'>
                  <TableSortLabel direction='desc'>
                    <b>Ticket No</b>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell className='text-18 font-extrabold'>
                <b>Passenger</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketNew?.total_new_tickets_list?.map((ticket) => (
              <TableRow hover key={ticket?.id}>
                <TableCell style={{ whiteSpace: 'nowrap' }}>
                  {ticket?.created_at &&
                    moment(new Date(ticket?.created_at)).format('DD-MM-YYYY')}
                </TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>
                  {ticket?.ticket_no}
                </TableCell>
                <TableCell>{ticket?.passenger?.passenger_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Fixed Bottom Pagination */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
          padding: '10px 20px',
        }}>
        <Pagination
          count={ticketNew?.total_pages}
          page={page + 1}
          defaultPage={1}
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

export default memo(TicketNew);
