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
  useGetCircularAllReportsQuery,
  useGetCircularReportsQuery,
} from '../CircularReportsApi';
import CircularFilterMenu from './CircularFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'Sl_No', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Country', name: 'country', subName: 'name', show: true },
  {
    id: 3,
    label: 'Visa Agent',
    name: 'visa_agent',
    subName: 'first_name',
    show: true,
  },
  { id: 4, label: 'Company Name', name: 'company_name', show: true },
  {
    id: 5,
    label: 'Profession',
    name: 'profession',
    subName: 'name',
    show: true,
  },
  { id: 6, label: 'Quantity', name: 'quantity', show: true },
  { id: 7, label: 'Salary', name: 'salary', show: true },
  {
    id: 8,
    label: 'Office Rate',
    name: 'office_rate',
    show: true,
    type: 'date',
  },
  { id: 9, label: 'Status', name: 'status', show: true },
];

function CircularReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedCircularData, setModifiedCircularData] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetCircularReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        visa_agent: filterData.visa_agent || '',
        country: filterData.country || '',
        profession: filterData.profession || '',
        company_name: filterData.company_name || '',
        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const { data: allData, refetch: refetchAllCircularReports } =
    useGetCircularAllReportsQuery(
      {
        date_after: filterData.date_after || '',
        date_before: filterData.date_before || '',
        visa_agent: filterData.visa_agent || '',
        country: filterData.country || '',
        profession: filterData.profession || '',
        company_name: filterData.company_name || '',
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedCircularData(allData.demand_list || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.demand_list,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedCircularData(paginatedData.demand_list || []);
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

  const handleGetCirculars = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllCirculars = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all circulars:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY')
      : null,
    Visa_Agent: getValues()?.visa_agentName || null,
    Country: getValues()?.countryName || null,
    Profession: getValues()?.professionName || null,
    Company_Name: getValues()?.company_name || null,
  };

  // console.log('filteredData', filteredData);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <CircularFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetCirculars={handleGetCirculars}
          handleGetAllCirculars={handleGetAllCirculars}
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
        onFirstPage={() => handleGetCirculars(1)}
        onPreviousPage={() => handleGetCirculars(page - 1)}
        onNextPage={() => handleGetCirculars(page + 1)}
        onLastPage={() => handleGetCirculars(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetCirculars}
        handleGetAllData={handleGetAllCirculars}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='CircularReport'
      />

      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedCircularData.map((circular, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Circular Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={{
                ...circular,
                data: [
                  ...circular.data,
                  {
                    credit_amount: totalAmount,
                    getterMethod: () => 'Total Amount',
                    hideSerialNo: true,
                    rowStyle: { fontWeight: 600 },
                  },
                ],
              }}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * circular.data.length + 1
                  : circular.page * circular.size - circular.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CircularReportsTable;
