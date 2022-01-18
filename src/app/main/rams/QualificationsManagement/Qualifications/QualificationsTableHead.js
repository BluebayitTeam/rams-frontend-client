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
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Name',
        sort: true
    },
    {
        id: 'degree_name',
        align: 'left',
        disablePadding: false,
        label: 'Degree Name',
        sort: true
    },
    {
        id: 'passign_year',
        align: 'left',
        disablePadding: false,
        label: 'Passign Year',
        sort: true
    },
    {
        id: 'board',
        align: 'left',
        disablePadding: false,
        label: 'Board',
        sort: true
    },
    {
        id: 'institute_name',
        align: 'left',
        disablePadding: false,
        label: 'Institute Name',
        sort: true
    },
    {
        id: 'grade',
        align: 'left',
        disablePadding: false,
        label: 'Grade',
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

const QualificationsTableHead = (props) => {
    const { selectedQualificationIds } = props;

    const numSelected = selectedQualificationIds.length;

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

export default QualificationsTableHead;