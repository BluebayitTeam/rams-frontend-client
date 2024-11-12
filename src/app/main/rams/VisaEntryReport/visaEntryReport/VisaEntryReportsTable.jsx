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
import {
  useGetVisaEntryAllReportsQuery,
  useGetVisaEntryReportsQuery,
} from '../VisaEntryReportsApi';
import VisaEntryFilterMenu from './VisaEntryFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
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
    label: 'Activity Type',
    getterMethod: (data) => `${data.activity_type?.name?.replace(/_/g, ' ')}`,
    show: true,
  },
  {
    id: 3,
    label: 'Employee',
    getterMethod: (data) =>
      `${data.activity_by?.first_name || ''} ${data.activity_by?.last_name || ''}`,
    show: true,
  },
  { id: 4, label: 'Message', name: 'comment', show: true },

  {
    id: 5,
    label: 'Created On',
    getterMethod: (data) =>
      `${moment(data.created_at).format('DD-MM-YYYY')}   , ${moment(data.created_at).format('hh:mm A')}`,
    show: true,
  },
];

function VisaEntryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedVisaEntryData, setModifiedVisaEntryData] = useReportData();
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetVisaEntryReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        visa_no: filterData.visa_no || '',
        company_name: filterData.company_name || '',
        passenger_agent: filterData.passenger_agent || '',
        visa_agent: filterData.visa_agent || '',
        country: filterData.country || '',
        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const { data: allData, refetch: refetchAllVisaEntryReports } =
    useGetVisaEntryAllReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        visa_no: filterData.visa_no || '',
        company_name: filterData.company_name || '',
        passenger_agent: filterData.passenger_agent || '',
        visa_agent: filterData.visa_agent || '',
        country: filterData.country || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedVisaEntryData(allData.visa_entries || []);
      setTotalAmount(allData.total_amount);
      setDateFrom(allData?.date_after);
      setDateTo(allData?.date_before);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.visa_entries,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedVisaEntryData(paginatedData.visa_entries || []);
      setDateFrom(paginatedData?.date_after);
      setDateTo(allData?.date_before);

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

  const handleGetVisaEntrys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;

      setPage(newPage);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllVisaEntrys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all visaEntrys:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    visa_no: getValues()?.visa_no || null,
    Company_Name: getValues()?.company_name || null,
    Passenger_Agent: getValues()?.passenger_agentName || null,
    Visa_Agent: getValues()?.visa_agentName || null,
    Country: getValues()?.countryName || null,
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
        onFirstPage={() => handleGetVisaEntrys(page)}
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
              classes={classes}
              reportTitle='Activity Log Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              dateFromDateTo={
                dateFrom && dateTo
                  ? `Date : ${dateFrom && moment(new Date(dateFrom)).format('DD-MM-YYYY')} to ${
                      dateTo && moment(new Date(dateTo)).format('DD-MM-YYYY')
                    }`
                  : ''
              }
              data={visaEntry}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : visaEntry.page * visaEntry.size - visaEntry.size + 1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              // setSortBy={setSortBy}
              // setSortBySubKey={setSortBySubKey}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisaEntryReportsTable;
