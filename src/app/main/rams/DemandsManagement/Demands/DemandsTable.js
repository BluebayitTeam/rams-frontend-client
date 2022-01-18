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
import { rowsPerPageOptions } from 'app/@data/data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BASE_URL, SEARCH_DEMAND } from '../../../../constant/constants';
import { getDemands, selectDemands } from '../store/demandsSlice';
import DemandsTableHead from './DemandsTableHead';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap'
	},
	toolbar: {
		'& > div': {
			minHeight: 'fit-content'
		}
	}
}));

const DemandsTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const demands = useSelector(selectDemands);
	const searchText = useSelector(({ demandsManagement }) => demandsManagement.demands.searchText);
	const [searchDemand, setSearchDemand] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_demands_pages');
	const totalElements = sessionStorage.getItem('total_demands_elements');

	useEffect(() => {
		dispatch(getDemands(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText ? getSearchDemand() : setSearchDemand([]);
	}, [searchText]);

	const getSearchDemand = () => {
		fetch(`${SEARCH_DEMAND}?company_name=${searchText}`)
			.then(response => response.json())
			.then(searchedDemandData => {
				setSearchDemand(searchedDemandData?.demands);
				console.log('searchedDemandData', searchedDemandData);
			})
			.catch(() => setSearchDemand([]));
	};

	function handleRequestSort(demandEvent, property) {
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

	function handleSelectAllClick(demandEvent) {
		if (demandEvent.target.checked) {
			setSelected(demands.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateDemand(item) {
		localStorage.removeItem('demandEvent');
		props.history.push(`/apps/demand-management/demands/${item.id}/${item.profession}`);
	}
	function handleDeleteDemand(item, demandEvent) {
		localStorage.removeItem('demandEvent');
		localStorage.setItem('demandEvent', demandEvent);
		props.history.push(`/apps/demand-management/demands/${item.id}/${item.profession}`);
	}

	function handleCheck(demandEvent, id) {
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
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1);
		dispatch(getDemands({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getDemands({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(demandEvent) {
		setRowsPerPage(demandEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: demandEvent.target.value });
		dispatch(getDemands({ ...pageAndSize, size: demandEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (demands?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no demand!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<DemandsTableHead
						selectedDemandIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={demands.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchDemand) ? searchDemand : demands,
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
											onClick={demandEvent => demandEvent.stopPropagation()}
											onChange={demandEvent => handleCheck(demandEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell
										className="w-52 px-4 md:px-0 h-72"
										component="th"
										scope="row"
										padding="none"
									>
										{n.length > 0 && n.featuredImageId ? (
											<img
												className="h-full block rounded p-8"
												style={{ borderRadius: '15px' }}
												src={_.find(n.image, { id: n.featuredImageId }).url}
												alt={n.name}
											/>
										) : (
											<img
												className="h-full block rounded p-8"
												style={{ borderRadius: '15px' }}
												src={`${BASE_URL}${n.image}`}
												alt={n.name}
											/>
										)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.profession?.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.country?.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.visa_agent?.username}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.company_name}
									</TableCell>
									{/* 
                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.quantity}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.salary}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.purchase_rate}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.purchase_foreign_corrency}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.office_rate}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.status}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.notes}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={demandEvent => handleUpdateDemand(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteDemand(n, 'Delete')}
												className="cursor-pointer"
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
					rowsPerPageOptions={rowsPerPageOptions}
					component="div"
					count={totalElements}
					rowsPerPage={rowsPerPage}
					page={page}
					className={classes.toolbar}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
						className: 'py-0'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
						className: 'py-0'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
};

export default withRouter(DemandsTable);
