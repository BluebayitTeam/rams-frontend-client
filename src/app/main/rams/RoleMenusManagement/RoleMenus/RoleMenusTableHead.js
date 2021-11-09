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
        id: 'role',
        align: 'left',
        disablePadding: false,
        label: 'Role',
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

const RoleMenusTableHead = (props) => {
    const { selectedRoleMenuIds } = props;

    const numSelected = selectedRoleMenuIds.length;

    // const [selectedRoleMenusMenu, setselectedRoleMenusMenu] = useState(null);

    // const dispatch = useDispatch();

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    // function openselectedRoleMenusMenu(event) {
    //     setselectedRoleMenusMenu(event.currentTarget);
    // }

    // function closeselectedRoleMenusMenu() {
    //     setselectedRoleMenusMenu(null);
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
                            aria-owns={selectedRoleMenusMenu ? 'selectedRoleMenusMenu' : null}
                            aria-haspopup="true"
                            onClick={openselectedRoleMenusMenu}
                        >
                            <Icon>more_horiz</Icon>
                        </IconButton>
                        <Menu
                            id="selectedRoleMenusMenu"
                            anchorEl={selectedRoleMenusMenu}
                            open={Boolean(selectedRoleMenusMenu)}
                            onClose={closeselectedRoleMenusMenu}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(removeRoleMenus(selectedRoleMenuIds));
                                        props.onMenuItemClick();
                                        closeselectedRoleMenusMenu();
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
                            className="p-4 md:p-16"
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

export default RoleMenusTableHead;