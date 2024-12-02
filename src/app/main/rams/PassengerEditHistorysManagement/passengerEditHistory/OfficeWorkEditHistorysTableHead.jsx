import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';

const rows = [
  {
    id: 'SL',
    align: 'left',
    disablePadding: true,
    label: 'SL',
    sort: true,
  },
  {
    id: 'Created_at',
    align: 'left',
    disablePadding: false,
    label: 'Created At',
    sort: true,
  },
  {
    id: 'Submit By',
    align: 'left',
    disablePadding: false,
    label: 'Submit By',
    sort: true,
  },

  {
    id: 'police_clearance_no',
    align: 'left',
    disablePadding: false,
    label: 'Police Clearance No',
    sort: true,
  },
  {
    id: 'police_clearance_status',
    align: 'left',
    disablePadding: false,
    label: 'Police Clearance Status ',
    sort: true,
  },
  {
    id: 'police_clearance_date',
    align: 'left',
    disablePadding: false,
    label: 'Police Clearance Date',
    sort: true,
  },
  {
    id: 'driving_license_no',
    align: 'left',
    disablePadding: false,
    label: 'Driving License No',
    sort: true,
  },
  {
    id: 'driving_license_status',
    align: 'left',
    disablePadding: false,
    label: 'Driving License Status',
    sort: true,
  },
  {
    id: 'driving_license_date',
    align: 'left',
    disablePadding: false,
    label: 'Driving License Date',
    sort: true,
  },
  {
    id: 'finger_no',
    align: 'left',
    disablePadding: false,
    label: 'Finger No',
    sort: true,
  },
  {
    id: 'finger_status',
    align: 'left',
    disablePadding: false,
    label: 'Finger Status',
    sort: true,
  },
  {
    id: 'finger_date',
    align: 'left',
    disablePadding: false,
    label: 'Finger Date',
    sort: true,
  },
  {
    id: 'certificate_experience',
    align: 'left',
    disablePadding: false,
    label: 'Certificate & Experience',
    sort: true,
  },
];
function OfficeWorkEditHistorysHead(props) {
  const {
    selectedAgentIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  const numSelected = selectedAgentIds.length;
  const [
    selectedPassengerEditHistorysMenu,
    setSelectedPassengerEditHistorysMenu,
  ] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedPassengerEditHistorysMenu(event) {
    setSelectedPassengerEditHistorysMenu(event.currentTarget);
  }

  function closeSelectedPassengerEditHistorysMenu() {
    setSelectedPassengerEditHistorysMenu(null);
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
              style={{
                position:
                  index === 0 || index === array.length - 1
                    ? 'sticky'
                    : 'inherit',
                left: index === 0 ? 0 : undefined,
                right: index === array.length - 1 ? 0 : undefined,
                zIndex: index === 0 || index === array.length - 1 ? 1 : 'auto',
              }}
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

export default OfficeWorkEditHistorysHead;
