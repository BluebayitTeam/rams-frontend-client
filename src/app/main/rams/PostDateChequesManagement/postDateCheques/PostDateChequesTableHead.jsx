import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { Checkbox, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useDeletePostDateChequesMutation } from '../PostDateChequesApi';

/**
 * The postDateCheques table head component.
 */

const rows = [
	{
		id: 'SL',
		align: 'left',
		disablePadding: false,
		label: 'SL',
		sort: true
	},
	{
		id: 'Date',
		align: 'left',
		disablePadding: false,
		label: 'Cheque/PO Date',
		sort: true
	},
	{
		id: 'cheque_no',
		align: 'left',
		disablePadding: false,
		label: 'Cheque No',
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
		id: 'bank_name',
		align: 'left',
		disablePadding: false,
		label: 'Bank Name Of Cheque/PO ',
		sort: true
	},

	{
		id: 'pdc_type',
		align: 'left',
		disablePadding: false,
		label: 'PDC Type',
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
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: 'Status',
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

function PostDateChequesTableHead(props) {
	const { selectedPostDateChequeIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;

	console.log('onMenuItemClick', onMenuItemClick);

	console.log('selectedPostDateChequeIds', selectedPostDateChequeIds);

	const [removePostDateCheques] = useDeletePostDateChequesMutation();
	const numSelected = selectedPostDateChequeIds.length;
	const [selectedPostDateChequesMenu, setSelectedPostDateChequesMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedPostDateChequesMenu(event) {
		setSelectedPostDateChequesMenu(event.currentTarget);
	}

	function closeSelectedPostDateChequesMenu() {
		setSelectedPostDateChequesMenu(null);
	}

	function handleDeleteMultipleItem() {
		removePostDateCheques(selectedPostDateChequeIds).then((data) => {
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
				<TableCell
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
								onClick={openSelectedPostDateChequesMenu}
								size="large"
							>
								<Delete
									onClick={(event) => handleDeleteMultipleItem()}
									className="cursor-pointer custom-delete-icon-style"
								/>
							</IconButton>
							{/* <Menu
								id="selectedPostDateChequesMenu"
								anchorEl={selectedPostDateChequesMenu}
								open={Boolean(selectedPostDateChequesMenu)}
								onClose={closeSelectedPostDateChequesMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											removePostDateCheques(selectedPostDateChequeIds);
											onMenuItemClick();
											closeSelectedPostDateChequesMenu();
										}}
									>
										<ListItemIcon>
											<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu> */}
						</Box>
					)}
				</TableCell>
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

export default PostDateChequesTableHead;
