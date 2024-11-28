import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useDeletePassengerEditHistorysMutation } from '../PassengerEditHistorysApi';

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
    id: 'agent',
    align: 'left',
    disablePadding: false,
    label: 'Agent',
    sort: true,
  },
  {
    id: 'demand',
    align: 'left',
    disablePadding: false,
    label: 'Demand',
    sort: true,
  },
  {
    id: 'profession',
    align: 'left',
    disablePadding: false,
    label: 'Profession ',
    sort: true,
  },
  {
    id: 'agency',
    align: 'left',
    disablePadding: false,
    label: 'Agency',
    sort: true,
  },
  {
    id: 'target_country',
    align: 'left',
    disablePadding: false,
    label: 'Target Country ',
    sort: true,
  },
  {
    id: 'passenger_type',
    align: 'left',
    disablePadding: false,
    label: ' Passenger Type',
    sort: true,
  },
  {
    id: 'current_status',
    align: 'left',
    disablePadding: false,
    label: 'Current_Status',
    sort: true,
  },
  {
    id: 'visa_entry',
    align: 'left',
    disablePadding: false,
    label: 'Visa Entry',
    sort: true,
  },
  {
    id: 'police_station',
    align: 'left',
    disablePadding: false,
    label: 'Police Station',
    sort: true,
  },
  {
    id: 'district',
    align: 'left',
    disablePadding: false,
    label: 'District',
    sort: true,
  },
  {
    id: 'passenger_name',
    align: 'left',
    disablePadding: false,
    label: 'Passenger Name',
    sort: true,
  },
  {
    id: 'gender',
    align: 'left',
    disablePadding: false,
    label: 'Gender',
    sort: true,
  },
  {
    id: 'date_of_birth',
    align: 'left',
    disablePadding: false,
    label: 'Date Of Birth',
    sort: true,
  },
  {
    id: 'nid',
    align: 'left',
    disablePadding: false,
    label: 'NID',
    sort: true,
  },
  {
    id: 'father_name',
    align: 'left',
    disablePadding: false,
    label: 'Father Name',
    sort: true,
  },
  {
    id: 'mother_name',
    align: 'left',
    disablePadding: false,
    label: 'Mother Name',
    sort: true,
  },
  {
    id: 'spouse_name',
    align: 'left',
    disablePadding: false,
    label: 'Spouse Name',
    sort: true,
  },
  {
    id: 'religion',
    align: 'left',
    disablePadding: false,
    label: 'Religion',
    sort: true,
  },
  {
    id: 'marital_status',
    align: 'left',
    disablePadding: false,
    label: 'Marital Status',
    sort: true,
  },
  {
    id: 'passport_no',
    align: 'left',
    disablePadding: false,
    label: 'Passport No',
    sort: true,
  },
  {
    id: 'passport_type',
    align: 'left',
    disablePadding: false,
    label: 'passport Type',
    sort: true,
  },
  {
    id: 'passport_issue_date',
    align: 'left',
    disablePadding: false,
    label: 'Passport Issue Date ',
    sort: true,
  },
  {
    id: 'passport_expiry_date',
    align: 'left',
    disablePadding: false,
    label: 'Passport Expiry Date',
    sort: true,
  },
  {
    id: 'village',
    align: 'left',
    disablePadding: false,
    label: 'Village',
    sort: true,
  },
  {
    id: 'post_office',
    align: 'left',
    disablePadding: false,
    label: 'Post Office',
    sort: true,
  },
  {
    id: 'contact_no',
    align: 'left',
    disablePadding: false,
    label: 'Contact No',
    sort: true,
  },
  {
    id: 'emergency_contact_no',
    align: 'left',
    disablePadding: false,
    label: 'Emergency Contact No',
    sort: true,
  },
  {
    id: 'place_of_birth',
    align: 'left',
    disablePadding: false,
    label: 'Place Of Birth',
    sort: true,
  },
  {
    id: 'place_of_residence',
    align: 'left',
    disablePadding: false,
    label: 'Place of Residence',
    sort: true,
  },
  {
    id: 'passport_issue_place',
    align: 'left',
    disablePadding: false,
    label: 'Passport Issue Place',
    sort: true,
  },
  {
    id: 'notes',
    align: 'left',
    disablePadding: false,
    label: 'Notes',
    sort: true,
  },
];
function PassengerEditHistorysTableHead(props) {
  const {
    selectedAgentIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;

  console.log('ChekckRows', rows);

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

export default PassengerEditHistorysTableHead;
