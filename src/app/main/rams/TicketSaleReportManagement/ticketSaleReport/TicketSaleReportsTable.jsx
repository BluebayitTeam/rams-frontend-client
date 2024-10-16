import { zodResolver } from '@hookform/resolvers/zod';
import PrintIcon from '@mui/icons-material/Print';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import '../../../rams/print.css';

import { Tooltip, Zoom } from '@mui/material';
import moment from 'moment';
import Pagination from 'src/app/@components/ReportComponents/Pagination';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetTicketSaleAllReportsQuery,
  useGetTicketSaleReportsQuery
} from '../TicketSaleReportsApi';
import TicketSaleFilterMenu from './TicketsaleFilterMenu';


const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialPrintTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Issue Date', name: 'issue_date', show: true, type: 'date' },
	{ id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
	{ id: 4, label: 'Pax Name', name: 'passenger', subName: 'passenger_name', show: true },
	{
		id: 5,
		label: 'Issue Person',
		getterMethod: data => `${data.issue_person?.first_name || ''}, ${data.issue_person?.last_name || ''}`,
		show: true
	},
	{
		id: 6,
		label: 'Ticket Agency',
		getterMethod: data => `${data.ticket_agency?.first_name || ''}, ${data.ticket_agency?.last_name || ''}`,
		show: true
	},
	{ id: 7, label: 'Flight Date', name: 'flight_date', show: true, type: 'date' },
	{ id: 8, label: 'GDS', name: 'gds', subName: 'name', show: true },
	{ id: 9, label: 'PNR', name: 'gds_pnr', show: true },
	{ id: 10, label: 'Airline PNR', name: 'airline_pnr', show: true },
	{ id: 11, label: 'Return Flight Date', name: 'return_flight_date', show: true, type: 'date' },
	{ id: 12, label: 'Ticket No', name: 'ticket_no', show: true },
	{ id: 13, label: 'FLT & Class', name: '_class', show: true },
	{ id: 14, label: 'Air Way', name: 'current_airway', subName: 'name', show: true },
	{ id: 15, label: 'Sector Name', name: 'sector', show: true },
	{ id: 16, label: 'Fare Amount', name: 'fare_amount', show: true },
	{ id: 17, label: 'Airline Comission Amount', name: 'airline_commission_amount', show: true },
	{ id: 18, label: 'Customer Commission Amount', name: 'customer_commission_amount', show: true },
	{ id: 19, label: 'Tax Amount', name: 'tax_amount', subName: 'name', show: true },
	{ id: 20, label: ' Sales Amount', name: 'sales_amount', show: true },
	{ id: 21, label: 'Purchase Amount ', name: 'purchase_amount', show: true },
	{
		id: 22,
		label: 'Profit ',
		getterMethod: data => `${data.sales_amount - data.purchase_amount}`,
		show: true
	}
];

const initialAirlinePrintTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Issue Date', name: 'issue_date', show: true, type: 'date' },
	{ id: 3, label: 'Pax Name', name: 'passenger', subName: 'passenger_name', show: true },
	{
		id: 4,
		label: 'Ticket Agency',
		getterMethod: data => `${data.ticket_agency?.first_name || ''}, ${data.ticket_agency?.last_name || ''}`,
		show: true
	},
	{ id: 5, label: 'Ticket No', name: 'ticket_no', show: true },
	{ id: 6, label: 'Air Way', name: 'current_airway', subName: 'name', show: true },
	{ id: 7, label: 'Purchase Amount ', name: 'purchase_amount', show: true }
];
const initialCustomerPrintTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Issue Date', name: 'issue_date', show: true, type: 'date' },
	{ id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
	{
		id: 4,
		label: 'Pax Name',
		getterMethod: data => (data.pax_name ? `${data.pax_name}` : `${data.passenger?.passenger_name || ''}`),
		show: true
	},
	{
		id: 5,
		label: 'Issue Person',
		getterMethod: data => `${data.issue_person?.first_name || ''} ${data.issue_person?.last_name || ''}`,
		show: true
	},
	{
		id: 6,
		label: 'Ticket Agency',
		getterMethod: data => `${data.ticket_agency?.first_name || ''} ${data.ticket_agency?.last_name || ''}`,
		show: true
	},
	{ id: 7, label: 'Flight Date', name: 'flight_date', show: true, type: 'date' },
	{ id: 8, label: 'GDS', name: 'gds', subName: 'name', show: true },
	{ id: 9, label: 'PNR', name: 'gds_pnr', show: true },
	{ id: 10, label: 'Airline PNR', name: 'airline_pnr', show: true },
	{ id: 11, label: 'Return Flight Date', name: 'return_flight_date', show: true, type: 'date' },
	{ id: 12, label: 'Ticket No', name: 'ticket_no', show: true },
	{ id: 13, label: 'FLT & Class', name: '_class', show: true },
	{ id: 14, label: ' Sales Amount', name: 'sales_amount', show: true }
];
function TicketSaleReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const {  watch ,getValues } = methods;

  const [modifiedTicketSaleData, setModifiedTicketSaleData,setSortBy,setSortBySubKey,dragAndDropRow] = useReportData();
  console.log('modifiedTicketSaleData',modifiedTicketSaleData)
	const [totalFareAmount, setTotalFareAmount] = useState(0);
	const [totalAirlineCommissionAmount, setTotalAirlineCommissionAmount] = useState(0);
	const [totalCustomerCommisionAmount, setTotalCustomerCommisionAmount] = useState(0);
	const [totalTaxAmount, setTotalTaxAmount] = useState(0);
	const [totalSalesAmount, setTotalSalesAmount] = useState(0);
	const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
	const [totalProfit, setTotalProfit] = useState(0);

  const [printtableColumns, dispatchPrintTableColumns] = useReducer(
		tableColumnsReducer,
		initialPrintTableColumnsState
	);
	const [customerprinttableColumns, dispatchCustomerPrintTableColumns] = useReducer(
		tableColumnsReducer,
		initialCustomerPrintTableColumnsState
	);

	const [airlineprinttableColumns, dispatchAirlinePrintTableColumns] = useReducer(
		tableColumnsReducer,
		initialAirlinePrintTableColumnsState
	);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);
	const [inPrint, setInPrint] = useState(false);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);
	const [showClmSelectOption, setShowClmSelectOption] = useState(false);

  const filterData = watch();

  const { data: paginatedData,  } = useGetTicketSaleReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      airway: filterData.airway || '',
      agent: filterData.agent || '',
      ticket_agency: filterData.ticket_agency || '',
      issue_person: filterData.issue_person || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  
  const { data: allData, } = useGetTicketSaleAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      airway: filterData.airway || '',
      agent: filterData.agent || '',
      ticket_agency: filterData.ticket_agency || '',
      issue_person: filterData.issue_person || '',
    },
    { skip: !inShowAllMode }
  );


  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTicketSaleData(allData.iata_tickets || []);
      setInSiglePageMode(false);
			setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.iata_tickets,
        size,
        page
      );
      setPage(page || 1);
			setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
console.log('paginatedData',paginatedData.iata_tickets||[])
      setModifiedTicketSaleData(paginatedData.iata_tickets || []);
      setTotalPurchaseAmount(paginatedData?.total_purchase_amount || 0);
      setPage(paginatedData?.page || 1);
			setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
			setInShowAllMode(false);
      
    }
  }, [inShowAllMode, allData, paginatedData, size, page]);

  

  const handleGetTicketSales = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching ticketSales:', error);
    }
  }, []);

  const handleGetAllTicketSales = useCallback(async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching all ticketSales:', error);
    }
  }, []);


  const filteredData = {
    Branch: getValues()?.branchName || null,
    Airway: getValues()?.airwayName || null,
    Agent: getValues()?.agentName || null,
    Ticket_Agency: getValues()?.ticketAgency || null,
    Issue_Person: getValues()?.issuePerson || null,
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format("DD-MM-YYYY")
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format("DD-MM-YYYY")
      : null,
  };

//print don ref
const componentRefPrint = useRef();
const componentRefCustomerPrint = useRef();
const componentRefAirlinePrint = useRef();


	//printer action
	const printAction = useReactToPrint({
		content: () => componentRefPrint.current
	});
	//Customer printer action
	const customerprintAction = useReactToPrint({
		content: () => componentRefCustomerPrint.current
	});
	//Airline printer action
	const airlineprintAction = useReactToPrint({
		content: () => componentRefAirlinePrint.current
	});

	//print handler


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  
  });
	//Customer print handler
  const handleCustomerPrint = useReactToPrint({
    content: () => componentRef.current,
  
  });

  // Function to handle fetching and printing logic

	//Airline print handler
  const handleAirlinePrint = useReactToPrint({
    content: () => componentRef.current, // This defines the content to print

  });

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
				handleGetAllTicketSales(null, () => {
					pdfDownloadAction();
					setInDowloadPdf(false);
					handleGetTicketSales();
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
				handleGetAllTicketSales(null, () => {
					document.getElementById('test-table-xls-button').click();
					setInDowloadExcel(false);
					handleGetTicketSales();
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
		handleGetTicketSales(event.page);
	};
	const previousPageHandler = event => {
		handleGetTicketSales(event.page);
	};
	const nextPageHandler = event => {
		handleGetTicketSales(event.page);
	};
	const lastPageHandler = event => {
		handleGetTicketSales(event.page);
	};


  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TicketSaleFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTicketSales={handleGetTicketSales}
          handleGetAllTicketSales={handleGetAllTicketSales}
        />
      </FormProvider>
      <div className={`${classes.menubar} justify-start md:justify-center`} style={{ backgroundColor: '#c2c7f1' }}>
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
  {/* Print icon */}
  <PrintIcon
    className="cursor-pointer inside icon"
    style={{ padding: '6px', border: inPrint ? '1px solid' : 'none' }} 
    onClick={handlePrint} 
  />
				<Tooltip title="Customer Print" TransitionComponent={Zoom}>
					{/*Customer print icon*/}
					<PrintIcon
						className="cursor-pointer inside icon"
						style={{ padding: '4px', border: inPrint && '1px solid', color: 'green' }}
						onClick={() => handleCustomerPrint()}
					/>
				</Tooltip>
				<Tooltip title="Airline Print" style={{ color: 'red' }} TransitionComponent={Zoom}>
					{/*Airline print icon*/}
					<PrintIcon
						className="cursor-pointer inside icon"
						style={{ padding: '4px', border: inPrint && '1px solid', color: 'red' }}
						onClick={() => handleAirlinePrint()}
					/>
				</Tooltip>

  
</div>

      <table id='table-to-xls' className='w-full' style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTicketSaleData.map((ticketSale, index) => (
            <SinglePage
              key={ticketSale.id || index}
              classes={classes}
              reportTitle='Ticket Sales Report'
              filteredData={filteredData}
              printtableColumns={printtableColumns}
              dispatchPrintTableColumns={dispatchPrintTableColumns}
              data={{
                ...ticketSale,
                data: [
                  ...ticketSale?.data,
                  {
                    Profit: totalProfit,
                    purchase_amount: totalPurchaseAmount,
                    sales_amount: totalSalesAmount,
                    tax_amount: totalTaxAmount,
                    customer_commission_amount: totalCustomerCommisionAmount,
                    airline_commission_amount: totalAirlineCommissionAmount,
                    fare_amount: totalFareAmount,
                    details: 'Total',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 }
                  },
                ],
              }}
              
              totalColumn={initialPrintTableColumnsState?.length}

              serialNumber={
                pagination
                  ? page * size - size + 1
                  : ticketSale.page * ticketSale.size - ticketSale.size + 1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              setSortBy={setSortBy}
              setSortBySubKey={setSortBySubKey}
              dragAndDropRow={dragAndDropRow}
            />
          ))}
        </tbody>
      </table>

      <table id="table-to-xls" className="w-full" style={{ minHeight: '270px', display: 'none' }}>
				<div ref={componentRefCustomerPrint} id="downloadPage">
					{/* each single page (table) */}
					{modifiedTicketSaleData.map(ticketsale => (
						<SinglePage
							style={{ backgroundColor: 'green' }}
							classes={classes}
							
							reportTitle="Ticket Sales Report"
              filteredData={filteredData}
							tableColumns={customerprinttableColumns}
							dispatchTableColumns={dispatchCustomerPrintTableColumns}
							data={ticketsale}
							serialNumber={ticketsale.page * ticketsale.size - ticketsale.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
							setSortBySubKey={setSortBySubKey}
						/>
					))}
				</div>
			</table>

      <table id="table-to-xls" className="w-full" style={{ minHeight: '270px', display: 'none' }}>
				<div ref={componentRefAirlinePrint} id="downloadPage">
					{/* each single page (table) */}
					{modifiedTicketSaleData.map(ticketsale => (
						<SinglePage
							style={{ backgroundColor: 'green' }}
							classes={classes}
						
							reportTitle="Ticket Sales Report"
              filteredData={filteredData}
							tableColumns={airlineprinttableColumns}
							dispatchTableColumns={dispatchAirlinePrintTableColumns}
							data={ticketsale}
							serialNumber={ticketsale.page * ticketsale.size - ticketsale.size + 1}
							setPage={setPage}
							inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
							setSortBySubKey={setSortBySubKey}
						/>
					))}
				</div>
			</table>
    </div>
  );
}

export default TicketSaleReportsTable;