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
  useGetPaymentAllReportsQuery,
  useGetPaymentReportsQuery
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
  console.log('dskadjasldjlasdja', modifiedPaymentData);
  
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const watchedValues = watch();
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

console.log('totalAmount121', totalAmount);

  const componentRef = useRef(null);

  const { data: paginatedData, refetch: refetchPaymentReports } = useGetPaymentReportsQuery(
    {
      
    
      date_after: watchedValues.date_after || '',
      date_before: watchedValues.date_before || '',
      ledger: watchedValues.ledger || '',
      sub_ledger: watchedValues.sub_ledger || '',
      account_type: watchedValues.account_type || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  
  const { data: allData, refetch: refetchAllPaymentReports } = useGetPaymentAllReportsQuery(
    {
      
    
      date_after: watchedValues.date_after || '',
      date_before: watchedValues.date_before || '',
      ledger: watchedValues.ledger || '',
      sub_ledger: watchedValues.sub_ledger || '',
      account_type: watchedValues.account_type || '',
     
    },
    { skip: !inShowAllMode }
  );


  

useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPaymentData(allData.payment_vouchers || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.payment_vouchers,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {

      setModifiedPaymentData(paginatedData.payment_vouchers || []);
      setTotalAmount(paginatedData.total_amount );
      setPage(paginatedData?.page || 1);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);

    }
  }, [inShowAllMode, allData, paginatedData, size, page]);


 // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

const handleGetPayments = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching payment_vouchers:', error);
    }
  }, []);



  const handleGetAllPayments = useCallback(async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching all payment_vouchers:', error);
    }
  }, []);


  const filteredData = {
		Account: getValues()?.account_typeName || null,
		Ledger: getValues()?.ledgerName || null,
		Date_To: getValues()?.date_before ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY') : null,
		Date_From: getValues()?.date_after ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY') : null, 
		Sub_Ledger: getValues()?.sub_ledgerName || null
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
          {modifiedPaymentData.map((payment, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Payment Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              // data={payment}
              data={{
                ...payment,
                data: [
                  ...payment.data, 
                  {
                    debit_amount: totalAmount,
                    getterMethod: () => 'Total Payment',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : payment.page * payment.size - payment.size + 1
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

export default PaymentReportsTable;
