import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useDeleteDesignationsMutation } from '../DesignationsApi';

/**
 * The designations table head component.
 */

const rows = [
  {
    id: 'SL',
    align: 'left',
    disablePadding: true,
    label: 'SL',
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

function DesignationsTableHead(props) {
  const {
    selectedDesignationIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;
  const [removeDesignations] = useDeleteDesignationsMutation();
  const numSelected = selectedDesignationIds.length;
  const [selectedDesignationsMenu, setSelectedDesignationsMenu] =
    useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedDesignationsMenu(event) {
    setSelectedDesignationsMenu(event.currentTarget);
  }

  function closeSelectedDesignationsMenu() {
    setSelectedDesignationsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className='h-48 sm:h-64'>
        {rows.map((row, index, array) => (
          <TableCell
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? lighten(theme.palette.background.default, 0.4)
                  : lighten(theme.palette.background.default, 0.02),
            }}
            key={row.id}
            align={row.align}
            padding={row.disablePadding ? 'none' : 'normal'}>
            {row.sort ? (
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
            ) : (
              row.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default DesignationsTableHead;
