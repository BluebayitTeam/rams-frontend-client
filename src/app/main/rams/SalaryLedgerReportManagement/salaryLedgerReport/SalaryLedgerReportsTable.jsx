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
  useGetSalaryLedgerAllReportsQuery,
  useGetSalaryLedgerReportsQuery,
} from '../SalaryLedgersApi';
import SalaryLedgerFilterMenu from './SalaryLedgerFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Date', name: 'log_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'reference_no', show: true },
  {
    id: 4,
    label: 'Employee',
    getterMethod: (data) =>
      `${data.employee.first_name} ${data.employee.last_name}`,
    show: true,
  },
  {
    id: 6,
    label: 'Credit',
    name: 'credit_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
  {
    id: 7,
    label: 'Debit',

    name: 'debit_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },

  {
    id: 8,
    label: 'Balance',
    name: 'balance',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
];

function SalaryLedgerReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedSalaryLedgerData, setModifiedSalaryLedgerData] =
    useReportData();
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
  const [totalDb, setTotalDb] = useState(0);
  const [totalBl, setTotalBl] = useState(0);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetSalaryLedgerReportsQuery(
      {
        date_to: filterData.date_to || '',
        date_from: filterData.date_from || '',
        employee: filterData.employee || '',
        department: filterData.department || '',
        page,
        size,
      },
      {
        skip: inShowAllMode ||
          !(
            filterData.date_to ||
            filterData.date_from ||
            filterData.employee ||
            filterData.department
          )
      }
    );

  const { data: allData, refetch: refetchAllSalaryLedgerReports } =
    useGetSalaryLedgerAllReportsQuery(
      {
        date_to: filterData.date_to || '',
        date_from: filterData.date_from || '',
        employee: filterData.employee || '',
        department: filterData.department || '',
      },
      {
        skip: !inShowAllMode
          ||
          !(
            filterData.date_to ||
            filterData.date_from ||
            filterData.employee ||
            filterData.department
          )
      }
    );

  useEffect(() => {
    if (filterData.date_to === "" &&
      filterData.date_from === "" &&
      filterData.employeeName === "" &&
      filterData.departmentName === "") {
      setModifiedSalaryLedgerData([]);
      setTotalAmount(0);
      setTotalDb(0);
      setTotalBl(0);
      setInSiglePageMode(false);
      setInShowAllMode(false);
      setPagination(false);
      return;
    }
    if (inShowAllMode && allData) {
      setModifiedSalaryLedgerData(allData.salary_logs || []);
      setTotalAmount(allData.total_credit);
      setTotalDb(allData.total_debit);
      setTotalBl(allData.remaining_balance);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.salary_logs,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedSalaryLedgerData(paginatedData.salary_logs || []);
      setTotalAmount(paginatedData.total_credit);
      setTotalDb(paginatedData?.total_debit);
      setTotalBl(paginatedData?.remaining_balance);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [inShowAllMode, allData, paginatedData, size, page, filterData.date_to, filterData.date_from, filterData.employee, filterData.department]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetSalaryLedgers = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllSalaryLedgers = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all salaryledgers:', error);
    }
  }, []);

  const filteredData = {
    Account: getValues()?.account_typeName || null,
    Ledger: getValues()?.ledgerName || null,
    Date_To: getValues()?.date_to
      ? moment(new Date(getValues()?.date_to)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_from
      ? moment(new Date(getValues()?.date_from)).format('DD-MM-YYYY')
      : null,
    Sub_Ledger: getValues()?.sub_ledgerName || null,
  };

  // console.log('filteredData', inShowAllMode, allData, paginatedData,);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <SalaryLedgerFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetSalaryLedgers={handleGetSalaryLedgers}
          handleGetAllSalaryLedgers={handleGetAllSalaryLedgers}
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
        onFirstPage={() => handleGetSalaryLedgers(1)}
        onPreviousPage={() => handleGetSalaryLedgers(page - 1)}
        onNextPage={() => handleGetSalaryLedgers(page + 1)}
        onLastPage={() => handleGetSalaryLedgers(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetSalaryLedgers}
        handleGetAllData={handleGetAllSalaryLedgers}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='SalaryLedgerReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedSalaryLedgerData.map((salaryledger, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Salary Ledger Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={{
                ...salaryledger,
                data: [
                  ...salaryledger.data,
                  {
                    credit_amount: totalAmount,
                    debit_amount: totalDb,
                    balance: totalBl,
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
                  ? page * size - size + index * salaryledger.data.length + 1
                  : salaryledger.page * salaryledger.size -
                  salaryledger.size +
                  1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalaryLedgerReportsTable;
