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
  useGetMedicalFitAllReportsQuery,
  useGetMedicalFitReportsQuery,
} from '../MedicalUnfitReportsApi';

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
    label: 'Passenger Passport No',
    getterMethod: (data) => `${data.passenger?.passport_no || ''}`,
    show: true,
  },
  {
    id: 4,
    label: 'Agent',
    getterMethod: (data) => `${data.agent?.first_name || ''} `,
    show: true,
  },
  { id: 5, label: 'Medical Status', name: 'medical_result', show: true },
  {
    id: 5,
    label: 'Current Status',
    getterMethod: (data) => `${data.passenger?.current_status?.name || ''}`,
    show: true,
  },
];

function MedicalFitReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedMedicalFitData, setModifiedMedicalFitData] = useReportData();

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
  const routeParams = useParams();
  console.log('routeParams', routeParams);

  const filterData = watch();

  const { data: paginatedData } = useGetMedicalFitReportsQuery({
    skip: inShowAllMode,
  });

  const { data: allData } = useGetMedicalFitAllReportsQuery({
    skip: !inShowAllMode,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedMedicalFitData(allData.fits || []);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.fits,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedMedicalFitData(paginatedData?.fits || []);

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

  const handleGetMedicalUnfit = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllMedicalUnfit = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all medicalUnfit:', error);
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
        onFirstPage={() => handleGetMedicalUnfit(1)}
        onPreviousPage={() => handleGetMedicalUnfit(page - 1)}
        onNextPage={() => handleGetMedicalUnfit(page + 1)}
        onLastPage={() => handleGetMedicalUnfit(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetMedicalUnfit}
        handleGetAllData={handleGetAllMedicalUnfit}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='MedicalFitReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedMedicalFitData.map((medicalFit, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle='Medical Fit Report'
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={medicalFit}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * medicalFit.data.length + 1
                  : medicalFit.page * medicalFit.size - medicalFit.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalFitReportsTable;
