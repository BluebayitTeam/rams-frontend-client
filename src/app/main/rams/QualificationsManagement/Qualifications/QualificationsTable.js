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
import { rowsPerPageOptions } from 'app/@data/@data';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_QUALIFICATON } from '../../../../constant/constants';
import { getEmployees } from '../../../../store/dataSlice';
import { getQualifications, selectQualifications } from '../store/qualificationsSlice';
import QualificationsTableHead from './QualificationsTableHead';

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

const QualificationsTable = props => {
	const dispatch = useDispatch();
	const employees = useSelector(state => state.data.employees);
	const qualifications = useSelector(selectQualifications);
	const searchText = useSelector(
		({ qualificationsManagement }) => qualificationsManagement.qualifications.searchText
	);
	const [searchQualificaton, setSearchQualification] = useState([]);
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
	const totalPages = sessionStorage.getItem('qualifications_total_pages');
	const totalElements = sessionStorage.getItem('qualifications_total_elements');
	const classes = useStyles();

	useEffect(() => {
		dispatch(getQualifications(parameter)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getEmployees());
	}, []);


	//search qualification
	useEffect(() => {
		searchText ? getSearchQualificaton() : setSearchQualification([]);
	}, [searchText])

	const getSearchQualificaton = () => {
		fetch(`${SEARCH_QUALIFICATON}?degree_name=${searchText}`)
			.then(response => response.json())
			.then(searchedQualificationData => {
				setSearchQualification(searchedQualificationData.qualifications);
				console.log("searchedQualificationData", searchedQualificationData)
			})
			.catch(() => setSearchQualification([]))
	}

	function handleRequestSort(qualificationEvent, property) {
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

	function handleSelectAllClick(qualificationEvent) {
		if (qualificationEvent.target.checked) {
			setSelected(qualifications.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateQualification(item) {
		localStorage.removeItem('qualificationEvent');
		props.history.push(`/apps/qualification-management/qualifications/${item.id}/${item.degree_name}`);
	}
	function handleDeleteQualification(item, qualificationEvent) {
		localStorage.removeItem('qualificationEvent');
		localStorage.setItem('qualificationEvent', qualificationEvent);
		props.history.push(`/apps/qualification-management/qualifications/${item.id}/${item.degree_name}`);
	}

	function handleCheck(qualificationEvent, id) {
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
		dispatch(getQualifications({ ...parameter, page: handlePage }));
	};

	function handleChangePage(qualificationEvent, value) {
		setPage(value);
		setParameter({ ...parameter, page: value + 1 });
		dispatch(getQualifications({ ...parameter, page: value - 1 }));
	}

	function handleChangeRowsPerPage(qualificationEvent) {
		setRowsPerPage(qualificationEvent.target.value);
		setParameter({ ...parameter, size: qualificationEvent.target.value });
		dispatch(getQualifications({ ...parameter, size: qualificationEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (qualifications?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no qualification!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<QualificationsTableHead
						selectedQualificationIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={qualifications.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== "" && !_.isEmpty(searchQualificaton) ? searchQualificaton : qualifications,
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
											onClick={qualificationEvent => qualificationEvent.stopPropagation()}
											onChange={qualificationEvent => handleCheck(qualificationEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{parameter.page * parameter.size - parameter.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{_.isEmpty(employees) ||
											employees.find(employee => employee.id === n.employee_id).first_name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.degree_name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.passign_year}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.board}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.institute_name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.grade}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={qualificationEvent => handleUpdateQualification(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteQualification(n, 'Delete')}
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

export default withRouter(QualificationsTable);
