/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import moment from 'moment';
import { TableHead } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Delete } from '@mui/icons-material';
import { Interweave } from 'interweave';
import { DeletedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { useDeleteManpowerSubmissionListsMutation } from '../ManpowerSubmissionListsApi';

/**
 * The manpowerSubmissionLists table.
 */
function ManpowerSubmissionListsTable(props) {
	const {
		navigate,

		classes,

		tableColumns,
		dispatchTableColumns,
		hideTabile,
		serialNumber,
		inSiglePageMode,
		setSortBy,
		setSortBySubKey,
		dragAndDropRow,
		printableFormat,
		data,
		setPage,
		manpowerSubmissionListId
	} = props;
	let pageBasedSerialNo = serialNumber;
	const methods = useFormContext();
	const { getValues } = methods;

	const formContentFooterData = sessionStorage.getItem('formContentFooterData');

	const [removeManpowerSubmissionLists] = useDeleteManpowerSubmissionListsMutation();

	const [selected, setSelected] = useState([]);

	function deleteManpowerSubmissionList(item, event) {
		removeManpowerSubmissionLists(manpowerSubmissionListId);

		DeletedSuccessfully();

		navigate(`/apps/manpowerSubmissionList/manpowerSubmissionLists/${item.id}/${item.handle}`);
	}

	return (
		<div>
			{!hideTabile && (
				<div>
					<div
						className={`${classes.pageContainer} printPageContainer print:h-screen w-full mb-0 w-30`}
						onMouseOver={() => {
							inSiglePageMode || setPage(data.page);
						}}
					>
						<table
							width="100%"
							align="center"
							className="px-32 w-11/12"
						>
							<tr>
								<td
									colSpan="3"
									style={{ textAlign: 'center', marginTop: 20 }}
								>
									<h1 style={{ textDecoration: 'underline' }}>একক বহির্গমন ছাড়পএরের আবেদন ফরম</h1>
								</td>
							</tr>
							<tr>
								<td>
									নিয়োগকারী দেশের নাম :
									<span style={{ fontWeight: 'bold' }}> {data?.data?.[0]?.country}</span>
								</td>
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
											.replace(/[0-9]/g, (digit) =>
												String.fromCharCode(digit.charCodeAt(0) + 2486)
											)}
									</span>
								</td>
								<td style={{ textAlign: 'right' }}>
									জমার তারিখ :
									<span style={{ fontWeight: 'bold', paddingRight: '10px' }}>
										{moment(new Date(data?.[0]?.man_power_list?.man_power_date)).format(
											'DD-MM-YYYY'
										)}
									</span>
								</td>
							</tr>
						</table>

						<Table
							aria-label="simple table"
							className={classes.table}
							style={{ border: '1px solid black', width: '1000px', marginTop: 10 }}
						>
							<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
								<TableRow>
									{tableColumns.map((column, indx) => {
										return column.show ? (
											<TableCell
												key={column.id}
												align="center"
												style={{
													border: '1px solid black',
													padding: '0px 5px'
												}}
												className="tableCellHead"
												onDrop={(e) =>
													dispatchTableColumns({
														type: 'dragAndDrop',
														dropper: column.id
													})
												}
												onDragOver={(e) => e.preventDefault()}
											>
												<div
													onDragStart={(e) => {
														console.log('Dragging row with index:', idx);
														e.dataTransfer.setData('draggerId', idx);
													}}
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
													style={{
														border: '1px solid black',
														padding: '0px 5px'
													}}
												>
													<div>
														{column?.subName
															? dataArr?.[column?.name]?.[column?.subName]
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
											<Delete
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

						<p style={{ marginTop: '15px' }}>
							<span style={{ fontWeight: 'bold' }}>এজেন্সীর অঙ্গীকার নামা :</span>
							বর্ণিত কর্মী গ্রুপ ভিসার অন্তর্ভুক্ত নয় কর্মীর/কর্মীদের পাসপোর্ট, ভিসা, চাকরীর চুক্তি পএরে
							বর্নিত বেতন ও শর্তাদি সঠিক আছে উক্ত বিষয়ে নিক্রটিং কারনে কর্মীর/কর্মীদের কোন প্রকার সমস্যা
							হইলে আমার
							<span style={{ fontWeight: 'bold' }}>
								{getValues()?.agency_info?.name_bangla}(আর এল-
								{getValues()
									?.agency_info?.rl_no?.toString()
									.replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 2486))}
								)
							</span>
							সম্পূর্ন দায় দায়িত্ব গ্রহন ও কর্মীর/কর্মীদের ক্ষতিপূরণ দান করিতে বাধ্য থাকিবো
						</p>

						<Interweave
							allowAttributes
							allowElements
							disableLineBreaks
							content={formContentFooterData}
						/>

						<table
							className={classes.pageBottmContainer}
							style={{ backgroundColor: 'white', marginTop: 15 }}
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
										এজেন্সী মালিক/প্রতিনিধিরি
										<br /> স্বাক্ষর প্রস্তাবমত
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
			)}
		</div>
	);
}

export default withRouter(ManpowerSubmissionListsTable);
