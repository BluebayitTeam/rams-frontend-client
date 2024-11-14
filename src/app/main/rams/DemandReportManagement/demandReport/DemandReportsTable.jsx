import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import '../../../rams/print.css';

import moment from 'moment';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetDemandAllReportsQuery,
  useGetDemandReportsQuery,
} from '../DemandReportsApi';
import DemandFilterMenu from './DemandFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  {
    id: 1,
    label: 'SL',
    sortAction: false,
    isSerialNo: true,
    show: true,
    style: { justifyContent: 'center' },
  },
  {
    id: 2,
    label: 'Date',
    name: 'created_at',
    show: true,
    type: 'date',
    style: { justifyContent: 'center' },
  },
  {
    id: 3,
    label: 'Visa Agent',
    name: 'visa_agent',
    subName: 'first_name',
    show: true,
    style: { justifyContent: 'center' },
  },
  { id: 4, label: 'Country', name: 'country', subName: 'name', show: true },
  { id: 5, label: 'Quantity', name: 'quantity', show: true },
  { id: 6, label: 'Company Name', name: 'company_name', show: true },
  { id: 7, label: 'Commment', name: 'notes', show: true },
  { id: 8, label: 'Passport', name: 'passport_no', show: true },
  { id: 9, label: 'Passenger', name: 'passenger_name', show: true },
  { id: 10, label: 'Passenger Agent', name: 'passenger_agent', show: true },
  { id: 11, label: 'Demand No', name: 'demand_no', show: true },
  {
    id: 12,
    label: 'Visa Stamp Date',
    name: 'stamping_date',
    show: true,
    type: 'date',
  },
  {
    id: 13,
    label: 'Manpower Date',
    name: 'man_power_date',
    show: true,
    type: 'date',
  },
  {
    id: 14,
    label: 'Flight Date',
    name: 'flight_date',
    show: true,
    type: 'date',
  },
  { id: 15, label: 'Status', name: 'current_status', show: true },
];

function DemandReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [
    modifiedDemandData,
    setModifiedDemandData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);
  const [totalBAlance, setTotalBAlance] = useState(0);

  const { data: paginatedData } = useGetDemandReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      demand_no: watch('demand_no') || '',
      company_name: watch('company_name') || '',
      visa_agent: watch('visa_agent') || '',
      passenger_agent: watch('passenger_agent') || '',
      country: watch('country') || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetDemandAllReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      demand_no: watch('demand_no') || '',
      company_name: watch('company_name') || '',
      visa_agent: watch('visa_agent') || '',
      passenger_agent: watch('passenger_agent') || '',
      country: watch('country') || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedDemandData(allData?.demand_list || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData?.demand_list,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 10);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedDemandData(paginatedData?.demand_list || []);
      setSize(paginatedData?.size || 10);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalBAlance(paginatedData.total_amount || 0);
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

  const handleGetDemands = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching demand_list:', error);
    }
  }, []);

  const handleGetAllDemands = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all demand_list:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Visa_Number: getValues()?.demand_no || null,
    Company_Name: getValues()?.company_name || null,
    Passenger_Agent: getValues()?.passenger_agentName || null,
    Visa_Agent: getValues()?.visa_agentName || null,
    Country: getValues()?.countryName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <DemandFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetDemands={handleGetDemands}
          handleGetAllDemands={handleGetAllDemands}
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
        onFirstPage={() => handleGetDemands(1)}
        onPreviousPage={() => handleGetDemands(page - 1)}
        onNextPage={() => handleGetDemands(page + 1)}
        onLastPage={() => handleGetDemands(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetDemands}
        handleGetAllData={handleGetAllDemands}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='DemandReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedDemandData.map((demand, index) => (
            <SinglePage
              key={demand.id || index}
              classes={classes}
              reportTitle='Demand Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={demand}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : demand.page * demand.size - demand.size + 1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              setSortBy={setSortBy}
              setSortBySubKey={setSortBySubKey}
              dragAndDropRow={dragAndDropRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DemandReportsTable;
