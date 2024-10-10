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

import { useGetCreditorAllReportsQuery, useGetCreditorReportsQuery } from '../CreditorReportsApi';
import DebtorFilterMenu from './CreditorFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },

	{ id: 2, label: 'Agent Name	', name: 'name', show: true },

  {
    id: 3,
    label: 'Group',
    getterMethod: data => `${data.head_group?.name || ''}`,
    show: true
  },
	{ id: 4, label: 'Debit', name: 'total_debit', show: true,style: { justifyContent: 'flex-end', marginRight: '5px' }, },
	{ id: 4, label: 'Credit', name: 'total_credit', show: true,style: { justifyContent: 'flex-end', marginRight: '5px' }, },
	{ id: 4, label: 'Balance', name: 'balance', show: true ,style: { justifyContent: 'flex-end', marginRight: '5px' },}
];


function CreditorReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch,getValues } = methods;

  const [modifiedCreditorData, setModifiedCreditorData] = useReportData();
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

 

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } = useGetCreditorReportsQuery(
    {
    
      ledger: filterData.ledger || '',
      group: filterData.group || '',
     
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData, refetch: refetchAllCreditorReports } = useGetCreditorAllReportsQuery(
    {
      
      ledger: filterData.ledger || '',
      group: filterData.group || '',
    
    },
    { skip: !inShowAllMode }
  );


 
  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedCreditorData(allData.creditors || []);
      setTotalAmount(allData.total_amount );
      setTotalCD(allData.total_credit_amount );
      setTotalDB(allData.total_debit_amount );
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.creditors,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedCreditorData(paginatedData.creditors || []);
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

  const handleGetCreditors = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
      await refetchAgentReports();
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, [refetchAgentReports]);

  const handleGetAllCreditors = useCallback(async () => {
    try {
      await refetchAllCreditorReports();
    } catch (error) {
      console.error('Error fetching all creditors:', error);
    }
  }, [refetchAllCreditorReports]);


  const filteredData = {
		Ledger: getValues()?.ledgerName || null,
    Group: getValues()?.groupName || null,
	  };

    console.log('filteredData', filteredData);
	  

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <DebtorFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetCreditors={handleGetCreditors}
          handleGetAllCreditors={handleGetAllCreditors}
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
        onFirstPage={() => handleGetCreditors(1)}
        onPreviousPage={() => handleGetCreditors(page - 1)}
        onNextPage={() => handleGetCreditors(page + 1)}
        onLastPage={() => handleGetCreditors(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetCreditors}
        handleGetAllData={handleGetAllCreditors}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='CreditorReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedCreditorData.map((creditor, index) => (
         <SinglePage
         key={index}
         classes={classes}
         reportTitle="Creditor Report"
         filteredData={filteredData}
         tableColumns={tableColumns}
         dispatchTableColumns={dispatchTableColumns}
         data={{
           ...creditor,
           data: [
             ...creditor.data,
             {
               balance: totalAmount?.toFixed(2)|| '0.00',
               total_debit: totalDB?.toFixed(2)|| '0.00',
               total_credit: totalCD?.toFixed(2)|| '0.00',
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
             ? page * size - size + index * creditor.data.length + 1
             : creditor.page * creditor.size - creditor.size + 1
         }
         setPage={setPage}
       />
        
         
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default CreditorReportsTable;