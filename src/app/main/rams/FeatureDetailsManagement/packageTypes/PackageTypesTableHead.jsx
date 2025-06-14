import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useDeletePackageTypesMutation } from '../FeatureDetailsApi';

/**
 * The packageTypes table head component.
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
		id: 'name',
		align: 'left',
		disablePadding: false,
		label: 'Name',
		sort: true
	},
	{
		id: 'price',
		align: 'left',
		disablePadding: false,
		label: 'Price',
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

function PackageTypesTableHead(props) {
	const { selectedPackageTypeIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;
	const [removePackageTypes] = useDeletePackageTypesMutation();
	const numSelected = selectedPackageTypeIds.length;
	const [selectedPackageTypesMenu, setSelectedPackageTypesMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedPackageTypesMenu(event) {
		setSelectedPackageTypesMenu(event.currentTarget);
	}

	function closeSelectedPackageTypesMenu() {
		setSelectedPackageTypesMenu(null);
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

export default PackageTypesTableHead;
