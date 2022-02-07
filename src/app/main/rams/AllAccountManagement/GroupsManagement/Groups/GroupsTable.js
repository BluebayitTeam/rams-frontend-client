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
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GROUPS_WITHOUT_PAGINATION, SEARCH_GROUP } from '../../../../../constant/constants';
import { getGroups, selectGroups } from '../store/groupsSlice';
import GroupsTableHead from './GroupsTableHead';

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

const GroupsTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const groups = useSelector(selectGroups);
	const searchText = useSelector(({ groupsManagement }) => groupsManagement.groups.searchText);
	const [searchGroup, setSearchGroup] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_groups_pages');
	const totalElements = sessionStorage.getItem('total_groups_elements');

	useEffect(() => {
		dispatch(getGroups(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText !== '' ? getSearchGroup() : setSearchGroup([]);
	}, [searchText]);

	const getSearchGroup = () => {
		fetch(`${SEARCH_GROUP}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedGroupData => {
				setSearchGroup(searchedGroupData?.groups);
				console.log('searchedGroupData', searchedGroupData);
			})
			.catch(() => setSearchGroup([]));
	};

	function handleRequestSort(groupEvent, property) {
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

	function handleSelectAllClick(groupEvent) {
		if (groupEvent.target.checked) {
			setSelected((!_.isEmpty(searchGroup) ? searchGroup : groups).map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateGroup(item) {
		localStorage.removeItem('groupEvent');
		props.history.push(`/apps/group-management/groups/${item.id}/${item.name}`);
	}
	function handleDeleteGroup(item, groupEvent) {
		localStorage.removeItem('groupEvent');
		localStorage.setItem('groupEvent', groupEvent);
		props.history.push(`/apps/group-management/groups/${item.id}/${item.name}`);
	}

	function handleCheck(groupEvent, id) {
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
		dispatch(getGroups({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getGroups({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(groupEvent) {
		setRowsPerPage(groupEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: groupEvent.target.value });
		dispatch(getGroups({ ...pageAndSize, size: groupEvent.target.value }));
	}

	const [groupsAll, setGroupsAll] = useState([]);

	//get group all data without pagination
	useEffect(() => {
		fetch(GROUPS_WITHOUT_PAGINATION)
			.then(res => res.json())
			.then(data => setGroupsAll(data.groups));
	}, []);

	const parentIdRef = useRef(null);

	const getParentGroups = n => {
		console.log('n', n);
		if (n.head_group) {
			parentIdRef.current = n.head_group.id;
			const parent = [];
			let parentstr = '';
			const groupLength = groupsAll.length;
			for (let i = 0; i < groupLength; i++) {
				parent.push(
					`${n.head_group.id ? groupsAll.find(group => group.id === parentIdRef.current)?.name : null}`
				);
				parentIdRef.current = n.head_group
					? groupsAll.find(grp => grp.id === parentIdRef.current)?.head_group?.id
					: n.head_primarygroup
					? (i = groupLength) && null
					: null;
				parentIdRef.current ? null : (i = groupLength);
			}
			parent.reverse();

			for (let i = 0; i < parent.length; i++) {
				parentstr += `${i !== 0 ? '>>' : ''}${parent[i]} `;
			}
			console.log(parentstr);
			return parentstr;
		} else if (n.head_primarygroup) {
			return n.head_primarygroup.name;
		}
	};

	if (loading) {
		return <FuseLoading />;
	}

	if (groups?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no group!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<GroupsTableHead
						selectedGroupIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={(!_.isEmpty(searchGroup) ? searchGroup : groups).length}
						onMenuItemClick={handleDeselect}
						pagination={pageAndSize}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchGroup) ? searchGroup : groups,
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
											onClick={groupEvent => groupEvent.stopPropagation()}
											onChange={groupEvent => handleCheck(groupEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{getParentGroups(n)}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={() => handleUpdateGroup(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={() => handleDeleteGroup(n, 'Delete')}
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

export default withRouter(GroupsTable);
