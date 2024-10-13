import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageLedgerReport from 'src/app/@components/ReportComponents/SiglePageLedgerReport';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredPassengerLedgerReports,
  useGetPassengerLedgerAllReportsQuery,
  useGetPassengerLedgerReportsQuery
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
		headStyle: { textAlign: 'right' }
	},
	{
		id: 8,
		label: 'Credit',
		name: 'credit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 9,
		label: 'Balance',
		name: 'balance',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	}
];



function PassengerLedgerReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema), 
  });
  const dispatch = useDispatch();

  const { control, getValues,watch } = methods;

  const [modifiedPassengerLedgerData, setModifiedPassengerLedgerData] = useReportData();
 const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);
	

  
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
	const [pagination, setPagination] = useState(false);
  const [totalCdAmount, setTotalCdAmount] = useState(0);
	const [totalDbAmount, setTotalDbAmount] = useState(0);
	const [totalBAlance, setTotalBAlance] = useState(0);
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();
  const [inSiglePageMode, setInSiglePageMode] = useState(false);


  const componentRef = useRef(null);

  // Do not fetch data on mount
  const { data:paginatedData} = useGetPassengerLedgerReportsQuery(
    {
      
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      passenger: watch('passenger') || '',
      account_type: watch('account_type') || '',
    
      page,
      size,
    },
    {  skip: inShowAllMode  }
  );
  const { data: allData } =useGetPassengerLedgerAllReportsQuery(
      {
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        passenger: watch('passenger') || '',
        account_type: watch('account_type') || '',
      },
      { skip: !inShowAllMode  }
    );

    const totalData = useSelector(selectFilteredPassengerLedgerReports(paginatedData));


    useEffect(() => {
      if (inShowAllMode && allData) {
        setModifiedPassengerLedgerData(allData?.account_logs || []);
          setTotalCdAmount(allData.total_credit_amount ||0 );
          setTotalDbAmount(allData.total_debit_amount ||0);
          setTotalBAlance(allData.total_amount?.toFixed(2) || 0.0);
        setDateFrom(allData?.date_after);
        setDateTo(allData?.date_before);
          setInSiglePageMode(false);
          setInShowAllMode(true);
          setPagination(false)
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
        setTotalCdAmount(paginatedData.total_credit_amount|| 0);
        setTotalDbAmount(paginatedData.total_debit_amount || 0);
        setTotalBAlance(paginatedData.total_amount?.toFixed(2) || 0.0);
  
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
      }, [inShowAllMode, allData, paginatedData, size, page]);
  

  useEffect(() => {
    if (totalData) {
      setModifiedPassengerLedgerData(totalData?.account_logs);
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

	const handleGetPassengerLedgers = async (newPage) => {
	  setInShowAllMode(false);
    try {
      const formValues = getValues();
      const page = newPage || 1;
      setPage(page);

      const response = await refetchPassengerLedgerReports({ ...formValues, page, size }); 

      if (response?.data) {
        unstable_batchedUpdates(() => {
          const passengerLedgersData = response.data.account_logs || [];
          setModifiedPassengerLedgerData(passengerLedgersData);
          setInShowAllMode(false);
          setTotalPages(response.data?.total_pages);
          setTotalElements(response.data?.total_elements);
        });
      }
    } catch (error) {
      console.error('Error fetching account_logs:', error);
    }
  };

	const handleGetAllPassengerLedgers = async () => {
	   setInShowAllMode(true);
    try {
      const formValues = getValues();

      const response = await refetchAllPassengerLedgerReports({ ...formValues }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          setModifiedPassengerLedgerData(response.data.account_logs || []);
          setInShowAllMode(true);
          const { totalPages, totalElements } = getPaginationData(
            response.data.account_logs,
            size,
            page
          );
          setTotalPages(totalPages);
          setTotalElements(totalElements);
        });
      }
    } catch (error) {
      console.error('Error fetching all account_logs:', error);
    }
  };


  const AgentName = paginatedData?.passenger?.agent?.first_name|| 'N/A'
	const AgentId = paginatedData?.passenger?.passenger_id || 'N/A'
	const PassportNo = paginatedData?.passenger?.passport_no || 'N/A'
	const PassengerName = paginatedData?.passenger?.passenger_name || 'N/A'
	const District = paginatedData?.passenger?.district?.name || 'N/A'
	const MobileNo =paginatedData?.passenger?.contact_no || 'N/A'


  const filteredData = {
		Account: getValues()?.account_typeName || null,
		Date_To: getValues()?.date_before ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY') : null,
		Date_From: getValues()?.date_after ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY') : null, 
  
  };



  return (
    <div className={classes.headContainer}>
      {/* Filter */}
      <FormProvider {...methods}>
        <PassengerLedgerFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerLedgers={handleGetPassengerLedgers}
          handleGetAllPassengerLedgers={handleGetAllPassengerLedgers}
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
                    credit_amount: totalCdAmount?.toFixed(2)|| '0.00', 
                    debit_amount: totalDbAmount?.toFixed(2)|| '0.00',
                    details: 'Total Balance',
                    balance:totalBAlance,
                    details: 'Total Balance',

                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 }
                  },
                ],
              }}

              tableColumns={tableColumns}
              serialNumber={
                pagination
                  ? page * size - size + index + 1
                  : passengerLedger.page * passengerLedger.size - passengerLedger.size + 1
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
    </div>
  );
}

export default PassengerLedgerReportsTable;
