import { zodResolver } from '@hookform/resolvers/zod';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageLedgerReport from 'src/app/@components/ReportComponents/SiglePageLedgerReport';
import SinglePage2 from 'src/app/@components/ReportComponents/SinglePage2';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredPassengerLedgerReports,
  useGetPassengerLedgerAllReportsQuery,
  useGetPassengerLedgerBillDetailDataReportsQuery,
  useGetPassengerLedgerCostDetailDataReportsQuery,
  useGetPassengerLedgerReportsQuery,
} from '../PassengerLedgerReportsApi';
import PassengerLedgerFilterMenu from './PassengerLedgerFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

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
  { id: 2, label: 'Sales Date', name: 'sales_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
  { id: 4, label: 'Bill Purpose', name: 'related_ledger', show: true },
  { id: 5, label: 'Bill Details ', name: 'details', show: true },
  { id: 6, label: 'Amount', name: 'debit_amount', show: true },
];
const initialCostDetailsTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: ' Date', name: 'purchase_date', show: true, type: 'date' },
  { id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
  { id: 4, label: ' Purpose', name: 'related_ledger', show: true },
  { id: 5, label: ' Details ', name: 'details', show: true },
  { id: 6, label: 'Amount', name: 'credit_amount', show: true },
];

function PassengerLedgerReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { getValues, watch } = methods;

  const [modifiedPassengerLedgerData, setModifiedPassengerLedgerData] =
    useReportData();
  const [
    modifiedPassengerLedgerBillDetailData,
    setModifiedPassengerLedgerBillDetailData,
  ] = useReportData();
  const [
    modifiedPassengerLedgerCostDetailData,
    setModifiedPassengerLedgerCostDetailData,
  ] = useReportData();

  console.log(
    'modifiedPassengerLedgerCostDetailData',
    modifiedPassengerLedgerCostDetailData
  );

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
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [totalCdAmount, setTotalCdAmount] = useState(0);
  const [totalDbAmount, setTotalDbAmount] = useState(0);
  const [totalBAlance, setTotalBAlance] = useState(0);
  const [totalSl, setTotalSl] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [inSiglePageMode, setInSiglePageMode] = useState(false);

  console.log('totalDbAmount', totalDbAmount);

  const componentRef = useRef(null);

  // Do not fetch data on mount
  const { data: paginatedData } = useGetPassengerLedgerReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      passenger: watch('passenger') || '',
      account_type: watch('account_type') || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetPassengerLedgerAllReportsQuery(
    {
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      passenger: watch('passenger') || '',
      account_type: watch('account_type') || '',
    },
    { skip: !inShowAllMode }
  );

  const { data: BillDetailData } =
    useGetPassengerLedgerBillDetailDataReportsQuery(
      {
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        passenger: watch('passenger') || '',
        account_type: watch('account_type') || '',
      },
      { skip: inShowAllMode }
    );

  const { data: CostDetailData } =
    useGetPassengerLedgerCostDetailDataReportsQuery(
      {
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        passenger: watch('passenger') || '',
        account_type: watch('account_type') || '',
      },
      { skip: inShowAllMode }
    );

  console.log('CostDetailData120', CostDetailData?.purchases);

  const totalData = useSelector(selectFilteredPassengerLedgerReports());

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPassengerLedgerData(allData?.account_logs || []);

      setTotalCdAmount(allData.total_credit || 0);
      setTotalDbAmount(allData.total_debit || 0);
      setTotalBAlance(allData.total_balance?.toFixed(2) || 0.0);
      setDateFrom(allData?.date_after);
      setDateTo(allData?.date_before);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.account_logs,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassengerLedgerData(paginatedData?.account_logs || []);

      setTotalCdAmount(paginatedData.total_credit || 0);
      setTotalDbAmount(paginatedData?.total_debit || '0.00');
      setTotalBAlance(paginatedData.total_balance?.toFixed(2) || 0.0);

      setDateFrom(paginatedData?.date_after);

      setDateTo(paginatedData?.date_before);

      setPage(paginatedData?.page || 1);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }

    if (!inShowAllMode && BillDetailData) {
      setModifiedPassengerLedgerBillDetailData(BillDetailData?.sales || []);
      setTotalSl(BillDetailData?.total_balance || '0.00');
      setPage(BillDetailData?.page || 1);
      setSize(BillDetailData?.size || 25);
      setTotalPages(BillDetailData.total_pages || 0);
      setTotalDbAmount(BillDetailData?.sales?.total_debit || 0);

      setTotalElements(BillDetailData.total_elements || 0);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }

    if (!inShowAllMode && CostDetailData) {
      setModifiedPassengerLedgerCostDetailData(CostDetailData?.purchases || []);
      setTotalCost(CostDetailData?.total_balance || '0.00');
      setPage(CostDetailData?.page || 1);
      setSize(CostDetailData?.size || 25);
      setTotalPages(CostDetailData.total_pages || 0);
      setTotalElements(CostDetailData.total_elements || 0);

      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [
    inShowAllMode,
    allData,
    paginatedData,
    BillDetailData,
    CostDetailData,
    size,
    page,
  ]);

  useEffect(() => {
    if (totalData) {
      setModifiedPassengerLedgerData(totalData?.account_logs);
      setModifiedPassengerLedgerBillDetailData(totalData?.sales);
      setModifiedPassengerLedgerCostDetailData(totalData?.purchases);
    }
  }, [totalData]);

  // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetPassengerLedgers = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllPassengerLedgers = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all foreignLedgers:', error);
    }
  }, []);

  // const handleGetPassengerLedgerBillDetails = useCallback(async (newPage) => {
  //   try {
  //     const page = newPage || 1;
  //     setPage(page);
  //   } catch (error) {
  //     console.error('Error fetching agents:', error);
  //   }
  //   }, []);

  const handleGetPassengerLedgerBillDetails = async (newPage) => {
    try {
      const formValues = getValues();
      const page = newPage || 1;
      setPage(page);

      const response = await BillDetailData({ ...formValues, page, size });

      console.log('response121212121', response);

      if (response?.data) {
        unstable_batchedUpdates(() => {
          const passengerLedgersData = response.data?.sales || [];
          setModifiedPassengerLedgerBillDetailData(passengerLedgersData);
          setInShowAllMode(false);
          setTotalPages(response.data?.total_pages);
          setTotalElements(response.data?.total_elements);
          setInSiglePageMode(true);
          setInShowAllMode(false);
        });
      }
    } catch (error) {
      console.error('Error fetching account_logs:', error);
    }
  };

  const handleGetPassengerLedgerCostDetails = useCallback(async (params) => {
    try {
      const page = params?.page || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passenger ledger cost details:', error);
    }
  }, []);

  const AgentName = paginatedData?.passenger?.agent?.first_name || 'N/A';
  const AgentId = paginatedData?.passenger?.passenger_id || 'N/A';
  const PassportNo = paginatedData?.passenger?.passport_no || 'N/A';
  const PassengerName = paginatedData?.passenger?.passenger_name || 'N/A';
  const District = paginatedData?.passenger?.district?.name || 'N/A';
  const MobileNo = paginatedData?.passenger?.contact_no || 'N/A';

  const filteredData = {
    Account: getValues()?.account_typeName || null,
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
  };

  // const handleSavePassengerDelivery = () => {
  // 	passengerDeliveryDate
  // 		? dispatch(
  // 				updatePassengerDelivery({
  // 					...getValues()
  // 				})
  // 		  ) && dispatch(getPassengerLedgers({ values: getValues() }))
  // 		: dispatch(
  // 				savePassengerDelivery({
  // 					...getValues()
  // 				})
  // 		  );

  // 	setOpenSuccessStatusAlert(true);
  // };

  return (
    <div className={classes.headContainer}>
      {/* Filter */}
      <FormProvider {...methods}>
        <PassengerLedgerFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerLedgers={handleGetPassengerLedgers}
          handleGetAllPassengerLedgers={handleGetAllPassengerLedgers}
          handleGetPassengerLedgerBillDetails={
            handleGetPassengerLedgerBillDetails
          }
          handleGetPassengerLedgerCostDetails={
            handleGetPassengerLedgerCostDetails
          }
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
        onFirstPage={() => handleGetPassengerLedgers(1)}
        onPreviousPage={() => handleGetPassengerLedgers(page - 1)}
        onNextPage={() => handleGetPassengerLedgers(page + 1)}
        onLastPage={() => handleGetPassengerLedgers(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPassengerLedgers}
        handleGetAllData={handleGetAllPassengerLedgers}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PassengerLedgerReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {/* each single page (table) */}
          {modifiedPassengerLedgerData.map((passengerLedger, index) => (
            <SiglePageLedgerReport
              key={index}
              classes={classes}
              reportTitle='Passenger Ledger Report'
              filteredData={filteredData}
              dispatchTableColumns={dispatchTableColumns}
              dateFromDateTo={
                dateFrom && dateTo
                  ? `Date : ${moment(dateFrom).format('DD-MM-YYYY')} to ${moment(dateTo).format('DD-MM-YYYY')}`
                  : ''
              }
              data={{
                ...passengerLedger,
                data: [
                  ...passengerLedger?.data,
                  {
                    credit_amount: totalCdAmount?.toFixed(2) || '0.00',
                    debit_amount: totalDbAmount,

                    balance: totalBAlance,
                    details: 'Total Balance',

                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              tableColumns={tableColumns}
              serialNumber={
                pagination
                  ? page * size - size + index + 1
                  : passengerLedger.page * passengerLedger.size -
                    passengerLedger.size +
                    1
              }
              setPage={setPage}
              AgentName={AgentName}
              AgentId={AgentId}
              PassengerName={PassengerName}
              PassportNo={PassportNo}
              District={District}
              MobileNo={MobileNo}
              inSiglePageMode={inSiglePageMode}
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

          {modifiedPassengerLedgerBillDetailData.map((sales, index) => (
            <SinglePage2
              classes={classes}
              reportTitle='Bill Details'
              tableColumns={billDetailstableColumns}
              dispatchTableColumns={dispatchBillDetailsTableColumns}
              data={{
                ...sales,
                data: [
                  ...sales?.data,
                  {
                    debit_amount: totalSl,

                    details: 'Total Balance',

                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              serialNumber={sales.page * sales.size - sales.size + 1}
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
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

          {modifiedPassengerLedgerCostDetailData.map((cost) => (
            <SinglePage2
              classes={classes}
              reportTitle='Cost Details'
              tableColumns={costDetailstableColumns}
              dispatchTableColumns={dispatchCostDetailsTableColumns}
              data={{
                ...cost,
                data: [
                  ...cost?.data,
                  {
                    credit_amount: totalCost,
                    details: 'Total Balance',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              serialNumber={cost.page * cost.size - cost.size + 1}
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
            />
          ))}
        </div>
      </table>
      <h1
        className='title  pl-0 md:-pl-20 '
        style={{
          display: totalCdAmount ? 'block' : 'none',
          marginLeft: '45%',
        }}>
        <u>Balance Summary</u>
      </h1>

      <TableContainer
        component={Paper}
        style={{ display: totalCdAmount ? 'block' : 'none' }}>
        <Table className={`${classes.table} justify-center`}>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'></TableCell>
              <TableCell component='th' scope='row'>
                <b> Total Bill</b>{' '}
              </TableCell>
              <TableCell component='th' scope='row'>
                {totalCdAmount?.toFixed(2) || '0.00'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'></TableCell>
              <TableCell component='th' scope='row'>
                <b>Total Cost</b>
              </TableCell>
              <TableCell component='th' scope='row'>
                {totalCdAmount?.toFixed(2) || '0.00'}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter className='bg-blue-50 '>
            <TableRow>
              <TableCell component='th' scope='row'></TableCell>
              <TableCell component='th' scope='row'>
                <b>Profit(+)Loss(-)</b>
              </TableCell>
              <TableCell component='th' scope='row'>
                {totalBAlance}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* <FormProvider {...methods}>
				<div
					className="bg-white"
					style={{ display: modifiedPassengerLedgerData[0]?.data.length > 0 ? 'block' : 'none' }}
				>
					<div className="flex flex-nowrap mt-10 pt-10 ml-40">
          <CustomDatePicker
				name="delivery_date"
				label="Delivery Date"
				required
				placeholder="DD-MM-YYYY"
			/>
						<div className="ml-20">
							<Button
								className="whitespace-nowrap mx-4 mt-10 "
								variant="contained"
								color="secondary"
								onClick={() => handleSavePassengerDelivery()}
							>
								{passengerDeliveryDate ? 'Update' : 'Save'}
							</Button>
						</div>
					</div>
				</div>
			</FormProvider> */}
    </div>
  );
}

export default PassengerLedgerReportsTable;
