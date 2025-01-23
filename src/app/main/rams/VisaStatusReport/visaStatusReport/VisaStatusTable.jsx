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

import VisaStatusFilterMenu from './VisaStatusFilterMenu';
import {
  useGetVisaStatusAllReportsQuery,
  useGetVisaStatusReportsQuery,
} from '../VisaStatusApi';
const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },

  {
    id: 2,
    label: 'Passenger Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },

  {
    id: 3,
    label: 'Passenger Passport No',
    name: 'passenger',
    subName: 'passport_no',
    show: true,
  },
  {
    id: 4,
    label: 'Agent',
    getterMethod: (data) => `${data.agent?.first_name || ''} `,
    show: true,
  },
  {
    id: 5,
    label: 'Current Status',
    getterMethod: (data) => `${data.passenger?.current_status?.name || ''}`,
    show: true,
  },
  {
    id: 6,
    label: 'Visa No',
    name: 'visa_entry',
    subName: 'visa_number',
    show: true,
  },
  {
    id: 7,
    label: 'Sponsor No',
    name: 'visa_entry',
    subName: 'sponsor_id_no',
    show: true,
  },
];
function VisaStatussTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedVisaStatusData, setModifiedVisaStatusData] = useReportData();

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetVisaStatusReportsQuery(
    {
      country: filterData.country || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetVisaStatusAllReportsQuery(
    {
      country: filterData.country || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedVisaStatusData(allData.stamp_waitings || []);
      setTotalData(allData.total_amount);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.stamp_waitings,
        size,
        page
      );

      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedVisaStatusData(paginatedData.stamp_waitings || []);

      setTotalData(paginatedData);

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

  const handleGetVisaStatuss = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllVisaStatuss = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all visaStatuss:', error);
    }
  }, []);

  const filteredData = {
    Gender: getValues()?.genderName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <VisaStatusFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetVisaStatuss={handleGetVisaStatuss}
          handleGetAllVisaStatuss={handleGetAllVisaStatuss}
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
        onFirstPage={() => handleGetVisaStatuss(1)}
        onPreviousPage={() => handleGetVisaStatuss(page - 1)}
        onNextPage={() => handleGetVisaStatuss(page + 1)}
        onLastPage={() => handleGetVisaStatuss(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetVisaStatuss}
        handleGetAllData={handleGetAllVisaStatuss}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='VisaStatus'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedVisaStatusData.map((visaStatus, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Visa Status Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={{
                data: [...visaStatus?.data],
              }}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * visaStatus.data.length + 1
                  : visaStatus.page * visaStatus.size - visaStatus.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisaStatussTable;
