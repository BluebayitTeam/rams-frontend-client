import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageLedgerReport from 'src/app/@components/ReportComponents/SiglePageLedgerReport';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetForeignLedgerAllReportsQuery,
  useGetForeignLedgerReportsQuery
} from '../ForeignLedgerReportsApi';
import ForeignLedgerFilterMenu from './ForeignLedgerFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Date', name: 'foreignLedger_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
  { id: 4, label: 'Ledger', name: 'ledger', subName: 'name', show: true },
  { id: 5, label: 'SubLedger', name: 'sub_ledger', subName: 'name', show: true },
  {
    id: 6,
    label: 'Details',
    getterMethod: data => `${data.details || ''}, ${data.related_ledger || ''}`,
    show: true
  },
  {
    id: 7,
    label: 'Amount',
    name: 'credit_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' }
  }
];

function ForeignLedgerReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch } = methods;

  const [modifiedForeignLedgerData, setModifiedForeignLedgerData] = useReportData();
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
  const [showForeign, setShowForeign] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } = useGetForeignLedgerReportsQuery(
    {
      ledger: filterData.ledger || '',
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      sub_ledger: filterData.sub_ledger || '',
      account_type: filterData.account_type || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData, refetch: refetchAllForeignLedgerReports } = useGetForeignLedgerAllReportsQuery(
    {
      ledger: filterData.ledger || '',
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      sub_ledger: filterData.sub_ledger || '',
      account_type: filterData.account_type || '',
    },
    { skip: !inShowAllMode }
  );


 
  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedForeignLedgerData(allData.foreignLedger_vouchers || []);
      setTotalAmount(allData.total_amount );

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.foreignLedger_vouchers,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedForeignLedgerData(paginatedData.foreignLedger_vouchers || []);
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

  const handleGetForeignLedgers = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
      await refetchAgentReports();
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, [refetchAgentReports]);

  const handleGetAllForeignLedgers = useCallback(async () => {
    try {
      await refetchAllForeignLedgerReports();
    } catch (error) {
      console.error('Error fetching all foreignLedgers:', error);
    }
  }, [refetchAllForeignLedgerReports]);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <ForeignLedgerFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetForeignLedgers={handleGetForeignLedgers}
          handleGetAllForeignLedgers={handleGetAllForeignLedgers}
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
        onFirstPage={() => handleGetForeignLedgers(1)}
        onPreviousPage={() => handleGetForeignLedgers(page - 1)}
        onNextPage={() => handleGetForeignLedgers(page + 1)}
        onLastPage={() => handleGetForeignLedgers(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetForeignLedgers}
        handleGetAllData={handleGetAllForeignLedgers}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='ForeignLedgerReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedForeignLedgerData.map((foreignLedger, index) => (
          <SiglePageLedgerReport
          key={index}
          classes={classes}
          reportTitle="ForeignLedger Report"
          tableColumns={tableColumns}
          dispatchTableColumns={dispatchTableColumns}
          data={{
            ...foreignLedger,
            data: [
              ...foreignLedger.data, 
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
              ? page * size - size + index * foreignLedger.data.length + 1
              : foreignLedger.page * foreignLedger.size - foreignLedger.size + 1
          }
          setPage={setPage}
        />
        
         
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default ForeignLedgerReportsTable;