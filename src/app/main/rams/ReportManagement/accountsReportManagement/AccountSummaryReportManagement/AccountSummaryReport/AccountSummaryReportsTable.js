import { faBookOpen, faDownload, faFileExcel, faFilePdf, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import { GetApp, ViewWeek } from '@material-ui/icons';
import PrintIcon from '@material-ui/icons/Print';
import useReportData from 'app/@customHooks/useReportData';
import useUserInfo from 'app/@customHooks/useUserInfo';
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
import { getAccountSummarys, getAllAccountSummarys } from '../store/accountSummaryReportSlice';
import AccountSummaryFilterMenu from './AccountSummaryFilterMenu';

const useStyles = makeStyles(theme => ({
	...getReportMakeStyles(theme)
}));

const schema = yup.object().shape({});

const initialTableColumnsState = [
	{ id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Acoount', name: 'account', show: true },
	{
		id: 3,
		label: 'Receipt',
		name: 'debit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 4,
		label: 'Payment',
		name: 'credit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 5,
		label: 'Balance',
		name: 'balance',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	}
];

const AccountSummaryReportsTable = () => {
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

	const [modifiedAccountSummaryData, setModifiedAccountSummaryData, setSortBy] = useReportData({ extraRowCount: 1 });

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
				handleGetAllAccountSummarys(null, () => {
					printAction();
					setInPrint(false);
					handleGetAccountSummarys();
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
				handleGetAllAccountSummarys(null, () => {
					pdfDownloadAction();
					setInDowloadPdf(false);
					handleGetAccountSummarys();
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
				handleGetAllAccountSummarys(null, () => {
					document.getElementById('test-table-xls-button').click();
					setInDowloadExcel(false);
					handleGetAccountSummarys();
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
		handleGetAccountSummarys(event.page);
	};
	const previousPageHandler = event => {
		handleGetAccountSummarys(event.page);
	};
	const nextPageHandler = event => {
		handleGetAccountSummarys(event.page);
	};
	const lastPageHandler = event => {
		handleGetAccountSummarys(event.page);
	};

	const convertObjectToArray = obj => {
		let convertedArr = [];
		for (let x in obj) {
			switch (x) {
				case 'bank_cr_total':
					convertedArr.push({ account: 'Bank', credit_amount: obj[x].toFixed(2), debit_amount: '0.00' });
					break;
				case 'bank_dr_total':
					convertedArr.push({ account: 'Bank', credit_amount: '0.00', debit_amount: obj[x].toFixed(2) });
					break;
				case 'cash_cr_total':
					convertedArr.push({ account: 'Cash', credit_amount: obj[x].toFixed(2), debit_amount: '0.00' });
					break;
				case 'cash_dr_total':
					convertedArr.push({ account: 'Cash', credit_amount: '0.00', debit_amount: obj[x].toFixed(2) });
					break;
			}
		}
		return convertedArr;
	};

	//get accountSummarys
	const handleGetAccountSummarys = (pagePram, callBack) => {
		dispatch(getAccountSummarys({ values: getValues(), pageAndSize: { page: pagePram || page, size } })).then(
			res => {
				unstable_batchedUpdates(() => {
					callBack && callBack(res.payload);
					const convertedArray = convertObjectToArray(res.payload);
					setModifiedAccountSummaryData(convertedArray || [], 25);
					const totalCdAmnt = getTotalAmount(convertedArray || [], 'credit_amount');
					settotalCdAmount(totalCdAmnt);
					const totalDbAmnt = getTotalAmount(convertedArray || [], 'debit_amount');
					settotalDbAmount(totalDbAmnt);
					setTotalBAlance((totalDbAmnt - totalCdAmnt).toFixed(2) || '0.00');
					setPage(page || 1);
					setSize(size || 25);
					setTotalPages(1);
					setTotalElements(4);
					setInSiglePageMode(true);
					setInShowAllMode(false);
				});
			}
		);
	};

	//get all accountSummary without pagination
	const handleGetAllAccountSummarys = (callBack, callBackAfterStateUpdated) => {
		dispatch(getAllAccountSummarys(getValues())).then(res => {
			unstable_batchedUpdates(() => {
				callBack && callBack(res.payload);
				const convertedArray = convertObjectToArray(res.payload);
				setModifiedAccountSummaryData(convertedArray || [], 25);
				const totalCdAmnt = getTotalAmount(convertedArray || [], 'credit_amount');
				settotalCdAmount(totalCdAmnt);
				const totalDbAmnt = getTotalAmount(convertedArray || [], 'debit_amount');
				settotalDbAmount(totalDbAmnt);
				setTotalBAlance((totalDbAmnt - totalCdAmnt).toFixed(2) || '0.00');
				setInSiglePageMode(false);
				setInShowAllMode(true);
				setPage(page || 1);
				setSize(size || 25);
				setTotalPages(1);
				setTotalElements(4);
			});
			callBackAfterStateUpdated && callBackAfterStateUpdated(res.payload);
		});
	};

	return (
		<>
			<div className={classes.headContainer}>
				{/* filter */}
				<FormProvider {...methods}>
					<AccountSummaryFilterMenu
						inShowAllMode={inShowAllMode}
						handleGetAccountSummarys={handleGetAccountSummarys}
						handleGetAllAccountSummarys={handleGetAllAccountSummarys}
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
					onClick={() => handleGetAccountSummarys()}
					icon={faBookOpen}
				/>

				{/* show all page icon*/}
				<FontAwesomeIcon
					className="cursor-pointer inside icon"
					style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
					onClick={() => handleGetAllAccountSummarys()}
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
					{modifiedAccountSummaryData.map((accountSummary, idx) => {
						return (
							<SinglePage
								classes={classes}
								generalData={generalData}
								reporTitle="Account Statement Summary Report"
								tableColumns={tableColumns}
								dispatchTableColumns={dispatchTableColumns}
								data={
									accountSummary.isLastPage
										? {
												...accountSummary,
												data: accountSummary.data.concat({
													credit_amount: totalCdAmount,
													debit_amount: totalDbAmount,
													details: 'Total',
													balance: totalBAlance,
													hideSerialNo: true,
													rowStyle: { fontWeight: 600 }
												})
										  }
										: accountSummary
								}
								serialNumber={accountSummary.page * accountSummary.size - accountSummary.size + 1}
								setPage={setPage}
								inSiglePageMode={inSiglePageMode}
								setSortBy={setSortBy}
							/>
						);
					})}
				</div>
			</table>
		</>
	);
};
export default AccountSummaryReportsTable;
