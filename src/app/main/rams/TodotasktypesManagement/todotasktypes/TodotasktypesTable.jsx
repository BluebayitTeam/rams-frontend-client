/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { selectFilteredTodotasktypes, useGetTodotasktypesQuery } from '../TodotasktypesApi';
import TodotasktypesTableHead from './TodotasktypesTableHead';

/**
 * The todotasktypes table.
 */
function TodotasktypesTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetTodotasktypesQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredTodotasktypes(data));
	const todotasktypes = useSelector(selectFilteredTodotasktypes(data?.task_types));
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);

	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);
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
			setSelected(todotasktypes.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/todotasktype/todotasktypes/${item.id}/${item.handle}`);
	}

	function handleUpdateTodotasktype(item, event) {
		localStorage.removeItem('deleteTodotasktype');
		localStorage.setItem('updateTodotasktype', event);
		navigate(`/apps/todotasktype/todotasktypes/${item.id}/${item.handle}`);
	}

	function handleDeleteTodotasktype(item, event) {
		localStorage.removeItem('updateTodotasktype');
		localStorage.setItem('deleteTodotasktype', event);
		navigate(`/apps/todotasktype/todotasktypes/${item.id}/${item.handle}`);
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

	if (todotasktypes?.length === 0) {
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
					There are no todotasktypes!
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
					<TodotasktypesTableHead
						selectedTodotasktypeIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={todotasktypes.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(todotasktypes, [tableOrder.id], [tableOrder.direction]).map((n) => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className='h-20 cursor-pointer border-t-1  border-gray-200'
									hover
									role='checkbox'
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}>
									<TableCell
										className='w-40 md:w-64 border-t-1  border-gray-200'
										component='th'
										scope='row'
										style={{
											position: 'sticky',
											left: 0,
											zIndex: 1, backgroundColor: '#fff',

										}}>
										{pageAndSize.page * pageAndSize.size -
											pageAndSize.size +
											serialNumber++}
									</TableCell>
									<TableCell
										className='p-4 md:p-16 border-t-1  border-gray-200'
										component='th'
										scope='row'>
										{n.name}
									</TableCell>{' '}
									<TableCell
										className='p-4 md:p-16 border-t-1  border-gray-200'
										component='th'
										scope='row'>
										<div
											className='rounded '
											style={{
												height: '40px',
												width: '40px',
												backgroundColor: n?.color || 'white',
											}}
										/>
									</TableCell>
									<TableCell
										className='p-4 md:p-16 border-t-1  border-gray-200'
										component='th'
										scope='row'
										align='right'
										style={{
											position: 'sticky',
											right: 0,
											zIndex: 1, backgroundColor: '#fff',

										}}>
										{hasPermission('TODO_TASK_TYPE_UPDATE') && (
											<Edit
												onClick={() =>
													handleUpdateTodotasktype(n, 'updateTodotasktype')
												}
												className='cursor-pointer custom-edit-icon-style'
											/>
										)}

										{hasPermission('TODO_TASK_TYPE_DELETE') && (
											<Delete
												onClick={() =>
													handleDeleteTodotasktype(n, 'deleteTodotasktype')
												}
												className='cursor-pointer custom-delete-icon-style'
											/>
										)}
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
					count={totalData?.total_elements}
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

export default withRouter(TodotasktypesTable);
