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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetTicketsalessummaryAllReportsQuery,
  useGetTicketsalessummaryReportsQuery,
} from '../TicketsalessummaryReportsApi';
import TicketsalessummaryFilterMenu from './TicketsalessummaryFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

// const initialTableColumnsState = [
//   { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
//   { id: 2, label: 'Issue Date', name: 'issue_date', show: true, type: 'date' },
//   { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
//   {
//     id: 4,
//     label: 'Passenger Name',
//     name: 'passenger',
//     subName: 'passenger_name',
//     show: true,
//   },
//   {
//     id: 5,
//     label: 'Agent Name',
//     name: 'passenger',
//     subName: 'agent.first_name',
//     show: true,
//   },
//   {
//     id: 6,
//     label: 'Ticket Agency Name',
//     name: 'ticket_agency',
//     subName: 'first_name',
//     show: true,
//   },
//   {
//     id: 7,
//     label: 'Flight Date',
//     name: 'flight_date',
//     show: true,
//     type: 'date',
//   },
//   { id: 8, label: 'Ticket No', name: 'ticket_no', show: true },
//   { id: 9, label: 'Country', name: 'sector_name', show: true },
//   { id: 10, label: 'Sector Name', name: 'sector_name', show: true },
//   { id: 11, label: ' AirWay', name: 'carrier_air_way', show: true },
//   { id: 12, label: 'Flight No', name: 'flight_no', show: true, type: 'date' },
//   { id: 13, label: 'Flight Time', name: 'flight_time', show: true },
//   { id: 14, label: 'Comment', name: 'notes', show: true },
//   { id: 15, label: 'Purchase Amount', name: 'purchase_amount', show: true },
// ];

const initialTableColumnsState = [
  { id: 1, label: 'Sl No', sortAction: false, isSerialNo: true, show: true },

  {
    id: 2,
    label: 'Ticket Agency Name',
    getterMethod: (data) =>
      `${data.ticket_agency?.first_name || ''} ${data.ticket_agency?.last_name || ''}`,
    show: true,
  },

  { id: 3, label: 'Total Ticket', name: 'dup_count', show: true },
  {
    id: 4,
    label: 'Action',
    getterMethod: (data) => {
      return (
        <VisibilityIcon
          onClick={() => {
            sessionStorage.setItem('ticket_agency', data.ticket_agency?.id);
            history.push(
              `/apps/ticketsalesummeryfilterdatas/report/:date_before/:date_after/:current_airway/:customer/:ticket_agency/:branch/:issue_person?`
            );
          }}
          className='h-22 cursor-pointer'
          style={{ color: 'orange' }}
        />
      );
    },
    show: true,
  },
];

const initialPrintTableColumnsState2 = [
  { id: 1, label: 'Sl No', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Air Way  ',
    getterMethod: (data) => `${data.current_airway?.name || ''}`,
    show: true,
  },
  { id: 3, label: 'Total Ticket', name: 'dup_count', show: true },

  {
    id: 4,
    label: 'Action',
    getterMethod: (data) => {
      return (
        <VisibilityIcon
          onClick={() => {
            sessionStorage.setItem('current_airway', data.current_airway?.id);
            history.push(`/apps/ticketsalesummeryfilterdatas/report`);
          }}
          className='h-22 cursor-pointer'
          style={{ color: 'orange' }}
        />
      );
    },
    show: true,
  },
];
const initialPrintTableColumnsState3 = [
  { id: 1, label: 'Sl No', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Agent Name',
    getterMethod: (data) =>
      `${data.customer?.first_name || ''} ${data.customer?.last_name || ''}`,
    show: true,
  },
  { id: 3, label: 'Total Ticket', name: 'dup_count', show: true },
  {
    id: 4,
    label: 'Action',
    getterMethod: (data) => {
      return (
        <VisibilityIcon
          onClick={() => {
            sessionStorage.setItem('customer', data.customer?.id);
            history.push(`/apps/ticketsalesummeryfilterdatas/report`);
          }}
          className='h-22 cursor-pointer'
          style={{ color: 'orange' }}
        />
      );
    },
    show: true,
  },
];
const initialPrintTableColumnsState4 = [
  { id: 1, label: 'Sl No', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Issue Person  ',
    getterMethod: (data) =>
      `${data.issue_person?.first_name || ''} ${data.issue_person?.last_name || ''}`,
    show: true,
  },
  { id: 3, label: 'Total Ticket', name: 'dup_count', show: true },
  {
    id: 4,
    label: 'Action',
    getterMethod: (data) => {
      return (
        <VisibilityIcon
          onClick={() => {
            sessionStorage.setItem('issue_person', data.issue_person?.id);
            history.push({
              pathname: '/apps/ticketsalesummeryfilterdatas/report',
            });
          }}
          className='h-22 cursor-pointer'
          style={{ color: 'orange' }}
        />
      );
    },
    show: true,
  },
];

function TicketsalessummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedTicketsalessummaryData, setModifiedTicketsalessummaryData] =
    useReportData();
  const [modifiedTicketsalessummaryData2, setModifiedTicketsalessummaryData2] =
    useReportData();

  const [modifiedTicketsalessummaryData3, setModifiedTicketsalessummaryData3] =
    useReportData();
  const [modifiedTicketsalessummaryData4, setModifiedTicketsalessummaryData4] =
    useReportData();

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );

  const [printtableColumns2, dispatchPrintTableColumns2] = useReducer(
    tableColumnsReducer,
    initialPrintTableColumnsState2
  );

  const [printtableColumns3, dispatchPrintTableColumns3] = useReducer(
    tableColumnsReducer,
    initialPrintTableColumnsState3
  );
  const [printtableColumns4, dispatchPrintTableColumns4] = useReducer(
    tableColumnsReducer,
    initialPrintTableColumnsState4
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
    useGetTicketsalessummaryReportsQuery(
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

  const { data: allData, refetch: refetchAllTicketsalessummaryReports } =
    useGetTicketsalessummaryAllReportsQuery(
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
      setModifiedTicketsalessummaryData(allData.iata_tickets || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
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
      setModifiedTicketsalessummaryData(
        paginatedData?.iata_tickets.current_airways || []
      );

      setModifiedTicketsalessummaryData2(
        paginatedData?.iata_tickets.customers || []
      );

      setModifiedTicketsalessummaryData3(
        paginatedData?.iata_tickets.issue_persons || []
      );
      setModifiedTicketsalessummaryData4(
        paginatedData?.iata_tickets.ticket_agencies || []
      );
      setTotalAmount(paginatedData.total_amount);
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

  const handleGetTicketsalessummarys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);
  const handleGetTicketsalessummarys2 = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);
  const handleGetTicketsalessummarys3 = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);
  const handleGetTicketsalessummarys4 = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllTicketsalessummarys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketsalessummarys:', error);
    }
  }, []);
  const handleGetAllTicketsalessummarys2 = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketsalessummarys:', error);
    }
  }, []);
  const handleGetAllTicketsalessummarys3 = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketsalessummarys:', error);
    }
  }, []);
  const handleGetAllTicketsalessummarys4 = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketsalessummarys:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.issue_date_before
      ? moment(new Date(getValues()?.issue_date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.issue_date_after
      ? moment(new Date(getValues()?.issue_date_after)).format('DD-MM-YYYY')
      : null,
    Agent: getValues()?.ticket_agencyName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TicketsalessummaryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTicketsalessummarys={handleGetTicketsalessummarys}
          handleGetTicketsalessummary2={handleGetTicketsalessummarys2}
          handleGetTicketsalessummary3={handleGetTicketsalessummarys3}
          handleGetTicketsalessummary4={handleGetTicketsalessummarys4}
          handleGetAllTicketsalessummarys={handleGetAllTicketsalessummarys}
          handleGetAllTicketsalessummarys2={handleGetAllTicketsalessummarys2}
          handleGetAllTicketsalessummarys3={handleGetAllTicketsalessummarys3}
          handleGetAllTicketsalessummarys4={handleGetAllTicketsalessummarys4}
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
        onFirstPage={() => handleGetTicketsalessummarys(1)}
        onPreviousPage={() => handleGetTicketsalessummarys(page - 1)}
        onNextPage={() => handleGetTicketsalessummarys(page + 1)}
        onLastPage={() => handleGetTicketsalessummarys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTicketsalessummarys}
        handleGetAllData={handleGetAllTicketsalessummarys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='TicketsalessummaryReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTicketsalessummaryData.map((ticketsalessummary, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Ticket Agency Summary'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={ticketsalessummary}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size -
                    size +
                    index * ticketsalessummary.data.length +
                    1
                  : ticketsalessummary.page * ticketsalessummary.size -
                    ticketsalessummary.size +
                    1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <div>
          {/* each single page (table) */}

          {modifiedTicketsalessummaryData2.map((ticketsalessummary2) => (
            <SinglePage
              style={{ backgroundColor: 'green' }}
              classes={classes}
              reportTitle='Airway Summary'
              filteredData={filteredData}
              tableColumns={printtableColumns2}
              dispatchTableColumns2={dispatchPrintTableColumns2}
              data={ticketsalessummary2}
              serialNumber={
                ticketsalessummary2.page * ticketsalessummary2.size -
                ticketsalessummary2.size +
                1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
            />
          ))}
        </div>
      </table>

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <div>
          {/* each single page (table) */}

          {modifiedTicketsalessummaryData3.map((ticketsalessummary3) => (
            <SinglePage
              style={{ backgroundColor: 'green' }}
              classes={classes}
              reportTitle='Agent Summery'
              filteredData={filteredData}
              tableColumns={printtableColumns3}
              dispatchTableColumns2={dispatchPrintTableColumns3}
              data={ticketsalessummary3}
              serialNumber={
                ticketsalessummary3.page * ticketsalessummary3.size -
                ticketsalessummary3.size +
                1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
            />
          ))}
        </div>
      </table>

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <div>
          {/* each single page (table) */}

          {modifiedTicketsalessummaryData4.map((ticketsalessummary4) => (
            <SinglePage
              style={{ backgroundColor: 'green' }}
              classes={classes}
              reportTitle='Issue Person Summary'
              filteredData={filteredData}
              tableColumns={printtableColumns4}
              dispatchTableColumns4={dispatchPrintTableColumns4}
              data={ticketsalessummary4}
              serialNumber={
                ticketsalessummary4.page * ticketsalessummary4.size -
                ticketsalessummary4.size +
                1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
            />
          ))}
        </div>
      </table>
    </div>
  );
}

export default TicketsalessummaryReportsTable;
