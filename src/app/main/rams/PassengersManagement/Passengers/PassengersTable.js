import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import { rowsPerPageOptions } from 'app/@data/@data';
import { differenceInYears } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { SEARCH_PASSENGER } from '../../../../constant/constants';
import { getPassengers, selectPassengers } from '../store/passengersSlice';
import PassengersTableHead from './PassengersTableHead';

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

const PassengersTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    let passengers = useSelector(selectPassengers);
    const searchText = useSelector(({ passengersManagement }) => passengersManagement.passengers.searchText);
    const [searchPassenger, setSearchPassenger] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

    const routeParams = useParams();

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    let serialNumber = 1;
    const totalPages = sessionStorage.getItem('total_passengers_pages');
    const totalElements = sessionStorage.getItem('total_passengers_elements');

    useEffect(() => {
        passengers = []
        dispatch(getPassengers({ ...pageAndSize, passengerType: routeParams.passengerType })).then(() => setLoading(false));
    }, [routeParams.passengerType]);

    useEffect(() => {
        searchText ? getSearchPassenger() : setSearchPassenger([])
    }, [searchText])

    const getSearchPassenger = () => {
        fetch(`${SEARCH_PASSENGER}?keyword=${searchText}`)
            .then(response => response.json())
            .then(searchedPassengerData => {
                setSearchPassenger(searchedPassengerData?.passengers);
                console.log("searchedPassengerData", searchedPassengerData)
            })
            .catch(() => setSearchPassenger([]))
    }

    function handleRequestSort(passengerEvent, property) {
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

    function handleSelectAllClick(passengerEvent) {
        if (passengerEvent.target.checked) {
            setSelected(_.isEmpty(searchPassenger) ? passengers.map(n => n.id) : searchPassenger.map(n => n.id));
            return;
        }
        setSelected([]);
    }


    function handleDeselect() {
        setSelected([]);
    }

    function handleUpdatePassenger(item) {
        localStorage.removeItem('passengerEvent')
        props.history.push(`/apps/passenger-management/passenger/${item.id}/${item.passenger_id}/${routeParams.passengerType}`);
    }
    function handleDeletePassenger(item, passengerEvent) {
        localStorage.removeItem('passengerEvent')
        localStorage.setItem('passengerEvent', passengerEvent);
        props.history.push(`/apps/passenger-management/passenger/${item.id}/${item.passenger_id}/${routeParams.passengerType}`);
    }


    //pagination
    const handlePagination = (e, handlePage) => {
        setPageAndSize({ ...pageAndSize, page: handlePage })
        setPage(handlePage - 1)
        dispatch(getPassengers({ ...pageAndSize, page: handlePage, passengerType: routeParams.passengerType }))
    }

    function handleChangePage(event, value) {
        setPage(value);
        setPageAndSize({ ...pageAndSize, page: value + 1 })
        dispatch(getPassengers({ ...pageAndSize, page: value + 1, passengerType: routeParams.passengerType }))
    }

    function handleChangeRowsPerPage(passengerEvent) {
        setRowsPerPage(passengerEvent.target.value);
        setPageAndSize({ ...pageAndSize, size: passengerEvent.target.value })
        dispatch(getPassengers({ ...pageAndSize, size: passengerEvent.target.value, passengerType: routeParams.passengerType }))
    }


    if (loading) {
        return <FuseLoading />;
    }

    if (passengers?.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no passenger!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <PassengersTableHead
                        selectedPassengerIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={passengers.length}
                        onMenuItemClick={handleDeselect}
                        pagination={pageAndSize}
                    />

                    <TableBody>
                        {_.orderBy(
                            searchText !== "" && !_.isEmpty(searchPassenger) ? searchPassenger : passengers,
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

                                        <TableCell className="w-40 md:w-64" component="th" scope="row">
                                            {((pageAndSize.page * pageAndSize.size) - pageAndSize.size) + serialNumber++}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.passenger_name}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.passport_no}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.agent}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.profession}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.date_of_birth ? differenceInYears(new Date(), new Date(n.date_of_birth)) : ""}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.target_country}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.visa_entry}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.current_status}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
                                            <div>
                                                <EditIcon onClick={passengerEvent => handleUpdatePassenger(n)} className="cursor-pointer" style={{ color: 'green' }} /> <DeleteIcon onClick={event => handleDeletePassenger(n, "Delete")} className="cursor-pointer" style={{ color: 'red' }} />
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

export default withRouter(PassengersTable);