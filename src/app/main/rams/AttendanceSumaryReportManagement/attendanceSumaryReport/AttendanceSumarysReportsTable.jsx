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

import AttendanceSumarysFilterMenu from './AttendanceSumarysFilterMenu';
import {
  useGetAttendanceSumarysAllReportsQuery,
  useGetAttendanceSumarysReportsQuery,
} from '../AttendanceSumarysApi';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Payment Date', name: 'date', show: true, type: 'date' },

  { id: 3, label: 'Employee', name: 'employee_name', show: true },

  { id: 4, label: 'Department', name: 'department', show: true },

  { id: 5, label: 'Purpose', name: 'payhead_name', show: true },

  {
    id: 6,
    label: 'Amount',
    show: true,
    getterMethod: (data) => `${data?.amount} (${data?.transaction_type})`,
  },
];

function AttendanceSumarysReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedAttendanceSumarysData, setModifiedAttendanceSumarysData] =
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
  const [totalBAlance, setTotalBAlance] = useState(0);
  const [tabileShow, setTabileShow] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const {
    data: paginatedData,
    refetch: refetchAgentReports,
    error,
  } = useGetAttendanceSumarysReportsQuery(
    {
      date_from: filterData.date_from || '',
      date_to: filterData.date_to || '',
      employee: filterData.employee || '',
      department: filterData.department || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );
  console.log('errorCheck', error?.response?.data, paginatedData);
  const { data: allData, refetch: refetchAllAttendanceSumarysReports } =
    useGetAttendanceSumarysAllReportsQuery(
      {
        date_from: filterData.date_from || '',
        date_to: filterData.date_to || '',
        employee: filterData.employee || '',
        department: filterData.department || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedAttendanceSumarysData(allData.check_in_check_outs || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.check_in_check_outs,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedAttendanceSumarysData(paginatedData.check_in_check_outs || []);
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

  const handleGetAttendanceSumaryss = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllAttendanceSumaryss = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all attendancesumaryss:', error);
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

  // console.log('filteredData', filteredData);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <AttendanceSumarysFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAttendanceSumaryss={handleGetAttendanceSumaryss}
          handleGetAllAttendanceSumaryss={handleGetAllAttendanceSumaryss}
        />
      </FormProvider>

      <ReportPaginationAndDownload
        size={size}
        setPage={setPage}
        setSize={setSize}
        inShowAllMode={inShowAllMode}
        setInShowAllMode={setInShowAllMode}
        componentRef={componentRef}
        totalPages={totalPages}
        totalElements={totalElements}
        onFirstPage={() => handleGetAttendanceSumaryss(1)}
        onPreviousPage={() => handleGetAttendanceSumaryss(page - 1)}
        onNextPage={() => handleGetAttendanceSumaryss(page + 1)}
        onLastPage={() => handleGetAttendanceSumaryss(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAttendanceSumaryss}
        handleGetAllData={handleGetAllAttendanceSumaryss}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AttendanceSumarysReport'
      />
      {paginatedData && (
        <table
          id='table-to-xls'
          className='w-full'
          style={{ minHeight: '270px' }}>
          <tbody ref={componentRef} id='downloadPage'>
            {modifiedAttendanceSumarysData.map((attendancesumarys, index) => (
              <SinglePage
                key={index}
                classes={classes}
                reportTitle='Attendance Summary Report'
                filteredData={filteredData}
                tableColumns={tableColumns}
                dispatchTableColumns={dispatchTableColumns}
                data={
                  attendancesumarys
                    ? {
                        ...attendancesumarys,
                        data: attendancesumarys.data.concat({
                          payhead_name: 'Grand Total',
                          hideSerialNo: true,
                          getterMethod: () => `${totalAmount}`,
                          rowStyle: {
                            fontWeight: 600,
                          },
                        }),
                      }
                    : attendancesumarys
                }
                totalColumn={initialTableColumnsState?.length}
                inSiglePageMode={inSiglePageMode}
                serialNumber={
                  pagination
                    ? page * size -
                      size +
                      index * attendancesumarys.data.length +
                      1
                    : attendancesumarys.page * attendancesumarys.size -
                      attendancesumarys.size +
                      1
                }
                setPage={setPage}
              />
            ))}
          </tbody>
        </table>
      )}
      {/* {error?.response?.data &&
        CustomNotification('error', `${error?.response?.data}`)} */}
    </div>
  );
}

export default AttendanceSumarysReportsTable;
