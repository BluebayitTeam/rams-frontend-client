import { zodResolver } from '@hookform/resolvers/zod';
import PrintIcon from '@mui/icons-material/Print';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import '../../../rams/print.css';

import moment from 'moment';
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

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

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

      setModifiedTicketSaleData(paginatedData.iata_tickets || []);
      setPage(paginatedData?.page || 1);
			setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
			setInShowAllMode(false);
      
    }
  }, [inShowAllMode, allData, paginatedData, size, page]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
  {/* Print icon */}
  <PrintIcon
    className="cursor-pointer inside icon"
    // style={{ padding: '6px', border: inPrint ? '1px solid' : 'none' }} 
    onClick={handlePrint} 
  />
  
</div>

      <table id='table-to-xls' className='w-full' style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTicketSaleData.map((ticketSale, index) => (
            <SinglePage
              key={ticketSale.id || index}
              classes={classes}
              reportTitle='PostDate Cheque Report'
              filteredData={filteredData}
              printtableColumns={printtableColumns}
              dispatchPrintTableColumns={dispatchPrintTableColumns}
              data={ticketSale}
              
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
    </div>
  );
}

export default TicketSaleReportsTable;