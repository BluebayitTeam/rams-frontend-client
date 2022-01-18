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
    {
        id: 'profession',
        align: 'left',
        disablePadding: false,
        label: 'Profession',
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
        id: 'visa_agent',
        align: 'left',
        disablePadding: false,
        label: 'Visa Agent',
        sort: true
    },

    {
        id: 'company_name',
        align: 'left',
        disablePadding: false,
        label: 'Company Name',
        sort: true
    },
    // {
    //     id: 'quantity',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Quantity',
    //     sort: true
    // },
    // {
    //     id: 'salary',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Salary',
    //     sort: true
    // },
    // {
    //     id: 'purchase_rate',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Purchase Rate',
    //     sort: true
    // },
    // {
    //     id: 'purchase_foreign_corrency',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Purchase Foreign Corrency',
    //     sort: true
    // },
    // {
    //     id: 'office_rate',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Office Rate',
    //     sort: true
    // },
    // {
    //     id: 'status',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Status',
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

const DemandsTableHead = (props) => {
    const { selectedDemandIds } = props;

    const numSelected = selectedDemandIds.length;

    // const [selectedDemandsMenu, setselectedDemandsMenu] = useState(null);

    // const dispatch = useDispatch();

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    // function openselectedDemandsMenu(event) {
    //     setselectedDemandsMenu(event.currentTarget);
    // }

    // function closeselectedDemandsMenu() {
    //     setselectedDemandsMenu(null);
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
                            aria-owns={selectedDemandsMenu ? 'selectedDemandsMenu' : null}
                            aria-haspopup="true"
                            onClick={openselectedDemandsMenu}
                        >
                            <Icon>more_horiz</Icon>
                        </IconButton>
                        <Menu
                            id="selectedDemandsMenu"
                            anchorEl={selectedDemandsMenu}
                            open={Boolean(selectedDemandsMenu)}
                            onClose={closeselectedDemandsMenu}
                        >
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(removeDemands(selectedDemandIds));
                                        props.onMenuItemClick();
                                        closeselectedDemandsMenu();
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

export default DemandsTableHead;