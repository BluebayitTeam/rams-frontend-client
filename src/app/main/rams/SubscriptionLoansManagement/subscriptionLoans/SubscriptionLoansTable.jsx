/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import { Pagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { selectFilteredSubscriptionLoans, useGetSubscriptionLoansQuery } from '../SubscriptionLoansApi';
import SubscriptionLoansTableHead from './SubscriptionLoansTableHead';

/**
 * The subscriptionLoans table.
 */
function SubscriptionLoansTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetSubscriptionLoansQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredSubscriptionLoans(data));
	const subscriptionLoans = useSelector(selectFilteredSubscriptionLoans(data?.loans));
	const subscriptionLoan = useSelector((state) => state.data.subscriptionLoans);
	console.log('subscriptionLoansss', data);
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);

	const [selected, setSelected] = useState([]);

	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);
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
			setSelected(data?.loans.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/subscriptionLoan/subscriptionLoans/${item.id}/${item.handle}`);
	}

	function handleUpdateSubscriptionLoan(item, event) {
		localStorage.removeItem('deleteSubscriptionLoan');
		localStorage.setItem('updateSubscriptionLoan', event);
		navigate(`/apps/subscriptionLoan/subscriptionLoans/${item.id}/${item.handle}`);
	}

	function handleDeleteSubscriptionLoan(item, event) {
		localStorage.removeItem('updateSubscriptionLoan');
		localStorage.setItem('deleteSubscriptionLoan', event);
		navigate(`/apps/subscriptionLoan/subscriptionLoans/${item.id}/${item.handle}`);
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

	if (!data || data.loans.length === 0) {
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
					There are no Payment Details!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full ">
			<Table
				stickyHeader
				className="min-w-xl"
				aria-labelledby="tableTitle"
			>
				<SubscriptionLoansTableHead
					selectedSubscriptionLoanIds={selected}
					tableOrder={tableOrder}
					onSelectAllClick={handleSelectAllClick}
					onRequestSort={handleRequestSort}
					rowCount={data?.loans?.length}
					onMenuItemClick={handleDeselect}
				/>

				<TableBody>
					{_.orderBy(data?.loans, [tableOrder.id], [tableOrder.direction]).map((n) => {
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
									className="p-4 md:p-16"
									component="th"
									scope="row"
									align="left"
									style={{ position: 'sticky', left: 0, zIndex: 1, }}
								>
									{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
								</TableCell>
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
								>
									{n.customer?.first_name} &nbsp;
									{n.customer?.last_name}
								</TableCell>{' '}
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
								>
									{n.customer?.email}
								</TableCell>
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
								>
									{n.customer?.primary_phone}
								</TableCell>{' '}
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
								>
									{n.customer?.client_type?.name}
								</TableCell>
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
								>
									{moment(n.created_at).format('DD-MM-YYYY')}-
									{moment(n.loan_end_date).format('DD-MM-YYYY')}
								</TableCell>
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
								>
									{n.loan_duration_days} Days
								</TableCell>{' '}
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
									style={{ color: n?.paid_from_client ? 'green' : 'red' }}
								>
									<b>{n?.paid_from_client ? 'Paid' : 'Due'}</b>
								</TableCell>
								<TableCell
									className="p-4 md:p-16"
									component="th"
									scope="row"
									align="right"
									style={{ position: 'sticky', right: 0, zIndex: 1, }}
								>
									{!n?.paid_from_client && (
										<Edit
											onClick={(event) =>
												handleUpdateSubscriptionLoan(n, 'updateSubscriptionLoan')
											}
											className="cursor-pointer custom-edit-icon-style"
										/>
									)}

									<Delete
										onClick={(event) => handleDeleteSubscriptionLoan(n, 'deleteSubscriptionLoan')}
										className="cursor-pointer custom-delete-icon-style"
									/>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

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
			</div>
		</div>
	);
}

export default withRouter(SubscriptionLoansTable);
