import { zodResolver } from '@hookform/resolvers/zod';
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
const initialBillDetailsTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Sales Date', name: 'sales_date', show: true, type: 'date' },
	{ id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
	{ id: 4, label: 'Bill Purpose', name: 'related_ledger', show: true },
	{ id: 5, label: 'Bill Details ', name: 'details', show: true },
	{ id: 6, label: 'Amount', name: 'credit_amount', show: true }
];
const initialCostDetailsTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: ' Date', name: 'purchase_date', show: true, type: 'date' },
	{ id: 3, label: 'Invoice No', name: 'invoice_no', show: true },
	{ id: 4, label: ' Purpose', name: 'related_ledger', show: true },
	{ id: 5, label: ' Details ', name: 'details', show: true },
	{ id: 6, label: 'Amount', name: 'credit_amount', show: true }
];



function PassengerLedgerReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema), 
  });
  const dispatch = useDispatch();

  const {  getValues,watch } = methods;

  const [modifiedPassengerLedgerData, setModifiedPassengerLedgerData] = useReportData();
  const [modifiedPassengerLedgerBillDetailData, setModifiedPassengerLedgerBillDetailData] = useReportData();
  const [modifiedPassengerLedgerCostDetailData, setModifiedPassengerLedgerCostDetailData,] = useReportData();

  console.log('modifiedPassengerLedgerCostDetailData', modifiedPassengerLedgerCostDetailData);

const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

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


    const { refetch:refetchBillDetails} = useGetPassengerLedgerBillDetailDataReportsQuery(
      {
        
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        passenger: watch('passenger') || '',
        account_type: watch('account_type') || '',
      
      
      },
      {  skip: inShowAllMode  }
    );


    const { data:CostDetailData} = useGetPassengerLedgerCostDetailDataReportsQuery(
      {
        
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        passenger: watch('passenger') || '',
        account_type: watch('account_type') || '',
      
       
      },
      {  skip: inShowAllMode  }
    );


    console.log('CostDetailData120', CostDetailData?.purchases);

    const totalData = useSelector(selectFilteredPassengerLedgerReports());


    useEffect(() => {
      if (inShowAllMode && allData) {
        setModifiedPassengerLedgerData(allData?.account_logs || []);
       
          setTotalCdAmount(allData.total_credit ||0 );
          setTotalDbAmount(allData.total_debit ||0);
          setTotalBAlance(allData.total_balance?.toFixed(2) || 0.0);
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
      }
      
      
      else if (!inShowAllMode && paginatedData) {
        setModifiedPassengerLedgerData(paginatedData?.account_logs || []);
      
        setTotalCdAmount(paginatedData.total_credit|| 0);
        setTotalDbAmount(paginatedData.total_debit || 0);
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
      
      
      
      //  if (!inShowAllMode && BillDetailData) {
      //   setModifiedPassengerLedgerBillDetailData(BillDetailData?.sales || []);
      //   setPage(BillDetailData?.page || 1);
      //   setSize(BillDetailData?.size || 25);
      //   setTotalPages(BillDetailData.total_pages || 0);
      //   setTotalElements(BillDetailData.total_elements || 0);
      //   setInSiglePageMode(true);
      //   setInShowAllMode(false);
    
      //  }

       if (!inShowAllMode && CostDetailData) {
        console.log('CostDetailData54554545', CostDetailData?.purchases || []);
        setModifiedPassengerLedgerCostDetailData(CostDetailData?.purchases || []);
        setPage(CostDetailData?.page || 1);
        setSize(CostDetailData?.size || 25);
        setTotalPages(CostDetailData.total_pages || 0);
        setTotalElements(CostDetailData.total_elements || 0);
        setInSiglePageMode(true);
        setInShowAllMode(false);
    
      }

      }, [inShowAllMode,allData,paginatedData,CostDetailData, size, page]);

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


  //   	const handleGetPassengerLedgerBillDetails = async (newPage) => {
   

  //   try {
  //     const formValues = getValues();
  //     const page = newPage || 1;
  //     setPage(page);

  //     const response = await refetchBillDetails({ ...formValues, page, size }); 

  //     console.log('response121212121', response);

  //     if (response?.data) {
  //       unstable_batchedUpdates(() => {
  //         const passengerLedgersData = response.data?.sales || [];
  //         setModifiedPassengerLedgerBillDetailData(passengerLedgersData);
  //         setInShowAllMode(false);
  //         setTotalPages(response.data?.total_pages);
  //         setTotalElements(response.data?.total_elements);
  //         setInSiglePageMode(true);
  //         setInShowAllMode(false);
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching account_logs:', error);
  //   }
  // };



  const handleGetPassengerLedgerBillDetails = async (newPage = 1) => {
    try {
      // Get form values using getValues() method (assuming this is from react-hook-form)
      const formValues = getValues();

      console.log('formValues', formValues);
      
      // Set the current page, defaulting to 1 if newPage is not provided
      setPage(newPage);
  
      // Perform the refetch with the current form values and pagination
      const response = await refetchBillDetails({ 
        ...formValues, // Spread form values like date_after, date_before, passenger, etc.
        page: newPage, // Send the current page
        size,          // Ensure you pass the `size` for pagination
      });
  
      // Log the response for debugging purposes
      console.log('API Response:', response);
  
      // Check if response contains valid data
      if (response?.data) {
        unstable_batchedUpdates(() => {
          const passengerLedgersData = response.data?.sales || []; // Extract sales data
          setModifiedPassengerLedgerBillDetailData(passengerLedgersData); // Update state with sales data
          setTotalPages(response.data?.total_pages);    // Set total pages for pagination
          setTotalElements(response.data?.total_elements); // Set total elements count
          
          // Toggle modes based on the response
          setInShowAllMode(false);
          setInSiglePageMode(true);
        });
      }
    } catch (error) {
      console.error('Error fetching passenger ledger bill details:', error);
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
          handleGetPassengerLedgerBillDetails={handleGetPassengerLedgerBillDetails}
          handleGetPassengerLedgerCostDetails={handleGetPassengerLedgerCostDetails}
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

{/* Passenger Bill Details Report  */}

<table id="table-to-xls" className="w-full" style={{ minHeight: '270px' }}>
				<div id="downloadPage">
					{/* each single page (table) */}

					{modifiedPassengerLedgerBillDetailData.map((sales, index) => (
						<SinglePage2
							classes={classes}
							
							reportTitle="Bill Details"
							tableColumns={billDetailstableColumns}
							dispatchTableColumns={dispatchBillDetailsTableColumns}
              data={{
                ...sales,
                data: [
                  ...sales?.data,
                  {
                    credit_amount: totalCdAmount?.toFixed(2)|| '0.00', 
                    debit_amount: totalDbAmount?.toFixed(2)|| '0.00',
                    
                    balance:totalBAlance,
                    details: 'Total Balance',

                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 }
                  },
                ],
              }}
							serialNumber={sales.page * sales.size - sales.size + 1}
               
							setPage={setPage}
							 inSiglePageMode={inSiglePageMode}
							
							// setSortBySubKey={setSortBySubKey}
						/>
					))}
				</div>
			</table>



      {/* Passenger Cost Details Report  */}

			<table id="table-to-xls" className="w-full" style={{ minHeight: '270px' }}>
				<div id="downloadPage">
					{/* each single page (table) */}

					{modifiedPassengerLedgerCostDetailData.map(cost => (
						<SinglePage2
							classes={classes}
							reportTitle="Cost Details"
							tableColumns={costDetailstableColumns}
							dispatchTableColumns={dispatchCostDetailsTableColumns}
						  data={{
                ...cost,
                data: [
                  ...cost?.data,
                  {
                    credit_amount: totalCdAmount ?.toFixed(2)|| '0.00'||'',
												details: 'Total Balance',
												hideSerialNo: true,
												rowStyle: { fontWeight: 600 }
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


    </div>
  );
}

export default PassengerLedgerReportsTable;
