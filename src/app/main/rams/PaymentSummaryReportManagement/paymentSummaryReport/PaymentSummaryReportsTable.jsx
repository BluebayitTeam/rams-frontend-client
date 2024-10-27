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
  useGetPaymentSummaryAllReportsQuery,
  useGetPaymentSummaryReportsQuery,
} from '../PaymentSummaryReportsApi';
import PaymentSummaryFilterMenu from './PaymentSummaryFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'SubLedger', name: 'sub_ledger', show: true },
  {
    id: 3,
    label: 'Amount',
    name: 'amount',
    show: true,
    // style: { justifyContent: 'flex-center', marginRight: '5px' },
    // headStyle: { textAlign: 'right' }
  },
];

function PaymentSummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedPaymentSummaryData, setModifiedPaymentSummaryData] =
    useReportData();

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
    useGetPaymentSummaryReportsQuery(
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

  const { data: allData, refetch: refetchAllPaymentSummaryReports } =
    useGetPaymentSummaryAllReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        ledger: filterData.ledger || '',
        sub_ledger: filterData.sub_ledger || '',
        account_type: filterData.account_type || '',
      },
      { skip: !inShowAllMode }
    );

  const convertObjectToArray = (obj) => {
    let convertedArr = [];
    for (let x in obj) {
      convertedArr.push({ sub_ledger: x, amount: obj[x] });
    }
    return convertedArr;
  };

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPaymentSummaryData(
        convertObjectToArray(allData.payment_voucher_summary)
      );
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.payment_voucher_summary,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPaymentSummaryData(
        convertObjectToArray(paginatedData.payment_voucher_summary)
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

  const handleGetPaymentSummarys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllPaymentSummarys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all paymentSummarys:', error);
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
        <PaymentSummaryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPaymentSummarys={handleGetPaymentSummarys}
          handleGetAllPaymentSummarys={handleGetAllPaymentSummarys}
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
        onFirstPage={() => handleGetPaymentSummarys(1)}
        onPreviousPage={() => handleGetPaymentSummarys(page - 1)}
        onNextPage={() => handleGetPaymentSummarys(page + 1)}
        onLastPage={() => handleGetPaymentSummarys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPaymentSummarys}
        handleGetAllData={handleGetAllPaymentSummarys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PaymentSummaryReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedPaymentSummaryData.map((paymentSummary, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='PaymentSummary Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={paymentSummary}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * paymentSummary.data.length + 1
                  : paymentSummary.page * paymentSummary.size -
                    paymentSummary.size +
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

export default PaymentSummaryReportsTable;
