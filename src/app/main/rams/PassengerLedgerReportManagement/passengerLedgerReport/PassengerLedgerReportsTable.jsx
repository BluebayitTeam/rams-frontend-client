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
  { id: 2, label: 'Name', name: 'username', show: true },
  { id: 3, label: 'Group', name: 'group', subName: 'name', show: true },
  { id: 4, label: 'District', name: 'city', subName: 'name', show: true },
  { id: 5, label: 'Mobile', name: 'primary_phone', show: true },
  { id: 6, label: 'Email', name: 'email', show: true },
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
      group: watch('group') || '',
      district: watch('district') || '',
      date_after: watch('date_after') || '',
      date_before: watch('date_before') || '',
      username: watch('username') || '',
      primary_phone: watch('primary_phone') || '',
      passengerLedger_code: watch('passengerLedger_code') || '',
      page,
      size,
    },
    { enabled: false }
  );
  const { refetch: refetchAllPassengerLedgerReports } =
    inShowAllMode &&
    useGetPassengerLedgerAllReportsQuery(
      {
        group: watch('group') || '',
        district: watch('district') || '',
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
        username: watch('username') || '',
        primary_phone: watch('primary_phone') || '',
        passengerLedger_code: watch('passengerLedger_code') || '',
      },
      { enabled: false }
    );

  const totalData = useSelector(selectFilteredPassengerLedgerReports);

  useEffect(() => {
    if (totalData) {
      setModifiedPassengerLedgerData(totalData?.passengerLedgers);
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
          const passengerLedgersData = response.data.passengerLedgers || [];
          setModifiedPassengerLedgerData(passengerLedgersData);
          setInShowAllMode(false);
          setTotalPages(response.data?.total_pages);
          setTotalElements(response.data?.total_elements);
        });
      }
    } catch (error) {
      console.error('Error fetching passengerLedgers:', error);
    }
  };

	const handleGetAllPassengerLedgers = async () => {
	   setInShowAllMode(true);
    try {
      const formValues = getValues();

      const response = await refetchAllPassengerLedgerReports({ ...formValues }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          setModifiedPassengerLedgerData(response.data.passengerLedgers || []);
          setInShowAllMode(true);
          const { totalPages, totalElements } = getPaginationData(
            response.data.passengerLedgers,
            size,
            page
          );
          setTotalPages(totalPages);
          setTotalElements(totalElements);
        });
      }
    } catch (error) {
      console.error('Error fetching all passengerLedgers:', error);
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
