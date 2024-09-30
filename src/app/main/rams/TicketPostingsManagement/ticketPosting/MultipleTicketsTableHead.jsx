import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';

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
    disablePadding: true,
    label: 'Issue Date',
    sort: true,
  },
  {
    id: 'ticket_number',
    align: 'left',
    disablePadding: false,
    label: 'Ticket Number',
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
    id: 'action',
    align: 'right',
    disablePadding: false,
    label: 'Action',
    sort: true,
  },
];

function MultipleTicketsTableHead(props) {
	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				{rows?.map((row) => {
					return (
						<TableCell
							className="p-4 md:p-16 whitespace-nowrap"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel className="font-semibold">{row.label}</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default MultipleTicketsTableHead;
