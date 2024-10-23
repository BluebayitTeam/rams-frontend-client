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
    label: 'Activity Type',
    getterMethod: (data) => `${data.activity_type?.name?.replace(/_/g, ' ')}`,
    show: true,
  },
  {
    id: 3,
    label: 'Employee',
    getterMethod: (data) =>
      `${data.activity_by?.first_name || ''} ${data.activity_by?.last_name || ''}`,
    show: true,
  },
  { id: 4, label: 'Message', name: 'comment', show: true },

  {
    id: 5,
    label: 'Created On',
    getterMethod: (data) =>
      `${moment(data.created_at).format('DD-MM-YYYY')}   , ${moment(data.created_at).format('hh:mm A')}`,
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
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetActivityLogReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        employee: filterData.employee || '',
        activity_log_type: filterData.activity_log_type || '',
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
        employee: filterData.employee || '',
        activity_log_type: filterData.activity_log_type || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedActivityLogData(allData.activity_logs || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.activity_logs,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedActivityLogData(paginatedData.activity_logs || []);
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

  const handleGetActivityLogs = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
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
    ActivityLog: getValues()?.activity_log_typeName || null,
    Employee: getValues()?.employeeName || null,
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
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
        onFirstPage={() => handleGetActivityLogs(1)}
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
              reportTitle='Activity Log Report'
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
              // serialNumber={activityLog.page * activityLog.size - activityLog.size + 1}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : activityLog.page * activityLog.size - activityLog.size + 1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              // setSortBy={setSortBy}
              // setSortBySubKey={setSortBySubKey}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityLogReportsTable;
