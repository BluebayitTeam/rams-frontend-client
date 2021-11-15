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
        id: 'image',
        align: 'left',
        disablePadding: false,
        label: 'Image',
        sort: true,
    },
    // {
    //     id: 'gender',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Gender',
    //     sort: true
    // },
    // {
    //     id: 'role',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Role',
    //     sort: true
    // },
    // {
    //     id: 'thana',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Thana',
    //     sort: true
    // },
    // {
    //     id: 'city',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'City',
    //     sort: true
    // },
    // {
    //     id: 'country',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Country',
    //     sort: true
    // },
    // {
    //     id: 'group',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Group',
    //     sort: true
    // },

    // {
    //     id: 'first_name',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'First Name',
    //     sort: true
    // },
    // {
    //     id: 'last_name',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Last Name',
    //     sort: true
    // },
    // {
    //     id: 'father_name',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Father Name',
    //     sort: true
    // },
    // {
    //     id: 'mother_name',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Mother Name',
    //     sort: true
    // },
    {
        id: 'username',
        align: 'left',
        disablePadding: false,
        label: 'User Name',
        sort: true
    },
    {
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Email',
        sort: true
    },
    {
        id: 'phone',
        align: 'left',
        disablePadding: false,
        label: 'Phone',
        sort: true
    },
    // {
    //     id: 'secondary_phone',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Secondary Phone',
    //     sort: true
    // },
    // {
    //     id: 'user_type',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'User Type',
    //     sort: true
    // },
    {
        id: 'address',
        align: 'left',
        disablePadding: false,
        label: 'Address',
        sort: true
    },
    // {
    //     id: 'street_address_two',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Street Address Two',
    //     sort: true
    // },
    // {
    //     id: 'postal_code',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Postal Code',
    //     sort: true
    // },
    // {
    //     id: 'nid',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'NID',
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

const AgentsTableHead = (props) => {
    const { selectedAgentIds } = props;

    const numSelected = selectedAgentIds.length;

    // const [selectedAgentsMenu, setselectedAgentsMenu] = useState(null);

    // const dispatch = useDispatch();

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    // function openselectedAgentsMenu(event) {
    //     setselectedAgentsMenu(event.currentTarget);
    // }

    // function closeselectedAgentsMenu() {
    //     setselectedAgentsMenu(null);
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
                            aria-owns={selectedAgentsMenu ? 'selectedAgentsMenu' : null}
                            aria-haspopup="true"
                            onClick={openselectedAgentsMenu}
                        >
                            <Icon>more_horiz</Icon>
                        </IconButton>
                        <Menu
                            id="selectedAgentsMenu"
                            anchorEl={selectedAgentsMenu}
                            open={Boolean(selectedAgentsMenu)}
                            onClose={closeselectedAgentsMenu}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(removeAgents(selectedAgentIds));
                                        props.onMenuItemClick();
                                        closeselectedAgentsMenu();
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

export default AgentsTableHead;
