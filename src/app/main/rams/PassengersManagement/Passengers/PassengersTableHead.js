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
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPassengers, removePassengers } from '../store/passengersSlice';

const rows = [
    {
        id: 'sl_no',
        align: 'left',
        disablePadding: true,
        label: 'SL_NO',
        sort: true
    },
    // {
    //     id: 'image',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Image',
    //     sort: true,
    // },
    // {
    //     id: 'marital_status',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Marital Status',
    //     sort: true
    // },
    // {
    //     id: 'gender',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Gender',
    //     sort: true
    // },
    {
        id: 'passport_no',
        align: 'left',
        disablePadding: false,
        label: 'Passport No',
        sort: true
    },
    {
        id: 'passenger_id',
        align: 'left',
        disablePadding: false,
        label: 'Passenger ID',
        sort: true
    },
    {
        id: 'passenger_name',
        align: 'left',
        disablePadding: false,
        label: 'Passenger Name',
        sort: true
    },
    {
        id: 'date_of_birth',
        align: 'left',
        disablePadding: false,
        label: 'Date Of Birth',
        sort: true
    },

    {
        id: 'agent',
        align: 'left',
        disablePadding: false,
        label: 'Agent',
        sort: true
    },
    {
        id: 'demand',
        align: 'left',
        disablePadding: false,
        label: 'Demand',
        sort: true
    },
    {
        id: 'profession',
        align: 'left',
        disablePadding: false,
        label: 'Profession',
        sort: true
    },
    {
        id: 'agency',
        align: 'left',
        disablePadding: false,
        label: 'Agency',
        sort: true
    },
    {
        id: 'target_country',
        align: 'left',
        disablePadding: false,
        label: 'Target Country',
        sort: true
    },
    {
        id: 'current_status',
        align: 'left',
        disablePadding: false,
        label: 'Current Status',
        sort: true
    },
    //  {
    //         id: 'passenger_type',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Passenger Type',
    //         sort: true
    //     },
    //  {
    //         id: 'current_status',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Current Status',
    //         sort: true
    //     },
    //  {
    //         id: 'visa_entry',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Visa Entry',
    //         sort: true
    //     },
    //  {
    //         id: 'police_station',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Police Station',
    //         sort: true
    //     },
    //  {
    //         id: 'district',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'District',
    //         sort: true
    //     },

    //  {
    //         id: 'nid',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'NID',
    //         sort: true
    //     },
    //  {
    //         id: 'father_name',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Father Name',
    //         sort: true
    //     },
    //  {
    //         id: 'mother_name',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Mother Name',
    //         sort: true
    //     },
    //  {
    //         id: 'spouse_name',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Spouse Name',
    //         sort: true
    //     },
    //  {
    //         id: 'religion',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Religion',
    //         sort: true
    //     },
    //  
    //  {
    //         id: 'passport_type',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Passport Type',
    //         sort: true
    //     },
    //  {
    //         id: 'passport_issue_date',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Passport Issue Date',
    //         sort: true
    //     },
    //  {
    //         id: 'passport_expiry_date',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Passport Expiry Date',
    //         sort: true
    //     },
    //  {
    //         id: 'village',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Village',
    //         sort: true
    //     },
    //  {
    //         id: 'post_office',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Post Office',
    //         sort: true
    //     },
    //  {
    //         id: 'contact_no',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Contact No',
    //         sort: true
    //     },
    //  {
    //         id: 'emergency_contact_no',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Emergency Contact No',
    //         sort: true
    //     },
    //  {
    //         id: 'place_of_birth',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Place Of Birth',
    //         sort: true
    //     },
    //  {
    //         id: 'place_of_residence',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Place Of Residence',
    //         sort: true
    //     },
    //  {
    //         id: 'passport_issue_place',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Passport Issue Place',
    //         sort: true
    //     },
    //  {
    //         id: 'notes',
    //         align: 'left',
    //         disablePadding: false,
    //         label: 'Notes',
    //         sort: true
    //     },

    {
        id: 'action',
        align: 'center',
        disablePadding: false,
        label: 'Action',
        sort: true
    }
];

const PassengersTableHead = (props) => {
    const { selectedPassengerIds } = props;

    const numSelected = selectedPassengerIds.length;

    const [selectedPassengersMenu, setselectedPassengersMenu] = useState(null);

    const dispatch = useDispatch();

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openselectedPassengersMenu(event) {
        setselectedPassengersMenu(event.currentTarget);
    }

    function closeselectedPassengersMenu() {
        setselectedPassengersMenu(null);
    }

    return (
        <TableHead>
            <TableRow className="h-48 sm:h-64">
                <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
                    {(props.rowCount !== 0 && !_.isEmpty(selectedPassengerIds)) ?
                        (<div
                            className="pt-2"
                        >
                            <IconButton
                                className="p-0"
                                aria-owns={selectedPassengersMenu ? 'selectedPassengersMenu' : null}
                                aria-haspopup="true"
                                onClick={openselectedPassengersMenu}
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedPassengersMenu"
                                anchorEl={selectedPassengersMenu}
                                open={Boolean(selectedPassengersMenu)}
                                onClose={closeselectedPassengersMenu}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            dispatch(removePassengers(selectedPassengerIds)).then(res => {
                                                res.payload && dispatch(getPassengers(props.pagination))
                                            })
                                            props.onMenuItemClick();
                                            closeselectedPassengersMenu();
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
                        ) : null
                    }
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < props.rowCount}
                        checked={props.rowCount !== 0 && numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                    />
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

export default PassengersTableHead;