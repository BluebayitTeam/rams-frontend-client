import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import { Box, Pagination } from '@mui/material';
import { rowsPerPageOptions } from 'src/app/@data/data';
import UsersTableHead from './UsersTableHead';
import { selectFilteredUsers, useGetUsersQuery } from '../UsersApi';

/**
 * The users table.
 */
function UsersTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetUsersQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredUsers(data));
	const users = useSelector(selectFilteredUsers(data?.users));
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);
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

	useEffect(() => {
		refetch(searchKey);
	}, [searchKey]);

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(users.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/user/users/${item.id}/${item.handle}`);
	}

	function handleUpdateUser(item, event) {
		localStorage.removeItem('deleteUser');
		localStorage.setItem('updateUser', event);
		navigate(`/apps/user/users/${item.id}/${item.handle}`);
	}

	function handleDeleteUser(item, event) {
		localStorage.removeItem('updateUser');
		localStorage.setItem('deleteUser', event);
		navigate(`/apps/user/users/${item.id}/${item.handle}`);
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

	if (users?.length === 0) {
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
					There are no users!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<UsersTableHead
						selectedUserIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={users?.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(users, [tableOrder.id], [tableOrder.direction]).map((n) => {
							const isSelected = selected.indexOf(n.id) !== -1;
							return (
								<TableRow
									className="h-20 cursor-pointer px-10"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={n.id}
									selected={isSelected}
									// onClick={() => handleClick(n)}
								>
									<TableCell
										className="w-40 md:w-64"
										component="th"
										scope="row"
										style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
									>
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>
									<TableCell
										className="w-52 px-4 md:px-10"
										component="th"
										scope="row"
										padding="none"
									>
										{n.image ? (
											<img
												className="h-full block rounded"
												style={{ borderRadius: '30px' }}
												width="40px"
												height="40px"
												src={`${BASE_URL}${n.image}`}
												alt={n.first_name}
											/>
										) : (
											<img
												className="h-full block rounded"
												style={{ borderRadius: '30px' }}
												width="40px"
												height="40px"
												src="/assets/images/userImg/user.png"
												alt={n.first_name}
											/>
										)}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.username}{' '}
									</TableCell>
									<TableCell
										className="p-4 md:p-16 truncate"
										component="th"
										scope="row"
									>
										{n?.email}
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16 truncate"
										component="th"
										scope="row"
									>
										{n.secondary_phone}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: '#fff' }}
									>
										<Box onClick={(event) => handleUpdateUser(n, 'updateUser')}>
											<VpnKeyIcon className="cursor-pointer custom-edit-icon-style" />
										</Box>
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

export default withRouter(UsersTable);
