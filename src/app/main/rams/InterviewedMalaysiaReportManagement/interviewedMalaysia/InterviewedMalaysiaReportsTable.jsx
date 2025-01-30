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
import { useGetInterviewedMalaysiaReportsQuery } from '../InterviewedMalaysiaReportsApi';

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Date',
    getterMethod: (data) => `${moment(data?.date).format('YYYY-MM-DD') || ''} `,
    show: true,
  },
  {
    id: 3,
    label: 'Passenger Name',

    getterMethod: (data) => `${data?.passenger?.passenger_name || ''} `,
    show: true,
  },
  {
    id: 4,
    label: 'Agent',

    getterMethod: (data) => `${data?.passenger?.agent?.first_name || ''} `,
    show: true,
  },
  {
    id: 5,
    label: 'Visa Number',

    getterMethod: (data) =>
      `${data?.passenger?.visa_entry?.visa_number || ''} `,
    show: true,
  },
  {
    id: 6,
    label: 'Passport No',

    getterMethod: (data) => `${data?.passenger?.passport_no || ''} `,
    show: true,
  },
];

function InterviewedMalaysiaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedInterviewedMalaysiaData, setModifiedInterviewedMalaysiaData] =
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
  const { data: paginatedData } = useGetInterviewedMalaysiaReportsQuery({
    interviewed: 'done',
  });

  useEffect(() => {
    if (!inShowAllMode && paginatedData) {
      setModifiedInterviewedMalaysiaData(paginatedData?.calling_emb || []);

      setTotalAmount(paginatedData.total_amount);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [inShowAllMode, paginatedData, size, page]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetInterviewedMalaysia = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllInterviewedMalaysia = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all interviewedMalaysia:', error);
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
        onFirstPage={() => handleGetInterviewedMalaysia(1)}
        onPreviousPage={() => handleGetInterviewedMalaysia(page - 1)}
        onNextPage={() => handleGetInterviewedMalaysia(page + 1)}
        onLastPage={() => handleGetInterviewedMalaysia(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetInterviewedMalaysia}
        handleGetAllData={handleGetAllInterviewedMalaysia}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='InterviewedMalaysiaReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedInterviewedMalaysiaData.map((interviewedMalaysia, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Interviewed Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={interviewedMalaysia}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size -
                    size +
                    index * interviewedMalaysia.data.length +
                    1
                  : interviewedMalaysia.page * interviewedMalaysia.size -
                    interviewedMalaysia.size +
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

export default InterviewedMalaysiaReportsTable;
