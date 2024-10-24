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
import {
  useGetTicketsalesAllReportsQuery,
  useGetTicketsalesReportsQuery,
} from '../TicketsalesReportsApi';
import TicketsalesFilterMenu from './TicketsalesFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Issue Date', name: 'issue_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
  {
    id: 4,
    label: 'Passenger Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },
  {
    id: 5,
    label: 'Agent Name',
    name: 'passenger',
    subName: 'agent.first_name',
    show: true,
  },
  {
    id: 6,
    label: 'Ticket Agency Name',
    name: 'ticket_agency',
    subName: 'first_name',
    show: true,
  },
  {
    id: 7,
    label: 'Flight Date',
    name: 'flight_date',
    show: true,
    type: 'date',
  },
  { id: 8, label: 'Ticket No', name: 'ticket_no', show: true },
  { id: 9, label: 'Country', name: 'sector_name', show: true },
  { id: 10, label: 'Sector Name', name: 'sector_name', show: true },
  { id: 11, label: ' AirWay', name: 'carrier_air_way', show: true },
  { id: 12, label: 'Flight No', name: 'flight_no', show: true, type: 'date' },
  { id: 13, label: 'Flight Time', name: 'flight_time', show: true },
  { id: 14, label: 'Comment', name: 'notes', show: true },
  { id: 15, label: 'Purchase Amount', name: 'purchase_amount', show: true },
];

function TicketsalesReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedTicketsalesData, setModifiedTicketsalesData] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
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
    useGetTicketsalesReportsQuery(
      {
        issue_date_after: filterData.issue_date_after || '',
        issue_date_before: filterData.issue_date_before || '',
        agent: filterData.agent || '',
        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const { data: allData, refetch: refetchAllTicketsalesReports } =
    useGetTicketsalesAllReportsQuery(
      {
        issue_date_after: filterData.issue_date_after || '',
        issue_date_before: filterData.issue_date_before || '',
        agent: filterData.agent || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTicketsalesData(allData.ticket_purchases || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.ticket_purchases,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedTicketsalesData(paginatedData.ticket_purchases || []);
      setTotalAmount(paginatedData.total_amount);
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

  const handleGetTicketsaless = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllTicketsaless = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketsaless:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.issue_date_before
      ? moment(new Date(getValues()?.issue_date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.issue_date_after
      ? moment(new Date(getValues()?.issue_date_after)).format('DD-MM-YYYY')
      : null,
    Agent: getValues()?.agentName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TicketsalesFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTicketsaless={handleGetTicketsaless}
          handleGetAllTicketsaless={handleGetAllTicketsaless}
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
        onFirstPage={() => handleGetTicketsaless(1)}
        onPreviousPage={() => handleGetTicketsaless(page - 1)}
        onNextPage={() => handleGetTicketsaless(page + 1)}
        onLastPage={() => handleGetTicketsaless(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTicketsaless}
        handleGetAllData={handleGetAllTicketsaless}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='TicketsalesReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTicketsalesData.map((ticketsales, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Ticket Purchase Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={ticketsales}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * ticketsales.data.length + 1
                  : ticketsales.page * ticketsales.size - ticketsales.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketsalesReportsTable;
