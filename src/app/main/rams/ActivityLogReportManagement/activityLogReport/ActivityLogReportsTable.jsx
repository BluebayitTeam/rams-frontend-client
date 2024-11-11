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
  useGetActivityLogAllReportsQuery,
  useGetActivityLogReportsQuery,
} from '../ActivityLogReportsApi';
import ActivityLogFilterMenu from './ActivityLogFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  {
    id: 1,
    label: 'SL',

    sortAction: false,
    isSerialNo: true,
    show: true,
    style: { justifyContent: 'center' },
  },
  {
    id: 2,
    label: 'Request Date',
    name: 'request_date',
    show: true,
    type: 'date',
    style: { justifyContent: 'center' },
  },
  {
    id: 3,
    label: 'Invoice No',
    name: 'invoice_no',
    show: true,
    style: { justifyContent: 'center' },
  },
  {
    id: 4,
    label: 'Type',
    getterMethod: (data) =>
      `${
        data?.invoice_type
          ?.replaceAll('_', ' ')
          ?.split(' ')
          ?.map((word) => word.charAt(0)?.toUpperCase() + word.slice(1))
          .join(' ') || ''
      } `,
    show: true,
  },
  {
    id: 5,
    label: 'Approval Date',
    name: 'updated_at',
    show: true,
    type: 'date',
  },
  {
    id: 6,
    label: 'Approved By',
    name: 'updated_by',
    subName: 'username',
    show: true,
  },
  { id: 7, label: 'Previous Amount', name: 'previous_amont', show: true },
  { id: 8, label: 'Current Amount', name: 'amount', show: true },
  {
    id: 9,
    label: 'Status',
    getterMethod: (data) =>
      `${
        data?.status === 'update_pending' || data?.status === 'delete_pending'
          ? 'Pending'
          : data?.status === 'approved_pending' ||
              data?.status === 'approved_pending'
            ? 'Approved'
            : 'Rejected' || ''
      } `,
    show: true,
  },
];

function ActivityLogReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedActivityLogData, setModifiedActivityLogData] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetActivityLogReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      invoice_no: filterData.invoice_no || '',
      user: filterData.user || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData, refetch: refetchAllActivityLogReports } =
    useGetActivityLogAllReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        invoice_no: filterData.invoice_no || '',
        user: filterData.user || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedActivityLogData(allData.acc_update_logs || []);
      setTotalAmount(allData.total_amount);
      setDateFrom(allData?.date_after);
      setDateTo(allData?.date_before);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.acc_update_logs,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedActivityLogData(paginatedData.acc_update_logs || []);
      setDateFrom(paginatedData?.date_after);
      setDateTo(allData?.date_before);
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

  const handleGetActivityLogs = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllActivityLogs = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all activityLogs:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Invoice_No: getValues()?.invoice_no || null,
    User: getValues()?.employeeName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <ActivityLogFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetActivityLogs={handleGetActivityLogs}
          handleGetAllActivityLogs={handleGetAllActivityLogs}
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
        onFirstPage={() => handleGetActivityLogs(page)}
        onPreviousPage={() => handleGetActivityLogs(page - 1)}
        onNextPage={() => handleGetActivityLogs(page + 1)}
        onLastPage={() => handleGetActivityLogs(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetActivityLogs}
        handleGetAllData={handleGetAllActivityLogs}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='ActivityLogReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedActivityLogData.map((activityLog, index) => (
            <SinglePage
              classes={classes}
              reportTitle='Account Authorize Log Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              dateFromDateTo={
                dateFrom && dateTo
                  ? `Date : ${dateFrom && moment(new Date(dateFrom)).format('DD-MM-YYYY')} to ${
                      dateTo && moment(new Date(dateTo)).format('DD-MM-YYYY')
                    }`
                  : ''
              }
              data={activityLog}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : activityLog.page * activityLog.size - activityLog.size + 1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityLogReportsTable;
