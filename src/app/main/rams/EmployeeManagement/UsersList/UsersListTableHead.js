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
        disablePadding: false,
        label: 'Sl_No',
        sort: true
    },
    {
        id: 'image',
        align: 'left',
        disablePadding: false,
        label: 'Image',
        sort: true
    },
    {
        id: 'username',
        align: 'left',
        disablePadding: false,
        label: 'Username',
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
        id: 'mobile',
        align: 'left',
        disablePadding: false,
        label: 'Mobile',
        sort: true
    },
    {
        id: 'action',
        align: 'left',
        disablePadding: false,
        label: 'Action',
        sort: true
    }
];

const UsersListTableHead = (props) => {

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="h-48 sm:h-64">
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
            </TableRow >
        </TableHead >
    );
};

export default UsersListTableHead;