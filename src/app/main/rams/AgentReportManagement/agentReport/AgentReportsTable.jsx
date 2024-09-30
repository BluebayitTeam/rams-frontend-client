import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  selectFilteredAgentReports,
  useGetAgentAllReportsQuery,
  useGetAgentReportsQuery,
} from '../AgentReportsApi';
import AgentFilterMenu from './AgentFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Name', name: 'username', show: true },
  { id: 3, label: 'Group', name: 'group', subName: 'name', show: true },
  { id: 4, label: 'District', name: 'city', subName: 'name', show: true },
  { id: 5, label: 'Mobile', name: 'primary_phone', show: true },
  { id: 6, label: 'Email', name: 'email', show: true },
];

function AgentReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { control, getValues, watch } = methods;

  const [modifiedAgentData, setModifiedAgentData] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);

  const componentRef = useRef(null);

  const watchedValues = watch();

  const { data: paginatedData, refetch: refetchAgentReports } = useGetAgentReportsQuery(
    {
      group: watchedValues.group || '',
      district: watchedValues.district || '',
      date_after: watchedValues.date_after || '',
      date_before: watchedValues.date_before || '',
      username: watchedValues.username || '',
      primary_phone: watchedValues.primary_phone || '',
      agent_code: watchedValues.agent_code || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  
  const { data: allData, refetch: refetchAllAgentReports } = useGetAgentAllReportsQuery(
    {
      group: watchedValues.group || '',
      district: watchedValues.district || '',
      date_after: watchedValues.date_after || '',
      date_before: watchedValues.date_before || '',
      username: watchedValues.username || '',
      primary_phone: watchedValues.primary_phone || '',
      agent_code: watchedValues.agent_code || '',
    },
    { skip: !inShowAllMode }
  );

  const totalData = useSelector(selectFilteredAgentReports);

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedAgentData(allData.agents || []);
      const { totalPages, totalElements } = getPaginationData(
        allData.agents,
        size,
        page
      );
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedAgentData(paginatedData.agents || []);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
    }
  }, [inShowAllMode, allData, paginatedData, size, page]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetAgents = useCallback(async (newPage) => {
    setInShowAllMode(false);
    setModifiedAgentData([]); // Clear data before fetching new data
    try {
      const page = newPage || 1;
      setPage(page);
      await refetchAgentReports();
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, [refetchAgentReports]);

  const handleGetAllAgents = useCallback(async () => {
    setInShowAllMode(true);
    setModifiedAgentData([]); // Clear data before fetching new data
    try {
      await refetchAllAgentReports();
    } catch (error) {
      console.error('Error fetching all agents:', error);
    }
  }, [refetchAllAgentReports]);

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <AgentFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAgents={handleGetAgents}
          handleGetAllAgents={handleGetAllAgents}
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
        onFirstPage={() => handleGetAgents(1)}
        onPreviousPage={() => handleGetAgents(page - 1)}
        onNextPage={() => handleGetAgents(page + 1)}
        onLastPage={() => handleGetAgents(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAgents}
        handleGetAllData={handleGetAllAgents}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AgentReport'
      />

      <table id='table-to-xls' className='w-full' style={{ minHeight: '270px' }}>
        <tbody ref={componentRef} id='downloadPage'>
          {modifiedAgentData.map((agent, index) => (
            <SinglePage
              key={agent.id || index}
              classes={classes}
              reportTitle='Agent Report'
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={agent}
              totalColumn={initialTableColumnsState?.length}
              serialNumber={index + 1 + (page - 1) * size}
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgentReportsTable;