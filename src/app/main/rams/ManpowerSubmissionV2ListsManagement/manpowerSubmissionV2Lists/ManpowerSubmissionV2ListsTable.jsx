/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { TableHead } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DeletedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { Delete } from '@mui/icons-material';
import { Interweave } from 'interweave';
import { useDeleteManpowerSubmissionV2ListsMutation } from '../ManpowerSubmissionV2ListsApi';

/**
 * The manpowerSubmissionV2Lists table.
 */
function ManpowerSubmissionV2ListsTable(props) {
	const dispatch = useDispatch();
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
		manpowerSubmissionV2ListId,
		tableShow,
		setPage
	} = props;
	let pageBasedSerialNo = serialNumber;

	const formContentFooterData = sessionStorage.getItem('formContentFooterData');
	const formContentHeaderData = sessionStorage.getItem('formContentHeaderData');

	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;

	if (!data?.data || data.data.length === 0) {
		return <p>No data available</p>;
	}

	const columns = Object.keys(data.data[0]);
	const rowsPerPage = 8;

	const [removeManpowerSubmissionV2Lists] = useDeleteManpowerSubmissionV2ListsMutation();

	const [selected, setSelected] = useState([]);

	function deleteManpowerSubmissionV2List(item) {
		removeManpowerSubmissionV2Lists(manpowerSubmissionV2ListId);
		DeletedSuccessfully();
		navigate(`/apps/manpowerSubmissionV2List/manpowerSubmissionV2Lists/${item.id}/${item.handle}`);
	}

	const numberOfTables = Math.ceil((data?.data?.length ?? 0) / rowsPerPage);

	const renderTable = (startRowIndex) => (
		<div>
			<div
				key={`div-${startRowIndex}`}
				className="text-center"
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					marginTop: '10px'
				}}
			>
				<br />
				<br />
				<br />

				<Interweave
					allowAttributes
					allowElements
					disableLineBreaks
					content={formContentHeaderData}
					style={{
						marginBottom: '10px'
					}}
				/>
				<br />
				<table
					className="px-10 w-full"
					style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}
				>
					<tbody>
						{columns.map((column) => (
							<tr key={column}>
								<td className="whitespace-nowrap border-1 border-current p-2 px-5">
									<strong>
										{column?.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
									</strong>
								</td>
								{data?.data?.slice(startRowIndex, startRowIndex + rowsPerPage).map((row, rowIndex) => (
									<td
										className="whitespace-nowrap border-1 border-current p-2 px-5"
										key={`${column}-${rowIndex}`}
									>
										{column === 'sl' ? (
											startRowIndex + rowIndex + 1
										) : column === 'employee_name' ||
										  column === 'passport_no' ||
										  column === 'passport_expiry_date' ||
										  column === 'reg_id_no' ? (
											<b>{row[column]}</b>
										) : (
											row[column]
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<br />
				<br />
				<br />
				<br />
				<div className="w-full px-52 py-10">
					<Interweave
						allowAttributes
						allowElements
						disableLineBreaks
						content={formContentFooterData}
					/>
				</div>

				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);

	return (
		<div>
			{!hideTabile && (
				<div>
					{!printableFormat ? (
						<div>
							<div
								className={`${classes.pageContainer} printPageContainer print:h-screen overflow-hidden w-full mb-0`}
								onMouseOver={() => {
									inSiglePageMode || setPage(data.page);
								}}
								style={{ padding: '10px' }}
							>
								<Interweave
									allowAttributes
									allowElements
									disableLineBreaks
									content={formContentHeaderData}
								/>

								<Table
									aria-label="simple table"
									style={{
										border: '1px solid red',
										paddingRight: '20px',
										paddingLeft: '20px'
									}}
								>
									<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
										<TableRow>
											{tableColumns.map((column, indx) => {
												return column.show ? (
													<TableCell
														key={column.sl}
														align="center"
														style={{
															border: '1px solid black',
															padding: '0px 5px',
															width: '150px'
														}}
														className="tableCellHead"
														onDrop={(e) =>
															dispatchTableColumns({
																type: 'dragAndDrop',
																dropper: column.sl
															})
														}
														onDragOver={(e) => e.preventDefault()}
													>
														<div
															onDragStart={(e) =>
																e.dataTransfer.setData('draggerLebel', column.sl)
															}
															onClick={() => {
																if (column.sortAction !== false) {
																	setSortBy(
																		data.sortBy === column.name ? '' : column.name
																	);
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
												key={dataArr.sl}
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
																padding: '0px 5px',
																width: '150px'
															}}
														>
															<div>
																{column?.subName
																	? dataArr?.[column.name]?.[column?.subName]
																	: column.type === 'date'
																		? dataArr?.[column.name]
																			? moment(
																					new Date(dataArr?.[column.name])
																				).format('DD-MM-YYYY')
																			: ''
																		: column.name
																			? dataArr?.[column.name]
																			: column?.isSerialNo
																				? dataArr.hideSerialNo ||
																					pageBasedSerialNo++
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
															deleteManpowerSubmissionV2List(dataArr?.id);
														}}
														className="cursor-pointer"
														style={{ color: 'red' }}
													/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								<br />
								<br />
								<Interweave
									allowAttributes
									allowElements
									disableLineBreaks
									content={formContentFooterData}
								/>
							</div>
						</div>
					) : (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								minHeight: '100vh', // Full-page height to ensure proper page break
								justifyContent: 'space-between',
								pageBreakAfter: 'always' // Ensure page breaks after each section
							}}
						>
							<br />
							<br />
							{Array.from({ length: numberOfTables }, (_, index) => renderTable(index * rowsPerPage))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default withRouter(ManpowerSubmissionV2ListsTable);
