import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeleteCandidateApplicationsMutation } from '../CandidateApplicationsApi';

/**
 * The CandidateApplications table head component.
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
    id: 'job',
    align: 'left',
    disablePadding: false,
    label: 'Job',
    sort: true,
  },
  {
    id: 'applicant',
    align: 'left',
    disablePadding: false,
    label: 'Applicant',
    sort: true,
  },
  {
    id: 'Email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    sort: true,
  },
  {
    id: 'phone_number',
    align: 'left',
    disablePadding: false,
    label: 'Phone Number',
    sort: true,
  },
  {
    id: 'application_status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true,
  },
  {
    id: 'resume',
    align: 'left',
    disablePadding: false,
    label: 'Resume',
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

function CandidateApplicationsTableHead(props) {
  const {
    selectedCandidateApplicationIds,
    tableOrder,
    onSelectAllClick,
    onRequestSort,
    rowCount,
    onMenuItemClick,
  } = props;



  const [removeCandidateApplications] =
    useDeleteCandidateApplicationsMutation();
  const numSelected = selectedCandidateApplicationIds.length;
  const [
    selectedCandidateApplicationsMenu,
    setSelectedCandidateApplicationsMenu,
  ] = useState(null);
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  function openSelectedCandidateApplicationsMenu(event) {
    setSelectedCandidateApplicationsMenu(event.currentTarget);
  }

  function closeSelectedCandidateApplicationsMenu() {
    setSelectedCandidateApplicationsMenu(null);
  }

  function handleDeleteMultipleItem() {
    removeCandidateApplications(selectedCandidateApplicationIds).then(
      (data) => {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
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

export default CandidateApplicationsTableHead;
