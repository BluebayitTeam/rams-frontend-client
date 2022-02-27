import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReceivableBills, removeReceivableBills } from '../store/receivableBillsSlice';

const rows = [
	{
		id: 'sl_no',
		align: 'left',
		disablePadding: true,
		label: 'SL_NO',
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

const ReceivableBillsTableHead = props => {
	const { selectedReceivableBillIds } = props;

	const numSelected = selectedReceivableBillIds.length;

	const [selectedReceivableBillsMenu, setselectedReceivableBillsMenu] = useState(null);

	const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openselectedReceivableBillsMenu(event) {
		setselectedReceivableBillsMenu(event.currentTarget);
	}

	function closeselectedReceivableBillsMenu() {
		setselectedReceivableBillsMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					{props.rowCount !== 0 && !_.isEmpty(selectedReceivableBillIds) ? (
						<div className="pt-2">
							<IconButton
								className="p-0"
								aria-owns={selectedReceivableBillsMenu ? 'selectedReceivableBillsMenu' : null}
								aria-haspopup="true"
								onClick={openselectedReceivableBillsMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedReceivableBillsMenu"
								anchorEl={selectedReceivableBillsMenu}
								open={Boolean(selectedReceivableBillsMenu)}
								onClose={closeselectedReceivableBillsMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											dispatch(removeReceivableBills(selectedReceivableBillIds)).then(res => {
												res.payload && dispatch(getReceivableBills(props.pagination));
											});
											props.onMenuItemClick();
											closeselectedReceivableBillsMenu();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary="Remove" />
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					) : null}
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < props.rowCount}
						checked={props.rowCount !== 0 && numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
				</TableCell>
				{rows.map(row => {
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
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
										className="font-semibold"
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
};

export default ReceivableBillsTableHead;
