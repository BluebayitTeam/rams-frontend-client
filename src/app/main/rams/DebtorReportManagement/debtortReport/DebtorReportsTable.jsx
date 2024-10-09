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

import { useGetDrebtorAllReportsQuery, useGetDrebtorReportsQuery } from '../DrebtorReportsApi';
import DebtorFilterMenu from './DebtorFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },

	{ id: 2, label: 'Agent Name	', name: 'name', show: true },

	{ id: 3, label: 'Group', name: 'head_group', subName: 'name', show: true },
  {
    id: 4,
    label: 'Details',
    getterMethod: data => `${data.details || ''}, ${data.related_ledger || ''}`,
    show: true
  },
	{ id: 5, label: 'Debit', name: 'total_debit', show: true },
	{ id: 6, label: 'Credit', name: 'total_credit', show: true },
	{ id: 7, label: 'Balance', name: 'balance', show: true },
 

];

function DrebtorReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch } = methods;

  const [modifiedDrebtorData, setModifiedDrebtorData] = useReportData();
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
  const [totalCD, setTotalCD] = useState(0);
  const [totalDB, setTotalDB] = useState(0);

  console.log('totalAmount121', totalAmount);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } = useGetDrebtorReportsQuery(
    {
    
      ledger: filterData.ledger || '',
      group: filterData.group || '',
     
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData, refetch: refetchAllDrebtorReports } = useGetDrebtorAllReportsQuery(
    {
      
      ledger: filterData.ledger || '',
      group: filterData.group || '',
    
    },
    { skip: !inShowAllMode }
  );


 
  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedDrebtorData(allData.debtors || []);
      setTotalAmount(allData.total_amount );
      setTotalCD(allData.total_credit_amount );
      setTotalDB(allData.total_debit_amount );
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.debtors,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedDrebtorData(paginatedData.debtors || []);
      setTotalAmount(paginatedData?.total_amount);
      setTotalCD(paginatedData.total_credit_amount );
      setTotalDB(paginatedData.total_debit_amount );

      setPage(paginatedData?.page || 1);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
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

  const handleGetDrebtors = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
      await refetchAgentReports();
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, [refetchAgentReports]);

  const handleGetAllDrebtors = useCallback(async () => {
    try {
      await refetchAllDrebtorReports();
    } catch (error) {
      console.error('Error fetching all drebtors:', error);
    }
  }, [refetchAllDrebtorReports]);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <DebtorFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetDrebtors={handleGetDrebtors}
          handleGetAllDrebtors={handleGetAllDrebtors}
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
        onFirstPage={() => handleGetDrebtors(1)}
        onPreviousPage={() => handleGetDrebtors(page - 1)}
        onNextPage={() => handleGetDrebtors(page + 1)}
        onLastPage={() => handleGetDrebtors(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetDrebtors}
        handleGetAllData={handleGetAllDrebtors}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='DrebtorReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedDrebtorData.map((drebtor, index) => (
         <SinglePage
         key={index}
         classes={classes}
         reportTitle="Drebtor Report"
         tableColumns={tableColumns}
         dispatchTableColumns={dispatchTableColumns}
         data={{
           ...drebtor,
           data: [
             ...drebtor.data,
             {
               balance: totalAmount,
               total_debit: totalDB,
               total_credit: totalCD,
               getterMethod: () => 'Total Amount',
               hideSerialNo: true,
               rowStyle: { fontWeight: 600 }, // Custom styling to highlight totals
             },
           ],
         }}
         totalColumn={initialTableColumnsState?.length}
         inSiglePageMode={inSiglePageMode}
         serialNumber={
           pagination
             ? page * size - size + index * drebtor.data.length + 1
             : drebtor.page * drebtor.size - drebtor.size + 1
         }
         setPage={setPage}
       />
        
         
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default DrebtorReportsTable;