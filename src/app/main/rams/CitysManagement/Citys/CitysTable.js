import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_CITY } from '../../../../constant/constants';
import { getCitys, selectCitys } from '../store/citysSlice';
import CitysTableHead from './CitysTableHead';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3),
        }
    }
}));


const CitysTable = (props) => {
    const dispatch = useDispatch();
    const citys = useSelector(selectCitys);
    const searchText = useSelector(({ citysManagement }) => citysManagement.citys.searchText);
    const [searchCity, setSearchCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(citys);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });
    let serialNumber = 1;

    const [parameter, setParameter] = useState({ page: 1, size: 30 })
    const totalPages = sessionStorage.getItem("cities_total_pages")
    const totalElements = sessionStorage.getItem("cities_total_elements")
    const classes = useStyles();


    useEffect(() => {
        dispatch(getCitys(parameter)).then(() => setLoading(false));
    }, [dispatch]);

    //search city
    useEffect(() => {
        searchText !== "" && getSearchCity();
    }, [searchText])

    const getSearchCity = () => {
        fetch(`${SEARCH_CITY}?name=${searchText}`)
            .then(response => response.json())
            .then(searchedCitiesData => {
                setSearchCity(searchedCitiesData.cities);
                // console.log(searchedCitiesData)
            });
    }

    function handleRequestSort(cityEvent, property) {
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

    function handleSelectAllClick(cityEvent) {
        if (cityEvent.target.checked) {
            setSelected(citys.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleUpdateCity(item) {
        localStorage.removeItem('cityEvent')
        props.history.push(`/apps/city-management/cities/${item.id}/${item.name}`);
    }
    function handleDeleteCity(item, cityEvent) {
        localStorage.removeItem('cityEvent')
        localStorage.setItem('cityEvent', cityEvent);
        props.history.push(`/apps/city-management/cities/${item.id}/${item.name}`);
    }

    function handleCheck(cityEvent, id) {
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


    const handlePagination = (e, handlePage) => {
        setParameter({ ...parameter, page: handlePage })
        setPage(handlePage - 1)
        dispatch(getCitys({ ...parameter, page: handlePage }))
    }

    function handleChangePage(cityEvent, value) {
        setPage(value);
        setParameter({ ...parameter, page: value + 1 })
        dispatch(getCitys({ ...parameter, page: value - 1 }))
    }

    function handleChangeRowsPerPage(cityEvent) {
        setRowsPerPage(cityEvent.target.value);
        setParameter({ ...parameter, size: cityEvent.target.value })
        dispatch(getCitys({ ...parameter, size: cityEvent.target.value }))
    }

    if (loading) {
        return <FuseLoading />;
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <CitysTableHead
                        selectedCityIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={citys.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {_.orderBy(
                            searchText !== "" && searchCity ? searchCity : citys,
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
                                                onClick={cityEvent => cityEvent.stopPropagation()}
                                                onChange={cityEvent => handleCheck(cityEvent, n.id)}
                                            />
                                        </TableCell>

                                        <TableCell className="w-40 md:w-64" component="th" scope="row">
                                            {parameter.page * parameter.size - parameter.size + serialNumber++}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.name}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.country}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
                                            <div>
                                                <EditIcon onClick={cityEvent => handleUpdateCity(n)} className="h-72 cursor-pointer" style={{ color: 'green' }} /> <DeleteIcon onClick={event => handleDeleteCity(n, "Delete")} className="h-72 cursor-pointer" style={{ color: 'red' }} />
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <div className={classes.root}>
                <Pagination
                    count={totalPages}
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
                    rowsPerPageOptions={[30, 50, 100]}
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

export default withRouter(CitysTable);