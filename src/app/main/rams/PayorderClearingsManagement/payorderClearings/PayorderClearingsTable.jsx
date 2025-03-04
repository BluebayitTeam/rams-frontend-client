/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Button, Card, CardContent, Modal, Pagination, TableContainer, TextField } from '@mui/material';
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
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import { postDateTypes, rowsPerPageOptions } from 'src/app/@data/data';
import { UPDATE_PAYORDER_CLEARING } from 'src/app/constant/constants';
import { selectFilteredPayorderClearings, useGetPayorderClearingsQuery } from '../PayorderClearingsApi';
import PayorderClearingsTableHead from './PayorderClearingsTableHead';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		overflow: 'auto',
		minHeight: '35px'
	},
	toolbar: {
		'& > div': {
			minHeight: 'fit-content'
		}
	},
	modal: {
		margin: 'auto',
		backgroundColor: 'white',
		width: 'fit-content',
		height: 'fit-content',
		// maxWidth: '400px',
		// maxHeight: '400px',
		borderRadius: '20px',
		overflow: 'scroll'
	},
	paginationRoot: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'fixed',
		bottom: 12,
		padding: '0px 20px 10px 20px',

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

function PayorderClearingsTable(props) {
	const classes = useStyles();

	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {}
	});
	const { control, formState, setValue, getValues, watch } = methods || {};
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetPayorderClearingsQuery({ ...pageAndSize, searchKey });
	const totalData = useSelector(selectFilteredPayorderClearings(data));
	const payorderClearings = useSelector(selectFilteredPayorderClearings(data?.payorder_clearings));
	let serialNumber = 1;
	const [payorderData, setPayorderData] = useState();
	const [openModal, setOpenModal] = useState(false);

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
			setSelected(payorderClearings.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/payorderClearing/payorderClearings/${item.id}/${item.handle}`);
	}

	function handleUpdatePayorderClearing(item, event) {
		localStorage.removeItem('deletePayorderClearing');
		localStorage.setItem('updatePayorderClearing', event);
		navigate(`/apps/payorderClearing/payorderClearings/${item.id}/${item.handle}`);
	}

	function handleDeletePayorderClearing(item, event) {
		localStorage.removeItem('updatePayorderClearing');
		localStorage.setItem('deletePayorderClearing', event);
		navigate(`/apps/payorderClearing/payorderClearings/${item.id}/${item.handle}`);
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

	if (payorderClearings?.length === 0) {
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
					There are no Payorder Clearings!
				</Typography>
			</motion.div>
		);
	}

	function handleUpdatePayorder() {
		const data = getValues();
		data.status = getValues().status;
		data.id = payorderData?.id;
		data.invoice_no = payorderData?.invoice_no;
		data.cheque_date = getValues().cheque_date;
		data.note = getValues().note;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const response = axios.put(`${UPDATE_PAYORDER_CLEARING}${payorderData.id}`, data, authTOKEN);

		response.then((result) => {
			const status = result?.status;

			if (status === 200) {
				// localStorage.setItem('donationAssignAlert', 'updateDonationAssign');
				setOpenModal(false);
				refetch({ page, rowsPerPage });
				setPayorderData('');
			}
		});
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
						<PayorderClearingsTableHead
							selectedPayorderClearingIds={selected}
							tableOrder={tableOrder}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={payorderClearings.length}
							onMenuItemClick={handleDeselect}
						/>

						<TableBody>
							{_.orderBy(payorderClearings, [tableOrder.id], [tableOrder.direction]).map((n) => {
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
										{/* <TableCell
										className="w-40 md:w-64 text-center"
										padding="none"
										style={{
											position: 'sticky',
											left: 0,
											zIndex: 1,
											 
										}}
									>
										<Checkbox
											checked={isSelected}
											onClick={(event) => event.stopPropagation()}
											onChange={(event) => handleCheck(event, n.id)}
										/>
									</TableCell> */}
										<TableCell
											className="w-40 md:w-64"
											component="th"
											scope="row"
											style={{
												position: 'sticky',
												left: 0,
												zIndex: 1,

											}}
										>
											{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
										</TableCell>
										<TableCell
											className="whitespace-nowrap	    "
											component="th"
											scope="row"
										>
											{n.cheque_date && moment(new Date(n.cheque_date)).format('DD-MM-YYYY')}{' '}
										</TableCell>
										<TableCell
											className="whitespace-nowrap	    "
											component="th"
											scope="row"
										>
											{n.invoice_no}
										</TableCell>
										<TableCell
											className=""
											component="th"
											scope="row"
										>
											{n.type}
										</TableCell>{' '}
										<TableCell
											className=""
											component="th"
											scope="row"
										>
											{n.receipt_account?.name}
										</TableCell>
										<TableCell
											whitespace-nowrap
											className="p-4 md:p-16"
											component="th"
											scope="row"
											padding="none"
											onClick={() => {
												if (n.status === 'cheque_done') {
													setOpenModal(false);
												} else {
													setOpenModal(true);
													setValue('status', n?.status);
													setValue('cheque_date', n?.cheque_date);
													setValue('note', n?.note ? n?.note : '');

													setPayorderData(n);
												}
											}}
										>
											<div
												className={clsx(
													'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white',
													n.status === ('pending' || 'Pending')
														? 'bg-orange'
														: n.status === ('approved' || 'Approved')
															? 'bg-green'
															: n.status === ('rejected' || 'Rejected')
																? 'bg-red'
																: ''
												)}
											>
												{n.status === ('pending' || 'Pending')
													? 'Pending'
													: n.status === ('approved' || 'Approved')
														? 'Honoured'
														: n.status === ('rejected' || 'Rejected')
															? 'Rejected'
															: ''}
											</div>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</FuseScrollbars>

			<div className={classes.paginationRoot} id="pagiContainer">
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

			{/* Status Update by Modal  */}

			<Modal
				open={openModal}
				className={classes.modal}
				onClose={() => {
					setOpenModal(false);
				}}
				keepMounted
			>
				<div>
					<Card style={{ marginBottom: '10px' }}>
						<CardContent>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography
									className="text-center m-10"
									variant="h5"
									component="div"
								>
									Application Status
								</Typography>
								<CloseIcon
									onClick={(event) => setOpenModal(false)}
									className="cursor-pointer custom-delete-icon-style"
								// style={{ color: 'red' }}
								/>
							</div>
							<FormProvider {...methods}>
								<Controller
									name="status"
									control={control}
									render={({ field: { onChange, value } }) => (
										<Autocomplete
											className="mt-8 mb-16"
											freeSolo
											options={postDateTypes}
											value={value ? postDateTypes.find((data) => data.id == value) : null}
											getOptionLabel={(option) => `${option.name}`}
											onChange={(event, newValue) => {
												onChange(newValue?.id);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder="Select Status"
													label="Status"
													variant="outlined"
													InputLabelProps={{
														shrink: true
													}}
												/>
											)}
										/>
									)}
								/>

								<CustomDatePicker
									name="cheque_date"
									label="Cheque Date"
									required
									placeholder="DD-MM-YYYY"
								/>

								<Controller
									name="note"
									control={control}
									render={({ field }) => {
										return (
											<TextField
												{...field}
												className="mt-8 mb-16"
												// error={!!errors.name || !field.value}
												label="Remarks"
												id="note"
												variant="outlined"
												InputLabelProps={field.value && { shrink: true }}
												fullWidth
											/>
										);
									}}
								/>
								<div className="flex justify-center items-center mr-32">
									<Button
										className='whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'
										variant="contained"
										color="secondary"
										// disabled={!name || _.isEmpty(name)}
										onClick={handleUpdatePayorder}
									>
										Update
									</Button>
								</div>
							</FormProvider>
						</CardContent>
					</Card>
				</div>
			</Modal>
		</div>
	);
}

export default withRouter(PayorderClearingsTable);
