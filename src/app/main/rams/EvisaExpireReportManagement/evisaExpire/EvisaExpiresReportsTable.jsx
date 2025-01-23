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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetEvisaExpireAllReportsQuery,
  useGetEvisaExpireReportsQuery,
} from '../EvisaExpireReportsApi';

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Passenger Name',
    name: 'passenger',
    subName: 'passenger_name',
    show: true,
  },
  {
    id: 3,
    label: 'PP.No',
    name: 'passenger',
    subName: 'passport_no',
    show: true,
  },
  {
    id: 4,
    label: 'country',

    getterMethod: (data) =>
      // console.log('sdfdskfhksdhfd', ),
      `${data?.passenger?.target_country?.name || ''}`,

    show: true,
  },
  {
    id: 5,
    label: 'Profession',
    getterMethod: (data) => console.log('sdfdskfhksdhfd', data),
    // `${data?.passenger?.target_country?.name || ''}`,

    show: true,
  },
  {
    id: 6,
    label: 'Submit Date',
    name: 'submit_date',
    show: true,
    type: 'date',
  },
  { id: 7, label: 'Profession Eng', name: 'profession_english', show: true },
  { id: 8, label: 'Profession Arb', name: 'profession_arabic', show: true },
  { id: 9, label: 'Salary', name: 'salary', show: true },
  { id: 10, label: 'Stamping Status', name: 'stamping_status', show: true },
  { id: 11, label: 'V.Ent Date', name: 'created_at', show: true, type: 'date' },
  {
    id: 12,
    label: 'Stp Date',
    name: 'stamping_date',
    show: true,
    type: 'date',
  },
  {
    id: 13,
    label: 'V.Exp Date',
    name: 'visa_expiry_date',
    show: true,
    type: 'date',
  },
  {
    id: 14,
    label: 'Delivery Date',
    name: 'delivery_date',
    show: true,
    type: 'date',
  },
  {
    id: 15,
    label: 'recruiting_agency',
    name: 'recruiting_agency',
    subName: 'name',
    show: true,
  },
];

function EvisaExpireReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedEvisaExpireData, setModifiedEvisaExpireData] = useReportData();

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
  const routeParams = useParams();

  const { noOfDays } = routeParams;
  const filterData = watch();

  const { data: paginatedData } = useGetEvisaExpireReportsQuery({
    no_of_days: noOfDays || '',
    page,
    size,
    skip: inShowAllMode,
  });

  const { data: allData } = useGetEvisaExpireAllReportsQuery({
    no_of_days: noOfDays || '',
    page,
    size,
    skip: !inShowAllMode,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedEvisaExpireData(allData.e_visa || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.e_visa,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedEvisaExpireData(paginatedData?.e_visa || []);

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

  const handleGetEvisaExpires = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllEvisaExpires = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all evisaExpires:', error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.issue_date_before
      ? moment(new Date(getValues()?.issue_date_before)).format('DD-MM-YYYY')
      : null,
    Date_From: getValues()?.issue_date_after
      ? moment(new Date(getValues()?.issue_date_after)).format('DD-MM-YYYY')
      : null,
    Agent: getValues()?.ticket_agencyName || null,
  };

  return (
    <div className={classes.headContainer}>
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
        onFirstPage={() => handleGetEvisaExpires(1)}
        onPreviousPage={() => handleGetEvisaExpires(page - 1)}
        onNextPage={() => handleGetEvisaExpires(page + 1)}
        onLastPage={() => handleGetEvisaExpires(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetEvisaExpires}
        handleGetAllData={handleGetAllEvisaExpires}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='EvisaExpireReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedEvisaExpireData.map((evisaExpire, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='E-Visa Expires Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={evisaExpire}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * evisaExpire.data.length + 1
                  : evisaExpire.page * evisaExpire.size - evisaExpire.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EvisaExpireReportsTable;
