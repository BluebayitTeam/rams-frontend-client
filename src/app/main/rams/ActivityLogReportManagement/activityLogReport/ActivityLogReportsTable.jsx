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
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Date', name: 'activityLog_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
  { id: 4, label: 'Ledger', name: 'ledger', subName: 'name', show: true },
  {
    id: 5,
    label: 'SubLedger',
    name: 'sub_ledger',
    subName: 'name',
    show: true,
  },
  {
    id: 6,
    label: 'Details',
    getterMethod: (data) =>
      `${data.details || ''}, ${data.related_ledger || ''}`,
    show: true,
  },
  {
    id: 7,
    label: 'Amount',
    name: 'credit_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
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
    useGetActivityLogReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        ledger: filterData.ledger || '',
        sub_ledger: filterData.sub_ledger || '',
        account_type: filterData.account_type || '',
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
        ledger: filterData.ledger || '',
        sub_ledger: filterData.sub_ledger || '',
        account_type: filterData.account_type || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedActivityLogData(allData.activityLog_vouchers || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.activityLog_vouchers,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedActivityLogData(paginatedData.activityLog_vouchers || []);
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
    Account: getValues()?.account_typeName || null,
    Ledger: getValues()?.ledgerName || null,
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Sub_Ledger: getValues()?.sub_ledgerName || null,
  };

  // console.log('filteredData', filteredData);

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
              key={index}
              classes={classes}
              reportTitle='ActivityLog Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={{
                ...activityLog,
                data: [
                  ...activityLog.data,
                  {
                    credit_amount: totalAmount,
                    getterMethod: () => 'Total Amount',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * activityLog.data.length + 1
                  : activityLog.page * activityLog.size - activityLog.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityLogReportsTable;
