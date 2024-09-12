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
import { useDeleteVisaSubmissionListsMutation } from '../VisaSubmissionListsApi';

/**
 * The visaSubmissionLists table.
 */
function VisaSubmissionListsTable(props) {
	const {
	classes,
	reportTitle,
	tableColumns,
	tableColumns2,
	dispatchTableColumns,
	dispatchTableColumn2,
	generalData,
	data,
	embPrint,
	officePrint,
	selectedValue,
	data2,
	serialNumber,
	setPage,
	inSiglePageMode,
	setSortBy,
	setSortBySubKey,
	dragAndDropRow
	} = props;
	let pageBasedSerialNo = serialNumber;
	const methods = useFormContext();
	const { getValues } = methods;

	const formContentFooterData = sessionStorage.getItem('formContentFooterData');

	const [removeVisaSubmissionLists] = useDeleteVisaSubmissionListsMutation();

	const [selected, setSelected] = useState([]);

	function deleteVisaSubmissionList(item, event) {
		removeVisaSubmissionLists(visaSubmissionListId);

		DeletedSuccessfully();

		navigate(`/apps/visaSubmissionList/visaSubmissionLists/${item.id}/${item.handle}`);
	}

	return (
		<div
			className={`${classes.pageContainer} printPageContainer  px-10 w-full mb-0`}
			
		>
			<div style={{ padding: '24px' }}>
				<div>
					<Table
						className="w-full"
						style={{ width: '100%', visibility: data?.data?.length > 0 ? 'visible' : 'hidden' }}
					>
						<TableBody>
							<TableRow>
								<td className="text-center text-lg " colspan="10">
									بيان بالجوازات المقدمة
								</td>
							</TableRow>
							<TableRow>
								<td className="text-center text-base ">
									الرقم :{' '}
									{getValues()
										?.agency_name?.rl_no?.toString()
										.replace(/[0-9]/g, digit => String.fromCharCode(digit.charCodeAt(0) + 1632))}
								</td>
								<td className="text-center text-base ">
									{getValues()
										?.agency_name?.rl_no?.toString()
										.replace(/[0-9]/g, digit =>
											String.fromCharCode(digit.charCodeAt(0) + 1632)
										)}{' '}
									{getValues()?.agency_name?.name_arabic}
								</td>
								<td className="text-center text-base ">:اسم مقدم الجوازات</td>
							</TableRow>
						</TableBody>
					</Table>
					<Table className="w-full" style={{ visibility: data?.data?.length > 0 ? 'visible' : 'hidden' }}>
						<TableBody>
							<TableRow>
								<td className="text-center text-base "> : التاريخ </td>
								<td className="text-center text-base ">: التوقيع</td>
							</TableRow>
						</TableBody>
					</Table>
				</div>

				<Table
					aria-label="simple table"
					className={`${classes.table} px-10`}
					style={{ border: '1px solid black' }}
				>
					<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
						<TableRow>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								{' '}
								Profession <br /> المهنة
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								{' '}
								Year <br /> عام
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								{' '}
								Visa No <br /> رقم التاشيرة/مل{' '}
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								{' '}
								Sponsor Name <br /> اسم الكفيل
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								{' '}
								Possport No
								<br /> الجوازات ارقام
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									display: selectedValue == 'emb' && 'none',
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Sponsor ID <br />
							</TableCell>

							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									display: selectedValue == 'emb' && 'none',
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Office SL
								<br />
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									display: selectedValue == 'emb' && 'none',
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Passenger Name
								<br />
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									display: selectedValue == 'emb' && 'none',
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Reference
								<br />
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								{' '}
								SL
								<br /> التوقيع
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									display: (selectedValue == 'emb' || selectedValue == 'office') && 'none',
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.data?.map(
							(dataArr, idx) =>
								dataArr?.list_type == 'new' && (
									<TableRow
										key={dataArr.id}
										className="tableRow cursor-pointer"
										hover
										onDrop={e =>
											dragAndDropRow(
												e.dataTransfer.getData('draggerId'),
												data.size * (data.page - 1) + idx
											)
										}
										onDragOver={e => e.preventDefault()}
										draggable={true}
										onDragStart={e => e.dataTransfer.setData('draggerId', idx)}
									>
										{tableColumns.map(column => {
											return column.show ? (
												<TableCell
													align="center"
													className="tableCell"
													style={{
														display:
															selectedValue == 'emb' &&
															(column?.name == 'office_sl' ||
																column?.name == 'reference' ||
																column?.name == 'passenger_name' ||
																column?.name == 'sponsor_id') &&
															'none',
														border: '1px solid black',
														padding: '0px 6px 0 6px'
													}}
													// style={{ border: '1px solid black', padding: '0px 6px 0 6px' }}
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
												display:
													selectedValue == 'emb' || selectedValue == 'office'
														? 'none'
														: 'block'
											}}
										>
											<Delete
												onClick={() => {
													deleteVisaSubmissionList(dataArr?.id);
												}}
												className="cursor-pointer"
												style={{ color: 'red' }}
											/>
										</TableCell>
									</TableRow>
								)
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default withRouter(VisaSubmissionListsTable);
