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
	filteredData,
	
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



const filteredKeys = Object.keys(filteredData).filter(key => filteredData[key] !== null);

// Separate non-date fields and date fields
const nonDateFields = [];
const dateFields = [];

// Map filteredValues
filteredKeys.forEach(key => {
    const formattedKey = key.replace(/_/g, ' ');
    const value = filteredData[key];

    if (formattedKey === 'Date From' || formattedKey === 'Date To') {
        dateFields.push(`<b>${formattedKey}</b>: ${moment(value).format('DD-MM-YYYY')}`);
    } else {
        nonDateFields.push(`<b>${formattedKey}</b>: ${value}`);
    }
});

// Join non-date fields in one line, date fields on a new line
const FilteredCriteria = `
    <div style="text-align: center; margin-top: -8px">
        ${nonDateFields.join(', ')}<br/>
        ${dateFields.join(', ')}
    </div>
`;



	return (
		<div
			className={`${classes.pageContainer} printPageContainer `}
			style={{ padding: '0px 90px 0px 90px' }}
			onMouseOver={() => {
				inSiglePageMode 
			}}
		>
			<div>
				<div className={classes.pageHead}>
					<div className="logoContainer pr-0 md:-pr-20 ">
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
						marginTop: '-25px',
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
				<table className={classes.pageFooterContainer} style={{}}>
				<tbody>
					<tr>
						<td>
							<span style={{ textAlign: 'left' }}>
								Printed Date & Time: {moment().format('DD/MM/YY')}, {moment().format('LT')}
							</span>
						</td>

						<td>
							<span style={{ textAlign: 'left' }}>Developed by RAMS(Bluebay IT Limited)-01861650206</span>
						</td>
						<td>
							<span>&nbsp;</span>
						</td>
						<td>
							{!inSiglePageMode && (
								<span style={{ textAlign: 'right', marginRight: '20px' }}>
									Page : {inSiglePageMode ? page : data?.page}
								</span>
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
