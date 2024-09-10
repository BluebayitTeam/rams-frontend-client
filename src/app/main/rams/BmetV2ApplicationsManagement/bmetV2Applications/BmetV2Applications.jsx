
import { useEffect, useReducer, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import { useReactToPrint } from 'react-to-print';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import BmetV2ApplicationsTable from './BmetV2ApplicationsTable';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

const initialTableColumnsState = [
	{ id: 1, label: 'ক্রমিক নং', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'কর্মীর নাম ,ঠিকানা,মোবাইল নং(নিজ ও নিকট আত্মীয়)', name: 'passenger_name', show: true },
	{ id: 3, label: 'পাসপোর্ট নম্বার', name: 'passport_no', show: true },
	{ id: 4, label: 'নিয়োগকর্তার নাম,ঠিকানা ও টেলিফোন নম্বর', name: 'sponsor_name', show: true },
	{ id: 5, label: 'ভিসা নম্বর ', name: 'visa_no', show: true },
	{ id: 6, label: 'পদের নাম', name: 'profession', show: true },
	{ id: 7, label: 'অভিবাসন ব্যয় ', name: 'Payment', show: true }
];

function BmetV2Applications({
	data,
	tableShow,
	hideTabile,
	bmetV2ApplicationId,
	handleReset,
	refetch,
	emptyValue,
	selectedDate,
	selectedPassenger,
	passenger,
	bmetV2ApplicationDate
}) {
	const classes = useStyles();

	const [generalData, setGeneralData] = useState({});

	const [modifiedManpowerSbListData, setModifiedManpowerSbListData, setSortBy, setSortBySubKey, dragAndDropRow] =
		useReportData();
	useEffect(() => {
		const modifiedData = data?.map((manpowerSub) => ({
			profession: manpowerSub?.embassy?.profession?.name,
				visa_no: manpowerSub?.visa_entry?.visa_number,
				sponsor_name: manpowerSub?.visa_entry?.sponsor_name_english,
				sponsor_id: manpowerSub?.manpower_entry?.sponsor_id_no,
				passport_no: manpowerSub?.passenger?.passport_no,
				office_sl: manpowerSub?.passenger?.office_serial,
				passenger_name: manpowerSub?.passenger?.passenger_name,
				reference: manpowerSub?.agent?.username,
				registration_id: manpowerSub?.man_power?.registration_id,
				Payment: '1000',
				Food: 'Self',
				home_rent: 'Free',
				abcd: '500',
				efg: '3500',
				country: manpowerSub?.man_power_list?.country?.name,
				agency: manpowerSub?.man_power_list?.agency?.name,
				rl_no: manpowerSub?.man_power?.recruiting_agency?.rl_no,
				man_power_date: manpowerSub?.man_power_list?.man_power_date
		}));

		setModifiedManpowerSbListData(modifiedData);
	}, [data]);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);

	// pagination state
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);

	// print dom ref
	const componentRef = useRef();

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	return (
		<>
			<ReportPaginationAndDownload
				page={page}
				size={size}
				setPage={setPage}
				setSize={setSize}
				inShowAllMode={inShowAllMode}
				setInShowAllMode={setInShowAllMode}
				componentRef={componentRef}
				handleExelDownload={handleExelDownload}
				handlePrint={handlePrint}
				handleGetAllData={data}
				tableColumns={tableColumns}
				dispatchTableColumns={dispatchTableColumns}
				dragAndDropRow={dragAndDropRow}
			/>
			<table
				id="table-to-xls"
				className="w-full"
			>
				<div
					ref={componentRef}
					id="downloadPage"
				>
					{modifiedManpowerSbListData.map((manpowerSbList) => (
						<BmetV2ApplicationsTable
							classes={classes}
							generalData={generalData}
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={manpowerSbList}
							serialNumber={manpowerSbList.page * manpowerSbList.size - manpowerSbList.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
							setSortBySubKey={setSortBySubKey}
							dragAndDropRow={dragAndDropRow}
							tableShow={tableShow}
							data2={data}
							bmetV2ApplicationId={bmetV2ApplicationId}
							handleReset={handleReset}
							emptyValue={emptyValue}
							refetch={refetch}
							hideTabile={hideTabile}
							selectedDate={selectedDate}
							selectedPassenger={selectedPassenger}
							passenger={passenger}
							bmetV2ApplicationDate={bmetV2ApplicationDate}
						/>
					))}
				</div>
			</table>
		</>
	);
}

export default BmetV2Applications;
