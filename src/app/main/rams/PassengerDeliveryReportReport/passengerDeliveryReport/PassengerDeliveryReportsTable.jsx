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
  useDeletePassengerDeliveryMutation,
  useGetPassengerDeliveryAllReportsQuery,
  useGetPassengerDeliveryReportsQuery,
} from '../PassengerDeliveryReportsApi';
import PassengerDeliveryFilterMenu from './PassengerDeliveryFilterMenu';
import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { useParams } from 'react-router';
import { DeletedSuccessfully } from 'src/app/@customHooks/notificationAlert';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

function PassengerDeliveryReportsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const [removePassengerDelivery] = useDeletePassengerDeliveryMutation();
  const initialTableColumnsState = [
    { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
    {
      id: 2,
      label: 'Delivery Date',
      getterMethod: (data) =>
        data?.passenger_delivery?.delivery_date.slice(0, 10),
      show: true,
    },

    { id: 3, label: 'Job Id', name: 'passenger_id', show: true },
    {
      id: 4,
      label: 'Ref Name',
      getterMethod: (data) => `${data?.agent?.first_name || ''}  `,
      show: true,
    },

    { id: 5, label: 'Passenger', name: 'passenger_name', show: true },

    {
      id: 6,
      label: 'Total Bill',
      name: 'bill',
      show: true,
      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'right' },
    },
    {
      id: 7,
      label: 'Total Expense',
      name: 'cost',
      show: true,
      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'right' },
    },
    {
      id: 8,
      label: 'Loss(-)/Profit(+)',
      name: 'balance',
      show: true,
      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'center' },
    },
    {
      id: 9,
      label: 'Action',
      getterMethod: (data) =>
        data?.passenger_delivery?.id && (
          <Delete
            onClick={() => {
                   removePassengerDelivery({
                     ids: data?.passenger_delivery?.id,
                   });
              DeletedSuccessfully();
              refetch();

            }}
            className='cursor-pointer custom-delete-icon-style'
          />
        ),

      show: true,

      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'right' },
    },
  ];
  const { watch, getValues } = methods;

  const [
    modifiedPassengerDeliveryData,
    setModifiedPassengerDeliveryData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData,refetch } = useGetPassengerDeliveryReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      country: filterData.country || '',
      passenger_type: filterData.passenger_type || '',
      agent: filterData.agent || '',
      passenger: filterData.passenger || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );



  const { data: allData } = useGetPassengerDeliveryAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      country: filterData.country || '',
      passenger_type: filterData.passenger_type || '',
      agent: filterData.agent || '',
      passenger: filterData.passenger || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPassengerDeliveryData(allData.passenger_delivery || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.passenger_delivery,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassengerDeliveryData(paginatedData.passenger_delivery || []);
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

  const handleGetPassengerDeliverys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passengerDeliverys:', error);
    }
  }, []);

  const handleGetAllPassengerDeliverys = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all passengerDeliverys:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,

    Country: getValues()?.countryName || null,
    Passenger_Type: getValues()?.passenger_typeName || null,
    Agent: getValues()?.agentName || null,
    passenger: getValues()?.passengerName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <PassengerDeliveryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerDeliverys={handleGetPassengerDeliverys}
          handleGetAllPassengerDeliverys={handleGetAllPassengerDeliverys}
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
        onFirstPage={() => handleGetPassengerDeliverys(1)}
        onPreviousPage={() => handleGetPassengerDeliverys(page - 1)}
        onNextPage={() => handleGetPassengerDeliverys(page + 1)}
        onLastPage={() => handleGetPassengerDeliverys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPassengerDeliverys}
        handleGetAllData={handleGetAllPassengerDeliverys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PassengerDeliveryReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedPassengerDeliveryData.map((passengerDelivery, index) => (
            <SinglePage
              key={passengerDelivery.id || index}
              classes={classes}
              reportTitle='Passenger Delivery Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={passengerDelivery}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : passengerDelivery.page * passengerDelivery.size -
                    passengerDelivery.size +
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

export default PassengerDeliveryReportsTable;
