import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
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
  selectFilteredAccountSummaryReports,
  useGetAccountSummaryAllReportsQuery,
  useGetAccountSummaryReportsQuery,
} from '../AccountSummaryReportsApi';
import AccountSummaryFilterMenu from './AccountSummaryFilterMenu';

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

function AccountSummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const {  watch ,getValues } = methods;

  const [modifiedAccountSummaryData, setModifiedAccountSummaryData,setSortBy,setSortBySubKey,dragAndDropRow] = useReportData();
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

  const { data: paginatedData,  } = useGetAccountSummaryReportsQuery(
    {
      
      start_date: filterData.start_date || '',
      end_date: filterData.end_date || '',
     
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  
  const { data: allData, } = useGetAccountSummaryAllReportsQuery(
    {
      
      start_date: filterData.start_date || '',
      end_date: filterData.end_date || '',
     
    },
    { skip: !inShowAllMode }
  );

  const totalData = useSelector(selectFilteredAccountSummaryReports);

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedAccountSummaryData(allData.agents || []);
      setInSiglePageMode(false);
			setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.agents,
        size,
        page
      );
      setPage(page || 1);
			setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {

      setModifiedAccountSummaryData(paginatedData.agents || []);
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

  const handleGetAccountSummarys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllAccountSummarys = useCallback(async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching all agents:', error);
    }
  }, []);


  const filteredData = {
    
    Date_To: getValues()?.end_date
      ? moment(new Date(getValues()?.end_date)).format("DD-MM-YYYY")
      : null,
    Date_From: getValues()?.start_date
      ? moment(new Date(getValues()?.start_date)).format("DD-MM-YYYY")
      : null,
   
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <AccountSummaryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAccountSummarys={handleGetAccountSummarys}
          handleGetAllAccountSummarys={handleGetAllAccountSummarys}
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
        onFirstPage={() => handleGetAccountSummarys(1)}
        onPreviousPage={() => handleGetAccountSummarys(page - 1)}
        onNextPage={() => handleGetAccountSummarys(page + 1)}
        onLastPage={() => handleGetAccountSummarys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAccountSummarys}
        handleGetAllData={handleGetAllAccountSummarys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AccountSummaryReport'
      />

      <table id='table-to-xls' className='w-full' style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedAccountSummaryData.map((accountSummary, index) => (
            <SinglePage
              key={accountSummary.id || index}
              classes={classes}
              reportTitle='AccountSummary Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={accountSummary}
              totalColumn={initialTableColumnsState?.length}

              serialNumber={
                pagination
                  ? page * size - size + 1
                  : accountSummary.page * accountSummary.size - accountSummary.size + 1
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

export default AccountSummaryReportsTable;