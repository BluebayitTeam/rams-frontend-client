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
  selectFilteredMofaReports,
  useGetMofaAllReportsQuery,
  useGetMofaReportsQuery,
} from '../TrainingReportsApi';
import MofaFilterMenu from './TrainingFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});
const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
];

function MofaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;
  const [initialTableColumnsState, setInitialTableColumnsState] = useState([]);
  const [
    modifiedMofaData,
    setModifiedMofaData,
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

  const { data: paginatedData } = useGetMofaReportsQuery(
    {
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

  const { data: allData } = useGetMofaAllReportsQuery(
    {
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

  const totalData = useSelector(selectFilteredMofaReports);
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
      setModifiedMofaData(allData?.mofas || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.mofas,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedMofaData(paginatedData?.mofas || []);
      setInitialTableColumnsState(
        generateDynamicColumns(paginatedData?.mofas[0] || {})
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

  const handleGetMofas = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching mofas:', error);
    }
  }, []);

  const handleGetAllMofas = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all mofas:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Mofa: getValues()?.mofaName || null,

    Country: getValues()?.target_countryName || null,

    Agent: getValues()?.agentName || null,
    Gender: getValues()?.genderName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <MofaFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetMofas={handleGetMofas}
          handleGetAllMofas={handleGetAllMofas}
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
        onFirstPage={() => handleGetMofas(1)}
        onPreviousPage={() => handleGetMofas(page - 1)}
        onNextPage={() => handleGetMofas(page + 1)}
        onLastPage={() => handleGetMofas(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetMofas}
        handleGetAllData={handleGetAllMofas}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='MofaReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedMofaData?.map((mofa, index) => (
            <SinglePageWithDynamicColumn
              key={mofa.id || index}
              classes={classes}
              reportTitle='Mofa Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={mofa}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : mofa.page * mofa.size - mofa.size + 1
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

export default MofaReportsTable;
