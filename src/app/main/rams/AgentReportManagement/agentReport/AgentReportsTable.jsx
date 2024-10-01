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
// import '../../../../../../src/app/main/rams/Print.css';
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

  const [modifiedAgentData, setModifiedAgentData,setSortBy,setSortBySubKey,dragAndDropRow] = useReportData();
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
      setInSiglePageMode(false);
			setInShowAllMode(true);
      setPagination(false)
      const { totalPages, totalElements } = getPaginationData(
        allData.agents,
        size,
        page
      );
      setPage(page || 1);
			setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
      // console.log('totalPages12121',totalPages,totalElements)

    } else if (!inShowAllMode && paginatedData) {

      setModifiedAgentData(paginatedData.agents || []);
      setPage(paginatedData?.page || 1);
			setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      console.log('totalPages12121',paginatedData?.total_pages,paginatedData?.total_elements)

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

  const handleGetAgents = useCallback(async (newPage) => {
    setModifiedAgentData([]); 
    try {
      const page = newPage || 1;
      setPage(page);
      await refetchAgentReports();
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, [refetchAgentReports]);

  const handleGetAllAgents = useCallback(async () => {
    setModifiedAgentData([]); 
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
              // serialNumber={  agent.page * agent.size - agent.size + 1 }

              serialNumber={
                pagination
                  ? page * size - size + 1
                  : agent.page * agent.size - agent.size + 1
              }


              // index + 1 + (page - 1) * size
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

export default AgentReportsTable;