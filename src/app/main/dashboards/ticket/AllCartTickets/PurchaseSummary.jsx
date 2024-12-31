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
import { AccountBalance, ShoppingCart } from '@mui/icons-material';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { makeStyles } from '@mui/styles';
import { StatusColor } from 'src/app/main/dashboards/project/tabs/home/widgets/StatusColor';
import { useGetProjectDashboardPurchaseSummaryQuery } from '../TicketDashboardApi';

function PurchaseSummary(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: purchaseSummaryData, refetch } =
    useGetProjectDashboardPurchaseSummaryQuery({
      ...pageAndSize,
    });

  const PurchaseSummary = purchaseSummaryData || [];

  const user_role = localStorage.getItem('user_role');

  return (
    <Paper
      className='w-full rounded-40 shadow'
      style={{
        display:
          user_role === 'ADMIN' ||
          user_role === 'admin' ||
          user_role === 'ACCOUNTS'
            ? 'block'
            : 'none',
      }}>
      {/* sx={{ minWidth: 800 }} */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          {' '}
          <AccountBalance className='mx-5' />
          Sales & Purchase Summary
        </Typography>
      </div>
      <Box>
        <Table className='table-fixed	'>
          <TableHead>
            <TableRow style={{ fontSize: '16px' }}>
              <TableCell className='text-16 font-medium'>
                {' '}
                <b>Type</b>
              </TableCell>
              <TableCell className='text-16 font-medium'>
                <b>Today</b>
              </TableCell>
              <TableCell className='text-16 font-medium'>
                <b>This Week</b>
              </TableCell>
              <TableCell className='text-16 font-medium'>
                <b>This Month</b>
              </TableCell>
              <TableCell className='text-16 font-medium'>
                <b>This Year</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PurchaseSummary?.map((account) => {
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
                      &#2547; {account?.today}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      &#2547; {account?.this_week}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      &#2547; {account?.this_month}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      &#2547; {account?.this_year}
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

export default memo(PurchaseSummary);
