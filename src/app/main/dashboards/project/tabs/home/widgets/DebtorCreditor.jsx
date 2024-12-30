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
import { StatusColor } from './StatusColor';
import { ShoppingCart } from '@mui/icons-material';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useGetProjectDashboardAccountSummaryQuery } from '../../../ProjectDashboardApi';
import { makeStyles } from '@mui/styles';



function DebtorCreditor(props) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: DebtorCreditorData, refetch } =
    useGetProjectDashboardAccountSummaryQuery({
      ...pageAndSize,
    });

  const DebtorCreditor = DebtorCreditorData || [];

  console.log('DebtorCreditorData', DebtorCreditor);
  const user_role = localStorage.getItem('user_role');

  return (
    <Paper
      className='w-full rounded-40 shadow'
      style={{
        display:
          user_role === 'ADMIN' || user_role === 'admin' ? 'block' : 'none',
      }}>
      {/* sx={{ minWidth: 800 }} */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className='text-16 font-medium'>
          {' '}
          <ShoppingCart />
          Total Account Summary
        </Typography>
      </div>
      <Box>
        <Table>
          <TableHead>
            <TableRow style={{ fontSize: '12px' }}>
              <TableCell className='text-14 font-medium'> Type</TableCell>
              <TableCell className='text-14 font-medium'>Today</TableCell>
              <TableCell className='text-14 font-medium'>This Week</TableCell>
              <TableCell className='text-14 font-medium'>This Month</TableCell>
              <TableCell className='text-14 font-medium'>This Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DebtorCreditor?.map((account) => {
              return (
                <TableRow hover key={account?.DebtorCreditor}>
                  <TableCell>
                    <StatusColor
                      color={
                        (account?.type === 'total receive' && 'success') ||
                        (account?.type === 'total payment' && 'info') ||
                        (account?.type === 'canceled' && 'error') ||
                        'warning'
                      }>
                      {account?.type === 'total receive'
                        ? 'Total Recipt'
                        : 'Total Payment'}
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

export default memo(DebtorCreditor);
