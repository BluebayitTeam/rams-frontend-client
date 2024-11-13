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
  useGetVisaEntryAllReportsQuery,
  useGetVisaEntryReportsQuery,
} from '../VisaEntryReportsApi';
import VisaEntryFilterMenu from './VisaEntryFilterMenu';

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
    name: 'visa_issue_date',
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
  { id: 6, label: 'Visa No', name: 'visa_number', show: true },
  {
    id: 7,
    label: 'Company Name',
    name: 'demand',
    subName: 'company_name',
    show: true,
  },
  { id: 8, label: 'Sponsor ID', name: 'sponsor_id_no', show: true },

  { id: 9, label: 'Commment', name: 'notes', show: true },
  { id: 10, label: 'Passport', name: 'passport_no', show: true },
  { id: 11, label: 'Passenger', name: 'passenger_name', show: true },
  { id: 12, label: 'Passenger Agent', name: 'passenger_agent', show: true },
  {
    id: 13,
    label: 'Visa Stamp Date',
    name: 'stamping_date',
    show: true,
    type: 'date',
  },
  {
    id: 14,
    label: 'Manpower Date',
    name: 'man_power_date',
    show: true,
    type: 'date',
  },
  {
    id: 15,
    label: 'Flight Date',
    name: 'flight_date',
    show: true,
    type: 'date',
  },
  { id: 16, label: 'Status', name: 'current_status', show: true },
];

function VisaEntryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [
    modifiedVisaEntryData,
    setModifiedVisaEntryData,
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

  const { data: paginatedData } = useGetVisaEntryReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      visa_agent: watch('visa_agent') || '',
      visa_number: watch('visa_number') || '',
      company_name: watch('company_name') || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetVisaEntryAllReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      visa_agent: watch('visa_agent') || '',
      visa_number: watch('visa_number') || '',
      company_name: watch('company_name') || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedVisaEntryData(allData?.visa_entries || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData?.visa_entries,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 10);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedVisaEntryData(paginatedData?.visa_entries || []);
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

  const handleGetVisaEntrys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching visa_entries:', error);
    }
  }, []);

  const handleGetAllVisaEntrys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all visa_entries:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Visa_Agent: getValues()?.visa_agentName || null,
    Visa_Number: getValues()?.visa_number || null,
    Company_Name: getValues()?.company_name || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <VisaEntryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetVisaEntrys={handleGetVisaEntrys}
          handleGetAllVisaEntrys={handleGetAllVisaEntrys}
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
        onFirstPage={() => handleGetVisaEntrys(1)}
        onPreviousPage={() => handleGetVisaEntrys(page - 1)}
        onNextPage={() => handleGetVisaEntrys(page + 1)}
        onLastPage={() => handleGetVisaEntrys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetVisaEntrys}
        handleGetAllData={handleGetAllVisaEntrys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='VisaEntryReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedVisaEntryData.map((visaEntry, index) => (
            <SinglePage
              key={visaEntry.id || index}
              classes={classes}
              reportTitle='Company Overview Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={visaEntry}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : visaEntry.page * visaEntry.size - visaEntry.size + 1
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

export default VisaEntryReportsTable;
