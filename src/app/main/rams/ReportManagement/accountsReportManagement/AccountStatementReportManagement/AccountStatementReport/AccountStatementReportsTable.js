import { faBookOpen, faDownload, faFileExcel, faFilePdf, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import { GetApp, ViewWeek } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import useReportData2 from 'app/@customHooks/useReportData2';
import useUserInfo from 'app/@customHooks/useUserInfo';
import { ledgerCashId, ledgerCashName } from 'app/@data/data';
import getPaginationData from 'app/@helpers/getPaginationData';
import getTotalAmount from 'app/@helpers/getTotalAmount';
import html2PDF from 'jspdf-html2canvas';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import * as yup from 'yup';
import { GET_SITESETTINGS } from '../../../../../../constant/constants';
import ColumnLabel from '../../../reportComponents/ColumnLabel';
import Pagination from '../../../reportComponents/Pagination';
import SinglePage from '../../../reportComponents/SiglePage';
import { getReportMakeStyles } from '../../../reportUtils/reportMakeStyls';
import tableColumnsReducer from '../../../reportUtils/tableColumnsReducer';
import { getAccountStatements, getAllAccountStatements } from '../store/accountStatementReportSlice';
import AccountStatementFilterMenu from './AccountStatementFilterMenu';

const useStyles = makeStyles(theme => ({
	...getReportMakeStyles(theme)
}));

const schema = yup.object().shape({});

const initialTableColumnsState = [
	{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Date', name: 'log_date', show: true, type: 'date' },
	{ id: 3, label: 'Invoice No', name: 'reference_no', show: true },
	{ id: 4, label: 'Purpose', name: 'sub_ledger', subName: 'name', show: true },
	{ id: 5, label: 'Details', name: 'details', show: true },
	{
		id: 7,
		label: 'Receipt',
		name: 'debit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 6,
		label: 'Payment',
		name: 'credit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 8,
		label: 'Balance',
		name: 'balance',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	}
];

const AccountStatementReportsTable = () => {
	const classes = useStyles();

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			ledger: ledgerCashId,
			ledgerName: ledgerCashName
		},
		resolver: yupResolver(schema)
	});

	const { getValues } = methods;

	const dispatch = useDispatch();

	const { authTOKEN } = useUserInfo();

	const [generalData, setGeneralData] = useState({});

	const [modifiedAccountStatementData, setModifiedAccountStatementData, setSortBy] = useReportData2({
		type: 'accountStatement',
		extraRowCount: 1
	});

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [totalCdAmount, settotalCdAmount] = useState(0);
	const [totalDbAmount, settotalDbAmount] = useState(0);
	const [totalBAlance, setTotalBAlance] = useState(0);

	//tools state
	const [inPrint, setInPrint] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [inDowloadPdf, setInDowloadPdf] = useState(false);
	const [inDowloadExcel, setInDowloadExcel] = useState(false);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

	//pagination state
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(24);
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
				handleGetAllAccountStatements(null, () => {
					printAction();
					setInPrint(false);
					handleGetAccountStatements();
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
				handleGetAllAccountStatements(null, () => {
					pdfDownloadAction();
					setInDowloadPdf(false);
					handleGetAccountStatements();
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
				handleGetAllAccountStatements(null, () => {
					document.getElementById('test-table-xls-button').click();
					setInDowloadExcel(false);
					handleGetAccountStatements();
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
		handleGetAccountStatements(event.page);
	};
	const previousPageHandler = event => {
		handleGetAccountStatements(event.page);
	};
	const nextPageHandler = event => {
		handleGetAccountStatements(event.page);
	};
	const lastPageHandler = event => {
		handleGetAccountStatements(event.page);
	};

	//get accountStatements
	const handleGetAccountStatements = (pagePram, callBack) => {
		dispatch(getAccountStatements({ values: getValues(), pageAndSize: { page: pagePram || page, size } })).then(
			res => {
				unstable_batchedUpdates(() => {
					callBack && callBack(res.payload);
					setModifiedAccountStatementData(
						res.payload?.account_logs || [],
						25,
						res.payload?.previous_balance || 0
					);
					const totalCdAmnt = getTotalAmount(res.payload?.account_logs || [], 'credit_amount');
					settotalCdAmount(totalCdAmnt);
					const totalDbAmnt = getTotalAmount(
						res.payload?.account_logs || [],
						'debit_amount',
						res.payload?.previous_balance || 0
					);
					settotalDbAmount(totalDbAmnt);
					setTotalBAlance((totalDbAmnt - totalCdAmnt).toFixed(2) || '0.00');
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

	//get all accountStatement without pagination
	const handleGetAllAccountStatements = (callBack, callBackAfterStateUpdated) => {
		dispatch(getAllAccountStatements(getValues())).then(res => {
			unstable_batchedUpdates(() => {
				callBack && callBack(res.payload);
				setModifiedAccountStatementData(
					res.payload?.account_logs || [],
					25,
					res.payload?.previous_balance || 0
				);
				const totalCdAmnt = getTotalAmount(res.payload?.account_logs || [], 'credit_amount');
				settotalCdAmount(totalCdAmnt);
				const totalDbAmnt = getTotalAmount(
					res.payload?.account_logs || [],
					'debit_amount',
					res.payload?.previous_balance || 0
				);
				settotalDbAmount(totalDbAmnt);
				setTotalBAlance((totalDbAmnt - totalCdAmnt).toFixed(2) || '0.00');
				setInSiglePageMode(false);
				setInShowAllMode(true);
				//get pagination data
				const { totalPages, totalElements } = getPaginationData(res.payload?.account_logs, size, page);
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
					<AccountStatementFilterMenu
						inShowAllMode={inShowAllMode}
						handleGetAccountStatements={handleGetAccountStatements}
						handleGetAllAccountStatements={handleGetAllAccountStatements}
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
					onClick={() => handleGetAccountStatements()}
					icon={faBookOpen}
				/>

				{/* show all page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
					onClick={() => handleGetAllAccountStatements()}
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
							<ColumnLabel key={column.id} column={column} dispatchTableColumns={dispatchTableColumns} />
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
					{modifiedAccountStatementData.map((accountStatement, idx) => {
						return (
							<SinglePage
								classes={classes}
								generalData={generalData}
								reporTitle="Account Statement Report"
								tableColumns={tableColumns}
								dispatchTableColumns={dispatchTableColumns}
								data={
									accountStatement.isLastPage
										? {
												...accountStatement,
												data: accountStatement.data.concat({
													credit_amount: totalCdAmount,
													debit_amount: totalDbAmount,
													details: 'Total',
													balance: totalBAlance,
													hideSerialNo: true,
													rowStyle: { fontWeight: 600 }
												})
										  }
										: accountStatement
								}
								serialNumber={accountStatement.page * accountStatement.size - accountStatement.size + 1}
								setPage={setPage}
								inSiglePageMode={inSiglePageMode}
								setSortBy={setSortBy}
								addInHeader={
									accountStatement.isFirsPage ? (
										<div>
											<h3>Opening Balance: {accountStatement.openingBlnc.toFixed(2)}</h3>
										</div>
									) : (
										''
									)
								}
							/>
						);
					})}
				</div>
			</table>
		</>
	);
};
export default AccountStatementReportsTable;
