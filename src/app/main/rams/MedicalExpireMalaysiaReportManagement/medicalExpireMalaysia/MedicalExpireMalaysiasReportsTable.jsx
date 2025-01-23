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
  useGetMedicalExpireMalaysiaAllReportsQuery,
  useGetMedicalExpireMalaysiaReportsQuery,
} from '../MedicalExpireMalaysiaReportsApi';

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
  { id: 4, label: 'Agent', name: 'agent', subName: 'username', show: true },
  { id: 5, label: 'M.Serial No', name: 'medical_serial_no', show: true },
  { id: 6, label: 'M.Result', name: 'medical_result', show: true },
  { id: 7, label: 'M.Card', name: 'medical_card', show: true },
  { id: 8, label: 'M.Ent Date', name: 'created_at', show: true, type: 'date' },
  {
    id: 9,
    label: 'M.Exam Date',
    name: 'medical_exam_date',
    show: true,
    type: 'date',
  },
  {
    id: 10,
    label: 'M.Rpt Date',
    name: 'medical_report_date',
    show: true,
    type: 'date',
  },
  {
    id: 11,
    label: 'M.Issue Date',
    name: 'medical_issue_date',
    show: true,
    type: 'date',
  },
  {
    id: 12,
    label: 'M.Exp Date',
    name: 'medical_expiry_date',
    show: true,
    type: 'date',
  },
  {
    id: 13,
    label: 'M.Center',
    name: 'medical_center',
    subName: 'name',
    show: true,
  },
];
function MedicalExpireMalaysiaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [
    modifiedMedicalExpireMalaysiaData,
    setModifiedMedicalExpireMalaysiaData,
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
  const routeParams = useParams();

  const { noOfDays } = routeParams;
  const filterData = watch();

  const { data: paginatedData } = useGetMedicalExpireMalaysiaReportsQuery({
    no_of_days: noOfDays || '',
    country: 'malaysia',
    page,
    size,
  });

  const { data: allData } = useGetMedicalExpireMalaysiaAllReportsQuery({
    no_of_days: noOfDays || '',
    country: 'malaysia',
    page,
    size,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedMedicalExpireMalaysiaData(allData.medicals || []);
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
      setModifiedMedicalExpireMalaysiaData(paginatedData?.medicals || []);

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

  const handleGetMedicalExpireMalaysias = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllMedicalExpireMalaysias = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all medicalExpireMalaysias:', error);
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
        onFirstPage={() => handleGetMedicalExpireMalaysias(1)}
        onPreviousPage={() => handleGetMedicalExpireMalaysias(page - 1)}
        onNextPage={() => handleGetMedicalExpireMalaysias(page + 1)}
        onLastPage={() => handleGetMedicalExpireMalaysias(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetMedicalExpireMalaysias}
        handleGetAllData={handleGetAllMedicalExpireMalaysias}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='MedicalExpireMalaysiaReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedMedicalExpireMalaysiaData.map(
            (medicalExpireMalaysia, index) => (
              <SinglePage
                key={index}
                classes={classes}
                reportTitle='Medical will Expired'
                filteredData={filteredData}
                tableColumns={tableColumns}
                dispatchTableColumns={dispatchTableColumns}
                data={medicalExpireMalaysia}
                totalColumn={initialTableColumnsState?.length}
                inSiglePageMode={inSiglePageMode}
                serialNumber={
                  pagination
                    ? page * size -
                      size +
                      index * medicalExpireMalaysia.data.length +
                      1
                    : medicalExpireMalaysia.page * medicalExpireMalaysia.size -
                      medicalExpireMalaysia.size +
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

export default MedicalExpireMalaysiaReportsTable;
