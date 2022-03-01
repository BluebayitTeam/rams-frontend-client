import { faBookOpen, faDownload, faFileExcel, faFilePdf, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { GetApp, ViewWeek } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import useReportData from 'app/@customHooks/useReportData';
import useUserInfo from 'app/@customHooks/useUserInfo';
import getPaginationData from 'app/@helpers/getPaginationData';
import html2PDF from 'jspdf-html2canvas';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { GET_SITESETTINGS } from '../../../../../constant/constants';
import '../../Print.css';
import ColumnLabel from '../../reportComponents/ColumnLabel';
import Pagination from '../../reportComponents/Pagination';
import { getReportMakeStyles } from '../../reportUtils/reportMakeStyls';
import { getAllMakeAListReports, getMakeAListReports } from '../store/makeAListReportSlice';
import MakeAListSiglePage from './MakeAListSiglePage';

const useStyles = makeStyles(theme => ({
	...getReportMakeStyles(theme)
}));

const initialTableColumnsState = [{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true }];

function tableColumnsReducer(state, action) {
	switch (action.type) {
		case 'setColumns': {
			return action.data;
		}
		case 'show': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], show: true };
			return newState;
		}
		case 'hide': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], show: false };
			return newState;
		}
		case 'changLabel': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], label: action.value };
			return newState;
		}
		case 'dragAndDrop': {
			const newState = [...state];

			const dropperIndex = newState.findIndex(i => i.id == action.dropper);
			const draggerIndex = newState.findIndex(i => i.id == action.dragger);

			if ((action.dropper === 0 || action.dropper) && (action.dragger === 0 || action.dragger)) {
				if (dropperIndex < draggerIndex) {
					newState.splice(dropperIndex, 0, newState[draggerIndex]);
					newState.splice(draggerIndex + 1, 1);
					return newState;
				} else if (dropperIndex > draggerIndex) {
					newState.splice(dropperIndex + 1, 0, newState[draggerIndex]);
					newState.splice(draggerIndex, 1);
					return newState;
				} else {
					return state;
				}
			} else {
				return state;
			}
		}
		default:
			return state;
	}
}

const MakeAListReport = () => {
	const classes = useStyles();

	const { makeAListName, makeAListId } = useParams();

	const dispatch = useDispatch();

	const { authTOKEN } = useUserInfo();

	const [generalData, setGeneralData] = useState({});

	const [modifiedMakeAListReportData, setModifiedMakeAListReportData, setSortBy, setSortBySubKey] = useReportData();

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	//reset table column after data fetching
	const tableClmns = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeAListTableClms);
	useEffect(() => {
		dispatchTableColumns({ type: 'setColumns', data: tableClmns });
	}, [tableClmns]);

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

	useEffect(() => {
		if (makeAListId) {
			handleGetMakeAListReports();
		}
	}, [makeAListId]);

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
				handleGetAllMakeAListReports(null, () => {
					printAction();
					setInPrint(false);
					handleGetMakeAListReports();
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
				handleGetAllMakeAListReports(null, () => {
					pdfDownloadAction();
					setInDowloadPdf(false);
					handleGetMakeAListReports();
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
				handleGetAllMakeAListReports(null, () => {
					document.getElementById('test-table-xls-button').click();
					setInDowloadExcel(false);
					handleGetMakeAListReports();
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
		handleGetMakeAListReports(event.page);
	};
	const previousPageHandler = event => {
		handleGetMakeAListReports(event.page);
	};
	const nextPageHandler = event => {
		handleGetMakeAListReports(event.page);
	};
	const lastPageHandler = event => {
		handleGetMakeAListReports(event.page);
	};

	//get makeAListReports
	const handleGetMakeAListReports = (pagePram, callBack) => {
		dispatch(getMakeAListReports({ listId: makeAListId, pageAndSize: { page: pagePram || page, size } })).then(
			res => {
				unstable_batchedUpdates(() => {
					callBack && callBack(res.payload);
					setModifiedMakeAListReportData(res.payload?.make_list_items || []);
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

	//get all makeAListReport without pagination
	const handleGetAllMakeAListReports = (callBack, callBackAfterStateUpdated) => {
		dispatch(getAllMakeAListReports({ listId: makeAListId })).then(res => {
			unstable_batchedUpdates(() => {
				callBack && callBack(res.payload);
				setModifiedMakeAListReportData(res.payload || []);
				setInSiglePageMode(false);
				setInShowAllMode(true);
				//get pagination data
				const { totalPages, totalElements } = getPaginationData(res.payload, size, page);
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
					onClick={() => handleGetMakeAListReports()}
					icon={faBookOpen}
				/>

				{/* show all page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
					onClick={() => handleGetAllMakeAListReports()}
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
					{modifiedMakeAListReportData.map(makeAListReport => (
						<MakeAListSiglePage
							classes={classes}
							generalData={generalData}
							reporTitle={makeAListName}
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={makeAListReport}
							serialNumber={makeAListReport.page * makeAListReport.size - makeAListReport.size + 1}
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
export default MakeAListReport;
