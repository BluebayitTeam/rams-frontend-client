import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import { rowsPerPageOptions } from 'app/@data/data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BASE_URL, SEARCH_EMPLOYEE } from '../../../../constant/constants';
import { getEmployees, selectEmployees } from '../store/employeesSlice';
import EmployeesTableHead from './EmployeesTableHead';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        '& > *': {
            marginTop: theme.spacing(1),
            // marginBottom: theme.spacing(3),
        }
    }
}))

const EmployeesTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const employees = useSelector(selectEmployees);
    console.log("Employees data", employees);
    const searchText = useSelector(({ employeesManagement }) => employeesManagement.employees.searchText);
    const [searchEmployee, setSearchEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

    const totalPages = sessionStorage.getItem('total_employees_pages');
    const totalElements = sessionStorage.getItem('total_employees_elements');

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });
    let serialNumber = 1;
    useEffect(() => {
        dispatch(getEmployees(pageAndSize)).then(() => setLoading(false));
    }, [dispatch]);

    //searchEmployee
    useEffect(() => {
        searchText ? getSearchEmployee() : setSearchEmployee([]);
    }, [searchText])

    const getSearchEmployee = () => {
        console.log(`${SEARCH_EMPLOYEE}?username=${searchText}`);
        fetch(`${SEARCH_EMPLOYEE}?username=${searchText}`)
            .then(response => response.json())
            .then(searchedEmployeedData => {
                setSearchEmployee(searchedEmployeedData.employees);
                console.log("searchedEmployeedData", searchedEmployeedData)
            }).catch(() => {
                setSearchEmployee([])
            })
    }

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(employees.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    //pagination
    const handlePagination = (e, handlePage) => {
        setPageAndSize({ ...pageAndSize, page: handlePage })
        setPage(handlePage - 1)
        dispatch(getEmployees({ ...pageAndSize, page: handlePage }))
    }

    function handleChangePage(event, value) {
        setPage(value);
        setPageAndSize({ ...pageAndSize, page: value + 1 })
        dispatch(getEmployees({ ...pageAndSize, page: value + 1 }))
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
        setPageAndSize({ ...pageAndSize, size: event.target.value })
        dispatch(getEmployees({ ...pageAndSize, size: event.target.value }))
    }

    function handleUpdateEmployee(item, event) {
        localStorage.removeItem('deleteEmployee');
        console.log("clicked");
        localStorage.setItem('updateEmployee', event);
        props.history.push(`/apps/employee-management/${item.id}/${item.first_name}`);
    }
    function handleDeleteEmployee(item, event) {
        localStorage.removeItem('updateEmployee');
        localStorage.setItem('deleteEmployee', event);
        props.history.push(`/apps/employee-management/${item.id}/${item.first_name}`);
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }


    if (loading) {
        return <FuseLoading />;
    }
    //console.log("token", localStorage.getItem('jwt_access_token'));
    if (employees.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no employee!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <EmployeesTableHead
                        selectedProductIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={employees.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {_.orderBy(
                            searchText !== "" && !_.isEmpty(searchEmployee) ? searchEmployee : employees,
                            [
                                o => {
                                    switch (order.id) {
                                        case 'categories': {
                                            return o.categories[0];
                                        }
                                        default: {
                                            return o[order.id];
                                        }
                                    }
                                }
                            ],
                            [order.direction]
                        ).map(n => {
                            const isSelected = selected.indexOf(n.id) !== -1;
                            return (
                                <TableRow
                                    className="h-72 cursor-pointer"
                                    hover
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={n.id}
                                    selected={isSelected}

                                >
                                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                                        <Checkbox
                                            checked={isSelected}
                                            onClick={event => event.stopPropagation()}
                                            onChange={event => handleCheck(event, n.id)}
                                        />
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {((pageAndSize.page * pageAndSize.size) - pageAndSize.size) + serialNumber++}
                                    </TableCell>

                                    <TableCell
                                        className="w-52 px-4 md:px-0 h-72"
                                        component="th"
                                        scope="row"
                                        padding="none"
                                    >
                                        {n.image && n.featuredImageId ? (
                                            <img
                                                className="h-full block rounded p-8"
                                                src={_.find(n.image, { id: n.featuredImageId }).url}
                                                alt={n.name}
                                            />
                                        ) : (
                                            <img
                                                className="h-full block rounded p-8"
                                                style={{ borderRadius: '15px' }}
                                                src={`${BASE_URL}${n.image}`}
                                                alt={n.first_name}
                                            />
                                        )}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {n.branch}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {n.emp_id_no}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {n.username}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                                        {n.primary_phone}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        <div>
                                            <EditIcon
                                                onClick={event => handleUpdateEmployee(n, "updateEmployee")} className="cursor-pointer"
                                                style={{ color: 'green' }}
                                            />
                                            <DeleteIcon
                                                onClick={event => handleDeleteEmployee(n, "deleteEmployee")} className="cursor-pointer"
                                                style={{ color: 'red' }}
                                            />
                                        </div>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <div className={classes.root} id="pagiContainer">
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    defaultPage={1}
                    color="primary"
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePagination}
                />

                <TablePagination
                    // className="flex-shrink-0 border-t-1"
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};

export default withRouter(EmployeesTable);