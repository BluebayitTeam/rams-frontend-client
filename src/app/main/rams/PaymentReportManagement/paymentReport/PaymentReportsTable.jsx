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
  selectFilteredPaymentReports,
  useGetPaymentAllReportsQuery,
  useGetPaymentReportsQuery,
} from '../PaymentReportsApi';
import PaymentFilterMenu from './PaymentFilterMenu';

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

function PaymentReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema), // Use zodResolver for form validation
  });
  const dispatch = useDispatch();

  const { control, getValues,watch } = methods;

  const [modifiedPaymentData, setModifiedPaymentData] = useReportData();
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
  const { refetch: refetchPaymentReports } =!inShowAllMode && useGetPaymentReportsQuery(
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
  const { refetch: refetchAllPaymentReports } =
    inShowAllMode &&
    useGetPaymentAllReportsQuery(
      {
        ledger: watch('ledger') || '',
        sub_ledger: watch('sub_ledger') || '',
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        account_type: watch('account_type') || '',
     
      },
      { enabled: false }
    );

  const totalData = useSelector(selectFilteredPaymentReports);

  useEffect(() => {
    if (totalData) {
      setModifiedPaymentData(totalData?.payments);
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

	const handleGetPayments = async (newPage) => {
	  setInShowAllMode(false);
    try {
      const formValues = getValues();
      const page = newPage || 1;
      setPage(page);

      const response = await refetchPaymentReports({ ...formValues, page, size }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          const paymentsData = response.data.payments || [];
          setModifiedPaymentData(paymentsData);
          setInShowAllMode(false);
          setTotalPages(response.data?.total_pages);
          setTotalElements(response.data?.total_elements);
        });
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

	const handleGetAllPayments = async () => {
	   setInShowAllMode(true);
    try {
      const formValues = getValues();

      const response = await refetchAllPaymentReports({ ...formValues }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          setModifiedPaymentData(response.data.payments || []);
          setInShowAllMode(true);
          const { totalPages, totalElements } = getPaginationData(
            response.data.payments,
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
        <PaymentFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPayments={handleGetPayments}
          handleGetAllPayments={handleGetAllPayments}
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
        onFirstPage={() => handleGetPayments(1)}
        onPreviousPage={() => handleGetPayments(page - 1)}
        onNextPage={() => handleGetPayments(page + 1)}
        onLastPage={() => handleGetPayments(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPayments}
        handleGetAllData={handleGetAllPayments}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PaymentReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {/* each single page (table) */}
          {modifiedPaymentData.map((payment, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Payment Report'
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

export default PaymentReportsTable;
