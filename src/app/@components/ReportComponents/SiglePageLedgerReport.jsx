
import { Email, Language, LocationOn, PhoneEnabled } from '@mui/icons-material';
import moment from 'moment';
// import '../../../Print.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';

function SiglePageLedgerReport({
	classes,
	reportTitle = 'Report',
	tableColumns = [],
	
	dispatchTableColumns,
	data,
	totalColumn,
	serialNumber,
	setPage,
	inSiglePageMode,
	setSortBy,
	setSortBySubKey,
    AgentName,
    AgentId,
    PassportNo,
    PassengerName,
    District,
    MobileNo

}) {
	let pageBasedSerialNo = serialNumber;

	const [generalData, setGeneralData] = useState({});
	// get general setting data
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


	const AgentName = 'John Doe';
	const District = 'Central';
	const MobileNo = '123-456-7890';

	return (
		<div
			className={`${classes.pageContainer} printPageContainer px-24 `}
			onMouseOver={() => {
				inSiglePageMode || setPage(data.page);
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

				<Table>
					<TableHead>
						<TableCell
							className=" text-24 text-center"
							colspan={totalColumn}
						>
							{reportTitle}
						</TableCell>
					</TableHead>
				</Table>
				{/* Extra Heading  */}
				<div className="ml-20 mt-40 text-base mb-40 font-semibold">
				{(AgentName || AgentId || PassportNo || PassengerName || District || MobileNo) && (
	<table>
		<tbody>
			<tr>
				<td>Agent Name:</td>
				<td>{AgentName}</td>
			</tr>
			<tr>
				<td>Passenger Id:</td>
				<td>{AgentId}</td>
			</tr>
			<tr>
				<td>Passport No :</td>
				<td>{PassportNo}</td>
			</tr>
			<tr>
				<td>Passenger:</td>
				<td>{PassengerName}</td>
			</tr>
			<tr>
				<td>District :</td>
				<td>{District}</td>
			</tr>
			<tr>
				<td>Mobile :</td>
				<td>{MobileNo}</td>
			</tr>
		</tbody>
	</table>
)}

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

export default SiglePageLedgerReport;
