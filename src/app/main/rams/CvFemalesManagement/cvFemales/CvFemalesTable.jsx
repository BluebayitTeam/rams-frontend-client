/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */

import FuseScrollbars from '@fuse/core/FuseScrollbars'; // Custom scrollbar component
import _ from '@lodash'; // Utility library
import Table from '@mui/material/Table'; // MUI Table component
import TableBody from '@mui/material/TableBody'; // MUI TableBody component
import TablePagination from '@mui/material/TablePagination'; // MUI TablePagination component
import TableRow from '@mui/material/TableRow'; // MUI TableRow component
import Typography from '@mui/material/Typography'; // MUI Typography component
import { motion } from 'framer-motion'; // Animation library
import { useEffect, useRef, useState } from 'react'; // React hooks
import withRouter from '@fuse/core/withRouter'; // HOC for routing
import FuseLoading from '@fuse/core/FuseLoading'; // Loading spinner component
import { useSelector } from 'react-redux'; // Redux hooks
import { Pagination, TableCell } from '@mui/material'; // MUI Pagination and TableCell components
import { Delete, Edit, PictureAsPdf } from '@mui/icons-material'; // MUI icons
import { rowsPerPageOptions } from 'src/app/@data/data'; // Custom rows per page options
import { useForm } from 'react-hook-form'; // React hook form library
import { zodResolver } from '@hookform/resolvers/zod'; // Zod resolver for validation
import { BASE_URL } from 'src/app/constant/constants'; // Base URL constant
import moment from 'moment'; // Date manipulation library
import DescriptionIcon from '@mui/icons-material/Description'; // MUI description icon
import PrintIcon from '@mui/icons-material/Print';
import CvFemalesTableHead from './CvFemalesTableHead'; // Custom table header component
import { selectFilteredCvFemales, useGetCvFemalesQuery } from '../CvFemalesApi'; // Redux selectors and API hooks

// import PrintVoucher from '../PrintVoucher';
function CvFemalesTable(props) {
	const { navigate, searchKey } = props;
	const { setValue } = useForm({
		mode: 'onChange',
		resolver: zodResolver()
	});

	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
	const { data, isLoading, refetch } = useGetCvFemalesQuery({ ...pageAndSize, searchKey });
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const totalData = useSelector(selectFilteredCvFemales(data));
	const femaleCvs = useSelector(selectFilteredCvFemales(data?.female_cvs));
	const printVoucherRef = useRef();
	useEffect(() => {
		refetch({ searchKey });
	}, [searchKey]);

	let serialNumber = 1;

	const [rows, setRows] = useState([]);
	useEffect(() => {
		// Fetch data with specific page and size when component mounts or when page and size change
		refetch({ page, rowsPerPage });
	}, [page, rowsPerPage]);

	useEffect(() => {
		if (totalData?.female_cvs) {
			const modifiedRow = [
				{
					id: 'sl',
					align: 'left',
					disablePadding: false,
					label: 'SL',
					sort: true
				}
			];

			Object.entries(totalData?.female_cvs[0] || {})
				.filter(([key]) => key !== 'id' && key !== 'random_number') // Filter out the 'id' and 'random_number' fields
				.map(([key]) => {
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
	}, [totalData?.female_cvs]);

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
			setSelected(femaleCvs.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function _handleClick(item) {
		navigate(`/apps/cvFemale/cvFemales/${item.id}/${item.handle}`);
	}

	function handleUpdateCvFemale(item, event) {
		localStorage.removeItem('deleteCvFemale');
		localStorage.setItem('updateCvFemale', event);
		navigate(`/apps/cvFemale/cvFemales/${item.id}/${item.handle}`);
	}

	function handleDeleteCvFemale(item, event) {
		localStorage.removeItem('updateCvFemale');
		localStorage.setItem('deleteCvFemale', event);
		navigate(`/apps/cvFemale/cvFemales/${item.id}/${item.handle}`);
	}

	function _handleCheck(event, id) {
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

	if (femaleCvs?.length === 0) {
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
					There are no femaleCvs!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-full px-10 ">
			<FuseScrollbars className="grow overflow-x-auto ">
				{/* <PrintVoucher
					ref={printVoucherRef}
					title="Receipt Voucher"
					type="receipt"
				/> */}
				<Table
					stickyHeader
					className="min-w-xl "
					aria-labelledby="tableTitle"
				>
					<CvFemalesTableHead
						selectedCvFemaleIds={selected}
						tableOrder={tableOrder}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={femaleCvs?.length}
						onMenuItemClick={handleDeselect}
						rows={rows}
					/>

					<TableBody>
						{_.orderBy(femaleCvs, [tableOrder.id], [tableOrder.direction])
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
											className="w-40 md:w-64 border-t-1  border-gray-200 text-center"
											padding="none"
										>
											{serialNumber++}
										</TableCell>

										{Object.entries(n).map(
											([key, value]) =>
												key !== 'id' &&
												key !== 'random_number' && (
													<TableCell
														className="p-4 md:p-16 border-t-1 border-gray-200"
														component="th"
														scope="row"
														key={key}
													>
														{key === 'image' ? (
															n[key]?.split('.').pop()?.toLowerCase() === 'pdf' ? (
																<PictureAsPdf
																	style={{
																		color: 'red',
																		cursor: 'pointer',
																		display: 'block',
																		fontSize: '35px'
																	}}
																	onClick={() => window.open(`${BASE_URL}${n[key]}`)}
																/>
															) : ['doc', 'docx'].includes(
																	n[key]?.split('.').pop()?.toLowerCase()
															  ) ? (
																<DescriptionIcon
																	style={{
																		color: 'blue',
																		cursor: 'pointer',
																		display: 'block',
																		fontSize: '35px'
																	}}
																	onClick={() => window.open(`${BASE_URL}${n[key]}`)}
																/>
															) : (
																<img
																	onClick={() =>
																		n.file && showImage(`${BASE_URL}${n[key]}`)
																	}
																	src={
																		n[key]
																			? `${BASE_URL}${n[key]}`
																			: 'assets/logos/user.jpg'
																	}
																	style={{
																		height: '40px',
																		width: '40px',
																		borderRadius: '50%'
																	}}
																	alt="uploaded file"
																/>
															)
														) : (key === 'created_at' || key === 'flight_date') &&
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
											className="p-4 md:p-16 whitespace-nowrap border-t-1 border-gray-200"
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
												onClick={() => handleUpdateCvFemale(n, 'updateCvFemale')}
												className="cursor-pointer custom-edit-icon-style text-3xl	"
											/>
											<Delete
												onClick={() => handleDeleteCvFemale(n, 'deleteCvFemale')}
												className="cursor-pointer custom-delete-icon-style text-3xl	"
											/>
											<PrintIcon
												className="cursor-pointer custom-print-icon-style text-3xl	"
												onClick={(cvFemaleEvent) => handlePrintCvFemale(n)}
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

export default withRouter(CvFemalesTable);
