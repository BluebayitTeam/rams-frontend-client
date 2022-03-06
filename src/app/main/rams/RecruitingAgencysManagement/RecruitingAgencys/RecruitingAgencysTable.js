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
import { SEARCH_RECRUITINGAGENCY } from '../../../../constant/constants';
import { getRecruitingAgencys, selectRecruitingAgencys } from '../store/recruitingAgencysSlice';
import RecruitingAgencysTableHead from './RecruitingAgencysTableHead';

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

const RecruitingAgencysTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const recruitingAgencys = useSelector(selectRecruitingAgencys);
	const searchText = useSelector(
		({ recruitingAgencysManagement }) => recruitingAgencysManagement.recruitingAgencys.searchText
	);
	const [searchRecruitingAgency, setSearchRecruitingAgency] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_recruitingAgencys_pages');
	const totalElements = sessionStorage.getItem('total_recruitingAgencys_elements');

	useEffect(() => {
		dispatch(getRecruitingAgencys(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText ? getSearchRecruitingAgency() : setSearchRecruitingAgency([]);
	}, [searchText]);

	const getSearchRecruitingAgency = () => {
		fetch(`${SEARCH_RECRUITINGAGENCY}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedRecruitingAgencyData => {
				setSearchRecruitingAgency(searchedRecruitingAgencyData?.recruiting_agencies);
				console.log('searchedRecruitingAgencyData', searchedRecruitingAgencyData);
			})
			.catch(() => setSearchRecruitingAgency([]));
	};

	function handleRequestSort(recruitingAgencyEvent, property) {
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

	function handleSelectAllClick(recruitingAgencyEvent) {
		if (recruitingAgencyEvent.target.checked) {
			setSelected(recruitingAgencys.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateRecruitingAgency(item) {
		localStorage.removeItem('recruitingAgencyEvent');
		props.history.push(`/apps/recruitingAgency-management/recruitingAgencys/${item.id}/${item.name}`);
	}
	function handleDeleteRecruitingAgency(item, recruitingAgencyEvent) {
		localStorage.removeItem('recruitingAgencyEvent');
		localStorage.setItem('recruitingAgencyEvent', recruitingAgencyEvent);
		props.history.push(`/apps/recruitingAgency-management/recruitingAgencys/${item.id}/${item.name}`);
	}

	function handleCheck(recruitingAgencyEvent, id) {
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
		dispatch(getRecruitingAgencys({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getRecruitingAgencys({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(recruitingAgencyEvent) {
		setRowsPerPage(recruitingAgencyEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: recruitingAgencyEvent.target.value });
		dispatch(getRecruitingAgencys({ ...pageAndSize, size: recruitingAgencyEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (recruitingAgencys?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no recruitingAgency!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<RecruitingAgencysTableHead
						selectedRecruitingAgencyIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={recruitingAgencys.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchRecruitingAgency)
								? searchRecruitingAgency
								: recruitingAgencys,
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
											onClick={recruitingAgencyEvent => recruitingAgencyEvent.stopPropagation()}
											onChange={recruitingAgencyEvent => handleCheck(recruitingAgencyEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.address}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.rl_no}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={recruitingAgencyEvent => handleUpdateRecruitingAgency(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteRecruitingAgency(n, 'Delete')}
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

export default withRouter(RecruitingAgencysTable);
