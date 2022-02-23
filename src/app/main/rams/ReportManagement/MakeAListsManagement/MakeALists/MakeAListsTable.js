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
import { ViewDay, ViewWeek, Visibility } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import { rowsPerPageOptions } from 'app/@data/data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_MAKEALIST } from '../../../../../constant/constants';
import { getMakeALists, selectMakeALists } from '../store/makeAListsSlice';
import MakeAListsTableHead from './MakeAListsTableHead';

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

const MakeAListsTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const makeALists = useSelector(selectMakeALists);
	const searchText = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeALists.searchText);
	const [searchMakeAList, setSearchMakeAList] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_makeALists_pages');
	const totalElements = sessionStorage.getItem('total_makeALists_elements');

	useEffect(() => {
		dispatch(getMakeALists(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText !== '' ? getSearchMakeAList() : setSearchMakeAList([]);
	}, [searchText]);

	const getSearchMakeAList = () => {
		fetch(`${SEARCH_MAKEALIST}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedMakeAListData => {
				setSearchMakeAList(searchedMakeAListData?.makeALists);
				console.log('searchedMakeAListData', searchedMakeAListData);
			})
			.catch(() => setSearchMakeAList([]));
	};

	function handleRequestSort(makeAListEvent, property) {
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

	function handleSelectAllClick(makeAListEvent) {
		if (makeAListEvent.target.checked) {
			setSelected((!_.isEmpty(searchMakeAList) ? searchMakeAList : makeALists).map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleMakeAListColumn(item) {
		localStorage.removeItem('makeAListEvent');
		props.history.push(`/apps/makeAList-management/columns/${item.id}/${item.title}`);
	}
	function handleMakeAListRow(item) {
		localStorage.removeItem('makeAListEvent');
		props.history.push(`/apps/makeAList-management/rows/${item.id}/${item.title}`);
	}
	function handleMakeAListReport(item) {
		localStorage.removeItem('makeAListEvent');
		props.history.push(`/apps/makeAList-management/report/${item.id}/${item.title}`);
	}
	function handleUpdateMakeAList(item) {
		localStorage.removeItem('makeAListEvent');
		props.history.push(`/apps/makeAList-management/makeALists/${item.id}/${item.title}`);
	}
	function handleDeleteMakeAList(item, makeAListEvent) {
		localStorage.removeItem('makeAListEvent');
		localStorage.setItem('makeAListEvent', makeAListEvent);
		props.history.push(`/apps/makeAList-management/makeALists/${item.id}/${item.title}`);
	}

	function handleCheck(makeAListEvent, id) {
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
		dispatch(getMakeALists({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getMakeALists({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(makeAListEvent) {
		setRowsPerPage(makeAListEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: makeAListEvent.target.value });
		dispatch(getMakeALists({ ...pageAndSize, size: makeAListEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (makeALists?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no makeAList!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<MakeAListsTableHead
						selectedMakeAListIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={(!_.isEmpty(searchMakeAList) ? searchMakeAList : makeALists).length}
						onMenuItemClick={handleDeselect}
						pagination={pageAndSize}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchMakeAList) ? searchMakeAList : makeALists,
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
											onClick={makeAListEvent => makeAListEvent.stopPropagation()}
											onChange={makeAListEvent => handleCheck(makeAListEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.title}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.make_date}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.note}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<ViewWeek
												onClick={() => handleMakeAListColumn(n)}
												className="cursor-pointer"
												style={{ color: 'orange' }}
											/>{' '}
											<ViewDay
												onClick={() => handleMakeAListRow(n)}
												className="cursor-pointer"
												style={{ color: 'yellow' }}
											/>{' '}
											<Visibility
												onClick={() => handleMakeAListReport(n)}
												className="cursor-pointer"
												style={{ color: 'blue' }}
											/>{' '}
											<EditIcon
												onClick={() => handleUpdateMakeAList(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={() => handleDeleteMakeAList(n, 'Delete')}
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

			<div className={classes.root}>
				<Pagination
					classes={{ ul: 'flex-nowrap' }}
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

export default withRouter(MakeAListsTable);
