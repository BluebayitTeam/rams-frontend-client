/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';

import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageWithExtraHeading from 'src/app/@components/ReportComponents/SiglePageWithExtraHeading';
import {
  useGetPassengerStatusOverviewAllReportsQuery,
  useGetPassengerStatusOverviewReportsQuery,
} from '../passengerStatusOverviewsApi';
import PassengerStatusOverviewFilterMenu from './PassengerStatusOverviewFilterMenu';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Job Id', name: 'reference_no', show: true },
  {
    id: 3,
    label: 'Passenger Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },
  {
    id: 4,
    label: 'Passport No',
    name: 'passenger',
    subName: 'passport_no',
    show: true,
  },
  {
    id: 5,
    label: 'Mobile No',
    name: 'passenger',
    subName: 'contact_no',
    show: true,
  },
  {
    id: 6,
    label: 'District',
    getterMethod: (data) => `${data.passenger?.district?.name || ''}`,
    show: true,
  },

  {
    id: 7,
    label: 'Debit',
    name: 'debit',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
  {
    id: 8,
    label: 'Credit',
    name: 'credit',
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
  {
    id: 10,
    label: 'Office Cost',
    name: 'office_cost',
    show: true,
    style: { justifyContent: 'flex-end', marginRight: '5px' },
    headStyle: { textAlign: 'right' },
  },
  {
    id: 11,
    label: 'Current Status',
    getterMethod: (data) => `${data.passenger?.current_status?.name || ''}`,
    show: true,
  },
];

function PassengerStatusOverviewReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const { watch, getValues } = methods;
  const [
    modifiedPassengerStatusOverviewData,
    setModifiedPassengerStatusOverviewData,
  ] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalCdAmount, setTotalCdAmount] = useState(0);
  const [totalDbAmount, setTotalDbAmount] = useState(0);
  const [totalBAlance, setTotalBAlance] = useState(0);
  const [totalOfficeAmount, setTotalOfficeAmount] = useState(0);

  const [pagination, setPagination] = useState(false);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchPassengerStatusOverview } =
    useGetPassengerStatusOverviewReportsQuery(
      {
        agent: filterData.agent || '',
        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const { data: allData, refetch: refetchAllPassengerStatusOverview } =
    useGetPassengerStatusOverviewAllReportsQuery(
      {
        agent: filterData.agent || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPassengerStatusOverviewData(
        allData.passenger_status_overviews || []
      );
      setTotalCdAmount(allData.total_credit);
      setTotalDbAmount(allData.total_debit);
      setTotalBAlance(allData.total_balance);
      setTotalOfficeAmount('');

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.passenger_status_overviews,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassengerStatusOverviewData(
        paginatedData.passenger_status_overviews || []
      );
      setTotalCdAmount(paginatedData.total_credit);
      setTotalDbAmount(paginatedData.total_debit);
      setTotalBAlance(paginatedData.total_balance);
      setTotalOfficeAmount('');

      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [inShowAllMode, allData, paginatedData, size, page]);

  const handleGetPassengerStatusOverviews = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllPassengerStatusOverviews = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all foreignLedgers:', error);
    }
  }, []);

  // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const filteredData = {
    Agent: getValues()?.agentName || null,
    Gender: getValues()?.genderName || null,
  };

  return (
    <div className={classes.headContainer}>
      {/* Filter */}
      <FormProvider {...methods}>
        <PassengerStatusOverviewFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerStatusOverviews={handleGetPassengerStatusOverviews}
          handleGetAllPassengerStatusOverviews={
            handleGetAllPassengerStatusOverviews
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
        onFirstPage={() => handleGetPassengerStatusOverviews(1)}
        onPreviousPage={() => handleGetPassengerStatusOverviews(page - 1)}
        onNextPage={() => handleGetPassengerStatusOverviews(page + 1)}
        onLastPage={() => handleGetPassengerStatusOverviews(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPassengerStatusOverviews}
        handleGetAllData={handleGetAllPassengerStatusOverviews}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AgentReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {/* each single page (table) */}
          {modifiedPassengerStatusOverviewData.map(
            (passengerStatusOverview, index) => (
              <SinglePage
                key={index}
                classes={classes}
                reportTitle='Passenger Status Overview'
                filteredData={filteredData}
                tableColumns={tableColumns}
                dispatchTableColumns={dispatchTableColumns}
                inSiglePageMode={inSiglePageMode}
                data={{
                  ...passengerStatusOverview,
                  data: [
                    ...passengerStatusOverview.data,
                    {
                      credit: totalCdAmount,
                      debit: totalDbAmount,
                      passenger: 'Total Balance',
                      details: 'Total Balance',
                      balance: totalBAlance,
                      office_cost: totalOfficeAmount,
                      hideSerialNo: true,
                      rowStyle: { fontWeight: 600 },
                    },
                  ],
                }}
                totalColumn={initialTableColumnsState?.length}
                agentName={agentName}
                district={district}
                phone={phone}
                serialNumber={
                  pagination
                    ? page * size -
                      size +
                      index * passengerStatusOverview.data.length +
                      1
                    : passengerStatusOverview.page *
                        passengerStatusOverview.size -
                      passengerStatusOverview.size +
                      1
                }
                setPage={setPage}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PassengerStatusOverviewReportsTable;
