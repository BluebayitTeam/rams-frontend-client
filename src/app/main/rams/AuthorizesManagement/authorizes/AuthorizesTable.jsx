/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Cancel, PlaylistAddCheck } from '@mui/icons-material';
import { Pagination, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { UPDATE_AUTHORIZE_APPROVED, UPDATE_AUTHORIZE_CANCEL } from 'src/app/constant/constants';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { selectFilteredAuthorizes, useGetAuthorizesQuery } from '../AuthorizesApi';
import AuthorizesTableHead from './AuthorizesTableHead';

/**
 * The authorizes table.
 */
const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'fixed',
		bottom: 12,
		padding: '0px 20px 10px 20px',

		backgroundColor: '#fff',
		zIndex: 1000,
		borderTop: '1px solid #ddd',
		width: 'calc(100% - 350px)',
	},
	paginationContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		padding: '0 20px',
	},
	pagination: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},
}));

function AuthorizesTable(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { navigate, searchKey } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetAuthorizesQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredAuthorizes(data));
	const authorizes = useSelector(selectFilteredAuthorizes(data?.acc_update_perms));
	const [openPendingStatusAlert, setOpenPendingStatusAlert] = useState(false);
	const [openSuccessStatusAlert, setOpenSuccessStatusAlert] = useState(false);
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
			setSelected(authorizes.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/authorize/authorizes/${item.id}/${item.handle}`);
	}

	function handleUpdateAuthorize(item, event) {
		localStorage.removeItem('deleteAuthorize');
		localStorage.setItem('updateAuthorize', event);
		navigate(`/apps/authorize/authorizes/${item.id}/${item.handle}`);
	}

	function handleDeleteAuthorize(item, event) {
		localStorage.removeItem('updateAuthorize');
		localStorage.setItem('deleteAuthorize', event);
		navigate(`/apps/authorize/authorizes/${item.id}/${item.handle}`);
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

	async function handleUpdatePayableBillStatusApproved(id) {
		// eslint-disable-next-line no-alert
		setOpenSuccessStatusAlert(true);

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		await axios.get(`${UPDATE_AUTHORIZE_APPROVED}${id}`, authTOKEN);

		refetch();
	}

	async function handleUpdatePayableBillStatusCancel(id) {
		// eslint-disable-next-line no-alert
		setOpenPendingStatusAlert(true);

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		await axios.get(`${UPDATE_AUTHORIZE_CANCEL}${id}`, authTOKEN);

		refetch();
		//   props.history.push(`/payableBill-management/payableBills/${invoice_no}`);
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

	if (authorizes?.length === 0) {
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
					There are no authorizes!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full px-10">
			<FuseScrollbars className="grow overflow-x-auto">
				<TableContainer
					sx={{
						height: 'calc(100vh - 248px)',
						overflowY: 'auto',
					}}>
					<Table
						stickyHeader
						className="min-w-xl"
						aria-labelledby="tableTitle"
					>
						<AuthorizesTableHead
							selectedAuthorizeIds={selected}
							tableOrder={tableOrder}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={authorizes.length}
							onMenuItemClick={handleDeselect}
						/>

						<TableBody>
							{_.orderBy(authorizes, [tableOrder.id], [tableOrder.direction]).map((n) => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className='h-20 cursor-pointer border-t-1  border-gray-200'
										hover
										role='checkbox'
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}>
										{/* <TableCell
                    className='w-40 md:w-64 text-center'
                    padding='none'
                    style={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 1, backgroundColor: '#fff',
                       
                    }}>
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell> */}

										<TableCell
											className='w-40 md:w-64 border-t-1  border-gray-200'
											component='th'
											scope='row'
											style={{
												position: 'sticky',
												left: 0,
												zIndex: 1, backgroundColor: '#fff',

											}}>
											{pageAndSize.page * pageAndSize.size -
												pageAndSize.size +
												serialNumber++}
										</TableCell>
										<TableCell className='p-4 md:p-16 border-t-1  border-gray-200' component='th' scope='row'>
											{n.user?.username}
										</TableCell>
										<TableCell className='p-4 md:p-16 border-t-1  border-gray-200' component='th' scope='row'>
											{moment(new Date(n?.request_date)).format('DD-MM-YYYY')}
										</TableCell>
										<TableCell className='p-4 md:p-16 border-t-1  border-gray-200' component='th' scope='row'>
											{n?.invoice_type === 'payment_voucher'
												? 'Payment Voucher'
												: n?.invoice_type === 'receipt_voucher'
													? 'Receipt Voucher'
													: n?.invoice_type === 'purchase'
														? 'Payable Bill'
														: n?.invoice_type === 'sales'
															? 'Receivable Bill'
															: n?.invoice_type === 'contra'
																? 'Contra'
																: n?.invoice_type === 'journal'
																	? 'Journal'
																	: n?.invoice_type === 'idjournal'
																		? 'ID Journal'
																		: n?.invoice_type === 'welfarefundreceipt'
																			? 'Welfare Fund Receipt'
																			: n?.invoice_type === 'renewalreceipt'
																				? 'Member Renewal Receipt'
																				: n?.invoice_type === 'donationpayment'
																					? 'Financial Assistance & WSP Payment'
																					: n?.invoice_type === 'treatmentpayment'
																						? 'Treatment Payment'
																						: n?.invoice_type === 'compensation'
																							? 'Compensation Payment'
																							: n?.invoice_type === 'financialassistancepayment'
																								? 'Financial Assistance Payment'
																								: n?.invoice_type === 'malaysiawelfarefundreceipt'
																									? 'Malaysia Welfre Fund Receipt'
																									: ''}
											{/* {capital_letter(n?.invoice_type.replaceAll('_', ' '))} */}
										</TableCell>
										<TableCell className='p-4 md:p-16 border-t-1  border-gray-200' component='th' scope='row'>
											{n?.invoice_no}
										</TableCell>
										<TableCell className='p-4 md:p-16 border-t-1  border-gray-200' component='th' scope='row'>
											{n?.amount}
										</TableCell>
										<TableCell className='p-4 md:p-16 border-t-1  border-gray-200' component='th' scope='row'>
											<div
												className={clsx(
													'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white',
													n.status === 'update_pending' || n.status === 'delete_pending'
														? 'bg-orange'
														: n.status === 'update_approved' || n.status === 'delete_approved'
															? 'bg-green'
															: n.status === 'update_canceled' || n.status === 'delete_canceled'
																? 'bg-red'
																: ''
												)}
											>
												{n.status === 'update_pending'
													? 'Update Pending'
													: n.status === 'update_approved'
														? 'Update Approved'
														: n.status === 'update_canceled'
															? 'Update Rejected'
															: n.status === 'delete_canceled'
																? 'Delete Rejected'
																: n.status === 'delete_approved'
																	? 'Delete Approved'
																	: n.status === 'delete_pending'
																		? 'Delete Pending'
																		: ''}
											</div>
										</TableCell>
										<TableCell
											className='p-4 md:p-16 border-t-1  border-gray-200'
											component='th'
											scope='row'
											align='right'
											style={{
												position: 'sticky',
												right: 0,
												zIndex: 1, backgroundColor: '#fff',

											}}>
											{hasPermission('ACCOUNT_UPDATE_PERMISSION_UPDATE') &&
												(n?.status === 'update_approved' || n?.status === 'delete_approved' ? (
													<PlaylistAddCheck
														className="cursor-pointer"
														style={{ color: '#b1d9b1', marginRight: '10px' }}
													/>
												) : (
													<PlaylistAddCheck
														className="cursor-pointer custom-approved-icon-style"
														style={{ marginRight: '10px' }}
														onClick={() => handleUpdatePayableBillStatusApproved(n?.id)}
													/>
												))}

											{hasPermission('ACCOUNT_UPDATE_PERMISSION_DELETE') &&
												(n?.status === 'delete_canceled' || n?.status === 'update_canceled' ? (
													<Cancel
														onClick={() => handleUpdatePayableBillStatusCancel(n?.id)}
														className="cursor-pointer "
														style={{ color: '#f1a3a3' }}
													/>
												) : (
													<Cancel
														onClick={() => handleUpdatePayableBillStatusCancel(n?.id)}
														className="cursor-pointer custom-rejected-icon-style"
													// style={{ color: 'red' }}
													/>
												))}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</FuseScrollbars>

			<div className={classes.root} id="pagiContainer">
				<Pagination
					classes={{ ul: 'flex-nowrap' }}
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

export default withRouter(AuthorizesTable);
