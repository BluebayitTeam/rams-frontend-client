import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteUnitsMutation } from '../UnitsApi';

/**
 * The units table head component.
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
    id: 'Unit Type',
    align: 'left',
    disablePadding: false,
    label: 'Unit Type',
    sort: true,
  },
  {
    id: 'Conversion',
    align: 'left',
    disablePadding: false,
    label: 'Conversion',
    sort: true,
  },
  {
    id: 'Formal Name',
    align: 'left',
    disablePadding: false,
    label: 'Formal Name',
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

function UnitsTableHead(props) {
  const {
    selectedUnitIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  console.log('onMenuItemClick', onMenuItemClick);

  console.log('selectedUnitIds', selectedUnitIds);

  const [removeUnits] = useDeleteUnitsMutation();
  const numSelected = selectedUnitIds.length;
  const [selectedUnitsMenu, setSelectedUnitsMenu] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedUnitsMenu(event) {
    setSelectedUnitsMenu(event.currentTarget);
  }

  function closeSelectedUnitsMenu() {
    setSelectedUnitsMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeUnits(selectedUnitIds).then((data) => {
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

export default UnitsTableHead;
