import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';

import AttendanceReportTable from 'src/app/@components/ReportComponents/AttendanceReportTable';
import {
  useGetAttendanceReportsAllReportsQuery,
  useGetAttendanceReportsReportsQuery,
} from '../AttendanceReportsApi';
import AttendanceReportsFilterMenu from './AttendanceReportsFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2, label: 'Employee Name', name: 'employee_name', show: true,
    style: { justifyContent: 'center', whiteSpace: 'nowrap' },
  },
  {
    id: 3,
    label: 'Date',
    name: 'date',
    show: true,
    type: 'date',
    style: { justifyContent: 'center', whiteSpace: 'nowrap' },
  },
  {
    id: 4,
    label: 'Check In',
    name: 'check_in',
    show: true,
    style: { justifyContent: 'center', whiteSpace: 'nowrap' },
  },
  {
    id: 5,
    label: 'Check Out',
    name: 'check_out',
    show: true,
    style: { justifyContent: 'center', whiteSpace: 'nowrap' },
  },

  // {
  //   id: 6,
  //   label: 'Late time',
  //   name: 'late_time',
  //   show: true,
  //   style: { justifyContent: 'center', whiteSpace: 'nowrap' },
  // },
  // {
  //   id: 6,
  //   label: 'Over time',
  //   name: 'overtime',
  //   show: true,
  //   style: { justifyContent: 'center', whiteSpace: 'nowrap' },
  // },
  // {
  //   id: 7,
  //   label: 'Status',
  //   getterMethod: (data) => (
  //     <span
  //       style={{
  //         color:
  //           data?.attendance_status === 'Present'
  //             ? 'green'
  //             : data?.attendance_status === 'On Leave'
  //               ? 'orange'
  //               : 'red',
  //       }}>
  //       {data?.attendance_status}
  //     </span>
  //   ),
  //   show: true,
  // },
];

function AttendanceReportsReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedAttendanceReportsData, setModifiedAttendanceReportsData] =
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
  } = useGetAttendanceReportsReportsQuery(
    {
      date_from: filterData.date_from || '',
      date_to: filterData.date_to || '',
      employee_id: filterData.employee || '',
      department: filterData.department || '',
      page,
      size,
    },
    { skip: !filterData.date_from || !filterData.date_to || inShowAllMode }
  );
  // console.log('errorCheck', error?.response?.data, paginatedData);
  const { data: allData, refetch: refetchAllAttendanceReportsReports } =
    useGetAttendanceReportsAllReportsQuery(
      {
        date_from: filterData.date_from || '',
        date_to: filterData.date_to || '',
        employee_id: filterData.employee || '',
        department: filterData.department || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedAttendanceReportsData(allData || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedAttendanceReportsData(paginatedData || []);
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

  const handleGetAttendanceReportss = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllAttendanceReportss = useCallback(async () => {
    try {
    } catch (error) {
      // console.error('Error fetching all attendancereportss:', error);
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

  // console.log('filteredData', modifiedAttendanceReportsData);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <AttendanceReportsFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAttendanceReportss={handleGetAttendanceReportss}
          handleGetAllAttendanceReportss={handleGetAllAttendanceReportss}
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
        onFirstPage={() => handleGetAttendanceReportss(1)}
        onPreviousPage={() => handleGetAttendanceReportss(page - 1)}
        onNextPage={() => handleGetAttendanceReportss(page + 1)}
        onLastPage={() => handleGetAttendanceReportss(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAttendanceReportss}
        handleGetAllData={handleGetAllAttendanceReportss}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AttendanceReportsReport'
      />

      {paginatedData && (
        <table
          id='table-to-xls'
          className='w-full'
          style={{ minHeight: '270px' }}>
          <tbody ref={componentRef} id='downloadPage'>
            {modifiedAttendanceReportsData.map((attendancereports, index) => {
              // console.log("modified_datax", attendancereports)
              return (
                <AttendanceReportTable
                  key={index}
                  classes={classes}
                  reportTitle='Attendance Report'
                  filteredData={filteredData}
                  tableColumns={tableColumns}
                  dispatchTableColumns={dispatchTableColumns}
                  data={
                    attendancereports.data
                  }
                  totalColumn={initialTableColumnsState?.length}
                  inSiglePageMode={inSiglePageMode}
                  serialNumber={
                    pagination
                      ? page * size -
                      size +
                      index * attendancereports.data.length +
                      1
                      : attendancereports.page * attendancereports.size -
                      attendancereports.size +
                      1
                  }
                  setPage={setPage}
                />
              )
            })}
          </tbody>
        </table>
      )}
      {/* {error?.response?.data &&
        CustomNotification('error', `${error?.response?.data}`)} */}
    </div>
  );
}

export default AttendanceReportsReportsTable;
