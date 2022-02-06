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
import PrintIcon from '@material-ui/icons/Print';
import { Pagination } from '@material-ui/lab';
import { rowsPerPageOptions } from 'app/@data/data';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SEARCH_PAYMENTVOUCHER } from '../../../../../constant/constants';
import PrintVoucher from '../../AccountComponents/PrintVoucher';
import { getPaymentVouchers, selectPaymentVouchers } from '../store/paymentVouchersSlice';
import PaymentVouchersTableHead from './PaymentVouchersTableHead';

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

const PaymentVouchersTable = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const paymentVouchers = useSelector(selectPaymentVouchers);
	const searchText = useSelector(
		({ paymentVouchersManagement }) => paymentVouchersManagement.paymentVouchers.searchText
	);
	const [searchPaymentVoucher, setSearchPaymentVoucher] = useState([]);
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
	const totalPages = sessionStorage.getItem('total_paymentVouchers_pages');
	const totalElements = sessionStorage.getItem('total_paymentVouchers_elements');

	const printVoucherRef = useRef();

	useEffect(() => {
		dispatch(getPaymentVouchers(pageAndSize)).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		searchText !== '' ? getSearchPaymentVoucher() : setSearchPaymentVoucher([]);
	}, [searchText]);

	const getSearchPaymentVoucher = () => {
		fetch(`${SEARCH_PAYMENTVOUCHER}?invoice_no=${searchText}`)
			.then(response => response.json())
			.then(searchedPaymentVoucherData => {
				setSearchPaymentVoucher(searchedPaymentVoucherData?.payment_vouchers);
				console.log('searchedPaymentVoucherData', searchedPaymentVoucherData);
			})
			.catch(() => setSearchPaymentVoucher([]));
	};

	function handleRequestSort(_e, property) {
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

	function handleSelectAllClick(paymentVoucherEvent) {
		if (paymentVoucherEvent.target.checked) {
			setSelected((!_.isEmpty(searchPaymentVoucher) ? searchPaymentVoucher : paymentVouchers).map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleUpdatePaymentVoucher(item) {
		localStorage.removeItem('paymentVoucherEvent');
		props.history.push(`/apps/paymentVoucher-management/paymentVouchers/${item.id}/${item.invoice_no}`);
	}
	function handleDeletePaymentVoucher(item, paymentVoucherEvent) {
		localStorage.removeItem('paymentVoucherEvent');
		localStorage.setItem('paymentVoucherEvent', paymentVoucherEvent);
		props.history.push(`/apps/paymentVoucher-management/paymentVouchers/${item.id}/${item.invoice_no}`);
	}

	function handleCheck(_e, id) {
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
	const handlePagination = (_e, handlePage) => {
		setPageAndSize({ ...pageAndSize, page: handlePage });
		setPage(handlePage - 1);
		dispatch(getPaymentVouchers({ ...pageAndSize, page: handlePage }));
	};

	function handleChangePage(_e, value) {
		setPage(value);
		setPageAndSize({ ...pageAndSize, page: value + 1 });
		dispatch(getPaymentVouchers({ ...pageAndSize, page: value + 1 }));
	}

	function handleChangeRowsPerPage(paymentVoucherEvent) {
		setRowsPerPage(paymentVoucherEvent.target.value);
		setPageAndSize({ ...pageAndSize, size: paymentVoucherEvent.target.value });
		dispatch(getPaymentVouchers({ ...pageAndSize, size: paymentVoucherEvent.target.value }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (paymentVouchers?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no paymentVoucher!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<PrintVoucher ref={printVoucherRef} title="Payment Voucher" type="payment" />
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<PaymentVouchersTableHead
						selectedPaymentVoucherIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={(!_.isEmpty(searchPaymentVoucher) ? searchPaymentVoucher : paymentVouchers).length}
						onMenuItemClick={handleDeselect}
						pagination={pageAndSize}
					/>

					<TableBody>
						{_.orderBy(
							searchText !== '' && !_.isEmpty(searchPaymentVoucher)
								? searchPaymentVoucher
								: paymentVouchers,
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
											onClick={paymentVoucherEvent => paymentVoucherEvent.stopPropagation()}
											onChange={paymentVoucherEvent => handleCheck(paymentVoucherEvent, n.id)}
										/>
									</TableCell>

									<TableCell className="w-40 md:w-64" component="th" scope="row">
										{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.branch?.name}
									</TableCell>
									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.invoice_no}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n?.related_ledgers?.toString()}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.sub_ledger?.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{`${n.details || ''}, ${n.ledger?.name || ''}`}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.amount}
									</TableCell>

									<TableCell className="p-4 md:p-16" align="center" component="th" scope="row">
										<div>
											<PrintIcon
												className="cursor-pointer mr-3"
												style={{ color: 'blue' }}
												onClick={() => printVoucherRef.current.doPrint(n)}
											/>
											<EditIcon
												onClick={() => handleUpdatePaymentVoucher(n)}
												className="cursor-pointer"
												style={{ color: 'green' }}
											/>{' '}
											<DeleteIcon
												onClick={() => handleDeletePaymentVoucher(n, 'Delete')}
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

export default withRouter(PaymentVouchersTable);
