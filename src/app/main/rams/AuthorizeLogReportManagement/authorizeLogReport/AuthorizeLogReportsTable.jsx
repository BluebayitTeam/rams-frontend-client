import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import '../../../rams/print.css';

import moment from 'moment';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredAuthorizeLogReports,
  useGetAuthorizeLogAllReportsQuery,
  useGetAuthorizeLogReportsQuery,
} from '../AuthorizeLogReportsApi';
import AuthorizeLogFilterMenu from './AuthorizeLogMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

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

function AuthorizeLogReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [
    modifiedAuthorizeLogData,
    setModifiedAuthorizeLogData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
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

  const { data: paginatedData } = useGetAuthorizeLogReportsQuery(
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

  const { data: allData } = useGetAuthorizeLogAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      invoice_no: filterData.invoice_no || '',
      user: filterData.user || '',
    },
    { skip: !inShowAllMode }
  );

  const totalData = useSelector(selectFilteredAuthorizeLogReports);

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedAuthorizeLogData(allData.acc_update_logs || []);
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
      setModifiedAuthorizeLogData(paginatedData.acc_update_logs || []);
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

  const handleGetAuthorizeLogs = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching acc_update_logs:', error);
    }
  }, []);

  const handleGetAllAuthorizeLogs = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all acc_update_logs:', error);
    }
  }, []);

  const filteredData = {
    Group: getValues()?.groupName || null,
    District: getValues()?.districtName || null,
    Username: getValues()?.username || null,
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Primary_phone: getValues()?.primary_phone || null,
    authorizeLog_code: getValues()?.authorizeLog_code || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <AuthorizeLogFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAuthorizeLogs={handleGetAuthorizeLogs}
          handleGetAllAuthorizeLogs={handleGetAllAuthorizeLogs}
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
        onFirstPage={() => handleGetAuthorizeLogs(1)}
        onPreviousPage={() => handleGetAuthorizeLogs(page - 1)}
        onNextPage={() => handleGetAuthorizeLogs(page + 1)}
        onLastPage={() => handleGetAuthorizeLogs(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAuthorizeLogs}
        handleGetAllData={handleGetAllAuthorizeLogs}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AuthorizeLogReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedAuthorizeLogData.map((authorizeLog, index) => (
            <SinglePage
              key={authorizeLog.id || index}
              classes={classes}
              reportTitle='Account Authorize Log Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={authorizeLog}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : authorizeLog.page * authorizeLog.size -
                    authorizeLog.size +
                    1
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

export default AuthorizeLogReportsTable;
