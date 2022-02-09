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
import { SEARCH_JOURNAL } from '../../../../../constant/constants';
import { getJournals, selectJournals } from '../store/journalsSlice';
import JournalsTableHead from './JournalsTableHead';

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

const JournalsTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const journals = useSelector(selectJournals);
	const searchText = useSelector(({ journalsManagement }) => journalsManagement.journals.searchText);
	const [searchJournal, setSearchJournal] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_journals_pages');
	const totalElements = sessionStorage.getItem('total_journals_elements');

	useEffect(() => {
		dispatch(getJournals(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText !== '' ? getSearchJournal() : setSearchJournal([]);
	}, [searchText]);

	const getSearchJournal = () => {
		fetch(`${SEARCH_JOURNAL}?invoice_no=${searchText}`)
			.then(response => response.json())
			.then(searchedJournalData => {
				setSearchJournal(searchedJournalData?.journals);
				console.log('searchedJournalData', searchedJournalData);
			})
			.catch(() => setSearchJournal([]));
	};

	function handleRequestSort(_e, property) {
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

	function handleSelectAllClick(journalEvent) {
		if (journalEvent.target.checked) {
			setSelected((!_.isEmpty(searchJournal) ? searchJournal : journals).map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateJournal(item) {
		localStorage.removeItem('journalEvent');
		props.history.push(`/apps/journal-management/journals/${item.id}/${item.invoice_no}`);
	}
	function handleDeleteJournal(item, journalEvent) {
		localStorage.removeItem('journalEvent');
		localStorage.setItem('journalEvent', journalEvent);
		props.history.push(`/apps/journal-management/journals/${item.id}/${item.invoice_no}`);
	}

	function handleCheck(_e, id) {
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
	const handlePagination = (_e, handlePage) => {
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1);
		dispatch(getJournals({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(_e, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getJournals({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(journalEvent) {
		setRowsPerPage(journalEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: journalEvent.target.value });
		dispatch(getJournals({ ...pageAndSize, size: journalEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (journals?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no journal!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<JournalsTableHead
						selectedJournalIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={(!_.isEmpty(searchJournal) ? searchJournal : journals).length}
						onMenuItemClick={handleDeselect}
						pagination={pageAndSize}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchJournal) ? searchJournal : journals,
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
											onClick={journalEvent => journalEvent.stopPropagation()}
											onChange={journalEvent => handleCheck(journalEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.branch?.name}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.invoice_no}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.ledger?.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.sub_ledger?.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.details}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div className="flex flex-nowrap">
											<EditIcon
												onClick={() => handleUpdateJournal(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={() => handleDeleteJournal(n, 'Delete')}
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

export default withRouter(JournalsTable);
