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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BASE_URL, SEARCH_AGENT } from '../../../../constant/constants';
import { getAgents, selectAgents } from '../store/agentsSlice';
import AgentsTableHead from './AgentsTableHead';

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

const AgentsTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const agents = useSelector(selectAgents);
	const searchText = useSelector(({ agentsManagement }) => agentsManagement.agents.searchText);
	const [searchAgent, setSearchAgent] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_agents_pages');
	const totalElements = sessionStorage.getItem('total_agents_elements');

	useEffect(() => {
		dispatch(getAgents(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText !== '' && getSearchAgent();
	}, [searchText]);

	const getSearchAgent = () => {
		fetch(`${SEARCH_AGENT}?name=${searchText}`)
			.then(response => response.json())
			.then(searchedAgentData => {
				setSearchAgent(searchedAgentData?.agents);
				console.log('searchedAgentData', searchedAgentData);
			})
			.catch(() => setSearchAgent([]));
	};

	function handleRequestSort(agentEvent, property) {
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

	function handleSelectAllClick(agentEvent) {
		if (agentEvent.target.checked) {
			setSelected(agents.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdateAgent(item) {
		localStorage.removeItem('agentEvent');
		props.history.push(`/apps/agent-management/agents/${item.id}/${item.name}`);
	}
	function handleDeleteAgent(item, agentEvent) {
		localStorage.removeItem('agentEvent');
		localStorage.setItem('agentEvent', agentEvent);
		props.history.push(`/apps/agent-management/agents/${item.id}/${item.name}`);
	}

	function handleCheck(agentEvent, id) {
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
		dispatch(getAgents({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(event, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getAgents({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(agentEvent) {
		setRowsPerPage(agentEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: agentEvent.target.value });
		dispatch(getAgents({ ...pageAndSize, size: agentEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (agents?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no agent!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<AgentsTableHead
						selectedAgentIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={agents.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchAgent) ? searchAgent : agents,
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
											onClick={agentEvent => agentEvent.stopPropagation()}
											onChange={agentEvent => handleCheck(agentEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell
										className="w-52 px-4 md:px-0 h-72"
										component="th"
										scope="row"
										padding="none"
									>
										{n.length > 0 && n.featuredImageId ? (
											<img
												className="h-full block rounded p-8"
												style={{ borderRadius: '15px' }}
												src={_.find(n.image, { id: n.featuredImageId }).url}
												alt={n.name}
											/>
										) : (
											<img
												className="h-full block rounded p-8"
												style={{ borderRadius: '15px' }}
												src={`${BASE_URL}${n.image}`}
												alt={n.name}
											/>
										)}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.gender}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.role}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.thana}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.city}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.country}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.group}
                                        </TableCell>



                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.first_name}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.last_name}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.father_name}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.mother_name}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.username}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.email}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.primary_phone}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.secondary_phone}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.user_type}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.street_address_one}
									</TableCell>

									{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.street_address_two}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.postal_code}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.nid}
                                        </TableCell> */}

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<EditIcon
												onClick={agentEvent => handleUpdateAgent(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={event => handleDeleteAgent(n, 'Delete')}
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

export default withRouter(AgentsTable);
