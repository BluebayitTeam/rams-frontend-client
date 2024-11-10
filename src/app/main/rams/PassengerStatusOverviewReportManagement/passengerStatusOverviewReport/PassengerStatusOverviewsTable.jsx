import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetPassengerStatusOverviewAllReportsQuery,
  useGetPassengerStatusOverviewReportsQuery,
} from '../PassengerStatusOverviewsApi';
import PassengerStatusOverviewFilterMenu from './PassengerStatusOverviewFilterMenu';
const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Agent ID',
    name: 'agent',
    subName: 'agent_code',
    show: true,
  },
  {
    id: 3,
    label: 'Agent Name',
    getterMethod: (data) =>
      `${data.agent?.first_name || ''} ${data.agent?.last_name || ''} `,
    show: true,
  },
  { id: 4, label: 'Total PP', name: 'total_passengers', show: true },
  { id: 6, label: 'ST.BOX', name: 'ST.BOX', show: true },
  { id: 7, label: 'Medical', name: 'Medical', show: true },
  { id: 8, label: 'M.Fit', name: 'M.Fit', show: true },
  { id: 9, label: 'M.Unfit', name: 'M.Unfit', show: true },
  { id: 10, label: 'Re Medical', name: 'Re Medical', show: true },
  { id: 11, label: 'PP Return', name: 'PP Return', show: true },
  { id: 12, label: 'Sending', name: 'Sending', show: true },
  { id: 13, label: 'Online', name: 'Online', show: true },
  { id: 14, label: 'Calling', name: 'Calling', show: true },
  { id: 15, label: 'E Visa', name: 'E Visa', show: true },
  { id: 16, label: 'Ready For Flight', name: 'Ready For Flight', show: true },
  { id: 17, label: 'Flight Done', name: 'Flight Done', show: true },
  { id: 18, label: 'Balance', name: 'total_amount', show: true },
];

function PassengerStatusOverviewsTable(props) {
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
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetPassengerStatusOverviewReportsQuery(
    {
      agent: filterData.agent || '',
      country: filterData.country || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetPassengerStatusOverviewAllReportsQuery(
    {
      agent: filterData.agent || '',
      country: filterData.country || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPassengerStatusOverviewData(
        allData.passenger_status_overviews || []
      );
      setTotalAmount(allData.total_amount);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.passenger_status_overviews,
        size,
        page
      );

      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassengerStatusOverviewData(
        paginatedData.passenger_status_overviews || []
      );

      setTotalAmount(paginatedData.total_amount);

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
      console.error('Error fetching all passengerStatusOverviews:', error);
    }
  }, []);

  const filteredData = {
    Agent: getValues()?.agentName || null,
    Gender: getValues()?.genderName || null,
  };

  return (
    <div className={classes.headContainer}>
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
        filename='PassengerStatusOverview'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedPassengerStatusOverviewData.map(
            (passengerStatusOverview, index) => (
              <SinglePage
                key={index}
                classes={classes}
                reportTitle='Passenger Status Overview'
                filteredData={filteredData}
                tableColumns={tableColumns}
                dispatchTableColumns={dispatchTableColumns}
                data={passengerStatusOverview}
                totalColumn={initialTableColumnsState?.length}
                inSiglePageMode={inSiglePageMode}
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

export default PassengerStatusOverviewsTable;
