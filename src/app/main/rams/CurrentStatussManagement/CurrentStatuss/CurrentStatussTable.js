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
import { Pagination } from '@material-ui/lab';
import { rowsPerPageOptions } from 'app/@data/@data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_CURRENTSTATUS } from '../../../../constant/constants';
import { getCurrentStatuss, selectCurrentStatuss } from '../store/currentStatussSlice';
import CurrentStatussTableHead from './CurrentStatussTableHead';


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

const CurrentStatussTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentStatuss = useSelector(selectCurrentStatuss);
    const searchText = useSelector(({ currentStatussManagement }) => currentStatussManagement.currentStatuss.searchText);
    const [searchCurrentStatus, setSearchCurrentStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    let serialNumber = 1;
    const totalPages = sessionStorage.getItem('total_currentStatuss_pages');
    const totalElements = sessionStorage.getItem('total_currentStatuss_elements');

    useEffect(() => {
        dispatch(getCurrentStatuss(pageAndSize)).then(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        searchText ? getSearchCurrentStatus() : setSearchCurrentStatus([]);
    }, [searchText])

    const getSearchCurrentStatus = () => {
        fetch(`${SEARCH_CURRENTSTATUS}?name=${searchText}`)
            .then(response => response.json())
            .then(searchedCurrentStatusData => {
                console.log("search", searchedCurrentStatusData)
                setSearchCurrentStatus(searchedCurrentStatusData?.current_statuses);
            })
            .catch(() => setSearchCurrentStatus([]))
    }

    function handleRequestSort(currentStatusEvent, property) {
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

    function handleSelectAllClick(currentStatusEvent) {
        if (currentStatusEvent.target.checked) {
            setSelected(currentStatuss.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleUpdateCurrentStatus(item) {
        localStorage.removeItem('currentStatusEvent')
        props.history.push(`/apps/currentStatus-management/currentStatuss/${item.id}/${item.name}`);
    }
    function handleDeleteCurrentStatus(item, currentStatusEvent) {
        localStorage.removeItem('currentStatusEvent')
        localStorage.setItem('currentStatusEvent', currentStatusEvent);
        props.history.push(`/apps/currentStatus-management/currentStatuss/${item.id}/${item.name}`);
    }

    function handleCheck(currentStatusEvent, id) {
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

    //pagination
    const handlePagination = (e, handlePage) => {
        setPageAndSize({ ...pageAndSize, page: handlePage })
        setPage(handlePage - 1)
        dispatch(getCurrentStatuss({ ...pageAndSize, page: handlePage }))
    }

    function handleChangePage(event, value) {
        setPage(value);
        setPageAndSize({ ...pageAndSize, page: value + 1 })
        dispatch(getCurrentStatuss({ ...pageAndSize, page: value + 1 }))
    }

    function handleChangeRowsPerPage(currentStatusEvent) {
        setRowsPerPage(currentStatusEvent.target.value);
        setPageAndSize({ ...pageAndSize, size: currentStatusEvent.target.value })
        dispatch(getCurrentStatuss({ ...pageAndSize, size: currentStatusEvent.target.value }))
    }


    if (loading) {
        return <FuseLoading />;
    }

    if (currentStatuss?.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no currentStatus!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <CurrentStatussTableHead
                        selectedCurrentStatusIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={currentStatuss.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {_.orderBy(
                            searchText !== "" && !_.isEmpty(searchCurrentStatus) ? searchCurrentStatus : currentStatuss,
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
                                                onClick={currentStatusEvent => currentStatusEvent.stopPropagation()}
                                                onChange={currentStatusEvent => handleCheck(currentStatusEvent, n.id)}
                                            />
                                        </TableCell>

                                        <TableCell className="w-40 md:w-64" component="th" scope="row">
                                            {((pageAndSize.page * pageAndSize.size) - pageAndSize.size) + serialNumber++}
                                        </TableCell>






                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.name}
                                        </TableCell>



                                        <TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
                                            <div>
                                                <EditIcon onClick={currentStatusEvent => handleUpdateCurrentStatus(n)} className="cursor-pointer" style={{ color: 'green' }} /> <DeleteIcon onClick={event => handleDeleteCurrentStatus(n, "Delete")} className="cursor-pointer" style={{ color: 'red' }} />
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

export default withRouter(CurrentStatussTable);