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
import { rowsPerPageOptions } from 'src/app/@data/data';
import { Checkbox, Pagination } from '@mui/material';
import moment from 'moment';

import { Delete, Edit, ViewDay, ViewWeek, Visibility } from '@mui/icons-material';
import MakeAListsManagementsTableHead from './MakeAListsManagementsTableHead';
import { selectFilteredMakeAListsManagements, useGetMakeAListsManagementsQuery } from '../MakeAListsManagementsApi';

/**
 * The makeAListsManagements table.
 */
function MakeAListsManagementsTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetMakeAListsManagementsQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredMakeAListsManagements(data));
	const makeAListsManagements = useSelector(selectFilteredMakeAListsManagements(data?.make_lists));
	let serialNumber = 1;

	useEffect(() => {
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
			setSelected(makeAListsManagements.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/makeAListsManagement/makeAListsManagements/${item.id}/${item.handle}`);
	}

	function handleUpdateMakeAListsManagement(item, event) {
		localStorage.removeItem('deleteMakeAListsManagement');
		localStorage.setItem('updateMakeAListsManagement', event);
		navigate(`/apps/makeAListsManagement/makeAListsManagements/${item.id}/${item.handle}`);
	}

	function handleDeleteMakeAListsManagement(item, event) {
		localStorage.removeItem('updateMakeAListsManagement');
		localStorage.setItem('deleteMakeAListsManagement', event);
		navigate(`/apps/makeAListsManagement/makeAListsManagements/${item.id}/${item.handle}`);
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

	if (makeAListsManagements?.length === 0) {
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
					There are no makeAListsManagements!
				</Typography>
			</motion.div>
		);
	}

	const user_role = localStorage.getItem('user_role');

	return (
		<div className="w-full flex flex-col min-h-full px-10">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<MakeAListsManagementsTableHead
						selectedMakeAListsManagementIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={makeAListsManagements?.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(makeAListsManagements, [tableOrder.id], [tableOrder.direction]).map((n) => {
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
										{n.make_date ? moment(n.make_date).format('DD-MM-YYYY') : 'Invalid Date'}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.title}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.note}
									</TableCell>
									<TableCell>
										<div>
											<ViewWeek
												onClick={() => handleMakeAListColumn(n)}
												className="cursor-pointer mr-14"
												style={{ color: 'blue' }}
											/>
											<ViewDay
												onClick={() => handleMakeAListRow(n)}
												className="cursor-pointer mr-14"
												style={{ color: 'orange' }}
											/>
											<Visibility
												onClick={() => handleMakeAListReport(n)}
												className="cursor-pointer mr-14"
												style={{ color: '#00c7f3' }}
											/>

											<Edit
												onClick={() => handleUpdateMakeAListsManagement(n)}
												className="cursor-pointer mr-14"
												style={{ color: 'green' }}
											/>

											<Delete
												onClick={() => handleDeleteMakeAListsManagement(n, 'Delete')}
												className="cursor-pointer mr-15"
												style={{
													color: 'red'
												}}
											/>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<div
				id="pagiContainer"
				className="flex justify-between mb-6"
			>
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
					className="shrink-0 mb-2"
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

export default withRouter(MakeAListsManagementsTable);
