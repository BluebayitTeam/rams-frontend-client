import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { lighten } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDeletePromotionsMutation } from '../PromotionsApi';

/**
 * The promotions table head component.
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
		id: 'employee',
		align: 'left',
		disablePadding: false,
		label: 'Employee',
		sort: true
	},
	{
		id: 'current_designation',
		align: 'left',
		disablePadding: false,
		label: 'Current Designation',
		sort: true
	},
	{
		id: 'promoted_designaiton',
		align: 'left',
		disablePadding: false,
		label: 'Promoted Designation',
		sort: true
	},
	{
		id: 'increment_amount',
		align: 'left',
		disablePadding: false,
		label: 'Previous Basic Salary',
		sort: true
	},
	{
		id: 'increment_amount',
		align: 'left',
		disablePadding: false,
		label: 'Increment Amount',
		sort: true
	},
	{
		id: 'effective_from',
		align: 'left',
		disablePadding: false,
		label: 'Effective From',
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

function PromotionsTableHead(props) {
	const { selectedPromotionIds, tableOrder, onSelectAllClick, onRequestSort, rowCount, onMenuItemClick } = props;

	console.log('onMenuItemClick', onMenuItemClick);

	console.log('selectedPromotionIds', selectedPromotionIds);

	const [removePromotions] = useDeletePromotionsMutation();
	const numSelected = selectedPromotionIds.length;
	const [selectedPromotionsMenu, setSelectedPromotionsMenu] = useState(null);
	const createSortHandler = (event, property) => {
		onRequestSort(event, property);
	};

	function openSelectedPromotionsMenu(event) {
		setSelectedPromotionsMenu(event.currentTarget);
	}

	function closeSelectedPromotionsMenu() {
		setSelectedPromotionsMenu(null);
	}

	function handleDeleteMultipleItem() {
		removePromotions(selectedPromotionIds).then((data) => {
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
				{rows.map((row, index, array) => (
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
				)
				)}
			</TableRow>
		</TableHead>
	);
}

export default PromotionsTableHead;
