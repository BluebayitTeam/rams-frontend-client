import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePageWithDynamicColumn from 'src/app/@components/ReportComponents/SinglePageWithDynamicColumn';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';

import { z } from 'zod';
import '../../../rams/print.css';

import moment from 'moment';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredEmbassyReports,
  useGetEmbassyAllReportsQuery,
  useGetEmbassyReportsQuery,
} from '../EmbassyReportsApi';
import EmbassyFilterMenu from './EmbassyFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});
const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
];

function EmbassyReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;
  const [initialTableColumnsState, setInitialTableColumnsState] = useState([]);
  const [
    modifiedEmbassyData,
    setModifiedEmbassyData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  useEffect(() => {
    dispatchTableColumns({
      type: 'setColumns',
      data: initialTableColumnsState,
    });
  }, [initialTableColumnsState]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  console.log('filterData', getValues());

  const { data: paginatedData } = useGetEmbassyReportsQuery(
    {
      stamping_date_after: filterData.stamping_date_after || '',
      stamping_date_before: filterData.stamping_date_before || '',
      expiry_date_after: filterData.expiry_date_after || '',
      expiry_date_before: filterData.expiry_date_before || '',

      date_before: filterData.date_before || '',
      date_after: filterData.date_after || '',

      passenger: filterData.passenger || '',
      target_country: filterData.target_country || '',
      agent: filterData.agent || '',
      stamping_status: filterData.stamping_status || '',
      passenger_type: filterData.passenger_type || '',

      gender: filterData.gender || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetEmbassyAllReportsQuery(
    {
      stamping_date_after: filterData.stamping_date_after || '',
      stamping_date_before: filterData.stamping_date_before || '',
      expiry_date_after: filterData.expiry_date_after || '',
      expiry_date_before: filterData.expiry_date_before || '',

      date_before: filterData.date_before || '',
      date_after: filterData.date_after || '',

      passenger: filterData.passenger || '',
      target_country: filterData.target_country || '',
      agent: filterData.agent || '',
      stamping_status: filterData.stamping_status || '',
      passenger_type: filterData.passenger_type || '',

      gender: filterData.gender || '',
    },
    { skip: !inShowAllMode }
  );

  const totalData = useSelector(selectFilteredEmbassyReports);
  const generateDynamicColumns = (data) => {
    // Start with the static "SL" column
    const staticSLColumn = {
      id: 1,
      label: 'SL',
      sortAction: false,
      isSerialNo: true,
      show: true,
    };

    // Dynamically generate the other columns based on the keys of the data
    const dynamicColumns = Object.keys(data)?.map((key, index) => ({
      id: index + 2, // Start id after SL
      label: key.replace(/_/g, ' ').toUpperCase(), // Convert keys to labels
      name: key,
      show: true,
    }));

    // Return the array with the static "SL" column first, followed by dynamic columns
    return [staticSLColumn, ...dynamicColumns];
  };

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedEmbassyData(allData?.embassies || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.embassies,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedEmbassyData(paginatedData?.embassies || []);
      setInitialTableColumnsState(
        generateDynamicColumns(paginatedData?.embassies[0] || {})
      );
      setPage(paginatedData?.page || 1);
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

  const handleGetEmbassys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching embassies:', error);
    }
  }, []);

  const handleGetAllEmbassys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all embassies:', error);
    }
  }, []);

  const filteredData = {
    V_Stp_To: getValues()?.stamping_date_before
      ? moment(new Date(getValues()?.stamping_date_before)).format('DD-MM-YYYY')
      : null,
    V_Stp_From: getValues()?.stamping_date_after
      ? moment(new Date(getValues()?.stamping_date_after)).format('DD-MM-YYYY')
      : null,

    M_Exp_From: getValues()?.expiry_date_after
      ? moment(new Date(getValues()?.expiry_date_after)).format('DD-MM-YYYY')
      : null,
    M_Exp_To: getValues()?.expiry_date_before
      ? moment(new Date(getValues()?.expiry_date_before)).format('DD-MM-YYYY')
      : null,
    V_Ent_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    V_Ent_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Passenger: getValues()?.passengerName || null,
    Stamping_Status: getValues()?.stamping_status || null,

    Country: getValues()?.target_countryName || null,

    Agent: getValues()?.agentName || null,
    Gender: getValues()?.genderName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <EmbassyFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetEmbassys={handleGetEmbassys}
          handleGetAllEmbassys={handleGetAllEmbassys}
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
        onFirstPage={() => handleGetEmbassys(1)}
        onPreviousPage={() => handleGetEmbassys(page - 1)}
        onNextPage={() => handleGetEmbassys(page + 1)}
        onLastPage={() => handleGetEmbassys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetEmbassys}
        handleGetAllData={handleGetAllEmbassys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='EmbassyReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedEmbassyData?.map((embassy, index) => (
            <SinglePageWithDynamicColumn
              key={embassy.id || index}
              classes={classes}
              reportTitle='Embassy Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={embassy}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : embassy.page * embassy.size - embassy.size + 1
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

export default EmbassyReportsTable;
