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
import { getSubLedgers, removeSubLedgers } from '../store/subLedgersSlice';

const rows = [
	{
		id: 'sl_no',
		align: 'left',
		disablePadding: true,
		label: 'SL_NO',
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
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

const SubLedgersTableHead = props => {
	const { selectedSubLedgerIds } = props;

	const numSelected = selectedSubLedgerIds.length;

	const [selectedSubLedgersMenu, setselectedSubLedgersMenu] = useState(null);

	const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openselectedSubLedgersMenu(event) {
		setselectedSubLedgersMenu(event.currentTarget);
	}

	function closeselectedSubLedgersMenu() {
		setselectedSubLedgersMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					{props.rowCount !== 0 && !_.isEmpty(selectedSubLedgerIds) ? (
						<div className="pt-2">
							<IconButton
								className="p-0"
								aria-owns={selectedSubLedgersMenu ? 'selectedSubLedgersMenu' : null}
								aria-haspopup="true"
								onClick={openselectedSubLedgersMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedSubLedgersMenu"
								anchorEl={selectedSubLedgersMenu}
								open={Boolean(selectedSubLedgersMenu)}
								onClose={closeselectedSubLedgersMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											dispatch(removeSubLedgers(selectedSubLedgerIds)).then(res => {
												res.payload && dispatch(getSubLedgers(props.pagination));
											});
											props.onMenuItemClick();
											closeselectedSubLedgersMenu();
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
							//sortDirection={props.order.id === row.id ? props.order.direction : false}
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

export default SubLedgersTableHead;
