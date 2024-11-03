import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
  useGetCompanyOverviewAllReportsQuery,
  useGetCompanyOverviewReportsQuery,
} from '../CompanyOverviewReportsApi';
import CompanyOverviewFilterMenu from './CompanyOverviewFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Date', name: 'log_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'reference_no', show: true },
  { id: 4, label: 'Purpose', name: 'sub_ledger', subName: 'name', show: true },
  { id: 5, label: 'Details', name: 'details', show: true },
  {
    id: 7,
    label: 'Receipt',
    name: 'debit_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
  {
    id: 6,
    label: 'Payment',
    name: 'credit_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
  {
    id: 8,
    label: 'Balance',
    name: 'balance',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
];

function CompanyOverviewReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [
    modifiedCompanyOverviewData,
    setModifiedCompanyOverviewData,
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
  const [totalBAlance, setTotalBAlance] = useState(0);

  const { data: paginatedData } = useGetCompanyOverviewReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      ledger: watch('ledger') || '',
      sub_ledger: watch('sub_ledger') || '',
      account_type: watch('account_type') || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetCompanyOverviewAllReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      ledger: watch('ledger') || '',
      sub_ledger: watch('sub_ledger') || '',
      account_type: watch('account_type') || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedCompanyOverviewData(allData?.account_logs || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData?.account_logs,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedCompanyOverviewData(paginatedData?.account_logs || []);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalBAlance(paginatedData.total_amount || 0);
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

  const handleGetCompanyOverviews = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching account_logs:', error);
    }
  }, []);

  const handleGetAllCompanyOverviews = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all account_logs:', error);
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

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <CompanyOverviewFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetCompanyOverviews={handleGetCompanyOverviews}
          handleGetAllCompanyOverviews={handleGetAllCompanyOverviews}
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
        onFirstPage={() => handleGetCompanyOverviews(1)}
        onPreviousPage={() => handleGetCompanyOverviews(page - 1)}
        onNextPage={() => handleGetCompanyOverviews(page + 1)}
        onLastPage={() => handleGetCompanyOverviews(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetCompanyOverviews}
        handleGetAllData={handleGetAllCompanyOverviews}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='CompanyOverviewReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedCompanyOverviewData.map((companyOverview, index) => (
            <SinglePage
              key={companyOverview.id || index}
              classes={classes}
              reportTitle='Account Statement Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={{
                ...companyOverview,
                data: [
                  ...companyOverview?.data,
                  {
                    // debit_amount: totalDbAmount?.toFixed(2)|| '0.00',
                    balance: totalBAlance,
                    credit_amount: 'Total Balance',

                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : companyOverview.page * companyOverview.size -
                    companyOverview.size +
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

export default CompanyOverviewReportsTable;
