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
  useGetCircularAllReportsQuery,
  useGetCircularReportsQuery,
} from '../CircularReportsApi';
import CircularFilterMenu from './CircularFilterMenu';
import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

function CircularReportsTable(props) {
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
  const { watch, getValues } = methods;

  const [
    modifiedCircularData,
    setModifiedCircularData,
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

  const { data: paginatedData } = useGetCircularReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      country: filterData.country || '',

      visa_agent: filterData.visa_agent || '',
      profession: filterData.profession || '',
      company_name: filterData.company_name || '',

      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetCircularAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      country: filterData.country || '',

      visa_agent: filterData.visa_agent || '',
      profession: filterData.profession || '',
      company_name: filterData.company_name || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedCircularData(allData.demand_list || []);
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

  const handleGetCirculars = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching circulars:', error);
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
              key={circular.id || index}
              classes={classes}
              reportTitle='Passenger Delivery Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={circular}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={
                pagination
                  ? page * size - size + 1
                  : circular.page * circular.size - circular.size + 1
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

export default CircularReportsTable;
