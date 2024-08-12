// ReportPaginationAndDownload.js
import { useState, useRef, useLayoutEffect } from 'react';
import { Pagination } from '@mui/material'; // Adjust import according to your Pagination component
import { GetApp, Print as PrintIcon, ViewWeek } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel, faDownload, faBookOpen, faScroll } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import html2PDF from 'html2pdf.js';
import { useReactToPrint } from 'react-to-print';

function ReportPaginationAndDownload({
	page,
	size,
	totalPages,
	totalElements,
	onFirstPage,
	onPreviousPage,
	onNextPage,
	onLastPage,
	handlePdfDownload,
	handleExelDownload,
	handlePrint,
	handleGetAgents,
	handleGetAllAgents,
	tableColumns,
	dispatchTableColumns
}) {
	const [inPrint, setInPrint] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [inDowloadPdf, setInDowloadPdf] = useState(false);
	const [inDowloadExcel, setInDowloadExcel] = useState(false);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

	const componentRef = useRef();

	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

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

	let downloadPage = document.getElementById('downloadPage');

	useLayoutEffect(() => {
		window.addEventListener('click', (e) => {
			if (e.target.id !== 'insideClmSelect') setShowClmSelectOption(false);
		});
	}, []);

	return (
		<div className="menubar">
			{/* Pagination */}
			<Pagination
				page={page}
				size={size}
				totalPages={totalPages || 0}
				totalElements={totalElements || 0}
				onClickFirstPage={onFirstPage}
				onClickPreviousPage={onPreviousPage}
				onClickNextPage={onNextPage}
				onClickLastPage={onLastPage}
			/>

			<div className="downloadIcon">
				<div className="downloadOptionContainer">
					<div className="indicator" />
					<div className="downloadOptions shadow-4">
						<div
							className="cursor-pointer downloadContainer shadow-4"
							style={{ width: '150px', margin: '10px' }}
							onClick={() => {
								setInDowloadPdf(true);
								handlePdfDownload();
							}}
						>
							<FontAwesomeIcon icon={faFilePdf} />
							<b>Download PDF</b>
							<FontAwesomeIcon icon={faDownload} />
						</div>

						<div
							className="cursor-pointer downloadContainer shadow-4"
							style={{ width: '160px', margin: '0px 10px 10px 10px' }}
							onClick={() => {
								setInDowloadExcel(true);
								handleExelDownload();
							}}
						>
							<FontAwesomeIcon icon={faFileExcel} />
							<b>Download Excel</b>
							<FontAwesomeIcon icon={faDownload} />
						</div>
					</div>
				</div>
				<GetApp
					className="cursor-pointer inside icon"
					style={{
						margin: '0px',
						border: (inDowloadPdf || inDowloadExcel) && '1px solid'
					}}
				/>
			</div>

			<PrintIcon
				className="cursor-pointer inside icon"
				style={{ padding: '6px', border: inPrint && '1px solid' }}
				onClick={() => {
					setInPrint(true);
					handlePrint();
				}}
			/>

			<FontAwesomeIcon
				className="cursor-pointer inside icon"
				style={{ padding: '8px', border: inSiglePageMode && '1px solid' }}
				onClick={() => handleGetAgents()}
				icon={faBookOpen}
			/>

			<FontAwesomeIcon
				className="cursor-pointer inside icon"
				style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
				onClick={() => handleGetAllAgents()}
				icon={faScroll}
			/>

			<div className="columnSelectContainer">
				<ViewWeek
					id="insideClmSelect"
					className="cursor-pointer inside icon"
					style={{
						margin: '0px',
						padding: '6px',
						border: showClmSelectOption && '1px solid'
					}}
					onClick={() => setShowClmSelectOption(true)}
				/>

				<div
					id="insideClmSelect"
					className={`allColumnContainer shadow-5 ${showClmSelectOption ? 'block' : 'hidden'}`}
				>
					{tableColumns.map((column) => (
						<ColumnLabel
							key={column.name}
							column={column}
							dispatchTableColumns={dispatchTableColumns}
						/>
					))}
				</div>
			</div>

			{/* Excel Converter */}
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
		</div>
	);
}

export default ReportPaginationAndDownload;
