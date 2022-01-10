import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
					<TableHead style={{ backgroundColor: '#D7DBDD' }}>
						<TableRow>
							{tableColumns.map(column => {
								return column.show ? (
									<TableCell
										align="center"
										className="tableCellHead"
										onDrop={e =>
											dispatchTableColumns({
												type: 'dragAndDrop',
												dragger: e.dataTransfer.getData('draggerLebel'),
												dropper: column.label
											})
										}
										onDragOver={e => e.preventDefault()}
									>
										<div
											draggable={true}
											onDragStart={e => e.dataTransfer.setData('draggerLebel', column.label)}
											onClick={() => {
												if (column.sortAction !== false) {
													setSortBy(data.sortBy === column.name ? '' : column.name);
													if (setSortBySubKey && column.subName)
														setSortBySubKey(column.subName);
												}
											}}
										>
											{`${column.label} `}
											{column.sortAction !== false && (
												<FontAwesomeIcon
													className="sortIcon"
													style={{
														transform:
															data.sortBy === column.name
																? 'rotate(180deg)'
																: 'rotate(0deg)'
													}}
													icon={faArrowUp}
												/>
											)}
										</div>
									</TableCell>
								) : null;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.data?.map((dataArr, idx) => (
							<TableRow id={idx} className="tableRow">
								{tableColumns.map(column => {
									return column.show ? (
										<TableCell align="center" className="tableCell">
											<div>
												{!column?.serialNo
													? column?.subName
														? dataArr?.[column.name]?.[column?.subName]
														: dataArr?.[column.name]
													: pageBasedSerialNo++}
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
								<b>Address: </b>
								{generalData?.address || ''}
							</h5>
						</td>
						<td>
							<h5>
								<b>Mobile: </b>
								{generalData?.phone || ''}
							</h5>
						</td>
						<td>
							<h5>
								<b>Email: </b>
								{generalData?.email || ''}
							</h5>
						</td>
						<td>
							<h5>
								<b>Website:</b>
								<a href={generalData?.site_address || ''} target="_blank" rel="noreferrer">
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
