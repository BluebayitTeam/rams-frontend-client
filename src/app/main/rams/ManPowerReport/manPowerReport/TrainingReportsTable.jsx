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
  selectFilteredTrainingReports,
  useGetTrainingAllReportsQuery,
  useGetTrainingReportsQuery,
} from '../TrainingReportsApi';
import TrainingFilterMenu from './TrainingFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});
const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
];

function TrainingReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;
  const [initialTableColumnsState, setInitialTableColumnsState] = useState([]);
  const [
    modifiedTrainingData,
    setModifiedTrainingData,
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

  const { data: paginatedData } = useGetTrainingReportsQuery(
    {
      date_before: filterData.date_before || '',
      date_after: filterData.date_after || '',

      passenger: filterData.passenger || '',
      target_country: filterData.target_country || '',
      agent: filterData.agent || '',
      passenger_type: filterData.passenger_type || '',

      gender: filterData.gender || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetTrainingAllReportsQuery(
    {
      date_before: filterData.date_before || '',
      date_after: filterData.date_after || '',

      passenger: filterData.passenger || '',
      target_country: filterData.target_country || '',
      agent: filterData.agent || '',
      passenger_type: filterData.passenger_type || '',

      gender: filterData.gender || '',
    },
    { skip: !inShowAllMode }
  );

  const totalData = useSelector(selectFilteredTrainingReports);
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
      setModifiedTrainingData(allData?.trainings || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.trainings,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedTrainingData(paginatedData?.trainings || []);
      setInitialTableColumnsState(
        generateDynamicColumns(paginatedData?.trainings[0] || {})
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

  const handleGetTrainings = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  }, []);

  const handleGetAllTrainings = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all trainings:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Training: getValues()?.trainingName || null,

    Country: getValues()?.target_countryName || null,

    Agent: getValues()?.agentName || null,
    Gender: getValues()?.genderName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TrainingFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTrainings={handleGetTrainings}
          handleGetAllTrainings={handleGetAllTrainings}
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
        onFirstPage={() => handleGetTrainings(1)}
        onPreviousPage={() => handleGetTrainings(page - 1)}
        onNextPage={() => handleGetTrainings(page + 1)}
        onLastPage={() => handleGetTrainings(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTrainings}
        handleGetAllData={handleGetAllTrainings}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='TrainingReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedTrainingData?.map((training, index) => (
            <SinglePageWithDynamicColumn
              key={training.id || index}
              classes={classes}
              reportTitle='Training Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={training}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : training.page * training.size - training.size + 1
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

export default TrainingReportsTable;
