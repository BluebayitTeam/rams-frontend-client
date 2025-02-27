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
  useGetPassportExpireAllReportsQuery,
  useGetPassportExpireReportsQuery,
} from '../PassportExpireReportsApi';

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'P.No', name: 'passenger_id', show: true },
  { id: 3, label: 'Passenger Name', name: 'passenger_name', show: true },
  {
    id: 4,
    label: 'Date of Birth',
    name: 'date_of_birth',
    show: true,
    type: 'date',
  },

  { id: 5, label: 'PP No', name: 'passport_no', show: true },
  {
    id: 6,
    label: 'PP Expiry Date',
    name: 'passport_expiry_date',
    show: true,
    type: 'date',
  },

  {
    id: 7,
    label: 'Ref',
    getterMethod: (data) => `${data.agent?.first_name || ''} `,
    show: true,
  },
  {
    id: 8,
    label: 'Profession',
    name: 'profession',
    subName: 'name',
    show: true,
  },

  {
    id: 9,
    label: 'Country',
    name: 'target_country',
    subName: 'name',
    show: true,
  },
  {
    id: 10,
    label: 'Visa No',
    name: 'visa_entry',
    subName: 'visa_number',
    show: true,
  },

  {
    id: 11,
    label: 'Current Status',
    getterMethod: (data) => `${data.passenger?.current_status?.name || ''}`,
    show: true,
  },
];

function PassportExpireReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedPassportExpireData, setModifiedPassportExpireData] =
    useReportData();

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

  const { data: paginatedData } = useGetPassportExpireReportsQuery({
    no_of_days: noOfDays || '',
    page,
    size,
    skip: inShowAllMode,
  });

  console.log('paginatedData', paginatedData);

  const { data: allData } = useGetPassportExpireAllReportsQuery({
    no_of_days: noOfDays || '',
    page,
    size,
    skip: !inShowAllMode,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPassportExpireData(allData.passengers || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.passengers,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassportExpireData(paginatedData?.passengers || []);

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

  const handleGetPassportExpires = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllPassportExpires = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all passportExpires:', error);
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
        onFirstPage={() => handleGetPassportExpires(1)}
        onPreviousPage={() => handleGetPassportExpires(page - 1)}
        onNextPage={() => handleGetPassportExpires(page + 1)}
        onLastPage={() => handleGetPassportExpires(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetPassportExpires}
        handleGetAllData={handleGetAllPassportExpires}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='PassportExpireReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedPassportExpireData.map((passportExpire, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Passport Expire Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={passportExpire}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * passportExpire.data.length + 1
                  : passportExpire.page * passportExpire.size -
                    passportExpire.size +
                    1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PassportExpireReportsTable;
