import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Pagination from '@material-ui/lab/Pagination';
import { rowsPerPageOptions } from 'app/@data/data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { BASE_URL, SEARCH_USER } from '../../../../constant/constants';
import { getUsers, selectUsers } from '../store/usersSlice';
import UsersListTableHead from './UsersListTableHead';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		'& > *': {
			marginTop: theme.spacing(1)
			// marginBottom: theme.spacing(3),
		}
	}
}));

const UsersListTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const searchText = useSelector(({ employeesManagement }) => employeesManagement.usersList.searchText);
	const [searchUser, setSearchUser] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(30);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

	const totalPages = sessionStorage.getItem('total_userlist_pages');
	const totalElements = sessionStorage.getItem('total_userlist_elements');

	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	let serialNumber = 1;

	useEffect(() => {
		dispatch(getUsers(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	//searchCustomer
	useEffect(() => {
		searchText ? getSearchUser() : setSearchUser([]);
	}, [searchText]);

	const getSearchUser = () => {
		fetch(`${SEARCH_USER}?username=${searchText}`)
			.then(response => response.json())
			.then(userData => {
				setSearchUser(userData.users);
			})
			.catch(() => setSearchUser([]));
	};

	function handleRequestSort(event, property) {
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

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(users.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	//pagination
	const handlePagination = (e, handlePage) => {
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1);
		dispatch(getUsers({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getUsers({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		setPageAndSize({ ...pageAndSize, size: event.target.value });
		dispatch(getUsers({ ...pageAndSize, size: event.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (users?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no user!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<UsersListTableHead
						selectedUserIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={users.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && searchUser ? searchUser : users,
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
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{serialNumber++}
									</TableCell>

									<TableCell className="h-52 px-4 md:px-0" component="th" scope="row" padding="none">
										{n.image && n.featuredImageId ? (
											<img
												className="h-full block rounded"
												style={{ borderRadius: '15' }}
												src={_.find(n.image, { id: n.featuredImageId }).url}
												alt={n.name}
											/>
										) : (
											<img
												className="h-full block rounded"
												style={{ borderRadius: '15' }}
												src={`${BASE_URL}${n.image}`}
												alt={n.first_name}
											/>
										)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.username}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.email}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.secondary_phone}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										<Box component={Link} to={`/apps/users-management/forgot-password/${n.id}`}>
											<VpnKeyIcon className="cursor-pointer" style={{ color: 'green' }} />
										</Box>
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
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
};

export default withRouter(UsersListTable);
