import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useDeletePaymentDetailsMutation } from '../PaymentDetailsApi';

/**
 * The paymentDetails table head component.
 */

const rows = [
	{
		id: 'SL',
		align: 'left',
		disablePadding: true,
		label: 'SL',
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
		id: 'invoice_no',
		align: 'left',
		disablePadding: false,
		label: 'Invoice No',
		sort: true
	},
	{
		id: 'Client',
		align: 'left',
		disablePadding: false,
		label: 'Client',
		sort: true
	},

	{
		id: 'Email',
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
		id: 'Client Type',
		align: 'left',
		disablePadding: false,
		label: 'Client Type',
		sort: true
	},
	{
		id: 'Amount',
		align: 'left',
		disablePadding: false,
		label: 'Amount',
		sort: true
	},
	{
		id: 'payment_type',
		align: 'left',
		disablePadding: false,
		label: 'Payment Type',
		sort: true
	},
	{
		id: 'account_type',
		align: 'left',
		disablePadding: false,
		label: 'Account Type',
		sort: true
	},
	{
		id: 'transection_id',
		align: 'left',
		disablePadding: false,
		label: 'Transection Id',
		sort: true
	},
	{
		id: 'account_number',
		align: 'left',
		disablePadding: false,
		label: 'Account Number',
		sort: true
	},
	{
		id: 'billing_address',
		align: 'left',
		disablePadding: false,
		label: 'Billing Address',
		sort: true
	}
];

function PaymentDetailsTableHead(props) {
	const { selectedPaymentDetailIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;
	const [removePaymentDetails] = useDeletePaymentDetailsMutation();
	const numSelected = selectedPaymentDetailIds.length;
	const [selectedPaymentDetailsMenu, setSelectedPaymentDetailsMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedPaymentDetailsMenu(event) {
		setSelectedPaymentDetailsMenu(event.currentTarget);
	}

	function closeSelectedPaymentDetailsMenu() {
		setSelectedPaymentDetailsMenu(null);
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
								position: index === 0 ? 'sticky' : 'inherit',
								left: index === 0 ? 0 : undefined,

								zIndex: index === 0 ? 1 : 'auto'
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

export default PaymentDetailsTableHead;
