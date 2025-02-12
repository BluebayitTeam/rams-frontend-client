import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeletePayrollVouchersMutation } from '../PayrollVouchersApi';

/**
 * The payrollVouchers table head component.
 */

const rows = [
  {
    id: 'sl_no',
    align: 'left',
    disablePadding: true,
    label: 'SL_NO',
    sort: true,
  },

  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Salary Slip Name',
    sort: true,
  },
  {
    id: 'invoice',
    align: 'left',
    disablePadding: false,
    label: 'Invoice',
    sort: true,
  },
  {
    id: 'employee',
    align: 'left',
    disablePadding: false,
    label: 'Employee',
    sort: true,
  },
  {
    id: 'date_from',
    align: 'left',
    disablePadding: false,
    label: 'Voucher Month',
    sort: true,
  },

  {
    id: 'total',
    align: 'left',
    disablePadding: false,
    label: 'Total Amount',
    sort: true,
  },

  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'Action',
    sort: true,
  },
];

function PayrollVouchersTableHead(props) {
  const {
    selectedPayrollVoucherIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  console.log('onMenuItemClick', onMenuItemClick);

  console.log('selectedPayrollVoucherIds', selectedPayrollVoucherIds);

  const [removePayrollVouchers] = useDeletePayrollVouchersMutation();
  const numSelected = selectedPayrollVoucherIds.length;
  const [selectedPayrollVouchersMenu, setSelectedPayrollVouchersMenu] =
    useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedPayrollVouchersMenu(event) {
    setSelectedPayrollVouchersMenu(event.currentTarget);
  }

  function closeSelectedPayrollVouchersMenu() {
    setSelectedPayrollVouchersMenu(null);
  }

  function handleDeleteMultipleItem() {
    removePayrollVouchers(selectedPayrollVoucherIds).then((data) => {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  return (
    <TableHead
      sx={{
        position: 'sticky',
        top: 0, // Fix the header at the top
        zIndex: 10, // Ensure it stays on top
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? lighten(theme.palette.background.default, 0.4)
            : lighten(theme.palette.background.default, 0.02),
      }}>
      <TableRow className='h-48 sm:h-64'>
        {rows.map((row, index, array) => {
          return (
            <TableCell
              sx={{
                position:
                  index === 0 || index === array.length - 1
                    ? 'sticky'
                    : 'inherit',
                left: index === 0 ? 0 : undefined,
                right: index === array.length - 1 ? 0 : undefined,
                zIndex: index === 0 || index === array.length - 1 ? 2 : 'auto',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
                fontWeight: 'bold',
              }}
              className='p-4 md:p-16 whitespace-nowrap'
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={
                tableOrder.id === row.id ? tableOrder.direction : false
              }>
              {row.sort && (
                <Tooltip
                  title='Sort'
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
                  enterDelay={300}>
                  <TableSortLabel
                    active={tableOrder.id === row.id}
                    direction={tableOrder.direction}
                    onClick={(ev) => createSortHandler(ev, row.id)}
                    className='font-semibold'>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default PayrollVouchersTableHead;
