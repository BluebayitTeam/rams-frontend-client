import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

const rows = [
	{
		id: 'sl',
		align: 'left',
		disablePadding: true,
		label: 'SL',
		sort: true
	},
	{
		id: 'clients',
		align: 'left',
		disablePadding: false,
		label: 'Clients',
		sort: true
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Email',
		sort: true
	},
	{
		id: 'phone',
		align: 'left',
		disablePadding: false,
		label: 'Phone',
		sort: true
	},
	{
		id: 'client_type',
		align: 'left',
		disablePadding: false,
		label: 'Client type',
		sort: true
	},
	{
		id: 'date',
		align: 'left',
		disablePadding: false,
		label: 'Date',
		sort: true
	},
	{
		id: 'duration',
		align: 'left',
		disablePadding: false,
		label: 'Duration',
		sort: true
	},
	{
		id: 'client_paid',
		align: 'left',
		disablePadding: false,
		label: 'Client Paid',
		sort: true
	},
	{
		id: 'action',
		align: 'right',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

function SubscriptionLoansTableHead(props) {
	const { selectedSubscriptionLoanIds, tableOrder, onRequestSort } = props;
	const [selectedSubscriptionLoansMenu, setSelectedSubscriptionLoansMenu] = useState(null);

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{rows.map((row, index, array) => (
					<TableCell
						key={row.id}
						align={row.align}
						padding={row.disablePadding ? 'none' : 'normal'}
						sortDirection={tableOrder.id === row.id ? tableOrder.direction : false}
						style={{
							position: index === 0 || index === array.length - 1 ? 'sticky' : 'inherit',
							left: index === 0 ? 0 : undefined,
							right: index === array.length - 1 ? 0 : undefined,
							zIndex: index === 0 || index === array.length - 1 ? 1 : 'auto'
						}}
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
									onClick={createSortHandler(row.id)}
								>
									{row.label}
								</TableSortLabel>
							</Tooltip>
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export default SubscriptionLoansTableHead;
