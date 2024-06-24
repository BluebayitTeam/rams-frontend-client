/* eslint-disable no-unused-expressions */
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
import { useEffect, useRef, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { GROUPS_WITHOUT_PAGINATION } from 'src/app/constant/constants';
import GroupsTableHead from './GroupsTableHead';
import { selectFilteredGroups, useGetGroupsQuery } from '../GroupsApi';

function GroupsTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetGroupsQuery({
		...pageAndSize,
		searchKey
	});

	const totalData = useSelector(selectFilteredGroups(data));

	const groups = useSelector(selectFilteredGroups(data?.groups));
	const group = useSelector((state) => state.data.groups);
	let serialNumber = 1;
	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);
	useEffect(() => {
		refetch({ ...pageAndSize });
	}, [pageAndSize, refetch]);

	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);

	const [groupsAll, setGroupsAll] = useState([]);
	useEffect(() => {
		fetch(GROUPS_WITHOUT_PAGINATION)
			.then((res) => res.json())
			.then((data) => setGroupsAll(data.groups));
	}, []);

	const parentIdRef = useRef(null);

	const getParentGroups = (n) => {
		if (n.head_group) {
			parentIdRef.current = n.head_group.id;
			const parent = [];
			let parentstr = '';
			const groupLength = groupsAll?.length;
			for (let i = 0; i < groupLength; i++) {
				parent.push(
					`${n.head_group.id ? groupsAll.find((group) => group.id === parentIdRef.current)?.name : null}`
				);
				parentIdRef.current = n.head_group
					? groupsAll.find((grp) => grp.id === parentIdRef.current)?.head_group?.id
					: n.head_primarygroup
						? (i = groupLength) && null
						: null;
				parentIdRef.current ? null : (i = groupLength);
			}
			parent.reverse();

			for (let i = 0; i < parent.length; i++) {
				parentstr += `${i !== 0 ? ' >> ' : ''}${parent[i]}`;
			}

			return parentstr;
		}

		if (n.head_primarygroup) {
			return n.head_primarygroup.name;
		}
	};

	const [selected, setSelected] = useState([]);

	const [tableOrder, setTableOrder] = useState({
		direction: 'asc',
		id: ''
	});

	const handleRequestSort = (event, property) => {
		const newOrder = { id: property, direction: 'desc' };

		if (tableOrder.id === property && tableOrder.direction === 'desc') {
			newOrder.direction = 'asc';
		}

		setTableOrder(newOrder);
	};

	const handleUpdateGroup = (item, event) => {
		localStorage.removeItem('deleteGroup');
		localStorage.setItem('updateGroup', event);
		navigate(`/apps/group/groups/${item.id}/${item.handle}`);
	};

	const handleDeleteGroup = (item, event) => {
		localStorage.removeItem('updateGroup');
		localStorage.setItem('deleteGroup', event);
		navigate(`/apps/group/groups/${item.id}/${item.handle}`);
	};

	const handlePagination = (event, handlePage) => {
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1); // Adjust page to 0-indexed for UI
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

	if (!data || data?.groups.length === 0) {
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
					There are no groups!
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
					<GroupsTableHead
						selectedGroupIds={selected}
						tableOrder={tableOrder}
						onRequestSort={handleRequestSort}
						rowCount={data?.groups.length}
					/>

					<TableBody>
						{_.orderBy(data?.groups, [tableOrder.id], [tableOrder.direction])

							.map((n) => (
								<TableRow
									className="h-20 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={selected.indexOf(n.id) !== -1}
									tabIndex={-1}
									key={n.id}
									selected={selected.indexOf(n.id) !== -1}
								>
									<TableCell
										className="w-40 md:w-64"
										component="th"
										scope="row"
										style={{
											position: 'sticky',
											left: 0,
											zIndex: 1,
											backgroundColor: '#fff'
										}}
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
									>
										{getParentGroups(n)}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										align="right"
										style={{
											position: 'sticky',
											right: 0,
											zIndex: 1,
											backgroundColor: '#fff'
										}}
									>
										<Edit
											onClick={(event) => handleUpdateGroup(n, 'updateGroup')}
											className="cursor-pointer custom-edit-icon-style"
										/>

										<Delete
											onClick={(event) => handleDeleteGroup(n, 'deleteGroup')}
											className="cursor-pointer custom-delete-icon-style"
										/>
									</TableCell>
								</TableRow>
							))}
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

export default withRouter(GroupsTable);
