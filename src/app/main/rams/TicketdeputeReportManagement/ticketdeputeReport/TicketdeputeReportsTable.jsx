import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';

import TicketdeputeFilterMenu from './TicketdeputeFilterMenu';
import {
  useGetTicketdeputeAllReportsQuery,
  useGetTicketdeputeReportsQuery,
} from '../TicketdeputeReportsApi';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialPrintTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Issue Date', name: 'issue_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
  {
    id: 4,
    label: 'Pax Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },
  {
    id: 5,
    label: 'Issue Person',
    name: 'issue_person',
    subName: 'username',
    show: true,
  },
  {
    id: 6,
    label: 'Ticket Agency',
    name: 'ticket_agency',
    subName: 'username',
    show: true,
  },
  {
    id: 7,
    label: 'Flight Date',
    name: 'flight_date',
    show: true,
    type: 'date',
  },
  { id: 8, label: 'GDS', name: 'gds', show: true },
  { id: 9, label: 'PNR', name: 'gds_pnr', show: true },
  { id: 10, label: 'Airline PNR', name: 'airline_pnr', show: true },
  {
    id: 11,
    label: 'Return Flight Date',
    name: 'return_flight_date',
    show: true,
    type: 'date',
  },
  { id: 12, label: 'Ticket No', name: 'ticket_no', show: true },
  { id: 13, label: 'FLT & Class', name: '_class', show: true },
  {
    id: 14,
    label: 'Air Way',
    name: 'current_airway',
    subName: 'name',
    show: true,
  },
  { id: 15, label: 'Sector Name', name: 'sector', show: true },
  { id: 16, label: 'Fare Amount', name: 'fare_amount', show: true },
  {
    id: 17,
    label: 'Airline Comission Amount',
    name: 'airline_commission_amount',
    show: true,
  },
  {
    id: 18,
    label: 'Customer Commission Amount',
    name: 'customer_commission_amount',
    show: true,
  },
  {
    id: 19,
    label: 'Tax Amount',
    name: 'tax_amount',
    subName: 'name',
    show: true,
  },
  { id: 20, label: ' Sales Amount', name: 'sales_amount', show: true },
  { id: 21, label: 'Purchase Amount ', name: 'purchase_amount', show: true },
];

function TicketdeputeReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedTicketdeputeData, setModifiedTicketdeputeData] =
    useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialPrintTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetTicketdeputeReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        ticket_no: filterData.ticket_no || '',
        invoice_no: filterData.invoice_no || '',
        airline_agency: filterData.airline_agency || '',
        agent: filterData.agent || '',

        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const { data: allData, refetch: refetchAllTicketdeputeReports } =
    useGetTicketdeputeAllReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        ticket_no: filterData.ticket_no || '',
        invoice_no: filterData.invoice_no || '',
        airline_agency: filterData.airline_agency || '',
        agent: filterData.agent || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTicketdeputeData(allData.ticket_deputes || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.ticket_deputes,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedTicketdeputeData(paginatedData.ticket_deputes || []);
      setTotalAmount(paginatedData.total_amount);
      setPage(paginatedData?.page || 1);
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

  const handleGetTicketdeputes = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllTicketdeputes = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketdeputes:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Ticket_No: getValues()?.ticket_no || null,
    Invoice_No: getValues()?.invoice_no || null,
    Airline_Agency: getValues()?.airline_agencyName || null,
    Customer: getValues()?.agentName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TicketdeputeFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTicketdeputes={handleGetTicketdeputes}
          handleGetAllTicketdeputes={handleGetAllTicketdeputes}
        />
      </FormProvider>

      <ReportPaginationAndDownload
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        inShowAllMode={inShowAllMode}
        setInShowAllMode={setInShowAllMode}
        componentRef={componentRef}
        totalPages={totalPages}
        totalElements={totalElements}
        onFirstPage={() => handleGetTicketdeputes(1)}
        onPreviousPage={() => handleGetTicketdeputes(page - 1)}
        onNextPage={() => handleGetTicketdeputes(page + 1)}
        onLastPage={() => handleGetTicketdeputes(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTicketdeputes}
        handleGetAllData={handleGetAllTicketdeputes}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='TicketdeputeReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTicketdeputeData.map((ticketdepute, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Ticket Depute Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={ticketdepute}
              totalColumn={initialPrintTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * ticketdepute.data.length + 1
                  : ticketdepute.page * ticketdepute.size -
                    ticketdepute.size +
                    1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketdeputeReportsTable;
