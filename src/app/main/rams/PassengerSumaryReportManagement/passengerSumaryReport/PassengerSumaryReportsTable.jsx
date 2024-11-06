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
  selectFilteredPassengerSumaryReports,
  useGetPassengerSumaryAllReportsQuery,
  useGetPassengerSumaryReportsQuery,
} from '../PassengerSumaryReportsApi';
import PassengerSumaryFilterMenu from './PassengerSumaryFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});
const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
];

function PassengerSumaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;
  const [initialTableColumnsState, setInitialTableColumnsState] = useState([]);
  const [
    modifiedPassengerSumaryData,
    setModifiedPassengerSumaryData,
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

  console.log('cfdsfdsfdsfdsfd', pagination);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetPassengerSumaryReportsQuery(
    {
      demand: filterData.demand || '',
      passenger_agent: filterData.passenger_agent || '',

      visa_number: filterData.visa_number || '',
      agent: filterData.agent || '',

      profession: filterData.profession || '',
      passenger_type: filterData.passenger_type || '',
      target_country: filterData.target_country || '',
      gender: filterData.gender || '',
      passenger: filterData.passenger || '',
      mofa_status: filterData.mofa_status || '',
      stamping_date_after: filterData.stamping_date_after || '',
      stamping_date_before: filterData.stamping_date_before || '',
      medical_result: filterData.medical_result || '',
      medical_expiry_date_after: filterData.medical_expiry_date_after || '',
      medical_expiry_date_before: filterData.medical_expiry_date_before || '',
      police_clearance_status: filterData.police_clearance_status || '',
      driving_license_status: filterData.driving_license_status || '',
      finger_status: filterData.finger_status || '',
      training_card_status: filterData.training_card_status || '',
      man_power_date_after: filterData.man_power_date_after || '',
      man_power_date_before: filterData.man_power_date_before || '',
      man_power_status: filterData.man_power_status || '',
      visa_agent: filterData.visa_agent || '',
      current_status: filterData.current_status || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetPassengerSumaryAllReportsQuery(
    {
      demand: filterData.demand || '',
      passenger_agent: filterData.passenger_agent || '',

      visa_number: filterData.visa_number || '',
      agent: filterData.agent || '',

      profession: filterData.profession || '',
      passenger_type: filterData.passenger_type || '',
      target_country: filterData.target_country || '',
      gender: filterData.gender || '',
      passenger: filterData.passenger || '',
      mofa_status: filterData.mofa_status || '',
      stamping_date_after: filterData.stamping_date_after || '',
      stamping_date_before: filterData.stamping_date_before || '',
      medical_result: filterData.medical_result || '',
      medical_expiry_date_after: filterData.medical_expiry_date_after || '',
      medical_expiry_date_before: filterData.medical_expiry_date_before || '',
      police_clearance_status: filterData.police_clearance_status || '',
      driving_license_status: filterData.driving_license_status || '',
      finger_status: filterData.finger_status || '',
      training_card_status: filterData.training_card_status || '',
      man_power_date_after: filterData.man_power_date_after || '',
      man_power_date_before: filterData.man_power_date_before || '',
      man_power_status: filterData.man_power_status || '',
      visa_agent: filterData.visa_agent || '',
      current_status: filterData.current_status || '',
    },
    { skip: !inShowAllMode }
  );

  const totalData = useSelector(selectFilteredPassengerSumaryReports);
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
      setModifiedPassengerSumaryData(allData?.passenger_objs || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.passenger_objs,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassengerSumaryData(paginatedData?.passenger_objs || []);
      setInitialTableColumnsState(
        generateDynamicColumns(paginatedData?.passenger_objs[0] || {})
      );

      setSize(paginatedData.size);
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

  const handleGetPassengerSumarys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passenger_objs:', error);
    }
  }, []);

  const handleGetAllPassengerSumarys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all passenger_objs:', error);
    }
  }, []);

  const filteredData = {
    Demand: getValues()?.demandName || null,
    Passenger_Agent: getValues()?.passenger_agent || null,
    Visa_Number: getValues()?.visa_number || null,
    Agent: getValues()?.agentName || null,
    Profession: getValues()?.professionName || null,
    Passenger_Type: getValues()?.passenger_typeName || null,
    Country: getValues()?.target_countryName || null,
    Gender: getValues()?.genderName || null,

    Mofa_Status: getValues()?.mofa_status || null,
    Stamping_Date_From: getValues()?.stamping_date_after
      ? moment(new Date(getValues()?.stamping_date_after)).format('DD-MM-YYYY')
      : null,
    Stamping_Date_To: getValues()?.stamping_date_before
      ? moment(new Date(getValues()?.stamping_date_before)).format('DD-MM-YYYY')
      : null,
    Medical_Result: getValues()?.medical_result || null,

    Medical_Expiry_To: getValues()?.medical_expiry_date_before
      ? moment(new Date(getValues()?.medical_expiry_date_before)).format(
          'DD-MM-YYYY'
        )
      : null,
    Medical_Expiry_From: getValues()?.medical_expiry_date_after
      ? moment(new Date(getValues()?.medical_expiry_date_after)).format(
          'DD-MM-YYYY'
        )
      : null,
    Police_Clearance_Status: getValues()?.police_clearance_status || null,
    Driving_License_Status: getValues()?.driving_license_status || null,
    Finger_Status: getValues()?.finger_status || null,
    Training_Card_Status: getValues()?.training_card_status || null,
    ManP_To: getValues()?.man_power_date_before
      ? moment(new Date(getValues()?.man_power_date_before)).format(
          'DD-MM-YYYY'
        )
      : null,
    ManP_from: getValues()?.man_power_date_after
      ? moment(new Date(getValues()?.man_power_date_after)).format('DD-MM-YYYY')
      : null,
    Man_power_Status: getValues()?.man_power_status || null,
    Visa_Agent: getValues()?.visa_agent || null,
    Current_Status: getValues()?.current_status || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <PassengerSumaryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerSumarys={handleGetPassengerSumarys}
          handleGetAllPassengerSumarys={handleGetAllPassengerSumarys}
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
        onFirstPage={() => handleGetPassengerSumarys(1)}
        onPreviousPage={() => handleGetPassengerSumarys(page - 1)}
        onNextPage={() => handleGetPassengerSumarys(page + 1)}
        onLastPage={() => handleGetPassengerSumarys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPassengerSumarys}
        handleGetAllData={handleGetAllPassengerSumarys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PassengerSumaryReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedPassengerSumaryData?.map((passengerSumary, index) => (
            <SinglePageWithDynamicColumn
              key={passengerSumary.id || index}
              classes={classes}
              reportTitle='Passenger Summary Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={passengerSumary}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : passengerSumary.page * passengerSumary.size -
                    passengerSumary.size +
                    1
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

export default PassengerSumaryReportsTable;
