import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useDeleteSupportsMutation } from '../SupportsApi';

/**
 * The supports table head component.
 */

const rows = [
	{
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
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

function SupportsTableHead(props) {
	const { selectedSupportIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;
	const [removeSupports] = useDeleteSupportsMutation();
	const numSelected = selectedSupportIds.length;
	const [selectedSupportsMenu, setSelectedSupportsMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedSupportsMenu(event) {
		setSelectedSupportsMenu(event.currentTarget);
	}

	function closeSelectedSupportsMenu() {
		setSelectedSupportsMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				{rows.map((row) => {
					return (
						<TableCell
							sx={{
								backgroundColor: (theme) =>
									theme.palette.mode === 'light'
										? lighten(theme.palette.background.default, 0.4)
										: lighten(theme.palette.background.default, 0.02)
							}}
							className="p-4 md:p-16"
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

export default SupportsTableHead;
