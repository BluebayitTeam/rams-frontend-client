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
import { useGetVisaAdviseMalaysiaReportsQuery } from '../VisaAdviseMalaysiaReportsApi';

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

    getterMethod: (data) => `${data?.passenger_name || ''} `,
    show: true,
  },
  {
    id: 4,
    label: 'Agent',

    getterMethod: (data) => `${data?.agent || ''} `,
    show: true,
  },
  {
    id: 5,
    label: 'Passenger Type',

    getterMethod: (data) => `${data?.passenger_type || ''} `,
    show: true,
  },
  {
    id: 6,
    label: 'Passport No',

    getterMethod: (data) => `${data?.passport_no || ''} `,
    show: true,
  },
];

function VisaAdviseMalaysiaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedVisaAdviseMalaysiaData, setModifiedVisaAdviseMalaysiaData] =
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
  const { data: paginatedData } = useGetVisaAdviseMalaysiaReportsQuery({
    accounts_cleared: 'done',
  });

  console.log('paginatedData', paginatedData);
  useEffect(() => {
    if (!inShowAllMode && paginatedData) {
      setModifiedVisaAdviseMalaysiaData(paginatedData?.passengers || []);

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

  const handleGetVisaAdviseMalaysia = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllVisaAdviseMalaysia = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all visaadviseMalaysia:', error);
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
        onFirstPage={() => handleGetVisaAdviseMalaysia(1)}
        onPreviousPage={() => handleGetVisaAdviseMalaysia(page - 1)}
        onNextPage={() => handleGetVisaAdviseMalaysia(page + 1)}
        onLastPage={() => handleGetVisaAdviseMalaysia(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetVisaAdviseMalaysia}
        handleGetAllData={handleGetAllVisaAdviseMalaysia}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='VisaAdviseMalaysiaReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedVisaAdviseMalaysiaData.map((visaadviseMalaysia, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Visa Advise Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={visaadviseMalaysia}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size -
                    size +
                    index * visaadviseMalaysia.data.length +
                    1
                  : visaadviseMalaysia.page * visaadviseMalaysia.size -
                    visaadviseMalaysia.size +
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

export default VisaAdviseMalaysiaReportsTable;
