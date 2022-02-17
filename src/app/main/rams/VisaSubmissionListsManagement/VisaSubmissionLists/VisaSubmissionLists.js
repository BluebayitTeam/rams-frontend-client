import { faBookOpen, faDownload, faFileExcel, faFilePdf, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { GetApp, ViewWeek } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import useReportData3 from 'app/@customHooks/useReportData3';
import useUserInfo from 'app/@customHooks/useUserInfo';
import { GET_SITESETTINGS } from 'app/constant/constants';
import html2PDF from 'jspdf-html2canvas';
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ColumnLabel from '../../ReportManagement/reportComponents/ColumnLabel';
import Pagination from '../../ReportManagement/reportComponents/Pagination';
import { getReportMakeStyles } from '../../ReportManagement/reportUtils/reportMakeStyls';
import tableColumnsReducer from '../../ReportManagement/reportUtils/tableColumnsReducer';
import VisaSubmissionListTable from './VisaSubmissionListsTable';

const useStyles = makeStyles(theme => ({
	...getReportMakeStyles(theme)
}));

const initialTableColumnsState = [
	{ id: 1, label: 'Profession', name: 'profession', show: true },
	{ id: 2, label: 'Sponsor ID', name: 'sponsor_id', show: true },
	{ id: 3, label: 'Visa No', name: 'visa_no', show: true },
	{ id: 4, label: 'Sponsor Name', name: 'sponsor_name', show: true },
	{ id: 5, label: 'Possport No', name: 'passport_no', show: true },
	{ id: 6, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
	{ id: 7, label: 'Office SL', name: 'office_sl', show: true },
	{ id: 8, label: 'Passenger Name', name: 'passenger_name', show: true },
	{ id: 9, label: 'Reference', name: 'reference', show: true }
];

const VisaSubmissionLists = () => {
	const classes = useStyles();

	const { authTOKEN } = useUserInfo();

	const [generalData, setGeneralData] = useState({});

	const visaSbLists = useSelector(
		({ visaSubmissionListManagement }) => visaSubmissionListManagement.visaSubmissionList
	);

	const [modifiedVisaSbListData, setModifiedVisaSbListData, setSortBy, setSortBySubKey, dragAndDropRow] =
		useReportData3();

	useEffect(() => {
		const visaSubLsts = visaSbLists;
		const modifiedData = [];
		visaSubLsts?.map(visaSub => {
			modifiedData.push({
				profession: visaSub?.embassy?.profession_arabic,
				visa_no: visaSub?.visa_entry?.visa_number,
				sponsor_id: visaSub?.visa_entry?.sponsor_id_no,
				sponsor_name: visaSub?.visa_entry?.sponsor_name_arabic,
				passport_no: visaSub?.passenger?.passport_no,
				office_sl: visaSub?.passenger?.office_serial,
				passenger_name: visaSub?.passenger?.passenger_name,
				reference: visaSub?.passenger?.passenger_name
			});
		});
		setModifiedVisaSbListData(modifiedData);
	}, [visaSbLists]);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	//tools state
	const [inPrint, setInPrint] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [inDowloadPdf, setInDowloadPdf] = useState(false);
	const [inDowloadExcel, setInDowloadExcel] = useState(false);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

	//pagination state
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

	//get general setting data
	useEffect(() => {
		fetch(`${GET_SITESETTINGS}`, authTOKEN)
			.then(response => response.json())
			.then(data => setGeneralData(data.general_settings[0] || {}))
			.catch(() => setGeneralData({}));
	}, []);

	//print dom ref
	const componentRef = useRef();

	//printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	//print handler
	const handlePrint = () => printAction();

	//pdf downloader action
	const pdfDownloadAction = () => {
		html2PDF(downloadPage, {
			margin: [0, 0, 0, 0],
			filename: 'pdfhtml2.pdf',
			html2canvas: {
				dpi: 300,
				letterRendering: true
			},
			setTestIsImage: false,
			useCORS: true,
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		});
		setInDowloadPdf(false);
	};

	//pdf download handler
	const handlePdfDownload = () => pdfDownloadAction();

	//exel download page dom
	let downloadPage = document.getElementById('downloadPage');

	//exel download handler
	const handleExelDownload = () => document.getElementById('test-table-xls-button').click();

	//column select close handler
	useLayoutEffect(() => {
		window.addEventListener('click', e => {
			if (e.target.id !== 'insideClmSelect') setShowClmSelectOption(false);
		});
	}, []);

	//pagination handler
	const firstPageHandler = event => {
		// handleGetVisaSubmissionList(event.page);
	};
	const previousPageHandler = event => {
		// handleGetVisaSubmissionList(event.page);
	};
	const nextPageHandler = event => {
		// handleGetVisaSubmissionList(event.page);
	};
	const lastPageHandler = event => {
		// handleGetVisaSubmissionList(event.page);
	};

	return (
		<>
			<div className={`${classes.menubar} justify-start md:justify-center`}>
				{/* pagination */}
				<Pagination
					page={page}
					size={size}
					totalPages={totalPages || 0}
					totalElements={totalElements || 0}
					onClickFirstPage={firstPageHandler}
					onClickPreviousPage={previousPageHandler}
					onClickNextPage={nextPageHandler}
					onClickLastPage={lastPageHandler}
				/>

				<div className="downloadIcon">
					{/* download options*/}
					<div className="downloadOptionContainer">
						<div className="indicator"></div>
						<div className="downloadOptions shadow-4">
							{/* download as Pdf */}
							<div
								className="cursor-pointer downloadContainer shadow-4"
								style={{ width: '150px', margin: '10px' }}
								onClick={() => handlePdfDownload()}
							>
								<FontAwesomeIcon icon={faFilePdf} />
								<b>Download PDF</b>
								<FontAwesomeIcon icon={faDownload} />
							</div>

							{/* download as Excel */}
							<div
								className="cursor-pointer downloadContainer shadow-4"
								style={{ width: '160px', margin: '0px 10px 10px 10px' }}
								onClick={() => handleExelDownload()}
							>
								<FontAwesomeIcon icon={faFileExcel} />
								<b>Download Excel</b>
								<FontAwesomeIcon icon={faDownload} />
							</div>
						</div>
					</div>
					{/* download icon*/}
					<GetApp
						className="cursor-pointer inside icon"
						style={{ margin: '0px', border: (inDowloadPdf || inDowloadExcel) && '1px solid' }}
					/>
				</div>

				{/* print icon*/}
				<PrintIcon
					className="cursor-pointer inside icon"
					style={{ padding: '6px', border: inPrint && '1px solid' }}
					onClick={() => handlePrint()}
				/>

				{/* show single page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inSiglePageMode && '1px solid' }}
					// onClick={() => handleGetVisaSubmissionList()}
					icon={faBookOpen}
				/>

				{/* show all page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
					// onClick={() => handleGetAllVisaSubmissionList()}
					icon={faScroll}
				/>

				{/* column select option icon*/}
				<div className="columnSelectContainer">
					<ViewWeek
						id="insideClmSelect"
						className="cursor-pointer inside icon"
						style={{ margin: '0px', padding: '6px', border: showClmSelectOption && '1px solid' }}
						onClick={() => setTimeout(() => setShowClmSelectOption(true), 0)}
					/>

					{/* columns */}
					<div
						id="insideClmSelect"
						className={`allColumnContainer shadow-5 ${showClmSelectOption ? 'block' : 'hidden'}`}
					>
						{tableColumns.map(column => (
							<ColumnLabel
								key={column.name}
								column={column}
								dispatchTableColumns={dispatchTableColumns}
							/>
						))}
					</div>
				</div>
			</div>

			{/* excel converter */}
			<div className="hidden">
				<ReactHtmlTableToExcel
					id="test-table-xls-button"
					className="download-table-xls-button"
					table="table-to-xls"
					filename="tablexls"
					sheet="tablexls"
					buttonText="Download as XLS"
				/>
			</div>

			<table id="table-to-xls" className="w-full" style={{ minHeight: '270px' }}>
				<div ref={componentRef} id="downloadPage">
					{/* each single page (table) */}
					{modifiedVisaSbListData.map(visaSbList => (
						<VisaSubmissionListTable
							classes={classes}
							generalData={generalData}
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={visaSbList}
							serialNumber={visaSbList.page * visaSbList.size - visaSbList.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
							setSortBySubKey={setSortBySubKey}
							dragAndDropRow={dragAndDropRow}
						/>
					))}
				</div>
			</table>
		</>
	);
};

export default VisaSubmissionLists;
