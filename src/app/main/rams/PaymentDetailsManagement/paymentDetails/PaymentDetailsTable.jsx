/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
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
import { selectFilteredPaymentDetails, useGetPaymentDetailsQuery } from '../PaymentDetailsApi';
import PaymentDetailsTableHead from './PaymentDetailsTableHead';

/**
 * The paymentDetails table.
 */
function PaymentDetailsTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetPaymentDetailsQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredPaymentDetails(data));
	const paymentDetails = useSelector(selectFilteredPaymentDetails(data?.payments));
	const paymentDetail = useSelector((state) => state.data.paymentDetails);
	console.log('paymentDetailsss', data);
	let serialNumber = 1;

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
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
			setSelected(data?.payments.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/paymentDetail/paymentDetails/${item.id}/${item.handle}`);
	}

	function handleUpdatePaymentDetail(item, event) {
		localStorage.removeItem('deletePaymentDetail');
		localStorage.setItem('updatePaymentDetail', event);
		navigate(`/apps/paymentDetail/paymentDetails/${item.id}/${item.handle}`);
	}

	function handleDeletePaymentDetail(item, event) {
		localStorage.removeItem('updatePaymentDetail');
		localStorage.setItem('deletePaymentDetail', event);
		navigate(`/apps/paymentDetail/paymentDetails/${item.id}/${item.handle}`);
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

	if (!data || data.payments.length === 0) {
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
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table
					stickyHeader
					className="min-w-xl"
					aria-labelledby="tableTitle"
				>
					<PaymentDetailsTableHead
						selectedPaymentDetailIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data?.payments?.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(data?.payments, [tableOrder.id], [tableOrder.direction]).map((n) => {
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
										style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff', }}
									>
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>
									<TableCell
										className="p-4 md:p-16 whitespace-nowrap"
										component="th"
										scope="row"
									>
										{moment(n.created_at).format('DD-MM-YYYY')}
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.invoice_no}
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.customer?.first_name} {n.customer?.last_name}- {n.customer?.rl_no}
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.customer?.email}
									</TableCell>{' '}
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
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n.amount}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.payment_type}
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.paymentdetail_set?.account_type}
									</TableCell>{' '}
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.paymentdetail_set?.transection_id}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.paymentdetail_set?.account_number}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.billingaddress_set?.address},{n?.billingaddress_set?.city}-
										{n?.billingaddress_set?.zipcode},{n?.billingaddress_set?.country},
									</TableCell>
									{/* <TableCell
											className="p-4 md:p-16"
											component="th"
											scope="row"
											align="right"
										>
											<Edit
												onClick={(event) => handleUpdatePaymentDetail(n, 'updatePaymentDetail')}
												className="cursor-pointer custom-edit-icon-style"
											/>

											<Delete
												onClick={(event) => handleDeletePaymentDetail(n, 'deletePaymentDetail')}
												className="cursor-pointer custom-delete-icon-style"
											/>
										</TableCell> */}
								</TableRow>
							);
						})}
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

export default withRouter(PaymentDetailsTable);
