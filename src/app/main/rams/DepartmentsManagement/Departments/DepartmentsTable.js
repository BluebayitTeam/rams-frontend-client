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
import { rowsPerPageOptions } from 'app/@data/data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_DEPARTMENT } from '../../../../constant/constants';
import { getDepartments, selectDepartments } from '../store/departmentsSlice';
import DepartmentsTableHead from './DepartmentsTableHead';

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

const DepartmentsTable = props => {
	const dispatch = useDispatch();
	const departments = useSelector(selectDepartments);
	const searchText = useSelector(({ departmentsManagement }) => departmentsManagement.departments.searchText);
	const [searchDepartment, setSearchDepartment] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(30);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	let serialNumber = 1;

	const [parameter, setParameter] = useState({ page: 1, size: 30 });
	const totalPages = sessionStorage.getItem('departments_total_pages');
	const totalElements = sessionStorage.getItem('departments_total_elements');
	const classes = useStyles();

	useEffect(() => {
		dispatch(getDepartments(parameter)).then(() => setLoading(false));
	}, [dispatch]);

	//search department
	useEffect(() => {
		searchText ? getSearchDepartment() : setSearchDepartment([]);
	}, [searchText]);

	const getSearchDepartment = () => {
		fetch(`${SEARCH_DEPARTMENT}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedDepartmentData => {
				setSearchDepartment(searchedDepartmentData.departments);
			})
			.catch(() => setSearchDepartment([]));
	};

	function handleRequestSort(departmentEvent, property) {
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

	function handleSelectAllClick(departmentEvent) {
		if (departmentEvent.target.checked) {
			setSelected(departments.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateDepartment(item) {
		localStorage.removeItem('departmentEvent');
		props.history.push(`/apps/department-management/departments/${item.id}/${item.name}`);
	}
	function handleDeleteDepartment(item, departmentEvent) {
		localStorage.removeItem('departmentEvent');
		localStorage.setItem('departmentEvent', departmentEvent);
		props.history.push(`/apps/department-management/departments/${item.id}/${item.name}`);
	}

	function handleCheck(departmentEvent, id) {
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
		setParameter({ ...parameter, page: handlePage });
		setPage(handlePage - 1);
		dispatch(getDepartments({ ...parameter, page: handlePage }));
	};

	function handleChangePage(departmentEvent, value) {
		setPage(value);
		setParameter({ ...parameter, page: value + 1 });
		dispatch(getDepartments({ ...parameter, page: value - 1 }));
	}

	function handleChangeRowsPerPage(departmentEvent) {
		setRowsPerPage(departmentEvent.target.value);
		setParameter({ ...parameter, size: departmentEvent.target.value });
		dispatch(getDepartments({ ...parameter, size: departmentEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (departments.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no department!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<DepartmentsTableHead
						selectedDepartmentIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={departments.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchDepartment) ? searchDepartment : departments,
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
											onClick={departmentEvent => departmentEvent.stopPropagation()}
											onChange={departmentEvent => handleCheck(departmentEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{parameter.page * parameter.size - parameter.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={departmentEvent => handleUpdateDepartment(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteDepartment(n, 'Delete')}
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
					page={page}
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

export default withRouter(DepartmentsTable);
