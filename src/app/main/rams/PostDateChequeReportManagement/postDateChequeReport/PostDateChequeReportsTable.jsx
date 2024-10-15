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
  useGetPostDateChequeAllReportsQuery,
  useGetPostDateChequeReportsQuery
} from '../PostDateChequeReportsApi';
import PostDateChequeFilterMenu from './PostDateChequeFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Invoice No', name: 'invoice_no', show: true },
	{ id: 3, label: 'Date', name: 'updated_at', show: true, type: 'date' },
	{ id: 4, label: 'Issue Date', name: 'pdc_issue_date', show: true, type: 'date' },
	{ id: 5, label: 'Ledger', name: 'ledger', subName: 'name', show: true },
	{ id: 6, label: 'Status', name: 'status', show: true },
	{ id: 7, label: 'Bank', name: 'rp_bank_id', show: true },
	{ id: 8, label: 'Cheque No', name: 'cheque_no', show: true },
	{
		id: 9,
		label: 'Amount',
		name: 'amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	}
];
function PostDateChequeReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const {  watch ,getValues } = methods;

  const [modifiedPostDateChequeData, setModifiedPostDateChequeData,setSortBy,setSortBySubKey,dragAndDropRow] = useReportData();
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

  const { data: paginatedData,  } = useGetPostDateChequeReportsQuery(
    {
      branch: filterData.branch || '',
      district: filterData.district || '',
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      username: filterData.username || '',
      primary_phone: filterData.primary_phone || '',
      postDateCheque_code: filterData.postDateCheque_code || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  
  const { data: allData, } = useGetPostDateChequeAllReportsQuery(
    {
      branch: filterData.branch || '',
      district: filterData.district || '',
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      username: filterData.username || '',
      primary_phone: filterData.primary_phone || '',
      postDateCheque_code: filterData.postDateCheque_code || '',
    },
    { skip: !inShowAllMode }
  );


  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPostDateChequeData(allData.postdate_cheques || []);
      setInSiglePageMode(false);
			setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.postdate_cheques,
        size,
        page
      );
      setPage(page || 1);
			setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {

      setModifiedPostDateChequeData(paginatedData.postdate_cheques || []);
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

  const handleGetPostDateCheques = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching postDateCheques:', error);
    }
  }, []);

  const handleGetAllPostDateCheques = useCallback(async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching all postDateCheques:', error);
    }
  }, []);


  const filteredData = {
    Branch: getValues()?.branchName || null,
   
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format("DD-MM-YYYY")
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format("DD-MM-YYYY")
      : null,
  
   
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <PostDateChequeFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPostDateCheques={handleGetPostDateCheques}
          handleGetAllPostDateCheques={handleGetAllPostDateCheques}
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
        onFirstPage={() => handleGetPostDateCheques(1)}
        onPreviousPage={() => handleGetPostDateCheques(page - 1)}
        onNextPage={() => handleGetPostDateCheques(page + 1)}
        onLastPage={() => handleGetPostDateCheques(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPostDateCheques}
        handleGetAllData={handleGetAllPostDateCheques}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PostDateChequeReport'
      />

      <table id='table-to-xls' className='w-full' style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedPostDateChequeData.map((postDateCheque, index) => (
            <SinglePage
              key={postDateCheque.id || index}
              classes={classes}
              reportTitle='PostDateCheque Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={postDateCheque}
              totalColumn={initialTableColumnsState?.length}

              serialNumber={
                pagination
                  ? page * size - size + 1
                  : postDateCheque.page * postDateCheque.size - postDateCheque.size + 1
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

export default PostDateChequeReportsTable;