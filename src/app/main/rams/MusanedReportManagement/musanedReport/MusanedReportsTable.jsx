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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';

import { useParams } from 'react-router';
import {
  useGetMusanedReportAllReportsQuery,
  useGetMusanedReportReportsQuery,
} from '../MusanedReportsApi';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Date', name: 'musaned_date', show: true, type: 'date' },
  {
    id: 3,
    label: 'Passenger Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },
  {
    id: 4,
    label: 'PP.No',
    name: 'passenger',
    subName: 'passport_no',
    show: true,
  },
  {
    id: 5,
    label: 'Visa No',
    getterMethod: (data) => `${data.passenger?.visa_entry?.visa_number || ''} `,
    show: true,
  },
  { id: 6, label: 'No', name: 'musaned_no', show: true },
  { id: 7, label: 'Status', name: 'musaned_status', show: true },
];

function MusanedReportReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const routeParms = useParams();
  console.log('routeParms', routeParms?.musanedReportReportId);

  const { watch, getValues } = methods;

  const [modifiedMusanedReportData, setModifiedMusanedReportData] =
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
  const routeParams = useParams();
  const filterData = watch();
  const status =
    routeParams?.musanedReportReportId === 'musaned'
      ? { musaned_status: 'done' }
      : { okala_status: 'done' };

  const { data: paginatedData } = useGetMusanedReportReportsQuery({
    ...status,
  });

  const { data: allData } = useGetMusanedReportAllReportsQuery({
    musaned_status: 'done',
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedMusanedReportData(allData.musaned || []);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.musaned,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedMusanedReportData(paginatedData?.musaned || []);

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

  const handleGetMusanedReport = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllMusanedReport = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all musanedReport:', error);
    }
  }, []);

  const filteredData = {};

  return (
    <div className={classes.headContainer}>
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
        onFirstPage={() => handleGetMusanedReport(1)}
        onPreviousPage={() => handleGetMusanedReport(page - 1)}
        onNextPage={() => handleGetMusanedReport(page + 1)}
        onLastPage={() => handleGetMusanedReport(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetMusanedReport}
        handleGetAllData={handleGetAllMusanedReport}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='MusanedReportReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedMusanedReportData.map((musanedReport, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle={`${routeParms?.musanedReportReportId == 'musaned' ? 'Musaned Report' : 'Okala Report'}`}
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={musanedReport}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * musanedReport.data.length + 1
                  : musanedReport.page * musanedReport.size -
                    musanedReport.size +
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

export default MusanedReportReportsTable;
