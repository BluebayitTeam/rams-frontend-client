/* eslint-disable no-nested-ternary */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { TableHead } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import {
	selectFilteredManpowerSubmissionLists,
	useGetManpowerSubmissionListsQuery
} from '../ManpowerSubmissionListsApi';

/**
 * The manpowerSubmissionLists table.
 */
function ManpowerSubmissionListsTable(props) {
	const dispatch = useDispatch();
	const {
		navigate,
		searchKey,
		classes,
		reportTitle,
		tableColumns,
		dispatchTableColumns,
		generalData,

		inSiglePageMode,
		setSortBy,
		setSortBySubKey,
		dragAndDropRow,
		printableFormat
	} = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(50);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

	const { data, isLoading, refetch } = useGetManpowerSubmissionListsQuery({ ...pageAndSize, searchKey });

	console.log('dfsdfgsdjfgsdjfgjsdgf', data);

	const totalData = useSelector(selectFilteredManpowerSubmissionLists(data));
	const manpowerSubmissionLists = useSelector(selectFilteredManpowerSubmissionLists(data?.manpowerSubmissionLists));
	// const serialNumber = 1;
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
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
			setSelected(manpowerSubmissionLists.map((n) => n.id));
			return;
		}

		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/${item.id}/${item.handle}`);
	}

	function handleUpdateManpowerSubmissionList(item, event) {
		localStorage.removeItem('deleteManpowerSubmissionList');
		localStorage.setItem('updateManpowerSubmissionList', event);
		navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/${item.id}/${item.handle}`);
	}

	function handleDeleteManpowerSubmissionList(item, event) {
		localStorage.removeItem('updateManpowerSubmissionList');
		localStorage.setItem('deleteManpowerSubmissionList', event);
		navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/${item.id}/${item.handle}`);
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

	if (manpowerSubmissionLists?.length === 0) {
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
					There are no manpowerSubmissionLists!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div>
			<div>
				<div
					className={`${classes.pageContainer} printPageContainer print:h-screen w-full mb-0 w-30`}
					onMouseOver={() => {
						inSiglePageMode || setPage(data.page);
					}}
				>
					<div className={classes.pageHead}>
						<h2 className="title  pl-0 md:-pl-20">{reportTitle}</h2>
					</div>

					<h1 style={{ textDecoration: 'underline', textAlign: 'center' }}>
						একক বহির্গমন ছাড়পএরের আবেদন ফরম{' '}
					</h1>
					<br />

					<table
						width="100%"
						align="center"
						className="px-32 w-11/12	"
					>
						<tr>
							<td>
								নিয়োগকারী দেশের নাম :
								<span style={{ fontWeight: 'bold' }}> {data?.data?.[0]?.country}</span>
							</td>

							<td>&nbsp;</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>
								জমাদানকারী রিক্রটিং এজেন্সীর নাম :{' '}
								<span style={{ fontWeight: 'bold' }}>{getValues()?.agency_info?.name_bangla}</span>
							</td>
							<td style={{ textAlign: 'center' }}>
								লাইসেন্স নম্বর :{' '}
								<span style={{ fontWeight: 'bold' }}>
									{' '}
									আর এল-
									{getValues()
										?.agency_info?.rl_no?.toString()
										.replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 2486))}
								</span>
							</td>
							<td style={{ textAlign: 'right' }}>
								{/* জমার তারিখ :<span style={{ fontWeight: 'bold' }}>{data?.data?.[0]?.man_power_date}</span> */}
								জমার তারিখ :
								<span style={{ fontWeight: 'bold', paddingRight: '10px' }}>
									{moment(new Date(data?.data?.[0]?.man_power_date)).format('DD-MM-YYYY')}
								</span>
							</td>
						</tr>
					</table>

					<Table
						aria-label="simple table"
						className={classes.table}
						style={{ border: '1px solid black', width: '1000px' }}
					>
						<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
							<TableRow>
								{tableColumns.map((column, indx) => {
									return column.show ? (
										<TableCell
											key={column.id}
											align="center"
											style={{ border: '1px solid black', padding: '0px 5px' }}
											className="tableCellHead"
											onDrop={(e) =>
												dispatchTableColumns({
													type: 'dragAndDrop',
													// dragger: e.dataTransfer.getData('draggerLebel'),
													dropper: column.id
												})
											}
											onDragOver={(e) => e.preventDefault()}
										>
											<div
												// draggable={true}
												onDragStart={(e) => e.dataTransfer.setData('draggerLebel', column.id)}
												onClick={() => {
													if (column.sortAction !== false) {
														setSortBy(data.sortBy === column.name ? '' : column.name);
														setSortBySubKey &&
															column.subName &&
															setSortBySubKey(column.subName);
													}
												}}
												style={{
													margin: indx === 0 && '0px -5px 0px 5px'
												}}
											>
												{column.label}
												{/* <FontAwesomeIcon
												className={`sortIcon ${column.sortAction === false && 'invisible'}`}
												style={{
													transform:
														data.sortBy === column.name ? 'rotate(180deg)' : 'rotate(0deg)'
												}}
												icon={faArrowUp}
											/> */}
											</div>
										</TableCell>
									) : null;
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.data?.map((dataArr, idx) => (
								<TableRow
									key={dataArr.id}
									className="tableRow cursor-pointer"
									hover
									onDrop={(e) =>
										dragAndDropRow(
											e.dataTransfer.getData('draggerId'),
											data.size * (data.page - 1) + idx
										)
									}
									onDragOver={(e) => e.preventDefault()}
									draggable
									onDragStart={(e) => e.dataTransfer.setData('draggerId', idx)}
								>
									{tableColumns.map((column) => {
										return column.show ? (
											<TableCell
												align="center"
												className="tableCell"
												style={{ border: '1px solid black', padding: '0px 5px' }}
											>
												<div>
													{column?.subName
														? dataArr?.[column.name]?.[column?.subName]
														: column.type === 'date'
															? dataArr?.[column.name]
																? moment(new Date(dataArr?.[column.name])).format(
																		'DD-MM-YYYY'
																	)
																: ''
															: column.name
																? dataArr?.[column.name]
																: column?.isSerialNo
																	? dataArr.hideSerialNo || pageBasedSerialNo++
																	: dataArr.getterMethod
																		? dataArr.getterMethod(dataArr)
																		: column.getterMethod
																			? column.getterMethod(dataArr)
																			: ''}
												</div>
											</TableCell>
										) : null;
									})}

									<TableCell
										align="center"
										className="tableCell"
										style={{
											border: '1px solid black',
											padding: '0px 6px 0 6px',
											display: printableFormat ? 'none' : 'block'
										}}
									>
										<DeleteIcon
											onClick={() => {
												deleteManpowerSubmissionList(dataArr?.id);
											}}
											className="cursor-pointer"
											style={{ color: 'red' }}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<p style={{ margin: '10px' }}>
						<span style={{ fontWeight: 'bold' }}>এজেন্সীর অঙ্গীকার নামা : </span>বর্ণিত কর্মী গ্রুপ ভিসার
						অন্তর্ভুক্ত নয় কর্মীর/কর্মীদের পাসপোর্ট ,ভিসা ,চাকরীর চুক্তি পএরে বর্নিত বেতন ও শর্তাদি সঠিক আছে
						উক্ত বিষয়ে নিক্রটিং কারনে কর্মীর/কর্মীদের কোন প্রকার সমস্যা হইলে আমার
						<span style={{ fontWeight: 'bold' }}>
							{getValues()?.agency_info?.name_bangla}(আর এল-
							{getValues()
								?.agency_info?.rl_no?.toString()
								.replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 2486))}
							)
						</span>
						সম্পূর্ন দায় দায়িত্ব গ্রহন ও কর্মীর/কর্মীদের ক্ষতিপূরণ দান করিতে বাধ্য থাকিবো
					</p>

					{/* <Interweave
						allowAttributes
						allowElements
						disableLineBreaks
						content={formContentFooterData}
					/> */}
					<br />
				</div>

				<table
					// className={classes.pageBottmContainer}
					style={{ backgroundColor: 'white' }}
				>
					<tbody>
						<tr>
							<td style={{ textAlign: 'center' }}>
								পরীক্ষিতি হয়েছে <br />
								কাগজপএ সঠিক আছে
							</td>
							<td style={{ textAlign: 'center' }}>বর্ণিত তথ্য যথাযথ আছে</td>
							<td style={{ textAlign: 'center' }}>বহির্গমনের ছাড়পএ দেওয়া যায়</td>
							<td style={{ textAlign: 'center' }}>বহির্গমনের ছাড়পএ দেওয়া যায়</td>
							<td style={{ textAlign: 'center' }}>
								এজেন্সী মালিক/প্রতিনিধিরি <br /> স্বাক্ষর প্রস্তাবমত
							</td>
						</tr>
						<tr>
							<td style={{ textAlign: 'center', height: '40px' }}>&nbsp;</td>
							<td style={{ textAlign: 'center', height: '40px' }}>&nbsp;</td>
							<td style={{ textAlign: 'center', height: '40px' }}>&nbsp;</td>
							<td style={{ textAlign: 'center', height: '40px' }}>&nbsp;</td>
							<td style={{ textAlign: 'center', height: '40px' }}>&nbsp;</td>
						</tr>
						<tr>
							<td style={{ textAlign: 'center' }}>সহকারীর স্বাক্ষর</td>
							<td style={{ textAlign: 'center' }}>সহকারী পরিচালকের স্বাক্ষর</td>
							<td style={{ textAlign: 'center' }}>উপ-পরিচালকের স্বাক্ষর</td>
							<td style={{ textAlign: 'center' }}>পরিচালকের স্বাক্ষর</td>
							<td style={{ textAlign: 'center' }}>মহা পরিচালকের স্বাক্ষর</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default withRouter(ManpowerSubmissionListsTable);
