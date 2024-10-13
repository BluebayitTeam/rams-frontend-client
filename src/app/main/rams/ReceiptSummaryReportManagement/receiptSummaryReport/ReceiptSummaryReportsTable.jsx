import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
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
  useGetReceiptSummaryAllReportsQuery,
  useGetReceiptSummaryReportsQuery
} from '../ReceiptSummaryReportsApi';
import ReceiptSummaryFilterMenu from './ReceiptSummaryFilterMenu';

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
		show: true
		// style: { justifyContent: 'flex-center', marginRight: '5px' },
		// headStyle: { textAlign: 'right' }
	}
];


function ReceiptSummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch,getValues } = methods;

  const [modifiedReceiptSummaryData, setModifiedReceiptSummaryData] = useReportData();

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

  const { data: paginatedData, refetch: refetchAgentReports } = useGetReceiptSummaryReportsQuery(
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



  const { data: allData, refetch: refetchAllReceiptSummaryReports } = useGetReceiptSummaryAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      ledger: filterData.ledger || '',
      sub_ledger: filterData.sub_ledger || '',
      account_type: filterData.account_type || '',
    },
    { skip: !inShowAllMode }
  );

  console.log('modifiedReceiptSummaryData', allData);


  const convertObjectToArray = obj => {
		let convertedArr = [];
		for (let x in obj) {
			convertedArr.push({ sub_ledger: x, amount: obj[x] });
		}
		return convertedArr;
	};

 
  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedReceiptSummaryData(convertObjectToArray(allData.receipt_voucher_summary ));
      setTotalAmount(allData.total_amount );
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.receipt_voucher_summary,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);

    } else if (!inShowAllMode && paginatedData) {

      setModifiedReceiptSummaryData(convertObjectToArray(paginatedData.receipt_voucher_summary) );
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

  const handleGetReceiptSummarys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, [refetchAgentReports]);

  const handleGetAllReceiptSummarys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all receiptSummarys:', error);
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
      <FormProvider {...methods}>
        <ReceiptSummaryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetReceiptSummarys={handleGetReceiptSummarys}
          handleGetAllReceiptSummarys={handleGetAllReceiptSummarys}
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
        onFirstPage={() => handleGetReceiptSummarys(1)}
        onPreviousPage={() => handleGetReceiptSummarys(page - 1)}
        onNextPage={() => handleGetReceiptSummarys(page + 1)}
        onLastPage={() => handleGetReceiptSummarys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetReceiptSummarys}
        handleGetAllData={handleGetAllReceiptSummarys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='ReceiptSummaryReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedReceiptSummaryData.map((receiptSummary, index) => (
          <SinglePage
          key={index}
          classes={classes}
          reportTitle="ReceiptSummary Report"
          filteredData={filteredData}
          tableColumns={tableColumns}
          dispatchTableColumns={dispatchTableColumns}
          data={receiptSummary}
          totalColumn={initialTableColumnsState?.length}
          inSiglePageMode={inSiglePageMode}
          serialNumber={
            pagination
              ? page * size - size + index * receiptSummary.data.length + 1
              : receiptSummary.page * receiptSummary.size - receiptSummary.size + 1
          }
          setPage={setPage}
        />
        
         
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default ReceiptSummaryReportsTable;