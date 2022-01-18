import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
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
        id: 'branch',
        align: 'left',
        disablePadding: false,
        label: 'Branch',
        sort: true
    },
    {
        id: 'employeeid',
        align: 'left',
        disablePadding: false,
        label: 'Employee Id',
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
        id: 'Mobile',
        align: 'left',
        disablePadding: false,
        label: 'mobile',
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
const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

const EmployeesTableHead = (props) => {
    const { selectedEmployeeIds } = props;
    //console.log(selectedEmployeeIds);
    const numSelected = selectedEmployeeIds?.length;


    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="h-48 sm:h-64">
                <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
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
            </TableRow >
        </TableHead >
    );
};

export default EmployeesTableHead;