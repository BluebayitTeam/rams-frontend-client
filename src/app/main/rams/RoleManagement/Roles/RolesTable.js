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
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_ROLE } from '../../../../constant/constants';
import { getRoles, selectRoles } from '../store/rolesSlice';
import RolesTableHead from './RolesTableHead';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        '& > *': {
            marginTop: theme.spacing(1),
            // marginBottom: theme.spacing(3),
        }
    }
}))

const RolesTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const roles = useSelector(selectRoles);

    const searchText = useSelector(({ rolesManagement }) => rolesManagement.roles.searchText);
    const [searchRole, setSearchRole] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 5 });

    const totalPages = sessionStorage.getItem('total_roles_pages');
    const totalElements = sessionStorage.getItem('total_roles_elements');

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });
    let serialNumber = 1;
    const [deleteItem, setDeleteItem] = useState('');
    useEffect(() => {
        dispatch(getRoles(pageAndSize)).then(() => setLoading(false));
    }, [dispatch]);

    //search role
    useEffect(() => {
        searchText !== "" && getSearchRole();
    }, [searchText])

    const getSearchRole = () => {
        fetch(`${SEARCH_ROLE}?name=${searchText}`)
            .then(response => response.json())
            .then(searchedRoleData => {
                setSearchRole(searchedRoleData.roles);
                // console.log(searchedRoleData);
            });
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
            setSelected(roles.map(n => n.id));
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
        dispatch(getRoles({ ...pageAndSize, page: handlePage }))
    }

    function handleChangePage(event, value) {
        setPage(value);
        setPageAndSize({ ...pageAndSize, page: value + 1 })
        dispatch(getRoles({ ...pageAndSize, page: value + 1 }))
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
        setPageAndSize({ ...pageAndSize, size: event.target.value })
        dispatch(getRoles({ ...pageAndSize, size: event.target.value }))
    }

    function handleUpdateRole(item, event) {
        localStorage.removeItem('deleteRole');
        console.log("clicked");
        localStorage.setItem('updateRole', event);
        props.history.push(`/apps/roles-management/${item.id}/${item.first_name}`);
    }
    function handleDeleteRole(item, event) {
        localStorage.removeItem('updateRole');
        localStorage.setItem('deleteRole', event);
        props.history.push(`/apps/roles-management/${item.id}/${item.first_name}`);
        // dispatch(removeEmployee(item));
        // window.location.reload();
        //props.history.push(`/apps/employee-management/employees/${item.id}/${item.first_name}`);
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

    if (roles?.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no role!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <RolesTableHead
                        selectedEmployeeIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={roles.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {_.orderBy(
                            searchText !== "" && searchRole ? searchRole : roles,
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
                        )
                            .map(n => {
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

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.name}
                                        </TableCell>

                                        {/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.permissions}
                                        </TableCell> */}

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            <div>
                                                <EditIcon onClick={event => handleUpdateRole(n, "updateRole")} className="cursor-pointer" style={{ color: 'green' }} /> <DeleteIcon onClick={event => handleDeleteRole(n, "deleteRole")} className="cursor-pointer" style={{ color: 'red' }} />
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
                    className="flex-shrink-0 border-t-1"
                    rowsPerPageOptions={[5, 10, 30, 50, 100]}
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

export default withRouter(RolesTable);