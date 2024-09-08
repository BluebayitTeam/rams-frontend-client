import moment from 'moment';
// import '../../../Print.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function SinglePageOnlyTable({
	classes,
	tableColumns = [],
	filteredData,
	dispatchTableColumns,
	data,
	reportTitle,
	serialNumber,
	setPage,
	inSiglePageMode,
	setSortBy,
	setSortBySubKey,
	dragAndDropRow
}) {
	let pageBasedSerialNo = serialNumber;

	return (
		<div
			className={`${classes.pageContainer} printPageContainer px-60 `}
			onMouseOver={() => {
				inSiglePageMode || setPage(data.page);
			}}
		>
			<div
				className={`${classes.pageContainer} printPageContainer  overflow-hidden w-full mb-0`}
				onMouseOver={() => {
					inSiglePageMode || setPage(data.page);
				}}
				style={{ padding: '10px' }}
			>
				<div>
					<div className={classes.pageHead}>
						<h2 className="title  pl-0 md:-pl-20">{reportTitle}</h2>
					</div>

					<Table
						aria-label="simple table"
						className={classes.table}
						style={{ border: '1px' }}
					>
						<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
							<TableRow>
								{tableColumns.map((column, indx) => {
									return column.show ? (
										<TableCell
											key={column.id}
											align="center"
											className="tableCellHead border-1 border-current p-2"
											onDrop={(e) =>
												dispatchTableColumns({
													type: 'dragAndDrop',
													dragger: e.dataTransfer.getData('draggerLebel'),
													dropper: column.id
												})
											}
											onDragOver={(e) => e.preventDefault()}
										>
											<div
												draggable
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
												className="tableCell border border-1 p-2 border-black"
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
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}

export default SinglePageOnlyTable;
