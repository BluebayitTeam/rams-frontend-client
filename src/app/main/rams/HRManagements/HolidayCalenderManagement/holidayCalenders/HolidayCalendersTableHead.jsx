import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteHolidayCalendersMutation } from '../HolidayCalendersApi';

/**
 * The holidayCalenders table head component.
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
    label: 'Name',
    sort: true,
  },
  {
    id: 'group',
    align: 'left',
    disablePadding: false,
    label: 'Date of holydays',
    sort: true,
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type of holydays',
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

function HolidayCalendersTableHead(props) {
  const {
    selectedHolidayCalenderIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  console.log('onMenuItemClick', onMenuItemClick);

  console.log('selectedHolidayCalenderIds', selectedHolidayCalenderIds);

  const [removeHolidayCalenders] = useDeleteHolidayCalendersMutation();
  const numSelected = selectedHolidayCalenderIds.length;
  const [selectedHolidayCalendersMenu, setSelectedHolidayCalendersMenu] =
    useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedHolidayCalendersMenu(event) {
    setSelectedHolidayCalendersMenu(event.currentTarget);
  }

  function closeSelectedHolidayCalendersMenu() {
    setSelectedHolidayCalendersMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeHolidayCalenders(selectedHolidayCalenderIds).then((data) => {
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

export default HolidayCalendersTableHead;
