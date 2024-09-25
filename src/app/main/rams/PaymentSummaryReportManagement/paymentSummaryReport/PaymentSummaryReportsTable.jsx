import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredPaymentSummaryReports,
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
	{ id: 2, label: 'Date', name: 'payment_date', show: true, type: 'date' },
	{ id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
	{ id: 4, label: 'Ledger', name: 'ledger', subName: 'name', show: true },
	{ id: 5, label: 'SubLedger', name: 'sub_ledger', subName: 'name', show: true },
	{
		id: 6,
		label: 'Details',
		show: true,
		getterMethod: data => `${data.details || ''}, ${data.related_ledger || ''}`
	},
	{
		id: 7,
		label: 'Amount',
		name: 'debit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	}
];

function PaymentSummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema), // Use zodResolver for form validation
  });
  const dispatch = useDispatch();

  const { control, getValues,watch } = methods;

  const [modifiedPaymentSummaryData, setModifiedPaymentSummaryData] = useReportData();
  console.log('dskadjasldjlasdja', modifiedPaymentSummaryData);
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);

  console.log("inShowAllMode", inShowAllMode)

  const componentRef = useRef(null);

  // Do not fetch data on mount
  const { refetch: refetchPaymentSummaryReports } =!inShowAllMode && useGetPaymentSummaryReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      ledger: watch('ledger') || '',
      sub_ledger: watch('sub_ledger') || '',
     
      account_type: watch('account_type') || '',
      
      page,
      size,
    },
    { enabled: false }
  );


  useEffect(() => {
    if (!inShowAllMode) {
      refetchPaymentSummaryReports();
    }
  }, [inShowAllMode, watch, page, size]);



  const { refetch: refetchAllPaymentSummaryReports } =
    inShowAllMode &&
    useGetPaymentSummaryAllReportsQuery(
      {
        ledger: watch('ledger') || '',
        sub_ledger: watch('sub_ledger') || '',
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        account_type: watch('account_type') || '',
     
      },
      { enabled: false }
    );

  const totalData = useSelector(selectFilteredPaymentSummaryReports);

  useEffect(() => {
    if (totalData) {
      setModifiedPaymentSummaryData(totalData?.payment_vouchers);
    }
  }, [totalData]);

  // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

	const handleGetPaymentSummarys = async (newPage) => {
	  setInShowAllMode(false);
    try {
      const formValues = getValues();
      const page = newPage || 1;
      setPage(page);

      const response = await refetchPaymentSummaryReports({ ...formValues, page, size }); 

      if (response?.data) {
        unstable_batchedUpdates(() => {
          const paymentsData = response.data.payment_vouchers || [];
          setModifiedPaymentSummaryData(paymentsData);
          setInShowAllMode(false);
          setTotalPages(response.data?.total_pages);
          setTotalElements(response.data?.total_elements);
        });
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

	const handleGetAllPaymentSummarys = async () => {
	   setInShowAllMode(true);
    try {
      const formValues = getValues();

      const response = await refetchAllPaymentSummaryReports({ ...formValues }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          setModifiedPaymentSummaryData(response.data.payment_vouchers || []);
          setInShowAllMode(true);
          const { totalPages, totalElements } = getPaginationData(
            response.data.payment_vouchers,
            size,
            page
          );
          setTotalPages(totalPages);
          setTotalElements(totalElements);
        });
      }
    } catch (error) {
      console.error('Error fetching all payments:', error);
    }
  };

  return (
    <div className={classes.headContainer}>
      {/* Filter */}
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
          {/* each single page (table) */}
          {modifiedPaymentSummaryData.map((payment, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='PaymentSummary Report'
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={payment}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentSummaryReportsTable;
