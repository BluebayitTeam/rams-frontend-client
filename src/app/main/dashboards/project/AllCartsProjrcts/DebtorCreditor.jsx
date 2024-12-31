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
import { makeStyles } from '@mui/styles';
import { useGetProjectDashboardDebtorCreditorQuery } from '../ProjectDashboardApi';

function DebtorCreditor(props) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data: DebtorCreditorData, refetch } =
    useGetProjectDashboardDebtorCreditorQuery({
      ...pageAndSize,
    });

  const DebtorCreditor = DebtorCreditorData || [];

  console.log('DebtorCreditorData', DebtorCreditor);
  const user_role = localStorage.getItem('user_role');

  return (
    <Paper
      className='w-full rounded-40 shadow'
      style={{ display: user_role === 'ADMIN' ? 'block' : 'none' }}>
      {/* sx={{ minWidth: 800 }} */}
      <div className='flex items-center justify-between p-20 h-64'>
        <Typography className=' text-16  font-medium'>
          {' '}
          <ShoppingCart />
          Debtor & Creditor Summary
        </Typography>
      </div>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className=' font-medium'> Type</TableCell>
              <TableCell className='font-medium'>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DebtorCreditor?.map((account) => {
              return (
                <TableRow hover key={account?.status}>
                  <TableCell>
                    <StatusColor
                      color={
                        (account?.type === 'debtors' && 'success') ||
                        (account?.type === 'creditors' && 'warning') ||
                        (account?.type === 'canceled' && 'error') ||
                        'warning'
                      }>
                      {account?.type === 'debtors'
                        ? 'Receiable Bill '
                        : 'Payable Bill'}
                    </StatusColor>
                  </TableCell>

                  {/* here ৳ sign is (&#2547;) */}
                  <TableCell>
                    <span style={{ whiteSpace: 'nowrap' }}>
                      &#2547; {account?.balance}
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
