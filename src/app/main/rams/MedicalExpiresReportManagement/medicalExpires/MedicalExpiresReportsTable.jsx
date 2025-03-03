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

import { useParams } from 'react-router';
import {
  useGetMedicalExpiresAllReportsQuery,
  useGetMedicalExpiresReportsQuery,
} from '../MedicalExpiresReportsApi';

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
    getterMethod: (data) => `${data?.passenger?.passenger_name || ''}`,
    show: true,
  },
  {
    id: 3,
    label: 'Medical Card',
    getterMethod: (data) => `${data?.medical_card}`,
    show: true,
  },
  {
    id: 4,
    label: 'Medical Center',
    getterMethod: (data) => `${data?.medical_center?.name}`,
    show: true,
  },
  {
    id: 5,
    label: 'Medical Issue Date',
    name: 'medical_issue_date',
    show: true,
    type: 'date',
  },
  {
    id: 6,
    label: 'Medical Expiry Date',
    name: 'medical_expiry_date',
    show: true,
    type: 'date',
  },

  { id: 7, label: 'Medical Result', name: 'medical_result', show: true },
];

function MedicalExpiresReportsTable(props) {
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

  const filterData = watch();

  const { data: paginatedData } = useGetMedicalExpiresReportsQuery({
    page,
    size,
  });

  console.log('paginatedDataTest112', paginatedData);

  const { data: allData } = useGetMedicalExpiresAllReportsQuery({
    page,
    size,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedPassportExpireData(allData.medicals || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.medicals,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedPassportExpireData(paginatedData?.medicals || []);

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

  const handleGetMedicalExpires = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllMedicalExpires = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all medicalExpires:', error);
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
        onFirstPage={() => handleGetMedicalExpires(1)}
        onPreviousPage={() => handleGetMedicalExpires(page - 1)}
        onNextPage={() => handleGetMedicalExpires(page + 1)}
        onLastPage={() => handleGetMedicalExpires(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetMedicalExpires}
        handleGetAllData={handleGetAllMedicalExpires}
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
              reportTitle='Medical Expire Report'
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

export default MedicalExpiresReportsTable;
