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
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_PERMISSION } from '../../../../constant/constants';
import { getPermissions, selectPermissions } from '../store/permissionsSlice';
import PermissionsTableHead from './PermissionsTableHead';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		'& > *': {
			marginTop: theme.spacing(1),
			// marginBottom: theme.spacing(3)
		}
	}
}));

const PermissionsTable = props => {
	const dispatch = useDispatch();
	const permissions = useSelector(selectPermissions);
	const searchText = useSelector(({ permissionsManagement }) => permissionsManagement.permissions.searchText);
	const [searchPermission, setSearchPermission] = useState([]);
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
	const totalPages = sessionStorage.getItem('permissions_total_pages');
	const totalElements = sessionStorage.getItem('permissions_total_elements');
	const classes = useStyles();

	useEffect(() => {
		dispatch(getPermissions(parameter)).then(() => setLoading(false));
	}, [dispatch]);

	//search qualification
	useEffect(() => {
		searchText !== "" && getSearchPermission();
	}, [searchText])

	const getSearchPermission = () => {
		fetch(`${SEARCH_PERMISSION}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedPermissionData => {
				setSearchPermission(searchedPermissionData.permissions);
				//console.log(searchedPermissionData)
			});
	}

	function handleRequestSort(permissionEvent, property) {
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

	function handleSelectAllClick(permissionEvent) {
		if (permissionEvent.target.checked) {
			setSelected(permissions.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdatePermission(item) {
		localStorage.removeItem('permissionEvent');
		props.history.push(`/apps/permission-management/permissions/${item.id}/${item.name}`);
	}
	function handleDeletePermission(item, permissionEvent) {
		localStorage.removeItem('permissionEvent');
		localStorage.setItem('permissionEvent', permissionEvent);
		props.history.push(`/apps/permission-management/permissions/${item.id}/${item.name}`);
	}

	function handleCheck(permissionEvent, id) {
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
		dispatch(getPermissions({ ...parameter, page: handlePage }));
	};

	function handleChangePage(permissionEvent, value) {
		setPage(value);
		setParameter({ ...parameter, page: value + 1 });
		dispatch(getPermissions({ ...parameter, page: value - 1 }));
	}

	function handleChangeRowsPerPage(permissionEvent) {
		setRowsPerPage(permissionEvent.target.value);
		setParameter({ ...parameter, size: permissionEvent.target.value });
		dispatch(getPermissions({ ...parameter, size: permissionEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (permissions?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no permission!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<PermissionsTableHead
						selectedPermissionIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={permissions.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== "" && searchPermission ? searchPermission : permissions,
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
											onClick={permissionEvent => permissionEvent.stopPropagation()}
											onChange={permissionEvent => handleCheck(permissionEvent, n.id)}
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
												onClick={permissionEvent => handleUpdatePermission(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeletePermission(n, 'Delete')}
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
					className="flex-shrink-0 border-t-1"
					rowsPerPageOptions={[30, 50, 100]}
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

export default withRouter(PermissionsTable);
