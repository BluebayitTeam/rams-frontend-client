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
  useGetRegisteredMalaysiaAllReportsQuery,
  useGetRegisteredMalaysiaReportsQuery,
} from '../RegisteredMalaysiaReportsApi';

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

function RegisteredMalaysiaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedRegisteredMalaysiaData, setModifiedRegisteredMalaysiaData] =
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
  const { data: paginatedData } = useGetRegisteredMalaysiaReportsQuery(
    {
      dashboard_type: routeParams?.registeredMalaysiaReportId,
    },
    { skip: inShowAllMode }
  );

  console.log('paginatedData', paginatedData);
  const { data: allData } = useGetRegisteredMalaysiaAllReportsQuery(
    {
      dashboard_type: routeParams?.registeredMalaysiaReportId,
      country: routeParams['*'],
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedRegisteredMalaysiaData(allData.passengers || []);

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
      setModifiedRegisteredMalaysiaData(paginatedData?.passengers || []);

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

  const handleGetRegisteredMalaysia = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllRegisteredMalaysia = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all registeredMalaysia:', error);
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
        onFirstPage={() => handleGetRegisteredMalaysia(1)}
        onPreviousPage={() => handleGetRegisteredMalaysia(page - 1)}
        onNextPage={() => handleGetRegisteredMalaysia(page + 1)}
        onLastPage={() => handleGetRegisteredMalaysia(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetRegisteredMalaysia}
        handleGetAllData={handleGetAllRegisteredMalaysia}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='RegisteredMalaysiaReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedRegisteredMalaysiaData.map((registeredMalaysia, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Total Registered Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={registeredMalaysia}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size -
                    size +
                    index * registeredMalaysia.data.length +
                    1
                  : registeredMalaysia.page * registeredMalaysia.size -
                    registeredMalaysia.size +
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

export default RegisteredMalaysiaReportsTable;
