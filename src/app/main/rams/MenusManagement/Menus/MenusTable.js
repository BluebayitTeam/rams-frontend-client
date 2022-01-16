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
import { SEARCH_MENU } from 'app/constant/constants';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMenus, selectMenus } from '../store/menusSlice';
import MenusTableHead from './MenusTableHead';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap'
	},
	toolbar: {
		'& > div': {
			minHeight: 'fit-content'
		}
	}
}));

const MenusTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const menus = useSelector(selectMenus);
	const searchText = useSelector(({ menusManagement }) => menusManagement.menus.searchText);
	const [searchMenu, setSearchMenu] = useState([]);
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

	const totalPages = sessionStorage.getItem('total_menus_pages');
	const totalElements = sessionStorage.getItem('total_menus_elements');

	useEffect(() => {
		dispatch(getMenus(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText ? getSearchMenu() : setSearchMenu([]);
	}, [searchText]);

	const getSearchMenu = () => {
		console.log(`${SEARCH_MENU}?=${searchText}`);
		fetch(`${SEARCH_MENU}?title=${searchText}`)
			.then(response => response.json())
			.then(res => {
				setSearchMenu(res?.branches);
			})
			.catch(() => setSearchMenu([]));
	};

	function handleRequestSort(menuEvent, property) {
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

	function handleSelectAllClick(menuEvent) {
		if (menuEvent.target.checked) {
			setSelected(menus.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateMenu(item) {
		localStorage.removeItem('menuEvent');
		props.history.push(`/apps/menu-management/menus/${item.id}/${item.translate}`);
	}
	function handleDeleteMenu(item, menuEvent) {
		localStorage.removeItem('menuEvent');
		localStorage.setItem('menuEvent', menuEvent);
		props.history.push(`/apps/menu-management/menus/${item.id}/${item.translate}`);
	}

	function handleCheck(menuEvent, id) {
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
		dispatch(getMenus({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(menuEvent, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getMenus({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(menuEvent) {
		setRowsPerPage(menuEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: menuEvent.target.value });
		dispatch(getMenus({ ...pageAndSize, size: menuEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (menus?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no menu!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<MenusTableHead
						selectedMenuIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={menus.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchMenu) ? searchMenu : menus,
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
											onClick={menuEvent => menuEvent.stopPropagation()}
											onChange={menuEvent => handleCheck(menuEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.parent}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.menu_id}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.title}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.translate}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.type}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.url}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={menuEvent => handleUpdateMenu(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteMenu(n, 'Delete')}
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

export default withRouter(MenusTable);
