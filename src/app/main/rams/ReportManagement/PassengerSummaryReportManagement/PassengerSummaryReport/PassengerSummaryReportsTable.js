import { faBookOpen, faDownload, faFileExcel, faFilePdf, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import { GetApp, ViewWeek } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import useReportData from 'app/@customHooks/useReportData';
import useUserInfo from 'app/@customHooks/useUserInfo';
import getPaginationData from 'app/@helpers/getPaginationData';
import html2PDF from 'jspdf-html2canvas';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import * as yup from 'yup';
import { GET_SITESETTINGS } from '../../../../../constant/constants';
import '../../Print.css';
import ColumnLabel from '../../reportComponents/ColumnLabel';
import Pagination from '../../reportComponents/Pagination';
import SinglePage from '../../reportComponents/SiglePage';
import { getReportMakeStyles } from '../../reportUtils/reportMakeStyls';
import tableColumnsReducer from '../../reportUtils/tableColumnsReducer';
import { getAllPassengerSummarys, getPassengerSummarys } from '../store/passengerSummaryReportSlice';
import PassengerSummaryFilterMenu from './PassengerSummaryFilterMenu';

const useStyles = makeStyles(theme => ({
	...getReportMakeStyles(theme)
}));

const schema = yup.object().shape({});

const initialTableColumnsState = [
	{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Date', name: 'created_at', show: true, type: 'date' },
	{ id: 3, label: 'P.Name', name: 'passenger_name', show: true },
	{ id: 4, label: 'PP.No', name: 'passport_no', show: true },
	{ id: 5, label: 'Gender', name: 'gender', show: true },
	{ id: 6, label: 'P.Type', name: 'passenger_type', subName: 'name', show: true },
	{ id: 7, label: 'Agent', name: 'agent', subName: 'username', show: true },
	{ id: 8, label: 'V.Agent', getterMethod: data => data?.visa_entry?.visa_agent?.username || '', show: true },
	{ id: 9, label: 'Country', name: 'target_country', subName: 'name', style: { lineHeight: '12px' }, show: true },
	{ id: 10, label: 'V.No', name: 'visa_entry', subName: 'visa_number', show: true },
	{ id: 11, label: 'ID No', name: 'passenger_id', show: true },
	{ id: 12, label: 'Profession', name: 'profession', subName: 'name', show: true },
	{ id: 13, label: 'PL', name: 'passenger_office_work', subName: 'police_clearance_status', show: true },
	{ id: 14, label: 'DL', name: 'passenger_office_work', subName: 'driving_license_status', show: true },
	{ id: 15, label: 'Medical', getterMethod: data => (data?.passenger_medical ? 'true' : 'false'), show: true },
	{
		id: 16,
		label: 'Med.Exp.Date',
		getterMethod: data => {
			const dedicalExpDate = data?.passenger_medical?.medical_expiry_date;
			return dedicalExpDate ? moment(new Date(dedicalExpDate)).format('DD-MM-YYYY') : '';
		},
		style: { whiteSpace: 'nowrap' },
		show: true
	},
	{ id: 17, label: 'Mefa', getterMethod: data => (data?.passenger_mofa ? 'true' : 'false'), show: true },
	{
		id: 18,
		label: 'V.Stamp.Date',
		getterMethod: data => {
			const vStampDate = data?.passenger_embassy?.stamping_date;
			return vStampDate ? moment(new Date(vStampDate)).format('DD-MM-YYYY') : '';
		},
		style: { whiteSpace: 'nowrap' },
		show: true
	},
	{ id: 19, label: 'Finger', name: 'passenger_office_work', subName: 'finger_status', show: true },
	{ id: 20, label: 'Training', getterMethod: data => (data?.passenger_training ? 'true' : 'false'), show: true },
	{
		id: 21,
		label: 'ManP.Date',
		getterMethod: data => {
			const manPDate = data?.passenger_man_power?.man_power_date;
			return manPDate ? moment(new Date(manPDate)).format('DD-MM-YYYY') : '';
		},
		style: { whiteSpace: 'nowrap' },
		show: true
	},
	{ id: 22, label: 'Flight', getterMethod: data => (data?.passenger_flight ? 'true' : 'false'), show: true },
	{ id: 23, label: 'Current Status', name: 'current_status', subName: 'name', show: true }
];

const PassengerSummaryReportsTable = () => {
	const classes = useStyles();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	const { getValues } = methods;

	const dispatch = useDispatch();

	const { authTOKEN } = useUserInfo();

	const [generalData, setGeneralData] = useState({});

	const [modifiedPassengerSummaryData, setModifiedPassengerSummaryData, setSortBy, setSortBySubKey] = useReportData();

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
	const handlePrint = () => {
		setInPrint(true);
		if (!inPrint) {
			if (!inShowAllMode && totalPages > 1) {
				handleGetAllPassengerSummarys(null, () => {
					printAction();
					setInPrint(false);
					handleGetPassengerSummarys();
				});
			} else {
				printAction();
				setInPrint(false);
			}
		}
	};

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
	const handlePdfDownload = () => {
		setInDowloadPdf(true);
		if (!inDowloadPdf) {
			if (!inShowAllMode && totalPages > 1) {
				handleGetAllPassengerSummarys(null, () => {
					pdfDownloadAction();
					setInDowloadPdf(false);
					handleGetPassengerSummarys();
				});
			} else {
				pdfDownloadAction();
				setInDowloadPdf(false);
			}
		}
	};

	//exel download page dom
	let downloadPage = document.getElementById('downloadPage');

	//exel download handler
	const handleExelDownload = () => {
		setInDowloadExcel(true);
		if (!inDowloadExcel) {
			if (!inShowAllMode && totalPages > 1) {
				handleGetAllPassengerSummarys(null, () => {
					document.getElementById('test-table-xls-button').click();
					setInDowloadExcel(false);
					handleGetPassengerSummarys();
				});
			} else {
				document.getElementById('test-table-xls-button').click();
				setInDowloadExcel(false);
			}
		}
	};

	//column select close handler
	useLayoutEffect(() => {
		window.addEventListener('click', e => {
			if (e.target.id !== 'insideClmSelect') setShowClmSelectOption(false);
		});
	}, []);

	//pagination handler
	const firstPageHandler = event => {
		handleGetPassengerSummarys(event.page);
	};
	const previousPageHandler = event => {
		handleGetPassengerSummarys(event.page);
	};
	const nextPageHandler = event => {
		handleGetPassengerSummarys(event.page);
	};
	const lastPageHandler = event => {
		handleGetPassengerSummarys(event.page);
	};

	//get passengerSummarys
	const handleGetPassengerSummarys = (pagePram, callBack) => {
		dispatch(getPassengerSummarys({ values: getValues(), pageAndSize: { page: pagePram || page, size } })).then(
			res => {
				unstable_batchedUpdates(() => {
					callBack && callBack(res.payload);
					setModifiedPassengerSummaryData(res.payload?.passengers || []);
					setPage(res.payload?.page || 1);
					setSize(res.payload?.size || 25);
					setTotalPages(res.payload?.total_pages || 0);
					setTotalElements(res.payload?.total_elements || 0);
					setInSiglePageMode(true);
					setInShowAllMode(false);
				});
			}
		);
	};

	//get all passengerSummary without pagination
	const handleGetAllPassengerSummarys = (callBack, callBackAfterStateUpdated) => {
		dispatch(getAllPassengerSummarys(getValues())).then(res => {
			unstable_batchedUpdates(() => {
				callBack && callBack(res.payload);
				setModifiedPassengerSummaryData(res.payload?.passengers || []);
				setInSiglePageMode(false);
				setInShowAllMode(true);
				//get pagination data
				const { totalPages, totalElements } = getPaginationData(res.payload?.passengers, size, page);
				setPage(page || 1);
				setSize(size || 25);
				setTotalPages(totalPages);
				setTotalElements(totalElements);
			});
			callBackAfterStateUpdated && callBackAfterStateUpdated(res.payload);
		});
	};

	return (
		<>
			<div className={classes.headContainer}>
				{/* filter */}
				<FormProvider {...methods}>
					<PassengerSummaryFilterMenu
						inShowAllMode={inShowAllMode}
						handleGetPassengerSummarys={handleGetPassengerSummarys}
						handleGetAllPassengerSummarys={handleGetAllPassengerSummarys}
					/>
				</FormProvider>
			</div>
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
					onClick={() => handleGetPassengerSummarys()}
					icon={faBookOpen}
				/>

				{/* show all page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
					onClick={() => handleGetAllPassengerSummarys()}
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
					{modifiedPassengerSummaryData.map(passengerSummary => (
						<SinglePage
							classes={classes}
							generalData={generalData}
							reporTitle="Passenger Summary Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={passengerSummary}
							serialNumber={passengerSummary.page * passengerSummary.size - passengerSummary.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
							setSortBySubKey={setSortBySubKey}
						/>
					))}
				</div>
			</table>
		</>
	);
};
export default PassengerSummaryReportsTable;
