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
import { rowsPerPageOptions } from 'src/app/@data/data';
import { Checkbox, Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { selectFilteredFormContentDetails, useGetFormContentDetailsQuery } from '../FormContentDetailsApi';
import FormContentDetailsTableHead from './FormContentDetailsHead';

function FormContentDetailsTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

	// Fetching data from the API
	const { data, isLoading, refetch, error } = useGetFormContentDetailsQuery({ ...pageAndSize, searchKey });

	// Handle the data processing after fetching
	const formContentDetails = useSelector(selectFilteredFormContentDetails(data?.formContentDetails || []));
	console.log('formContentDetails', error);
	const totalData = useSelector(selectFilteredFormContentDetails(data));
	console.log('totalData', data);

	let serialNumber = 1;

	useEffect(() => {
		// Refetch data when page or rowsPerPage changes
		refetch({ page: page + 1, size: rowsPerPage });
	}, [page, rowsPerPage]);

	useEffect(() => {
		// Refetch data when searchKey changes
		refetch({ searchKey });
	}, [searchKey]);

	const [selected, setSelected] = useState([]);
	const [tableOrder, setTableOrder] = useState({
		direction: 'asc',
		id: ''
	});

	// Handlers
	function handleRequestSort(event, property) {
		const isAsc = tableOrder.id === property && tableOrder.direction === 'asc';
		setTableOrder({ id: property, direction: isAsc ? 'desc' : 'asc' });
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(formContentDetails.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/department/formContentDetails/${item.id}/${item.handle}`);
	}

	function handleUpdateDepartment(item, event) {
		localStorage.removeItem('deleteDepartment');
		localStorage.setItem('updateDepartment', event);
		navigate(`/apps/department/formContentDetails/${item.id}/${item.handle}`);
	}

	function handleDeleteDepartment(item, event) {
		localStorage.removeItem('updateDepartment');
		localStorage.setItem('deleteDepartment', event);
		navigate(`/apps/department/formContentDetails/${item.id}/${item.handle}`);
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

	// Pagination Handlers
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

	// Loading and Empty State Handling
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<FuseLoading />
			</div>
		);
	}

	if (formContentDetails.length === 0) {
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
					There are no formContentDetails!
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
					<FormContentDetailsTableHead
						selectedDepartmentIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={formContentDetails.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(formContentDetails, [tableOrder.id], [tableOrder.direction]).map((n) => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className="h-20 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}
								>
									<TableCell
										className="w-40 md:w-64 text-center"
										padding="none"
										style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
									>
										<Checkbox
											checked={isSelected}
											onClick={(event) => event.stopPropagation()}
											onChange={(event) => handleCheck(event, n.id)}
										/>
									</TableCell>

									<TableCell
										className="w-40 md:w-64"
										component="th"
										scope="row"
										style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
									>
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.name}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										align="right"
										style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: '#fff' }}
									>
										<Edit
											onClick={(event) => handleUpdateDepartment(n, 'updateDepartment')}
											className="cursor-pointer custom-edit-icon-style"
										/>

										<Delete
											onClick={(event) => handleDeleteDepartment(n, 'deleteDepartment')}
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

export default withRouter(FormContentDetailsTable);
