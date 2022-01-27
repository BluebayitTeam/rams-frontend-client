import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Email, Language, LocationOn, PhoneEnabled } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { BASE_URL } from '../../../../constant/constants';
import '../Print.css';

function SiglePage({
	classes,
	generalData,
	reporTitle = 'Report',
	tableColumns = [],
	dispatchTableColumns,
	data,
	serialNumber,
	setPage,
	inSiglePageMode,
	setSortBy,
	setSortBySubKey
}) {
	let pageBasedSerialNo = serialNumber;

	return (
		<div
			className={`${classes.pageContainer} printPageContainer`}
			onMouseOver={() => {
				inSiglePageMode || setPage(data.page);
			}}
		>
			<div>
				<div className={classes.pageHead}>
					<h2 className="title  pl-0 md:-pl-20">{reporTitle}</h2>

					<div className="logoContainer pr-0 md:-pr-20">
						<img
							style={{
								visibility: generalData.logo ? 'visible' : 'hidden'
							}}
							src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
							alt="Not found"
						/>
					</div>
				</div>

				<Table aria-label="simple table" className={classes.table}>
					<TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
						<TableRow>
							{tableColumns.map((column, indx) => {
								return column.show ? (
									<TableCell
										key={column.id}
										align="center"
										className="tableCellHead"
										onDrop={e =>
											dispatchTableColumns({
												type: 'dragAndDrop',
												dragger: e.dataTransfer.getData('draggerLebel'),
												dropper: column.id
											})
										}
										onDragOver={e => e.preventDefault()}
									>
										<div
											draggable={true}
											onDragStart={e => e.dataTransfer.setData('draggerLebel', column.id)}
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
											<FontAwesomeIcon
												className={`sortIcon ${column.sortAction === false && 'invisible'}`}
												style={{
													transform:
														data.sortBy === column.name ? 'rotate(180deg)' : 'rotate(0deg)'
												}}
												icon={faArrowUp}
											/>
										</div>
									</TableCell>
								) : null;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.data?.map((dataArr, idx) => (
							<TableRow key={dataArr.id} className="tableRow cursor-pointer" hover>
								{tableColumns.map(column => {
									return column.show ? (
										<TableCell align="center" className="tableCell">
											<div
												style={{
													whiteSpace: column.type === 'date' && 'nowrap',
													...column.style,
													...dataArr.rowStyle
												}}
											>
												{column?.subName
													? dataArr?.[column.name]?.[column?.subName]
													: column.type === 'date'
													? dataArr?.[column.name]
														? moment(new Date(dataArr?.[column.name])).format('DD-MM-YYYY')
														: ''
													: column.name
													? dataArr?.[column.name]
													: column?.isSerialNo
													? dataArr.hideSerialNo || pageBasedSerialNo++
													: dataArr.getterMathod
													? dataArr.getterMathod(dataArr)
													: column.getterMathod
													? column.getterMathod(dataArr)
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

			<table className={classes.pageBottmContainer}>
				<tbody>
					<tr>
						<td>
							<h5>
								<LocationOn fontSize="small" />
								{` ${generalData?.address}` || ''}
							</h5>
						</td>
						<td>
							<h5>
								<PhoneEnabled fontSize="small" />
								{` ${generalData?.phone || ''}`}
							</h5>
						</td>
						<td>
							<h5>
								<Email fontSize="small" />
								{` ${generalData?.email || ''}`}
							</h5>
						</td>
						<td>
							<h5>
								<Language fontSize="small" />
								<a
									className="ml-2"
									href={generalData?.site_address || ''}
									target="_blank"
									rel="noreferrer"
								>
									{generalData?.site_address}
								</a>
							</h5>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default SiglePage;
