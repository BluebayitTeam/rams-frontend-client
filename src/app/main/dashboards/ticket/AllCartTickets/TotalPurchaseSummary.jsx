import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  AccountBalance,
  RequestQuote,
  ShoppingCart,
} from '@mui/icons-material';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { makeStyles } from '@mui/styles';
import { useGetProjectDashboardTotalPurchaseSummaryQuery } from '../TicketDashboardApi';
import { StatusColor } from '../../project/tabs/home/widgets/StatusColor';

function TotalPurchaseSummary(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: totalPurchaseSummaryData, refetch } =
    useGetProjectDashboardTotalPurchaseSummaryQuery({
      ...pageAndSize,
    });

  const TotalPurchaseSummary = totalPurchaseSummaryData || [];
  console.log('TotalPurchaseSummary', TotalPurchaseSummary);

  const user_role = localStorage.getItem('user_role');

  return (
    <Paper
      className='w-full rounded-40 shadow'
      style={{
        display:
          user_role === 'ADMIN' || user_role === 'ACCOUNTS' ? 'block' : 'none',
      }}>
      {/* sx={{ minWidth: 800 }} */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className=' text-16  font-medium'>
          {' '}
          <RequestQuote className='mx-5' />
          Total Sales & Puchase Summary
        </Typography>
      </div>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='text-16 font-medium'>
                {' '}
                <b>Type</b>
              </TableCell>
              <TableCell className='text-16 font-medium'>
                <b>Balance</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TotalPurchaseSummary?.map((account) => {
              return (
                <TableRow hover key={account?.status}>
                  <TableCell className='text-16 font-medium'>
                    <StatusColor
                      color={
                        (account?.type === 'total sales amount' && 'success') ||
                        'info'
                      }>
                      {account?.type === 'total sales amount'
                        ? 'Sales'
                        : 'Purchase'}
                    </StatusColor>
                  </TableCell>

                  {/* here ৳ sign is (&#2547;) */}
                  <TableCell>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      &#2547; {account?.amount}
                    </span>
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

export default memo(TotalPurchaseSummary);
