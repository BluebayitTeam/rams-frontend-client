import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredPassengerLedgerReports,
  useGetPassengerLedgerAllReportsQuery,
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
    resolver: zodResolver(schema), // Use zodResolver for form validation
  });
  const dispatch = useDispatch();

  const { control, getValues,watch } = methods;

  const [modifiedPassengerLedgerData, setModifiedPassengerLedgerData] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);

  console.log("inShowAllMode", inShowAllMode)

  const componentRef = useRef(null);

  // Do not fetch data on mount
  const { refetch: refetchPassengerLedgerReports } =!inShowAllMode && useGetPassengerLedgerReportsQuery(
    {
      
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      passenger: watch('passenger') || '',
      account_type: watch('account_type') || '',
    
      page,
      size,
    },
    { enabled: false }
  );
  const { refetch: refetchAllPassengerLedgerReports } =
    inShowAllMode &&
    useGetPassengerLedgerAllReportsQuery(
      {
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        passenger: watch('passenger') || '',
        account_type: watch('account_type') || '',
      },
      { enabled: false }
    );

  const totalData = useSelector(selectFilteredPassengerLedgerReports);

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

      const response = await refetchPassengerLedgerReports({ ...formValues, page, size }); // Manually trigger the query

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
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='PassengerLedger Report'
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={passengerLedger}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PassengerLedgerReportsTable;
