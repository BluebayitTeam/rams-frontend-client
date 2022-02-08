import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'sl_no',
		align: 'left',
		disablePadding: true,
		label: 'SL_NO',
		sort: true
	},
	{
		id: 'parent',
		align: 'left',
		disablePadding: false,
		label: 'Parent',
		sort: true
	},
	{
		id: 'menu_id',
		align: 'left',
		disablePadding: false,
		label: 'Menu ID',
		sort: true
	},
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: 'Title',
		sort: true
	},
	{
		id: 'translate',
		align: 'left',
		disablePadding: false,
		label: 'Translate',
		sort: true
	},
	{
		id: 'type',
		align: 'left',
		disablePadding: false,
		label: 'Type',
		sort: true
	},
	{
		id: 'url',
		align: 'left',
		disablePadding: false,
		label: 'Url',
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

const MenusTableHead = props => {
	const { selectedMenuIds } = props;

	const numSelected = selectedMenuIds.length;

	// const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

	// const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	// function openSelectedProductsMenu(event) {
	//     setSelectedProductsMenu(event.currentTarget);
	// }

	// function closeSelectedProductsMenu() {
	//     setSelectedProductsMenu(null);
	// }

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < props.rowCount}
						checked={props.rowCount !== 0 && numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>

					{/* <div
                        className={clsx(
                            'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1'
                        )}
                    >
                        <IconButton
                            aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
                            aria-haspopup="true"
                            onClick={openSelectedProductsMenu}
                        >
                            <Icon>more_horiz</Icon>
                        </IconButton>
                        <Menu
                            id="selectedProductsMenu"
                            anchorEl={selectedProductsMenu}
                            open={Boolean(selectedProductsMenu)}
                            onClose={closeSelectedProductsMenu}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(removeMenus(selectedMenuIds));
                                        props.onMenuItemClick();
                                        closeSelectedProductsMenu();
                                    }}
                                >
                                    <ListItemIcon className="min-w-40">
                                        <Icon>delete</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Remove" />
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div> */}
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

export default MenusTableHead;
