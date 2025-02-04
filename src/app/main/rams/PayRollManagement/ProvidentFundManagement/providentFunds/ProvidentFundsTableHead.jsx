import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteProvidentFundsMutation } from '../ProvidentFundsApi';

/**
 * The providentFunds table head component.
 */

const rows = [
  {
    id: 'SL No',
    align: 'left',
    disablePadding: true,
    label: 'SL No',
    sort: true,
  },
  {
    id: 'date',
    align: 'left',
    disablePadding: true,
    label: 'Date',
    sort: true,
  },

  {
    id: 'branch',
    align: 'left',
    disablePadding: false,
    label: 'Branch',
    sort: true,
  },
  {
    id: 'invoice_no',
    align: 'left',
    disablePadding: false,
    label: 'Invoice No',
    sort: true,
  },
  {
    id: 'ledger',
    align: 'left',
    disablePadding: false,
    label: 'Ledger',
    sort: true,
  },

  {
    id: 'details',
    align: 'left',
    disablePadding: false,
    label: 'Details',
    sort: true,
  },
  {
    id: 'total_amount',
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

function ProvidentFundsTableHead(props) {
  const {
    selectedProvidentFundIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  console.log('onMenuItemClick', onMenuItemClick);

  console.log('selectedProvidentFundIds', selectedProvidentFundIds);

  const [removeProvidentFunds] = useDeleteProvidentFundsMutation();
  const numSelected = selectedProvidentFundIds.length;
  const [selectedProvidentFundsMenu, setSelectedProvidentFundsMenu] =
    useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedProvidentFundsMenu(event) {
    setSelectedProvidentFundsMenu(event.currentTarget);
  }

  function closeSelectedProvidentFundsMenu() {
    setSelectedProvidentFundsMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeProvidentFunds(selectedProvidentFundIds).then((data) => {
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
    <TableHead>
      <TableRow className='h-48 sm:h-64'>

        {rows.map((row, index, array) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
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

export default ProvidentFundsTableHead;
