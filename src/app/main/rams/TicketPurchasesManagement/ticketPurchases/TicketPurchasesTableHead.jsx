import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useDeleteTicketPurchasesMutation } from '../TicketPurchasesApi';

/**
 * The ticketPurchases table head component.
 */


const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: true,
    label: 'SL',
    sort: true,
  },
  {
    id: 'issue_date',
    align: 'left',
    disablePadding: false,
    label: 'Issue date',
    sort: true,
  },
  {
    id: 'invoice_no',
    align: 'left',
    disablePadding: false,
    label: 'Invoice No.',
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
    id: 'ticket_agency',
    align: 'left',
    disablePadding: false,
    label: 'Visa Agent',
    sort: true,
  },

  {
    id: 'ticket_agency',
    align: 'left',
    disablePadding: false,
    label: 'Ticket Agency Name',
    sort: true,
  },

  {
    id: 'flight_date',
    align: 'left',
    disablePadding: false,
    label: 'Flight Date',
    sort: true,
  },
  {
    id: 'ticket_no',
    align: 'left',
    disablePadding: false,
    label: 'Ticket No',
    sort: true,
  },
  {
    id: 'target_country',
    align: 'left',
    disablePadding: false,
    label: 'Country ',
    sort: true,
  },
  {
    id: 'sector_name',
    align: 'left',
    disablePadding: false,
    label: 'Sector Name',
    sort: true,
  },
  {
    id: 'carrier_air_way',
    align: 'left',
    disablePadding: false,
    label: 'Air Way',
    sort: true,
  },
  {
    id: 'flight_no',
    align: 'left',
    disablePadding: false,
    label: 'Flight No',
    sort: true,
  },
  {
    id: 'flight_time',
    align: 'left',
    disablePadding: false,
    label: 'Flight Time',
    sort: true,
  },
  {
    id: 'notes',
    align: 'left',
    disablePadding: false,
    label: 'Comment',
    sort: true,
  },
  {
    id: 'purchase_amount',
    align: 'left',
    disablePadding: false,
    label: 'Purchase Amount',
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


function TicketPurchasesTableHead(props) {
	const { selectedTicketPurchaseIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;

	console.log('onMenuItemClick', onMenuItemClick);

	console.log('selectedTicketPurchaseIds', selectedTicketPurchaseIds);

	const [removeTicketPurchases] = useDeleteTicketPurchasesMutation();
	const numSelected = selectedTicketPurchaseIds.length;
	const [selectedTicketPurchasesMenu, setSelectedTicketPurchasesMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedTicketPurchasesMenu(event) {
		setSelectedTicketPurchasesMenu(event.currentTarget);
	}

	function closeSelectedTicketPurchasesMenu() {
		setSelectedTicketPurchasesMenu(null);
	}

	function handleDeleteMultipleItem() {
		removeTicketPurchases(selectedTicketPurchaseIds).then((data) => {
			Swal.fire({
				position: 'top-center',
				icon: 'success',
				title: 'Deleted Successfully',
				showConfirmButton: false,
				timer: 2000
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
          }}
    >
			<TableRow className="h-48 sm:h-64">
				{rows.map((row, index, array) => {
					return (
						<TableCell
							sx={{
								backgroundColor: (theme) =>
									theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							className="p-4 md:p-16 whitespace-nowrap"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'normal'}
							style={{
								position: index === 0 || index === array.length - 1 ? 'sticky' : 'inherit',
								left: index === 0 ? 0 : undefined,
								right: index === array.length - 1 ? 0 : undefined,
								zIndex: index === 0 || index === array.length - 1 ? 1 : 'auto'
							}}
							sortDirection={tableOrder.id === row.id ? tableOrder.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={tableOrder.id === row.id}
										direction={tableOrder.direction}
										onClick={(ev) => createSortHandler(ev, row.id)}
										className="font-semibold"
									>
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

export default TicketPurchasesTableHead;
