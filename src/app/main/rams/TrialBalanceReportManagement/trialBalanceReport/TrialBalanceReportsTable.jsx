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
  useGetTrialBalanceAllReportsQuery,
  useGetTrialBalanceReportsQuery,
} from '../TrialBalanceReportsApi';
import TrialBalanceFilterMenu from './TrialBalanceFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Invoice No', name: 'invoice_no', show: true },
  { id: 3, label: 'Date', name: 'updated_at', show: true, type: 'date' },
  {
    id: 4,
    label: 'Issue Date',
    name: 'pdc_issue_date',
    show: true,
    type: 'date',
  },
  { id: 5, label: 'Ledger', name: 'ledger', subName: 'name', show: true },
  { id: 6, label: 'Status', name: 'status', show: true },
  { id: 7, label: 'Bank', name: 'rp_bank_id', show: true },
  { id: 8, label: 'Cheque No', name: 'cheque_no', show: true },
  {
    id: 9,
    label: 'Amount',
    name: 'amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
];
function TrialBalanceReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [
    modifiedTrialBalanceData,
    setModifiedTrialBalanceData,
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

  const { data: paginatedData } = useGetTrialBalanceReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetTrialBalanceAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTrialBalanceData(allData.postdate_cheques || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.postdate_cheques,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedTrialBalanceData(paginatedData.postdate_cheques || []);
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

  const handleGetTrialBalances = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching trialBalances:', error);
    }
  }, []);

  const handleGetAllTrialBalances = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all trialBalances:', error);
    }
  }, []);

  const filteredData = {
    Branch: getValues()?.branchName || null,

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
        <TrialBalanceFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTrialBalances={handleGetTrialBalances}
          handleGetAllTrialBalances={handleGetAllTrialBalances}
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
        onFirstPage={() => handleGetTrialBalances(1)}
        onPreviousPage={() => handleGetTrialBalances(page - 1)}
        onNextPage={() => handleGetTrialBalances(page + 1)}
        onLastPage={() => handleGetTrialBalances(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTrialBalances}
        handleGetAllData={handleGetAllTrialBalances}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='TrialBalanceReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTrialBalanceData.map((trialBalance, index) => (
            <SinglePage
              key={trialBalance.id || index}
              classes={classes}
              reportTitle='PostDate Cheque Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={trialBalance}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : trialBalance.page * trialBalance.size -
                    trialBalance.size +
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

export default TrialBalanceReportsTable;
