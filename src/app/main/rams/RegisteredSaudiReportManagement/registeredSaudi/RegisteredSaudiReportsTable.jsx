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
import {
  useGetRegisteredSaudiAllReportsQuery,
  useGetRegisteredSaudiReportsQuery,
} from '../RegisteredSaudiReportsApi';

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Date', name: 'created_at', show: true, type: 'date' },
  { id: 3, label: 'Passenger Name', name: 'passenger_name', show: true },
  { id: 4, label: 'Passenger Id', name: 'passenger_id', show: true },
  { id: 5, label: 'PP.No', name: 'passport_no', show: true },
  {
    id: 6,
    label: 'Agent',
    getterMethod: (data) => `${data?.agent || ''} `,
    show: true,
  },
  {
    id: 7,
    label: 'Agency',
    getterMethod: (data) => `${data?.agency || ''} `,

    show: true,
  },
];

function RegisteredSaudiReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedRegisteredSaudiData, setModifiedRegisteredSaudiData] =
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
  const { data: paginatedData } = useGetRegisteredSaudiReportsQuery({
    dashboard_type: routeParams?.registeredSaudiReportId,
  });
  const { data: allData } = useGetRegisteredSaudiAllReportsQuery({
    dashboard_type: routeParams?.registeredSaudiReportId,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedRegisteredSaudiData(allData.passengers || []);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.passengers,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedRegisteredSaudiData(paginatedData?.passengers || []);

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

  const handleGetRegisteredSaudi = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllRegisteredSaudi = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all registeredSaudi:', error);
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
        onFirstPage={() => handleGetRegisteredSaudi(1)}
        onPreviousPage={() => handleGetRegisteredSaudi(page - 1)}
        onNextPage={() => handleGetRegisteredSaudi(page + 1)}
        onLastPage={() => handleGetRegisteredSaudi(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetRegisteredSaudi}
        handleGetAllData={handleGetAllRegisteredSaudi}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='RegisteredSaudiReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedRegisteredSaudiData.map((registeredSaudi, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='On Process Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={registeredSaudi}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * registeredSaudi.data.length + 1
                  : registeredSaudi.page * registeredSaudi.size -
                    registeredSaudi.size +
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

export default RegisteredSaudiReportsTable;
