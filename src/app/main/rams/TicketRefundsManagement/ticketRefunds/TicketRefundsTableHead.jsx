import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useDeleteTicketRefundsMutation } from '../TicketRefundsApi';

/**
 * The ticketRefunds table head component.
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
    id: 'customer',
    align: 'left',
    disablePadding: false,
    label: 'Customer',
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
    id: 'airline_agency',
    align: 'left',
    disablePadding: false,
    label: 'Airline Agency',
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
    id: 'customer_amount',
    align: 'left',
    disablePadding: false,
    label: 'Customer Amount',
    sort: true,
  },
  {
    id: 'airline_amount',
    align: 'left',
    disablePadding: false,
    label: 'Airline Amount',
    sort: true,
  },

  {
    id: 'refund_date',
    align: 'left',
    disablePadding: false,
    label: 'Refund Date',
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

function TicketRefundsTableHead(props) {
	const { selectedTicketRefundIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;

	console.log('onMenuItemClick', onMenuItemClick);

	console.log('selectedTicketRefundIds', selectedTicketRefundIds);

	const [removeTicketRefunds] = useDeleteTicketRefundsMutation();
	const numSelected = selectedTicketRefundIds.length;
	const [selectedTicketRefundsMenu, setSelectedTicketRefundsMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedTicketRefundsMenu(event) {
		setSelectedTicketRefundsMenu(event.currentTarget);
	}

	function closeSelectedTicketRefundsMenu() {
		setSelectedTicketRefundsMenu(null);
	}

	function handleDeleteMultipleItem() {
		removeTicketRefunds(selectedTicketRefundIds).then((data) => {
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
		<TableHead>
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

export default TicketRefundsTableHead;
