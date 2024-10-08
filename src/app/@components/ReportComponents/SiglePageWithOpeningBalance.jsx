import { Email, LocationOn, PhoneEnabled } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';

function SiglePageWithOpeningBalance({
	classes,
	addInHeader,
	reportTitle = 'Report',
    tableColumns = [],
	dispatchTableColumns,
	data,
	serialNumber,
	page,
	inSiglePageMode,
	setSortBy,
	setSortBySubKey,
	FilteredCriteria,
	previousBalance
}) {
	let pageBasedSerialNo = serialNumber;

	

	const [generalData, setGeneralData] = useState({});
	
	// Get general setting data
	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${GET_SITESETTINGS}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => setGeneralData(data.general_settings[0] || {}))
			.catch(() => setGeneralData({}));
	}, []);

	return (
		<div
			className={`${classes.pageContainer} printPageContainer `}
			onMouseOver={() => {
				inSiglePageMode 
			}}
		>
			<div>
				<div className={classes.pageHead}>
					<div className="logoContainer pr-0 md:-pr-20">
						<img
							style={{
								visibility: generalData.logo ? 'visible' : 'hidden',
								textAlign: 'center'
							}}
							src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
							alt="Not found"
						/>
					</div>
				</div>
				<div
					style={{
						textAlign: 'center',
						borderBottom: '1px solid gray',
						marginBottom: '20px',
						marginTop: '-10px',
						fontSize: '10px'
					}}
				>
					<LocationOn fontSize="small" />
					{` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp; <PhoneEnabled fontSize="small" />
					{` ${generalData?.phone || ''}`}&nbsp; &nbsp; <Email fontSize="small" />
					{` ${generalData?.email || ''}`}
				</div>

				<div className={classes.pageHead}>
					<h2 className="title  pl-0 md:-pl-20">
						<u>{reportTitle}</u>
					</h2>
				</div>
				
				{/* Render FilteredCriteria with dangerouslySetInnerHTML */}
				<div className={classes.pageHead}>
					<p className="title  pl-0 md:-pl-20" dangerouslySetInnerHTML={{ __html: FilteredCriteria }} />
				</div>

				{addInHeader !== 0 && (
					<div style={{ textAlign: 'right', marginRight: '20px' }}>
						{typeof addInHeader === 'number' ? (
							addInHeader > 0 ? (
								<h3 style={{ color: 'green' }}>Opening Balance: {addInHeader.toFixed(2)} Cr</h3>
							) : (
								<h3 style={{ color: 'red' }}>Opening Balance: {addInHeader.toFixed(2)}  Dr</h3>
							)
						) : null}
					</div>
				)}

				

				<Table aria-label="simple table" className={`${classes.table} w-fit `} border="1">
					<TableHead style={{ backgroundColor: '#D7DBDD' }}>
						<TableRow>
							{tableColumns.map((column, indx) => {
								return column.show ? (
									<TableCell
										key={column.id}
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
											<ArrowDownwardIcon
												className={`sortIcon ${column.sortAction === false && 'invisible'}`}
												style={{
													transform:
														data.sortBy === column.name ? 'rotate(180deg)' : 'rotate(0deg)'
												}}
											/>
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
								style={{ backgroundColor: dataArr?.is_post_date && 'rgb(251 234 234)' }}
							>
								{tableColumns.map(column => {
									return column.show ? (
										<TableCell className="tableCell">
											<div
												style={{
													height: 'fit-content',
													whiteSpace: column.type === 'date',
													...column.style,
													...dataArr.rowStyle
												}}
												{...(column.columnProps ? column.columnProps(dataArr) : {})}
											>
												{column?.subName
													? dataArr?.[column.name]?.[column?.subName]
													: column.type === 'date'
													? dataArr?.[column.name]
														? moment(new Date(dataArr?.[column.name])).format('DD-MM-YYYY')
														: ''
													: column.type === 'amount' 
													? dataArr?.[column.name]
														? parseFloat(dataArr[column.name]).toFixed(2) || .0 
														: '0.00'
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

				<table className={classes.pageFooterContainer}>
					<tbody>
						<tr>
							<td>
								<h6 style={{ textAlign: 'left' }}>Developed by RAMS(Bluebay IT Limited)</h6>
							</td>
							<td>
								<h5>&nbsp;</h5>
							</td>
							<td>
								{!inSiglePageMode && (
									<h6 style={{ marginBottom: '10px', textAlign: 'right', marginRight: '20px' }}>
										Page : {inSiglePageMode ? page : data?.page}
									</h6>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default SiglePageWithOpeningBalance;
