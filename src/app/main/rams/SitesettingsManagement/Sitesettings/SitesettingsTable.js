import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { makeStyles, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSitesettings, selectSitesettings } from '../store/sitesettingsSlice';
import SitesettingsTableHead from './SitesettingsTableHead';

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

const SitesettingsTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const sitesettings = useSelector(selectSitesettings);
	const searchText = useSelector(({ sitesettingsManagement }) => sitesettingsManagement.sitesettings.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(sitesettings);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	let serialNumber = 1;
	useEffect(() => {
		dispatch(getSitesettings()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(sitesettings, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(sitesettings);
		}
	}, [sitesettings, searchText]);

	function handleRequestSort(sitesettingEvent, property) {
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

	function handleSelectAllClick(sitesettingEvent) {
		if (sitesettingEvent.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateSitesetting(item, event) {
		localStorage.removeItem('deleteSitesettingEvent');
		localStorage.setItem('updateSitesettingEvent', event);
		props.history.push(`/apps/sitesettings-management/sitesetting/${item.id}`);
	}
	function handleDeleteSitesetting(item, sitesettingEvent) {
		localStorage.removeItem('updateSitesettingEvent');
		localStorage.setItem('deleteSitesettingEvent', sitesettingEvent);
		props.history.push(`/apps/sitesettings-management/sitesetting/${item.id}`);
	}

	function handleCheck(sitesettingEvent, id) {
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

	function handleChangePage(sitesettingEvent, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(sitesettingEvent) {
		setRowsPerPage(sitesettingEvent.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no site setting!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<SitesettingsTableHead
						selectedSitesettingIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
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
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
												onClick={sitesettingEvent => sitesettingEvent.stopPropagation()}
												onChange={sitesettingEvent => handleCheck(sitesettingEvent, n.id)}
											/>
										</TableCell>

										<TableCell className="w-40 md:w-64" component="th" scope="row">
											{serialNumber++}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.site_name}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.email}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.phone}
										</TableCell>

										<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
											<div>
												<EditIcon
													onClick={sitesettingEvent =>
														handleUpdateSitesetting(n, 'updateSitesettingEvent')
													}
													className="cursor-pointer"
													style={{ color: 'green' }}
												/>{' '}
												<DeleteIcon
													onClick={event =>
														handleDeleteSitesetting(n, 'deleteSitesettingEvent')
													}
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

			<TablePagination
				className="flex-shrink-0 border-t-1"
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.length}
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
	);
};

export default withRouter(SitesettingsTable);
