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
import { Delete, Edit } from '@mui/icons-material';
import { getBranches, getCities, getCountries, getRoles, getThanas } from 'app/store/dataSlice';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { Pagination } from '@mui/material';
import MenusTableHead from './MenusTableHead';
import { selectFilteredMenus, useGetMenusQuery } from '../MenusApi';

/**
 * The menus table.
 */
function MenusTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const { data, isLoading, refetch } = useGetMenusQuery({ ...pageAndSize, searchKey });

	console.log('sdsdsds', data);

	const totalData = useSelector(selectFilteredMenus(data));
	const menus = useSelector(selectFilteredMenus(data?.menu_items));
	const thanas = useSelector((state) => state.data.thanas);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const menu = useSelector((state) => state.data.menus);
	console.log('menusss', totalData);
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);

	useEffect(() => {
		refetch(searchKey);
	}, [searchKey]);
	useEffect(() => {
		dispatch(getBranches());
		dispatch(getThanas());
		dispatch(getRoles());
		dispatch(getCities());
		dispatch(getCountries());
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
			setSelected(menus.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/menu/menus/${item.id}/${item.handle}`);
	}

	function handleUpdateMenu(item, event) {
		localStorage.removeItem('deleteMenu');
		localStorage.setItem('updateMenu', event);
		navigate(`/apps/menu/menus/${item.id}/${item.handle}`);
	}

	function handleDeleteMenu(item, event) {
		localStorage.removeItem('updateMenu');
		localStorage.setItem('deleteMenu', event);
		navigate(`/apps/menu/menus/${item.id}/${item.handle}`);
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

	if (menus?.length === 0) {
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
					There are no menus!
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
					<MenusTableHead
						selectedMenuIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={menus?.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(menus, [tableOrder.id], [tableOrder.direction]).map((n) => {
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
									<TableCell
										className=""
										component="th"
										scope="row"
									>
										{n?.parent?.title}
									</TableCell>

									<TableCell
										className="p-4 md:p-12 whitespace-nowrap"
										component="th"
										scope="row"
									>
										{n.menu_id}
									</TableCell>
									<TableCell
										className="p-4 md:p-12 whitespace-nowrap"
										component="th"
										scope="row"
									>
										{n.display_order}
									</TableCell>

									<TableCell
										className=""
										component="th"
										scope="row"
									>
										{n.title}
									</TableCell>

									<TableCell
										className="p-4 md:p-12 whitespace-nowrap"
										component="th"
										scope="row"
									>
										{n.type}
									</TableCell>

									<TableCell
										className="p-4 md:p-12 whitespace-nowrap"
										component="th"
										scope="row"
									>
										{n.url}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
										align="right"
										style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: '#fff' }}
									>
										<Edit
											onClick={(event) => handleUpdateMenu(n, 'updateMenu')}
											className="cursor-pointer custom-edit-icon-style"
										/>

										<Delete
											onClick={(event) => handleDeleteMenu(n, 'deleteMenu')}
											className="cursor-pointer custom-delete-icon-style"
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			{/* <div id="pagiContainer">
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
			</div> */}

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

export default withRouter(MenusTable);
