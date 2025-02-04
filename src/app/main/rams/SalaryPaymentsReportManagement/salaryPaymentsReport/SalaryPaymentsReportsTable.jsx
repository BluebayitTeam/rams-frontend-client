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

import SalaryPaymentsFilterMenu from './SalaryPaymentsPaymentsFilterMenu';
import {
  useGetSalaryPaymentsAllReportsQuery,
  useGetSalaryPaymentsReportsQuery,
} from '../SalaryPaymentsPaymentsApi';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Employee', name: 'employee', show: true },
  { id: 3, label: 'Department', name: 'department', show: true },

  {
    id: 5,
    label: 'Payable Amount',
    name: 'payroll_voucher',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
  },
  {
    id: 5,
    label: 'Payment Amount',
    name: 'salarypayments_payment',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
  },

  {
    id: 6,
    label: 'Due Amount',
    name: 'due_amount',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
  },
];

function SalaryPaymentsReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedSalaryPaymentsData, setModifiedSalaryPaymentsData] =
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

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetSalaryPaymentsReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        employee: filterData.employee || '',
        department: filterData.department || '',

        page,
        size,
      },
      { skip: inShowAllMode }
    );
  console.log('paginatedData', paginatedData);
  const { data: allData, refetch: refetchAllSalaryPaymentsReports } =
    useGetSalaryPaymentsAllReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        employee: filterData.employee || '',
        department: filterData.department || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedSalaryPaymentsData(allData.results || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.results,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedSalaryPaymentsData(paginatedData.results || []);
      setTotalAmount(paginatedData.total_amount);
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

  const handleGetSalaryPaymentss = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllSalaryPaymentss = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all salarypaymentss:', error);
    }
  }, []);

  const filteredData = {
    Account: getValues()?.account_typeName || null,
    Ledger: getValues()?.ledgerName || null,
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Sub_Ledger: getValues()?.sub_ledgerName || null,
  };

  // console.log('filteredData', filteredData);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <SalaryPaymentsFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetSalaryPaymentss={handleGetSalaryPaymentss}
          handleGetAllSalaryPaymentss={handleGetAllSalaryPaymentss}
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
        onFirstPage={() => handleGetSalaryPaymentss(1)}
        onPreviousPage={() => handleGetSalaryPaymentss(page - 1)}
        onNextPage={() => handleGetSalaryPaymentss(page + 1)}
        onLastPage={() => handleGetSalaryPaymentss(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetSalaryPaymentss}
        handleGetAllData={handleGetAllSalaryPaymentss}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='SalaryPaymentsReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedSalaryPaymentsData.map((salarypayments, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='SalaryPayments  Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={
                salarypayments
                  ? {
                      ...salarypayments,
                      data: salarypayments.data.concat({
                        department: 'Grand Total',
                        // payroll_voucher: totalPayableBAlance?.toFixed(2),
                        // due_amount: totalDueAmount?.toFixed(2),
                        // salarypayments_payment: totalBAlance?.toFixed(2),
                        hideSerialNo: true,
                        getterMethod: () => '',

                        rowStyle: {
                          fontWeight: 600,
                        },
                      }),
                    }
                  : salarypayments
              }
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * salarypayments.data.length + 1
                  : salarypayments.page * salarypayments.size -
                    salarypayments.size +
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

export default SalaryPaymentsReportsTable;
