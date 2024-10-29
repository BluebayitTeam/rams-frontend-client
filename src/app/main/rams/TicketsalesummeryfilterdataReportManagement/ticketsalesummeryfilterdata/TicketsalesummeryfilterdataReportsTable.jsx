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
  useGetTicketsalesummeryfilterdataAllReportsQuery,
  useGetTicketsalesummeryfilterdataReportsQuery,
} from '../TicketsalesummeryfilterdataReportsApi';
import TicketsalesummeryfilterdataFilterMenu from './TicketsalesummeryfilterdataFilterMenu';

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
    label: 'Pax Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },
  {
    id: 5,
    label: 'Issue Person',
    getterMethod: (data) =>
      `${data.issue_person?.first_name || ''}, ${data.issue_person?.last_name || ''}`,

    show: true,
  },
  {
    id: 6,
    label: 'Ticket Agency',
    getterMethod: (data) =>
      `${data.ticket_agency?.first_name || ''}, ${data.ticket_agency?.last_name || ''}`,
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
  {
    id: 22,
    label: 'Profit ',
    getterMethod: (data) => `${data.sales_amount - data.purchase_amount}`,
    show: true,
  },
];

function TicketsalesummeryfilterdataReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [
    modifiedTicketsalesummeryfilterdataData,
    setModifiedTicketsalesummeryfilterdataData,
  ] = useReportData();
  const [
    modifiedTicketsalesummeryfilterdataData2,
    setModifiedTicketsalesummeryfilterdataData2,
  ] = useReportData();

  const [
    modifiedTicketsalesummeryfilterdataData3,
    setModifiedTicketsalesummeryfilterdataData3,
  ] = useReportData();
  const [
    modifiedTicketsalesummeryfilterdataData4,
    setModifiedTicketsalesummeryfilterdataData4,
  ] = useReportData();

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
    useGetTicketsalesummeryfilterdataReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        branch: filterData.branch || '',
        current_airway: filterData.current_airway || '',
        customer: filterData.customer || '',
        ticket_agency: filterData.ticket_agency || '',
        issue_person: filterData.issue_person || '',
        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const {
    data: allData,
    refetch: refetchAllTicketsalesummeryfilterdataReports,
  } = useGetTicketsalesummeryfilterdataAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      current_airway: filterData.current_airway || '',
      customer: filterData.customer || '',
      ticket_agency: filterData.ticket_agency || '',
      issue_person: filterData.issue_person || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTicketsalesummeryfilterdataData(allData.iata_tickets || []);
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
      setModifiedTicketsalesummeryfilterdataData(
        paginatedData?.iata_tickets || []
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

  const handleGetTicketsalesummeryfilterdatas = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllTicketsalesummeryfilterdatas = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all ticketsalesummeryfilterdatas:', error);
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
        <TicketsalesummeryfilterdataFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTicketsalesummeryfilterdatas={
            handleGetTicketsalesummeryfilterdatas
          }
          handleGetAllTicketsalesummeryfilterdatas={
            handleGetAllTicketsalesummeryfilterdatas
          }
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
        onFirstPage={() => handleGetTicketsalesummeryfilterdatas(1)}
        onPreviousPage={() => handleGetTicketsalesummeryfilterdatas(page - 1)}
        onNextPage={() => handleGetTicketsalesummeryfilterdatas(page + 1)}
        onLastPage={() => handleGetTicketsalesummeryfilterdatas(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTicketsalesummeryfilterdatas}
        handleGetAllData={handleGetAllTicketsalesummeryfilterdatas}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='TicketsalesummeryfilterdataReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTicketsalesummeryfilterdataData.map(
            (ticketsalesummeryfilterdata, index) => (
              <SinglePage
                key={index}
                classes={classes}
                reportTitle='Total Summary'
                filteredData={filteredData}
                tableColumns={tableColumns}
                dispatchTableColumns={dispatchTableColumns}
                data={ticketsalesummeryfilterdata}
                totalColumn={initialTableColumnsState?.length}
                inSiglePageMode={inSiglePageMode}
                serialNumber={
                  pagination
                    ? page * size -
                      size +
                      index * ticketsalesummeryfilterdata.data.length +
                      1
                    : ticketsalesummeryfilterdata.page *
                        ticketsalesummeryfilterdata.size -
                      ticketsalesummeryfilterdata.size +
                      1
                }
                setPage={setPage}
              />
            )
          )}
        </tbody>
      </table>
      >
    </div>
  );
}

export default TicketsalesummeryfilterdataReportsTable;
