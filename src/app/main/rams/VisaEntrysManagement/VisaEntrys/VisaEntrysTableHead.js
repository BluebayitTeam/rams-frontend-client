import { Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVisaEntrys, removeVisaEntrys } from '../store/visaEntrysSlice';

const rows = [
	{
		id: 'sl_no',
		align: 'left',
		disablePadding: true,
		label: 'SL_NO',
		sort: true
	},

	// {
	//     id: 'demand',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Demand',
	//     sort: true
	// },
	{
		id: 'visa_agent',
		align: 'left',
		disablePadding: false,
		label: 'Visa Agent',
		sort: true
	},
	{
		id: 'country',
		align: 'left',
		disablePadding: false,
		label: 'Country',
		sort: true
	},

	{
		id: 'visa_number',
		align: 'left',
		disablePadding: false,
		label: 'Visa Number',
		sort: true
	},
	// {
	//     id: 'visa_issue_date',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Visa Issue Date',
	//     sort: true
	// },
	{
		id: 'profession_english',
		align: 'left',
		disablePadding: false,
		label: 'Profession English',
		sort: true
	},
	// {
	//     id: 'profession_arabic',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Profession Arabic',
	//     sort: true
	// },
	// {
	//     id: 'group_no',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Group No',
	//     sort: true
	// },
	// {
	//     id: 'quantity',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Quantity',
	//     sort: true
	// },
	{
		id: 'sponsor_id_no',
		align: 'left',
		disablePadding: false,
		label: 'Sponsor ID No',
		sort: true
	},
	// {
	//     id: 'sponsor_dob',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Sponsor Date Of Birth',
	//     sort: true
	// },
	// {
	//     id: 'sponsor_name_arabic',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Sponsor Name Arabic',
	//     sort: true
	// },
	// {
	//     id: 'sponsor_mobile',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Sponsor Mobile',
	//     sort: true
	// },
	// {
	//     id: 'sponsor_address',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Sponsor Address',
	//     sort: true
	// },
	// {
	//     id: 'notes',
	//     align: 'left',
	//     disablePadding: false,
	//     label: 'Notes',
	//     sort: true
	// },

	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

const VisaEntrysTableHead = props => {
	const { selectedVisaEntryIds } = props;

	const numSelected = selectedVisaEntryIds.length;

	const [selectedVisaEntrysMenu, setselectedVisaEntrysMenu] = useState(null);

	const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openselectedVisaEntrysMenu(event) {
		setselectedVisaEntrysMenu(event.currentTarget);
	}

	function closeselectedVisaEntrysMenu() {
		setselectedVisaEntrysMenu(null);
	}

	console.log('selectedVisaEntryIds', selectedVisaEntryIds);

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					{props.rowCount !== 0 && !_.isEmpty(selectedVisaEntryIds) ? (
						<div className="pt-2">
							<IconButton
								className="p-0"
								aria-owns={selectedVisaEntrysMenu ? 'selectedVisaEntrysMenu' : null}
								aria-haspopup="true"
								onClick={openselectedVisaEntrysMenu}
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedVisaEntrysMenu"
								anchorEl={selectedVisaEntrysMenu}
								open={Boolean(selectedVisaEntrysMenu)}
								onClose={closeselectedVisaEntrysMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											dispatch(removeVisaEntrys(selectedVisaEntryIds)).then(res => {
												res.payload && dispatch(getVisaEntrys(props.pagination));
											});
											props.onMenuItemClick();
											closeselectedVisaEntrysMenu();
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

export default VisaEntrysTableHead;
