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
import { Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import GdssTableHead from './GdssTableHead';
import { selectFilteredGdss, useGetGdssQuery } from '../GdssApi';

function GdssTable(props) {
	const dispatch = useDispatch();

	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetGdssQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredGdss(data));
	const gdss = useSelector(selectFilteredGdss(data?.gdss));
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
			setSelected(gdss.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/airway/gdss/${item.id}/${item.handle}`);
	}

	function handleUpdateAirway(item, event) {
		localStorage.removeItem('deleteAirway');
		localStorage.setItem('updateAirway', event);
		navigate(`/apps/airway/gdss/${item.id}/${item.handle}`);
	}

	function handleDeleteAirway(item, event) {
		localStorage.removeItem('updateAirway');
		localStorage.setItem('deleteAirway', event);
		navigate(`/apps/airway/gdss/${item.id}/${item.handle}`);
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

	if (gdss?.length === 0) {
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
					There are no gdss!
				</Typography>
			</motion.div>
		);
	}

	return (
		// <div className="w-full flex flex-col min-h-full px-10">
		// 	<FuseScrollbars className="grow overflow-x-auto">
		// 		<Table
		// 			stickyHeader
		// 			className="min-w-xl"
		// 			aria-labelledby="tableTitle"
		// 		>
		// 			<GdssTableHead
		// 				selectedAirwayIds={selected}
		// 				tableOrder={tableOrder}
		// 				onSelectAllClick={handleSelectAllClick}
		// 				onRequestSort={handleRequestSort}
		// 				rowCount={gdss.length}
		// 				onMenuItemClick={handleDeselect}
		// 			/>

		// 			<TableBody>
		// 				{_.orderBy(gdss, [tableOrder.id], [tableOrder.direction]).map((n) => {
		// 					const isSelected = selected.indexOf(n.id) !== -1;
		// 					return (
		// 						<TableRow
		// 							className="h-20 cursor-pointer"
		// 							hover
		// 							role="checkbox"
		// 							aria-checked={isSelected}
		// 							tabIndex={-1}
		// 							key={n.id}
		// 							selected={isSelected}
		// 						>
		// 							<TableCell
		// 								className="w-40 md:w-64 text-center"
		// 								padding="none"
		// 								style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
		// 							/>

		// 							<TableCell
		// 								className="w-40 md:w-64"
		// 								component="th"
		// 								scope="row"
		// 								style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
		// 							>
		// 								{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
		// 							</TableCell>
		// 							<TableCell
		// 								className="p-2 w-1/5 md:p-12  whitespace-nowrap	"
		// 								component="th"
		// 								scope="row"
		// 							>
		// 								{n.name}
		// 							</TableCell>

		// 							<TableCell
		// 								className="p-2 w-1/5 md:p-12  whitespace-nowrap	"
		// 								component="th"
		// 								scope="row"
		// 							>
		// 								{n.short_code}
		// 							</TableCell>
		// 							<TableCell
		// 								className="p-2 w-1/5 md:p-12  whitespace-nowrap	"
		// 								component="th"
		// 								scope="row"
		// 							>
		// 								{n.air_code}
		// 							</TableCell>
		// 							<TableCell
		// 								className="p-2 md:p-16"
		// 								component="th"
		// 								scope="row"
		// 								align="right"
		// 								style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: '#fff' }}
		// 							>
		// 								<Edit
		// 									onClick={() => handleUpdateAirway(n, 'updateAirway')}
		// 									className="cursor-pointer custom-edit-icon-style"
		// 								/>

		// 								<Delete
		// 									onClick={() => handleDeleteAirway(n, 'deleteAirway')}
		// 									className="cursor-pointer custom-delete-icon-style"
		// 								/>
		// 							</TableCell>
		// 						</TableRow>
		// 					);
		// 				})}
		// 			</TableBody>
		// 		</Table>
		// 	</FuseScrollbars>

		// 	<div id="pagiContainer">
		// 		<Pagination
		// 			// classes={{ ul: 'flex-nowrap' }}
		// 			count={totalData?.total_pages}
		// 			page={page + 1}
		// 			defaultPage={1}
		// 			color="primary"
		// 			showFirstButton
		// 			showLastButton
		// 			variant="outlined"
		// 			shape="rounded"
		// 			onChange={handlePagination}
		// 		/>

		// 		<TablePagination
		// 			className="shrink-0 border-t-1"
		// 			component="div"
		// 			rowsPerPageOptions={rowsPerPageOptions}
		// 			count={totalData?.total_elements}
		// 			rowsPerPage={rowsPerPage}
		// 			page={page}
		// 			backIconButtonProps={{
		// 				'aria-label': 'Previous Page'
		// 			}}
		// 			nextIconButtonProps={{
		// 				'aria-label': 'Next Page'
		// 			}}
		// 			onPageChange={handleChangePage}
		// 			onRowsPerPageChange={handleChangeRowsPerPage}
		// 		/>
		// 	</div>
		// </div>

		<div className="w-full flex flex-col min-h-full px-10">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<GdssTableHead
						selectedAirwayIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={gdss.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(gdss, [tableOrder.id], [tableOrder.direction]).map((n) => {
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
										className="w-40 md:w-64 text-center border-t-1  border-gray-200"
										padding="none"
									/>

									<TableCell
										className="w-40 w-1/5 md:w-64 border-t-1  border-gray-200"
										component="th"
										scope="row"
									>
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}{' '}
									</TableCell>

									<TableCell
										className="p-4 w-1/5 md:p-12  whitespace-nowrap border-t-1  border-gray-200	"
										component="th"
										scope="row"
									>
										{n.name}
									</TableCell>

									<TableCell
										className="p-4 w-1/5 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
										component="th"
										scope="row"
									>
										{n.short_code}
									</TableCell>
									<TableCell
										className="p-4 w-1/5 md:p-12  whitespace-nowrap	border-t-1  border-gray-200"
										component="th"
										scope="row"
									>
										{n.air_code}
									</TableCell>

									<TableCell
										className="p-4 w-1/5 md:p-12  whitespace-nowrap border-t-1  border-gray-200	"
										align="center"
										component="th"
										scope="row"
									>
										<div>
											<Edit
												onClick={() => handleUpdateAirway(n, 'updateAirway')}
												className="cursor-pointer custom-edit-icon-style"
											/>

											<Delete
												onClick={() => handleDeleteAirway(n, 'deleteAirway')}
												className="cursor-pointer custom-delete-icon-style"
											/>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<div id="pagiContainer">
				<Pagination
					// 			// classes={{ ul: 'flex-nowrap' }}
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

export default withRouter(GdssTable);
