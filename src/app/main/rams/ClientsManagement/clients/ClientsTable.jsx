/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import CloseIcon from '@mui/icons-material/Close';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PaidIcon from '@mui/icons-material/Paid';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import {
	getBranches,
	getCities,
	getCountries,
	getDepartments,
	getEmployees,
	getPackages,
	getRoles,
	getThanas
} from 'app/store/dataSlice';
import {
	Autocomplete,
	Card,
	CardContent,
	FormControlLabel,
	Pagination,
	Radio,
	RadioGroup,
	TableCell,
	TextField
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
	BASE_URL,
	CLIENT_URL,
	CREATE_SSL_COMMERZ,
	GET_CLIENT_BY_ID,
	PAYMENT_SUCCESS
} from 'src/app/constant/constants';
import moment from 'moment';
import { rowsPerPageOptions, years, months } from 'src/app/@data/data';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/base';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import ClientsTableHead from './ClientsTableHead';
import { selectFilteredClients, useGetClientsQuery } from '../ClientsApi';

const style = {
	margin: 'auto',
	backgroundColor: 'white',
	width: '1400px',
	height: 'fit-content',
	maxWidth: '940px',
	maxHeight: 'fit-content',
	borderRadius: '20px',
	overflow: 'hidden'
};

function ClientsTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const { reset, formState, watch, control, getValues, setValue } = useForm({
		mode: 'onChange',
		resolver: zodResolver()
	});
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const [openModal, setOpenModal] = useState(false);
	const { data, isLoading, refetch } = useGetClientsQuery({ ...pageAndSize, searchKey });
	const [page, setPage] = useState(0);
	const packages = useSelector((state) => state.data.packages);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const totalData = useSelector(selectFilteredClients(data));
	const clients = useSelector(selectFilteredClients(data?.clients));
	const thanas = useSelector((state) => state.data.thanas);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const departments = useSelector((state) => state.data.departments);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const employee = useSelector((state) => state.data.employees);
	const [singleClientDetails, setSingleClientDetails] = useState({});
	const [clientPackagePrice, setClientPackagePrice] = useState(0);

	const routeParams = useParams();
	const { paymentStaus } = routeParams;
	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);
	useEffect(() => {
		console.log(`paymentStaus`, paymentStaus);

		if (paymentStaus === 'success') {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};

			fetch(`${PAYMENT_SUCCESS}`, authTOKEN)
				.then((response) => response.json())
				.then((data) => {
					refetch({ page, rowsPerPage });
					Swal.fire({
						position: 'top-center',
						icon: 'success',
						title: 'Payment Successfully',
						showConfirmButton: false,
						timer: 3000
					});
				})
				.catch(() => {});
		}
	}, []);

	console.log('paymentStaus', paymentStaus);

	console.log('singleClientDetails', singleClientDetails);

	let serialNumber = 1;

	const [rows, setRows] = useState([]);
	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);
	useEffect(() => {
		if (totalData?.clients) {
			const modifiedRow = [
				{
					id: 'sl',
					align: 'left',
					disablePadding: false,
					label: 'SL',
					sort: true
				}
			];

			Object.entries(totalData.clients[0])
				.filter(([key]) => key !== 'id') // Filter out the 'id' field
				.map(([key, value]) => {
					modifiedRow.push({
						id: key,
						label: key
							.split('_')
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' '),
						align: 'left',
						disablePadding: false,
						sort: true,
						style: { whiteSpace: 'nowrap' }
					});
				});

			// modifiedRow.push({
			// 	id: 'payemnt',
			// 	align: 'left',
			// 	disablePadding: false,
			// 	label: 'Payment',
			// 	sort: true
			// });
			modifiedRow.push({
				id: 'action',
				align: 'left',
				disablePadding: false,
				label: 'Action',
				sort: true
			});

			setRows(modifiedRow);
		}
	}, [totalData?.clients]);
	const [open, setOpen] = useState(false);

	console.log('open', open);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {}
	});
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	useEffect(() => {
		dispatch(getBranches());
		dispatch(getThanas());
		dispatch(getRoles());
		dispatch(getPackages());
		dispatch(getDepartments());
		dispatch(getCities());
		dispatch(getCountries());
		dispatch(getEmployees());
	}, []);

	const handleGetClientInformation = (n) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${GET_CLIENT_BY_ID}${n?.id}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setClientPackagePrice(data?.package_price);
				reset({
					...data,
					month_or_year: 'month',
					no_of_month: '1',
					total_price: data?.package_price,
					success_url: `${CLIENT_URL}/apps/client/clients`
				});
			})
			.catch(() => {});
	};
	const handlePayment = (e) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		fetch(`${CREATE_SSL_COMMERZ}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			},
			// Optionally, you can pass any data in the body if required
			body: JSON.stringify({
				package_type: getValues()?.package_type,
				id: getValues()?.id,
				no_of_month: Number(getValues()?.no_of_month)
			})
		})
			.then((response) => response.json())
			.then((data) => {
				debugger;
				// reset({ ...data, total_price: data?.package_price });
				console.log(`jfsdkjsdbf`, data?.payment_url);
				// window.location.replace(data?.payment_url);
				window.open(data?.payment_url);
			})
			.catch(() => {
				// Handle errors here
			});
	};
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
			setSelected(clients.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/client/clients/${item.id}/${item.handle}`);
	}

	function handleUpdateClient(item, event) {
		localStorage.removeItem('deleteClient');
		localStorage.setItem('updateClient', event);
		navigate(`/apps/client/clients/${item.id}/${item.handle}`);
	}

	function handleDeleteClient(item, event) {
		localStorage.removeItem('updateClient');
		localStorage.setItem('deleteClient', event);
		navigate(`/apps/client/clients/${item.id}/${item.handle}`);
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

	if (clients?.length === 0) {
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
					There are no clients!
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
					<ClientsTableHead
						selectedClientIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={clients?.length}
						onMenuItemClick={handleDeselect}
						rows={rows}
					/>

					<TableBody>
						{_.orderBy(clients, [tableOrder.id], [tableOrder.direction])
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n) => {
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
										{Object.entries(n).map(
											([key, value]) =>
												key !== 'id' && (
													<TableCell
														className="p-4 md:p-16"
														component="th"
														scope="row"
														key={key}
													>
														{key === 'logo' && n[key] ? (
															<img
																className="h-full block rounded"
																style={{ borderRadius: '30px' }}
																width="60px"
																height="60px"
																src={`${BASE_URL}${n[key]}`}
																alt={n.first_name}
															/>
														) : key === 'payment_valid_until' && n[key] ? (
															moment(new Date(n[key])).format('DD-MM-YYYY')
														) : (key === 'is_debtor' || key === 'is_paid') &&
														  n[key] !== undefined ? (
															n[key] ? (
																'Yes'
															) : (
																'No'
															)
														) : (
															value
														)}
													</TableCell>
												)
										)}

										<TableCell
											className="p-4 md:p-16 whitespace-nowrap"
											component="th"
											scope="row"
											align="right"
											style={{ position: 'sticky', right: 0, zIndex: 1, backgroundColor: '#fff' }}
										>
											<PaidIcon
												onClick={() => {
													handleGetClientInformation(n);
													handleOpen();
												}}
												className="cursor-pointer"
												style={{ color: 'green', marginLeft: '5%', fontSize: '30px' }}
											/>
											<Edit
												onClick={(event) => handleUpdateClient(n, 'updateClient')}
												className="cursor-pointer custom-edit-icon-style"
											/>

											<Delete
												onClick={(event) => handleDeleteClient(n, 'deleteClient')}
												className="cursor-pointer custom-delete-icon-style"
											/>
										</TableCell>
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
			<div>
				<Modal
					open={open}
					onClose={() => {
						setSingleClientDetails({});
						handleClose();
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Card
						style={{ marginTop: '100px' }}
						sx={style}
					>
						<CardContent>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography
									className="text-center m-10"
									variant="h5"
									component="div"
								>
									Payment Details
								</Typography>
								<CloseIcon
									onClick={(event) => {
										setSingleClientDetails({});
										setOpen(false);
									}}
									className="cursor-pointer custom-delete-icon-style"
									// style={{ color: 'red' }}
								/>
							</div>
							<FormProvider {...methods}>
								<Controller
									name="first_name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mt-8 mb-16 w-1/2 px-4"
											InputProps={{
												readOnly: true
											}}
											label="First Name"
											autoFocus
											id="first_name"
											variant="outlined"
											fullWidth
										/>
									)}
								/>
								<Controller
									name="last_name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mt-8 mb-16 w-1/2 px-4"
											InputProps={{
												readOnly: true
											}}
											label="Last Name"
											autoFocus
											id="last_name"
											variant="outlined"
											fullWidth
										/>
									)}
								/>{' '}
								<Controller
									name="rl_no"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mt-8 mb-16 w-1/2 px-4"
											InputProps={{
												readOnly: true
											}}
											label="RL No"
											autoFocus
											id="rl_no"
											variant="outlined"
											fullWidth
										/>
									)}
								/>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mt-8 mb-16 w-1/2 px-4"
											type="text"
											InputLabelProps={
												field.value ? { shrink: true } : { style: { color: 'red' } }
											}
											InputProps={{
												readOnly: true
											}}
											label="Email"
											variant="outlined"
											fullWidth
										/>
									)}
								/>
								<Controller
									name="package_type"
									control={control}
									render={({ field: { onChange, value } }) => (
										<Autocomplete
											className="mt-8 mb-16"
											freeSolo
											disabled
											value={value ? packages.find((packag) => packag.id === value) : null}
											options={packages}
											getOptionLabel={(option) =>
												`${option.name}-${option.price} Taka(Per Month)`
											}
											onChange={(event, newValue) => {
												onChange(newValue?.id);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder="Select a Package"
													label="Selected Package"
													variant="outlined"
													InputLabelProps={{
														shrink: true
													}}
													InputProps={{
														readOnly: true
													}}
												/>
											)}
										/>
									)}
								/>
								<Controller
									name="month_or_year"
									control={control}
									defaultValue="" // Set the default value here
									render={({ field }) => (
										<RadioGroup
											{...field}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											style={{ display: 'flex', flexDirection: 'row' }}
										>
											<FormControlLabel
												value="month"
												control={<Radio />}
												label="Month"
											/>
											<FormControlLabel
												value="year"
												control={<Radio />}
												label="Year"
											/>
										</RadioGroup>
									)}
								/>
								<Controller
									name="no_of_month"
									control={control}
									render={({ field: { onChange, value } }) => (
										<Autocomplete
											className="mt-8 mb-16 w-1/2 px-4"
											freeSolo
											value={
												value
													? watch('month_or_year') === 'year'
														? years.find((year) => year.id === value)
														: months.find((month) => month.id === value)
													: null
											}
											options={watch('month_or_year') === 'year' ? years : months}
											getOptionLabel={(option) => option.name}
											onChange={(event, newValue) => {
												onChange(newValue?.id);
												setValue(
													'total_price',
													parseInt(newValue?.id) * parseInt(clientPackagePrice)
												);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder={`Select ${watch('month_or_year') === 'year' ? 'Year' : 'Month'}`}
													label={`Select ${watch('month_or_year') === 'year' ? 'Year' : 'Month'}`}
													variant="outlined"
													InputLabelProps={{
														shrink: true
													}}
												/>
											)}
										/>
									)}
								/>
								<Controller
									name="total_price"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mt-8 mb-16 w-1/2 px-4"
											InputProps={{
												readOnly: true
											}}
											label="Total Price"
											autoFocus
											id="total_price"
											variant="outlined"
											fullWidth
										/>
									)}
								/>
								<div className="text-center ">
									<div className=" items-center  mr-32">
										<Button
											className="whitespace-nowrap px-10 rounded"
											variant="contained"
											color="secondary"
											style={{ backgroundColor: '#22d3ee', height: '35px' }}
											onClick={handlePayment}
										>
											Payment
										</Button>
									</div>
								</div>
							</FormProvider>
						</CardContent>
					</Card>
				</Modal>
			</div>
		</div>
	);
}

export default withRouter(ClientsTable);
