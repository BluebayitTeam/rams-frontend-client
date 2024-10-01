// ReportPaginationAndDownload.js
import BallotIcon from '@mui/icons-material/Ballot';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import DifferenceIcon from '@mui/icons-material/Difference';
import DownloadIcon from '@mui/icons-material/Download';
import ImportContactsSharpIcon from '@mui/icons-material/ImportContactsSharp';
import PrintSharpIcon from '@mui/icons-material/PrintSharp';
import { makeStyles } from '@mui/styles';
import html2PDF from 'jspdf-html2canvas';
import { useLayoutEffect, useState } from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { getReportMakeStyles } from 'src/app/main/rams/ReportUtilities/reportMakeStyls';
import ColumnLabel from './ColumnLabel';
import Pagination from './Pagination';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

function ReportPaginationAndDownload({
	page,
	setPage,
	size,
	setSize,
	inShowAllMode = false,  // Set the default state to false for pg to be selected
	setInShowAllMode,
	totalPages,
	totalElements,
	onFirstPage,
	onPreviousPage,
	onNextPage,
	onLastPage,
	handlePdfDownload,
	handleExelDownload,
	handlePrint,
	handleGetData,
	handleGetAllData,
	tableColumns,
	dispatchTableColumns,
	hideSection
}) {
	const classes = useStyles();
	console.log('totalPages,totalElements', totalPages, totalElements);
	const [inPrint, setInPrint] = useState(false);
	const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [inDowloadPdf, setInDowloadPdf] = useState(false);
	const [inDowloadExcel, setInDowloadExcel] = useState(false);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

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

	const downloadPage = document.getElementById('downloadPage');

	useLayoutEffect(() => {
		window.addEventListener('click', (e) => {
			if (e.target.id !== 'insideClmSelect') setShowClmSelectOption(false);
		});
	}, []);

	return (
    <div
      className={`${classes.menubar} justify-start md:justify-center`}
      style={{ backgroundColor: '#c2c7f1' }}>

      {/* Pagination */}
      {inShowAllMode || !hideSection?.includes('pagination') && (
        <Pagination
          page={page }
          size={size}
          totalPages={totalPages || 0}
          totalElements={totalElements || 0}
          onClickFirstPage={onFirstPage}
          onClickPreviousPage={onPreviousPage}
          onClickNextPage={onNextPage}
          onClickLastPage={onLastPage}
        />
      )}
      {!hideSection?.includes('download') && (
        <div className='downloadIcon'>
          <div className='downloadOptionContainer'>
            <div className='indicator' />
            <div className='downloadOptions shadow-4'>
              <div
                className='cursor-pointer downloadContainer shadow-4'
                style={{ width: '160px', margin: '0px 10px 10px 10px' }}
                onClick={() => {
                  setInDowloadExcel(true);
                  handleExelDownload();
                }}>
                <DifferenceIcon />
                <span>Download Excel</span>
                <DownloadIcon />
              </div>
            </div>
          </div>
          <DownloadIcon
            className='cursor-pointer inside icon'
            style={{
              margin: '0px',
              border: (inDowloadPdf || inDowloadExcel) && '1px solid',
            }}
          />
        </div>
      )}

      {!hideSection?.includes('print') && (
        <PrintSharpIcon
          className='cursor-pointer inside icon'
          style={{ padding: '6px', border: inPrint && '1px solid' }}
          onClick={() => {
            setInPrint(true);
            handlePrint();
          }}
        />
      )}

      {!hideSection?.includes('pg') && (
        <ImportContactsSharpIcon
          className='cursor-pointer inside icon'
          style={{ padding: '8px', border: !inShowAllMode && '1px solid' }}
          onClick={() => {
            setInShowAllMode(false);
            handleGetData();
          }}
        />
      )}

      {!hideSection?.includes('wp') && (
        <BallotIcon
          className='cursor-pointer inside icon'
          style={{ padding: '8px', border: inShowAllMode && '1px solid' }}
          onClick={() => {
            setInShowAllMode(true);
            handleGetAllData();
          }}
        />
      )}

      {!hideSection?.includes('column') && (
        <div className='columnSelectContainer'>
          <DensitySmallIcon
            id='insideClmSelect'
            className='cursor-pointer inside icon'
            style={{
              margin: '0px',
				padding: '6px',
			  
              border: showClmSelectOption && '1px solid',
            }}
            onClick={() => setShowClmSelectOption(true)}
          />

          <div
            id='insideClmSelect'
            className={`allColumnContainer shadow-5 ${showClmSelectOption ? 'block' : 'hidden'}`}>
            {tableColumns.map((column) => (
              <ColumnLabel
                key={column.name}
                column={column}
                dispatchTableColumns={dispatchTableColumns}
              />
            ))}
          </div>
        </div>
      )}

      {/* Excel Converter */}
      <div className='hidden'>
        <ReactHtmlTableToExcel
          id='test-table-xls-button'
          className='download-table-xls-button'
          table='table-to-xls'
          filename='AgentReports'
          sheet='AgentReportsSheet'
          buttonText='Download as XLS'
        />
      </div>

      {/* <div
					style={{
						display: 'flex',
						visibility: modifiedDonationAssignData?.length > 0 ? 'visible' : 'hidden',
						fontSize: '16px'
					}}
				>
					<div style={{ marginRight: '50px' }}>
						<b>Total Records :</b> {totalRecords}
					</div>
					<div>
						<b>Balance : </b>
						{totalAllPageBalance?.toFixed(2)}
					</div>
				</div>{' '} */}



      
    </div>
  );
}

export default ReportPaginationAndDownload;
