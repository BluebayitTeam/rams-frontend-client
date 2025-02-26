import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeletePayableBillsMutation } from '../PayableBillsApi';

/**
 * The payableBills table head component.
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
		disablePadding: true,
		label: 'Date',
		sort: true
	},

	{
		id: 'branch',
		align: 'left',
		disablePadding: false,
		label: 'Branch',
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
		id: 'ledger',
		align: 'left',
		disablePadding: false,
		label: 'Ledger',
		sort: true
	},
	{
		id: 'sub-ledger',
		align: 'left',
		disablePadding: false,
		label: 'Sub Ledger',
		sort: true
	},
	{
		id: 'currency',
		align: 'left',
		disablePadding: false,
		label: 'Currency',
		sort: true
	},
	{
		id: 'currency_rate',
		align: 'left',
		disablePadding: false,
		label: 'Rate',
		sort: true
	},
	{
		id: 'Amount',
		align: 'left',
		disablePadding: false,
		label: 'Foreign Currency',
		sort: true
	},
	{
		id: 'details',
		align: 'left',
		disablePadding: false,
		label: 'Details',
		sort: true
	},
	{
		id: 'total_amount',
		align: 'left',
		disablePadding: false,
		label: 'Total Amount',
		sort: true
	},

	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

function PayableBillsTableHead(props) {
	const { selectedPayableBillIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;

	console.log('onMenuItemClick', onMenuItemClick);

	console.log('selectedPayableBillIds', selectedPayableBillIds);

	const [removePayableBills] = useDeletePayableBillsMutation();
	const numSelected = selectedPayableBillIds.length;
	const [selectedPayableBillsMenu, setSelectedPayableBillsMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedPayableBillsMenu(event) {
		setSelectedPayableBillsMenu(event.currentTarget);
	}

	function closeSelectedPayableBillsMenu() {
		setSelectedPayableBillsMenu(null);
	}

	function handleDeleteMultipleItem() {
		removePayableBills(selectedPayableBillIds).then((data) => {
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
		<TableHead sx={{
			position: 'sticky',
			top: 0, // Fix the header at the top
			zIndex: 10, // Ensure it stays on top
			backgroundColor: (theme) =>
				theme.palette.mode === 'light'
					? lighten(theme.palette.background.default, 0.4)
					: lighten(theme.palette.background.default, 0.02),
		}}>
			<TableRow className="h-48 sm:h-64">
				{/* <TableCell
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? lighten(theme.palette.background.default, 0.4)
								: lighten(theme.palette.background.default, 0.02)
					}}
					padding="none"
					className="w-40 md:w-64 text-center z-99"
				>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount !== 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
					/>
					{numSelected > 0 && (
						<Box
							className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
							sx={{
								background: (theme) => theme.palette.background.default
							}}
						>
							<IconButton
								aria-haspopup="true"
								onClick={openSelectedPayableBillsMenu}
								size="large"
							>
								<Delete
									onClick={(event) => handleDeleteMultipleItem()}
									className="cursor-pointer custom-delete-icon-style"
								/>
							</IconButton>
							{/* <Menu
								id="selectedPayableBillsMenu"
								anchorEl={selectedPayableBillsMenu}
								open={Boolean(selectedPayableBillsMenu)}
								onClose={closeSelectedPayableBillsMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											removePayableBills(selectedPayableBillIds);
											onMenuItemClick();
											closeSelectedPayableBillsMenu();
										}}
									>
										<ListItemIcon>
											<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu>
						</Box>
					)}
				</TableCell> */}
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
							className="p-4 md:p-16 whitespace-nowrap"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'normal'}

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

export default PayableBillsTableHead;
