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
  useGetAccountStatementAllReportsQuery,
  useGetAccountStatementReportsQuery
} from '../AccountStatementReportsApi';
import AccountStatementFilterMenu from './AccountStatementFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true , },
  { id: 2, label: 'Name', name: 'username', show: true },
  { id: 3, label: 'Group', name: 'group', subName: 'name', show: true },
  { id: 4, label: 'District', name: 'city', show: true ,		},  
  { id: 5, label: 'Mobile', name: 'primary_phone', show: true },
  { id: 6, label: 'Email', name: 'email', show: true, },
];

function AccountStatementReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const {  watch ,getValues } = methods;

  const [modifiedAccountStatementData, setModifiedAccountStatementData,setSortBy,setSortBySubKey,dragAndDropRow] = useReportData();
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

  

  const { data: paginatedData,  } = useGetAccountStatementReportsQuery(
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
  
  const { data: allData, } = useGetAccountStatementAllReportsQuery(
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
      setModifiedAccountStatementData(allData.accountStatements || []);
      setInSiglePageMode(false);
			setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.accountStatements,
        size,
        page
      );
      setPage(page || 1);
			setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {

      setModifiedAccountStatementData(paginatedData.accountStatements || []);
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

  const handleGetAccountStatements = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching accountStatements:', error);
    }
  }, []);

  const handleGetAllAccountStatements = useCallback(async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching all accountStatements:', error);
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
        <AccountStatementFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAccountStatements={handleGetAccountStatements}
          handleGetAllAccountStatements={handleGetAllAccountStatements}
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
        onFirstPage={() => handleGetAccountStatements(1)}
        onPreviousPage={() => handleGetAccountStatements(page - 1)}
        onNextPage={() => handleGetAccountStatements(page + 1)}
        onLastPage={() => handleGetAccountStatements(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAccountStatements}
        handleGetAllData={handleGetAllAccountStatements}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AccountStatementReport'
      />

      <table id='table-to-xls' className='w-full' style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedAccountStatementData.map((accountStatement, index) => (
            <SinglePage
              key={accountStatement.id || index}
              classes={classes}
              reportTitle='AccountStatement Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={accountStatement}
              totalColumn={initialTableColumnsState?.length}

              serialNumber={
                pagination
                  ? page * size - size + 1
                  : accountStatement.page * accountStatement.size - accountStatement.size + 1
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

export default AccountStatementReportsTable;