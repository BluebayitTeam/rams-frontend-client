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
import { useGetImmigrationClearanceMalaysiaReportsQuery } from '../ImmigrationClearanceMalaysiaReportsApi';

import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: 'Date',
    getterMethod: (data) => `${moment(data?.date).format('YYYY-MM-DD') || ''} `,
    show: true,
  },
  {
    id: 3,
    label: 'Passenger Name',

    getterMethod: (data) => `${data?.passenger?.passenger_name || ''} `,
    show: true,
  },
  {
    id: 4,
    label: 'Agent',

    getterMethod: (data) => `${data?.passenger?.agent?.first_name || ''} `,
    show: true,
  },
  {
    id: 5,
    label: 'Visa Number',

    getterMethod: (data) =>
      `${data?.passenger?.visa_entry?.visa_number || ''} `,
    show: true,
  },
  {
    id: 6,
    label: 'Passport No',

    getterMethod: (data) => `${data?.passenger?.passport_no || ''} `,
    show: true,
  },
];

function ImmigrationClearanceMalaysiaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [
    modifiedImmigrationClearanceMalaysiaData,
    setModifiedImmigrationClearanceMalaysiaData,
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
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const componentRef = useRef(null);
  const routeParams = useParams();
  const filterData = watch();
  const { data: paginatedData } =
    useGetImmigrationClearanceMalaysiaReportsQuery({
      submitted_for_permission_immigration_clearance: 'done',
    });

  useEffect(() => {
    if (!inShowAllMode && paginatedData) {
      setModifiedImmigrationClearanceMalaysiaData(
        paginatedData?.calling_emb || []
      );

      setTotalAmount(paginatedData.total_amount);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [inShowAllMode, paginatedData, size, page]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetImmigrationClearanceMalaysia = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllImmigrationClearanceMalaysia = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all immigrationclearanceMalaysia:', error);
    }
  }, []);

  const filteredData = {};

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
        onFirstPage={() => handleGetImmigrationClearanceMalaysia(1)}
        onPreviousPage={() => handleGetImmigrationClearanceMalaysia(page - 1)}
        onNextPage={() => handleGetImmigrationClearanceMalaysia(page + 1)}
        onLastPage={() => handleGetImmigrationClearanceMalaysia(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetImmigrationClearanceMalaysia}
        handleGetAllData={handleGetAllImmigrationClearanceMalaysia}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='ImmigrationClearanceMalaysiaReport'
      />
      <table
        id='table-to-xls'
        className='w-full'
        style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedImmigrationClearanceMalaysiaData.map(
            (immigrationclearanceMalaysia, index) => (
              <SinglePage
                key={index}
                classes={classes}
                reportTitle='Total ImmigrationClearance Report'
                filteredData={filteredData}
                tableColumns={tableColumns}
                dispatchTableColumns={dispatchTableColumns}
                data={immigrationclearanceMalaysia}
                totalColumn={initialTableColumnsState?.length}
                inSiglePageMode={inSiglePageMode}
                serialNumber={
                  pagination
                    ? page * size -
                      size +
                      index * immigrationclearanceMalaysia.data.length +
                      1
                    : immigrationclearanceMalaysia.page *
                        immigrationclearanceMalaysia.size -
                      immigrationclearanceMalaysia.size +
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

export default ImmigrationClearanceMalaysiaReportsTable;
