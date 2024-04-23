/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { Delete, Edit } from '@mui/icons-material';
import {
	getBranches,
	getCities,
	getCountries,
	getDepartments,
	getEmployees,
	getRoles,
	getThanas
} from 'app/store/dataSlice';
import moment from 'moment';
import { Pagination } from '@mui/material';
import { rowsPerPageOptions } from 'src/app/@data/data';
import EmployeesTableHead from './EmployeesTableHead';
import { selectFilteredEmployees, useGetEmployeesQuery } from '../EmployeesApi';

/**
 * The employees table.
 */
function EmployeesTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [page, setPage] = useState(0);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

	const { data, isLoading, refetch } = useGetEmployeesQuery({ ...pageAndSize, searchKey });

	console.log('sdsdsds', data);

	const totalData = useSelector(selectFilteredEmployees(data));
	const employees = useSelector(selectFilteredEmployees(data?.employees));
	const thanas = useSelector((state) => state.data.thanas);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const departments = useSelector((state) => state.data.departments);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const employee = useSelector((state) => state.data.employees);
	console.log('employeesss', totalData);
	const [rows, setRows] = useState([]);
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);
	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);
	useEffect(() => {
		if (totalData?.employees) {
			const modifiedRow = [
				{
					id: 'SL',
					align: 'left',
					disablePadding: true,
					label: 'SL',
					sort: true
				}
			];

			Object.entries(totalData.employees[0])
				.filter(([key]) => key !== 'id') // Filter out the 'id' field
				.forEach(([key, value]) => {
					modifiedRow.push({
						id: key,
						label: key
							.split('_')
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' '),
						align: 'left',
						disablePadding: false,
						sort: true,
						style: { whiteSpace: 'nowrap' }
					});
				});

			modifiedRow.push({
				id: 'action',
				align: 'left',
				disablePadding: false,
				label: 'Action',
				sort: true
			});

			setRows(modifiedRow);
		}
	}, [totalData?.employees]);

	useEffect(() => {
		dispatch(getBranches());
		dispatch(getThanas());
		dispatch(getRoles());
		dispatch(getDepartments());
		dispatch(getCities());
		dispatch(getCountries());
		dispatch(getEmployees());
	}, []);
	const [selected, setSelected] = useState([]);

	const [tableOrder, setTableOrder] = useState({
		direction: 'asc',
		id: ''
	});

	function handleRequestSort(event, property) {
		const newOrder = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(employees.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/employee/employees/${item.id}/${item.handle}`);
	}

	function handleUpdateEmployee(item, event) {
		localStorage.removeItem('deleteEmployee');
		localStorage.setItem('updateEmployee', event);
		navigate(`/apps/employee/employees/${item.id}/${item.handle}`);
	}

	function handleDeleteEmployee(item, event) {
		localStorage.removeItem('updateEmployee');
		localStorage.setItem('deleteEmployee', event);
		navigate(`/apps/employee/employees/${item.id}/${item.handle}`);
	}

	function handleCheck(event, id) {
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

	// pagination
	const handlePagination = (e, handlePage) => {
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1);
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPageAndSize({ ...pageAndSize, size: event.target.value });
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (employees?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no employees!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full px-10">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<EmployeesTableHead
						selectedEmployeeIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={employees?.length}
						onMenuItemClick={handleDeselect}
						rows={rows}
					/>

					<TableBody>
						{_.orderBy(employees, [tableOrder.id], [tableOrder.direction])
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n) => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-20 cursor-pointer "
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell
											className="w-40 md:w-64"
											component="th"
											scope="row"
											style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
										>
											{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
										</TableCell>
										{Object?.entries(n)?.map(
											([key, value]) =>
												key !== 'id' && (
													<TableCell
														className="p-4 md:p-16"
														component="th"
														scope="row"
														key={key}
													>
														{key === 'logo' ? (
															n?.value ? (
																<img
																	className="h-full block rounded"
																	style={{ borderRadius: '30px' }}
																	width="60px"
																	height="60px"
																	src={`${BASE_URL}${n?.value}`}
																	alt={n?.first_name}
																/>
															) : (
																''
															)
														) : key === 'payment_valid_until' ? (
															n?.value ? (
																moment(new Date(n?.value)).format('DD-MM-YYYY')
															) : (
																''
															)
														) : (
															value
														)}
													</TableCell>
												)
										)}
										<TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
											align="right"
											style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: '#fff' }}
										>
											<Edit
												onClick={(event) => handleUpdateEmployee(n, 'updateEmployee')}
												className="cursor-pointer custom-edit-icon-style"
											/>

											<Delete
												onClick={(event) => handleDeleteEmployee(n, 'deleteEmployee')}
												className="cursor-pointer custom-delete-icon-style"
											/>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<div id="pagiContainer">
				<Pagination
					// classes={{ ul: 'flex-nowrap' }}
					count={totalData?.total_pages}
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
					className="shrink-0 border-t-1"
					component="div"
					rowsPerPageOptions={rowsPerPageOptions}
					count={totalData?.total_pages}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
}

export default withRouter(EmployeesTable);
