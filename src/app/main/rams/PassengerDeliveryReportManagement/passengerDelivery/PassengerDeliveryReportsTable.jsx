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

import PassengerDeliveryFilterMenu from './PassengerDeliveryFilterMenu';
import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { useParams } from 'react-router';
import {
  useGetPassengerDeliveryAllReportsQuery,
  useGetPassengerDeliverysQuery,
  useGetPassengerPurchasesDeliverysQuery,
  useGetPassengerSalesDeliverysQuery,
} from '../PassengerDeliveryReportsApi';
import SiglePage2ForPassengerDelivery from 'src/app/@components/ReportComponents/SiglePage2ForPassengerDelivery';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

function PassengerDeliverysTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  // const { agentId } = routeParams;
  console.log('routeParam111s', routeParams);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const initialTableColumnsState = [
    { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
    { id: 2, label: 'Date', name: 'log_date', show: true, type: 'date' },
    { id: 3, label: 'Invoice No', name: 'reference_no', show: true },
    { id: 4, label: 'Log Type', name: 'log_type', show: true },
    { id: 5, label: 'Pay Purpose', name: 'log_type', show: true },
    { id: 6, label: 'Particular', name: 'details', show: true },
    {
      id: 7,
      label: 'Debit',
      name: 'debit_amount',
      show: true,
      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'right' },
    },
    {
      id: 8,
      label: 'Credit',
      name: 'credit_amount',
      show: true,
      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'right' },
    },
    {
      id: 9,
      label: 'Balance',
      name: 'balance',
      show: true,
      style: { justifyContent: 'flex-end', marginRight: '5px' },
      headStyle: { textAlign: 'right' },
    },
  ];
  const initialBillDetailsTableColumnsState = [
    { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
    {
      id: 2,
      label: 'Sales Date',
      name: 'sales_date',
      show: true,
      type: 'date',
    },
    { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
    { id: 4, label: 'Bill Purpose', name: 'related_ledger', show: true },
    { id: 5, label: 'Bill Details ', name: 'details', show: true },
    { id: 6, label: 'Amount', name: 'credit_amount', show: true },
  ];
  const initialCostDetailsTableColumnsState = [
    { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
    { id: 2, label: ' Date', name: 'purchase_date', show: true, type: 'date' },
    { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
    { id: 4, label: ' Purpose', name: 'related_ledger', show: true },
    { id: 5, label: ' Details ', name: 'details', show: true },
    { id: 6, label: 'Amount', name: 'credit_amount', show: true },
  ];
  const { watch, getValues } = methods;

  const [
    modifiedPassengerDeliveryData,
    setModifiedPassengerDeliveryData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  const [
    modifiedPassengerDeliveryBillDetailData,
    setModifiedPassengerDeliveryBillDetailData,
    setSortBy2,
    setSortBySubKey2,
    dragAndDropRow2,
  ] = useReportData();
  const [
    modifiedPassengerDeliveryCostDetailData,
    setModifiedPassengerDeliveryCostDetailData,
    setSortBy3,
    setSortBySubKey3,
    dragAndDropRow3,
  ] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [billDetailstableColumns, dispatchBillDetailsTableColumns] = useReducer(
    tableColumnsReducer,
    initialBillDetailsTableColumnsState
  );
  const [costDetailstableColumns, dispatchCostDetailsTableColumns] = useReducer(
    tableColumnsReducer,
    initialCostDetailsTableColumnsState
  );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [billBalance, setBillBalance] = useState(0);
  const [billBalance, setBillBalance] = useState(0);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetPassengerDeliverysQuery(
    {
      passenger: filterData.passenger || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );
  const { data: paginatedPurchasesData } =
    useGetPassengerPurchasesDeliverysQuery(
      {
        passenger: filterData.passenger || '',

        page,
        size,
      },
      { skip: inShowAllMode }
    );
  const { data: paginatedSalesData } = useGetPassengerSalesDeliverysQuery(
    {
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
      setModifiedPassengerDeliveryData(allData.account_logs || []);
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
      setModifiedPassengerDeliveryData(paginatedData.account_logs || []);

      setModifiedPassengerDeliveryCostDetailData(
        paginatedPurchasesData?.sales || []
      );
      setModifiedPassengerDeliveryBillDetailData(
        paginatedSalesData?.purchases || []
      );
      setBillBalance(paginatedSalesData?.total_balance);
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
    passenger: getValues()?.passengerName || null,
  };

  const handleGetPassengerDeliveryBillDetails = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passengerDeliverys:', error);
    }
  }, []);
  const handleGetPassengerDeliveryCostDetails = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passengerDeliverys:', error);
    }
  }, []);

  const agentName = paginatedSalesData?.passenger?.agent?.first_name;
  const passengerDeliveryPID = paginatedSalesData?.passenger?.passenger_id;
  const passportNo = paginatedSalesData?.passenger?.passport_no;
  const passengerName = paginatedSalesData?.passenger?.passenger_name;

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
        filename='PassengerDelivery'
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

      {/* Passenger Bill Details Report  */}

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <div id='downloadPage'>
          {/* each single page (table) */}

          {modifiedPassengerDeliveryBillDetailData.map((sales) => (
            <SiglePage2ForPassengerDelivery
              classes={classes}
              reportTitle='Bill Details'
              tableColumns={billDetailstableColumns}
              dispatchTableColumns={dispatchBillDetailsTableColumns}
              data={{
                ...sales,
                data: [
                  ...sales.data,
                  {
                    credit_amount: billBalance,
                    details: 'Total Balance',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              agentName={agentName}
              passengerDeliveryPID={passengerDeliveryPID}
              passportNo={passportNo}
              passengerName={passengerName}
              serialNumber={sales.page * sales.size - sales.size + 1}
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              setSortBy={setSortBy}
              // setSortBySubKey={setSortBySubKey}
            />
          ))}
        </div>
      </table>

      {/* Passenger Cost Details Report  */}
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <div id='downloadPage'>
          {/* each single page (table) */}

          {modifiedPassengerDeliveryCostDetailData.map((cost) => (
            <SinglePage
              classes={classes}
              generalData={generalData}
              reportTitle='Cost Details'
              tableColumns={costDetailstableColumns}
              dispatchTableColumns={dispatchCostDetailsTableColumns}
              data={{
                ...cost,
                data: [
                  ...cost.data,
                  {
                    credit_amount: costBalance,
                    details: 'Total Balance',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              serialNumber={cost.page * cost.size - cost.size + 1}
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              setSortBy={setSortBy}
              // setSortBySubKey={setSortBySubKey}
            />
          ))}
        </div>
      </table>
    </div>
  );
}

export default PassengerDeliverysTable;
