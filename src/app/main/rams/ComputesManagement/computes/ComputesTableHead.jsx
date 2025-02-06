import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteComputesMutation } from '../ComputesApi';

/**
 * The computes table head component.
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
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Action',
    sort: true,
  },
];

function ComputesTableHead(props) {
  const {
    selectedComputeIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  console.log('onMenuItemClick', onMenuItemClick);

  console.log('selectedComputeIds', selectedComputeIds);

  const [removeComputes] = useDeleteComputesMutation();
  const numSelected = selectedComputeIds.length;
  const [selectedComputesMenu, setSelectedComputesMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedComputesMenu(event) {
    setSelectedComputesMenu(event.currentTarget);
  }

  function closeSelectedComputesMenu() {
    setSelectedComputesMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeComputes(selectedComputeIds).then((data) => {
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
              // style={{
              //   position:
              //     index === 0 || index === array.length - 1
              //       ? 'sticky'
              //       : 'inherit',
              //   left: index === 0 ? 0 : undefined,
              //   right: index === array.length - 1 ? 0 : undefined,
              //   zIndex: index === 0 || index === array.length - 1 ? 1 : 'auto',
              // }}
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

export default ComputesTableHead;
