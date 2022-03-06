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
import { SEARCH_VISAENTRY } from '../../../../constant/constants';
import { getVisaEntrys, selectVisaEntrys } from '../store/visaEntrysSlice';
import VisaEntrysTableHead from './VisaEntrysTableHead';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		overflow: 'auto',
		minHeight: '35px'
	},
	toolbar: {
		'& > div': {
			minHeight: 'fit-content'
		}
	}
}));
const VisaEntrysTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const visaEntrys = useSelector(selectVisaEntrys);
	const searchText = useSelector(({ visaEntrysManagement }) => visaEntrysManagement.visaEntrys.searchText);
	const [searchVisaEntry, setSearchVisaEntry] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_visaEntrys_pages');
	const totalElements = sessionStorage.getItem('total_visaEntrys_elements');

	useEffect(() => {
		dispatch(getVisaEntrys(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText ? getSearchVisaEntry() : setSearchVisaEntry([]);
	}, [searchText]);

	const getSearchVisaEntry = () => {
		fetch(`${SEARCH_VISAENTRY}?visa_number=${searchText}`)
			.then(response => response.json())
			.then(searchedVisaEntryData => {
				setSearchVisaEntry(searchedVisaEntryData?.visa_entries);
				console.log('searchedVisaEntryData', searchedVisaEntryData);
			})
			.catch(() => setSearchVisaEntry([]));
	};

	function handleRequestSort(visaEntryEvent, property) {
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

	function handleSelectAllClick(visaEntryEvent) {
		if (visaEntryEvent.target.checked) {
			setSelected(visaEntrys.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateVisaEntry(item) {
		localStorage.removeItem('visaEntryEvent');
		props.history.push(`/apps/visaEntry-management/visaEntrys/${item.id}/${item.visa_number}`);
	}
	function handleDeleteVisaEntry(item, visaEntryEvent) {
		localStorage.removeItem('visaEntryEvent');
		localStorage.setItem('visaEntryEvent', visaEntryEvent);
		props.history.push(`/apps/visaEntry-management/visaEntrys/${item.id}/${item.visa_number}`);
	}

	function handleCheck(visaEntryEvent, id) {
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
		dispatch(getVisaEntrys({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getVisaEntrys({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(visaEntryEvent) {
		setRowsPerPage(visaEntryEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: visaEntryEvent.target.value });
		dispatch(getVisaEntrys({ ...pageAndSize, size: visaEntryEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (visaEntrys?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no visaEntry!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<VisaEntrysTableHead
						selectedVisaEntryIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={visaEntrys.length}
						onMenuItemClick={handleDeselect}
						pagination={pageAndSize}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchVisaEntry) ? searchVisaEntry : visaEntrys,
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
											onClick={visaEntryEvent => visaEntryEvent.stopPropagation()}
											onChange={visaEntryEvent => handleCheck(visaEntryEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.demand}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.visa_agent?.username}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.country?.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{`${n?.first_name || ''} ${n?.last_name || ''}`}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.visa_issue_date}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.profession_english}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.profession_arabic}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.group_no}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.quantity}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.sponsor_id_no}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.sponsor_dob}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.sponsor_name_arabic}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.sponsor_mobile}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.sponsor_address}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.notes}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={visaEntryEvent => handleUpdateVisaEntry(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteVisaEntry(n, 'Delete')}
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
					classes={{ ul: 'flex-nowrap' }}
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
					classes={{ root: 'overflow-visible' }}
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

export default withRouter(VisaEntrysTable);
