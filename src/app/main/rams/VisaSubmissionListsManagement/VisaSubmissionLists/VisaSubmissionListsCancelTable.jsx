import moment from 'moment';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../../../constant/constants';
import { useDeleteVisaSubmissionListsMutation } from '../VisaSubmissionListsApi';
import { Delete } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import withRouter from '@fuse/core/withRouter';

function VisaSubmissionListsCancelTable({
	classes,
	reportTitle,
	tableColumns2,
	dispatchTableColumn2,
	generalData,
	data2,
	embPrint,
	officePrint,
	selectedValue,
	serialNumber,
	setPage,
	inSiglePageMode,
	setSortBy,
	setSortBySubKey,
	dragAndDropRow2
}) {
	let pageBasedSerialNo = serialNumber;

	const dispatch = useDispatch();
    const methods = useFormContext();
    const [removeVisaSubmissionLists] = useDeleteVisaSubmissionListsMutation();

    const { formState, watch, getValues, reset } = methods;
    
		function deleteVisaSubmissionList(item, event) {
		console.log('ljvclvjcxlvjjcv', visaSubmissionListId)

		removeVisaSubmissionLists(visaSubmissionListId);

		DeletedSuccessfully();

		navigate(`/apps/visaSubmissionList/visaSubmissionLists/${item.id}/${item.handle}`);
	}
	return (
		<div
			className={`${classes.pageContainer} printPageContainer  overflow-hidden w-full mb-0`}
			// onMouseOver={() => {
			// 	inSiglePageMode || setPage(data.page);
			// }}
		>
			{/* Cancel List  */}
			<div>
				<div className={classes.pageHead}>
					<h1 className="text-lg  text-center">إلغاء</h1>
				</div>

				<Table aria-label="simple table" className={classes.table} style={{ border: '1px solid black' }}>
					<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
						<TableRow>
							<TableCell
								className="text-center tableCell font-bold	 border-black"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Profession <br /> المهنة
							</TableCell>

							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Year <br /> عام
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Visa No <br /> رقم التاشيرة/مل{' '}
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
								Sponsor Name <br /> اسم الكفيل
							</TableCell>
							<TableCell
								className="text-center tableCell font-bold	 border-black	"
								style={{
									border: '1px solid black',
									padding: '0px 6px 0 6px'
								}}
							>
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
						{data2?.data?.map(
							(dataArr, idx) =>
								dataArr?.list_type == 'cancel' && (
									<TableRow
										key={dataArr.id}
										className="tableRow cursor-pointer"
										hover
										onDrop={e =>
											dragAndDropRow2(
												e.dataTransfer.getData('draggerId'),
												data2.size * (data2.page - 1) + idx
											)
										}
										onDragOver={e => e.preventDefault()}
										draggable={true}
										onDragStart={e => e.dataTransfer.setData('draggerId', idx)}
									>
										{tableColumns2?.map(column => {
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

export default withRouter(VisaSubmissionListsCancelTable);