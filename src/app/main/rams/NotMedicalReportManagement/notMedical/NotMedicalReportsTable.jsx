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
  useGetNotMedicalAllReportsQuery,
  useGetNotMedicalReportsQuery,
} from '../NotMedicalReportsApi';

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },

  { id: 2, label: 'Passenger Name', name: 'passenger_name', show: true },

  { id: 3, label: 'Passenger Passport No', name: 'passport_no', show: true },
  {
    id: 4,
    label: 'Agent',
    getterMethod: (data) => `${data?.agent || ''}`,

    show: true,
  },
  {
    id: 5,
    label: 'Medical Status',
    getterMethod: (data) => `${data.medical_result || 'Not Medical'}`,
    show: true,
  },
  {
    id: 6,
    label: 'Current Status',
    getterMethod: (data) => `${data?.current_status || ''}`,

    show: true,
  },
];

function NotMedicalReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedNotMedicalData, setModifiedNotMedicalData] = useReportData();

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const componentRef = useRef(null);
  const routeParams = useParams();
  console.log('routeParams', routeParams);

  const filterData = watch();

  const { data: paginatedData } = useGetNotMedicalReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      current_airway: filterData.current_airway || '',
      customer: filterData.customer || '',
      ticket_agency: filterData.ticket_agency || '',
      issue_person: filterData.issue_person || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetNotMedicalAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      current_airway: filterData.current_airway || '',
      customer: filterData.customer || '',
      ticket_agency: filterData.ticket_agency || '',
      issue_person: filterData.issue_person || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedNotMedicalData(allData.not_medicals || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.not_medicals,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedNotMedicalData(paginatedData?.not_medicals || []);

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

  const handleGetNotMedicals = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllNotMedicals = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all notMedicals:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.issue_date_before
      ? moment(new Date(getValues()?.issue_date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.issue_date_after
      ? moment(new Date(getValues()?.issue_date_after)).format('DD-MM-YYYY')
      : null,
    Agent: getValues()?.ticket_agencyName || null,
  };

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
        onFirstPage={() => handleGetNotMedicals(1)}
        onPreviousPage={() => handleGetNotMedicals(page - 1)}
        onNextPage={() => handleGetNotMedicals(page + 1)}
        onLastPage={() => handleGetNotMedicals(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetNotMedicals}
        handleGetAllData={handleGetAllNotMedicals}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='NotMedicalReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedNotMedicalData.map((notMedical, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Not Medical Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={notMedical}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * notMedical.data.length + 1
                  : notMedical.page * notMedical.size - notMedical.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NotMedicalReportsTable;
