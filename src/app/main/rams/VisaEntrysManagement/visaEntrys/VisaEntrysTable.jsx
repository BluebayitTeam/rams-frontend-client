/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
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
import { Pagination, TableCell } from '@mui/material';
import { Delete, Edit, PictureAsPdf } from '@mui/icons-material';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router';
import { BASE_URL } from 'src/app/constant/constants';
import moment from 'moment';
import VisaEntrysTableHead from './VisaEntrysTableHead';
import { selectFilteredVisaEntrys, useGetVisaEntrysQuery } from '../VisaEntrysApi';

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

function VisaEntrysTable(props) {
	const dispatch = useDispatch();
	const { navigate, searchKey } = props;
	const { reset, formState, watch, control, getValues, setValue } = useForm({
		mode: 'onChange',
		resolver: zodResolver()
	});
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const [openModal, setOpenModal] = useState(false);
	const { data, isLoading, refetch } = useGetVisaEntrysQuery({
		...pageAndSize,
		searchKey
	});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const totalData = useSelector(selectFilteredVisaEntrys(data));
	const visaEntrys = useSelector(selectFilteredVisaEntrys(data?.visa_entries));
	const thanas = useSelector((state) => state.data.thanas);
	const branches = useSelector((state) => state.data.branches);
	const roles = useSelector((state) => state.data.roles);
	const departments = useSelector((state) => state.data.departments);
	const cities = useSelector((state) => state.data.cities);
	const countries = useSelector((state) => state.data.countries);
	const employee = useSelector((state) => state.data.employees);
	const [singleVisaEntryDetails, setSingleVisaEntryDetails] = useState({});
	const [visaEntryPackagePrice, setVisaEntryPackagePrice] = useState(0);

	const routeParams = useParams();
	const { paymentStaus } = routeParams;
	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);
	useEffect(() => {
		refetch({ searchKey });
	}, []);
	let serialNumber = 1;

	const [rows, setRows] = useState([]);
	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);

	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, []);
	useEffect(() => {
		if (totalData?.visa_entries) {
			const modifiedRow = [
				{
					id: 'sl',
					align: 'left',
					disablePadding: false,
					label: 'SL',
					sort: true
				}
			];

			Object.entries(totalData?.visa_entries[0] || {})
				.filter(([key]) => key !== 'id' && key !== 'random_number') // Filter out the 'id' field
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

			modifiedRow.push({
				id: 'action',
				align: 'left',
				disablePadding: false,
				label: 'Action',
				sort: true
			});

			setRows(modifiedRow);
		}
	}, [totalData?.visaEntrys, visaEntrys]);
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
			setSelected(visaEntrys.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/visaEntry/visaEntrys/${item.id}/${item.handle}`);
	}

	function handleUpdateVisaEntry(item, event) {
		localStorage.removeItem('deleteVisaEntry');
		localStorage.setItem('updateVisaEntry', event);
		navigate(`/apps/visaEntry/visaEntrys/${item.id}/${item.handle}`);
	}

	function handleDeleteVisaEntry(item, event) {
		localStorage.removeItem('updateVisaEntry');
		localStorage.setItem('deleteVisaEntry', event);
		navigate(`/apps/visaEntry/visaEntrys/${item.id}/${item.handle}`);
	}

	// console.log('testDelete', handleDeleteVisaEntry);

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

	if (visaEntrys?.length === 0) {
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
					There are no visaEntrys!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full px-10 ">
			<FuseScrollbars className="grow overflow-x-auto ">
				<Table
					stickyHeader
					className="min-w-xl "
					aria-labelledby="tableTitle"
				>
					<VisaEntrysTableHead
						selectedVisaEntryIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={visaEntrys?.length}
						onMenuItemClick={handleDeselect}
						rows={rows}
					/>

					<TableBody>
						{_.orderBy(visaEntrys, [tableOrder.id], [tableOrder.direction])
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((n) => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-20 cursor-pointer border-t-1  border-gray-200"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
									>
										<TableCell
											className="w-40 md:w-64 border-t-1  border-gray-200"
											component="th"
											scope="row"
											style={{
												position: 'sticky',
												left: 0,
												zIndex: 1,
												backgroundColor: '#fff'
											}}
										>
											{pageAndSize.page * pageAndSize.size - pageAndSize.size + serialNumber++}
										</TableCell>
										{Object?.entries(n)?.map(
											([key, value]) =>
												key !== 'id' &&
												key !== 'random_number' && (
													<TableCell
														className="p-4 md:p-16 border-t-1  border-gray-200 "
														component="th"
														scope="row"
														key={key}
													>
														{key === 'file' ? (
															n[key]?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
																<PictureAsPdf
																	style={{
																		color: 'red',
																		cursor: 'pointer',
																		display: 'block',
																		fontSize: '35px',
																		margin: 'auto'
																	}}
																	// onClick={() => n.file && showImage(`${BASE_URL}${n.file}`)}
																	onClick={() => window.open(`${BASE_URL}${n[key]}`)}
																/>
															) : (
																<img
																	onClick={() =>
																		n.file && showImage(`${BASE_URL}${n[key]}`)
																	}
																	src={`${BASE_URL}${n[key]}`}
																	style={{
																		height: '40px',
																		width: '40px',
																		borderRadius: '50%'
																	}}
																/>
															)
														) : (key === 'calling_date' ||
																key === 'calling_exp_date' ||
																key === 'visa_issue_date') &&
														  n[key] ? (
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
											className="p-4 md:p-16 whitespace-nowrap border-t-1  border-gray-200"
											component="th"
											scope="row"
											align="right"
											style={{
												position: 'sticky',
												right: 0,
												zIndex: 1,
												backgroundColor: '#fff'
											}}
										>
											<Edit
												onClick={(event) => handleUpdateVisaEntry(n, 'updateVisaEntry')}
												className="cursor-pointer custom-edit-icon-style"
											/>

											<Delete
												onClick={(event) => handleDeleteVisaEntry(n, 'deleteVisaEntry')}
												className="cursor-pointer custom-delete-icon-style"
											/>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<div
				id="pagiContainer"
				className="flex justify-between mb-6"
			>
				<Pagination
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
					className="shrink-0 mb-2"
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

export default withRouter(VisaEntrysTable);
