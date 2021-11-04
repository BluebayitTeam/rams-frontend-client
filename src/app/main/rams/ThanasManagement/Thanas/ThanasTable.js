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
import { SEARCH_THANA } from '../../../../constant/constants';
import { getCities } from '../../../../store/dataSlice';
import { getThanas, selectThanas } from '../store/thanasSlice';
import ThanasTableHead from './ThanasTableHead';

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

const ThanasTable = props => {
	const dispatch = useDispatch();
	const thanas = useSelector(selectThanas);
	const searchText = useSelector(({ thanasManagement }) => thanasManagement.thanas.searchText);
	const [searchThana, setSearchThana] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(thanas);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(30);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	let serialNumber = 1;

	const [parameter, setParameter] = useState({ page: 1, size: 30 });
	const totalPages = sessionStorage.getItem('thanas_total_pages');
	const totalElements = sessionStorage.getItem('thanas_total_elements');
	const classes = useStyles();

	const citys = useSelector(state => state.data.citys);

	useEffect(() => {
		dispatch(getThanas(parameter)).then(() => setLoading(false));
	}, [dispatch]);


	//search thana
	useEffect(() => {
		searchText !== "" && getSearchThana();
	}, [searchText])

	const getSearchThana = () => {
		fetch(`${SEARCH_THANA}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedThanasData => {
				setSearchThana(searchedThanasData.thanas);
				//console.log(searchedThanasData)
			});
	}

	useEffect(() => {
		dispatch(getCities());
	}, []);

	function handleRequestSort(thanaEvent, property) {
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

	function handleSelectAllClick(thanaEvent) {
		if (thanaEvent.target.checked) {
			setSelected(thanas.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateThana(item) {
		localStorage.removeItem('thanaEvent');
		props.history.push(`/apps/thana-management/thanas/${item.id}/${item.name}`);
	}
	function handleDeleteThana(item, thanaEvent) {
		localStorage.removeItem('thanaEvent');
		localStorage.setItem('thanaEvent', thanaEvent);
		props.history.push(`/apps/thana-management/thanas/${item.id}/${item.name}`);
	}

	function handleCheck(thanaEvent, id) {
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
		dispatch(getThanas({ ...parameter, page: handlePage }));
	};

	function handleChangePage(thanaEvent, value) {
		setPage(value);
		setParameter({ ...parameter, page: value + 1 });
		dispatch(getThanas({ ...parameter, page: value - 1 }));
	}

	function handleChangeRowsPerPage(thanaEvent) {
		setRowsPerPage(thanaEvent.target.value);
		setParameter({ ...parameter, size: thanaEvent.target.value });
		dispatch(getThanas({ ...parameter, size: thanaEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (thanas?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no thana!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<ThanasTableHead
						selectedThanaIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={thanas.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== "" && searchThana ? searchThana : thanas,
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
											onClick={thanaEvent => thanaEvent.stopPropagation()}
											onChange={thanaEvent => handleCheck(thanaEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{parameter.page * parameter.size - parameter.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{_.isEmpty(citys) || citys.find(city => city.id === n.city).name}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={thanaEvent => handleUpdateThana(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteThana(n, 'Delete')}
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

export default withRouter(ThanasTable);
