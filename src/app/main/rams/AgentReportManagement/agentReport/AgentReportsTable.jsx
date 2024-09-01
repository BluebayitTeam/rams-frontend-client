/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { makeStyles } from '@mui/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReducer, useRef, useState } from 'react';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import { unstable_batchedUpdates } from 'react-dom';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { useReactToPrint } from 'react-to-print';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import AgentFilterMenu from './AgentFilterMenu';
import { selectFilteredAgentReports, useGetAgentAllReportsQuery, useGetAgentReportsQuery } from '../AgentReportsApi';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Name', name: 'username', show: true },
	{ id: 3, label: 'Group', name: 'group', subName: 'name', show: true },
	{ id: 4, label: 'District', name: 'city', subName: 'name', show: true },
	{ id: 5, label: 'Mobile', name: 'primary_phone', show: true },
	{ id: 6, label: 'Email', name: 'email', show: true }
];

function AgentReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema) // Use zodResolver for form validation
	});
	const dispatch = useDispatch();

	const { control, getValues } = methods;

	const [modifiedAgentData, setModifiedAgentData] = useReportData();

	console.log('modifiedAgentData', modifiedAgentData);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);

	console.log('inShowAllMode', inShowAllMode);

	const [inSiglePageMode, setInSiglePageMode] = useState(false);

	const componentRef = useRef(null);

	// Prevent automatic fetching by setting enabled: false
	const { data, isLoading, refetch } = useGetAgentReportsQuery({ ...getValues(), page, size }, { enabled: false });

	const { refetch: refetchAll } = useGetAgentAllReportsQuery({ ...getValues() }, { enabled: false });
	const totalData = useSelector(selectFilteredAgentReports(data));

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const handleGetAgents = async (newPage, callBack) => {
		debugger;
		try {
			const formValues = getValues();
			const page = newPage || 1;
			setPage(page);

			const response = await refetch({ ...formValues, page, size }); // Manually trigger the query

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}

					const agentsData = response.data.agents || [];
					setModifiedAgentData(agentsData);
					setInShowAllMode(false);

					// const { totalPages, totalElements } = getPaginationData(agentsData, size, page);
					setTotalPages(response.data?.total_pages);
					setTotalElements(response.data?.total_elements);
				});
			}
		} catch (error) {
			console.error('Error fetching agents:', error);
		}
	};

	const handleGetAllAgents = async (callBack, callBackAfterStateUpdated) => {
		try {
			const formValues = getValues();

			const response = await refetchAll({ ...formValues }); // Manually trigger the query

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}

					setModifiedAgentData(response.data.agents || []);
					setInShowAllMode(true);

					const { totalPages, totalElements } = getPaginationData(response.data.agents, size, page);
					setTotalPages(totalPages);
					setTotalElements(totalElements);
				});

				if (callBackAfterStateUpdated) {
					callBackAfterStateUpdated(response.data);
				}
			}
		} catch (error) {
			console.error('Error fetching all agents:', error);
		}
	};

	return (
		<div className={classes.headContainer}>
			{/* Filter */}
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
			/>

			<table
				id="table-to-xls"
				className="w-full"
				style={{ minHeight: '270px' }}
			>
				<tbody
					ref={componentRef}
					id="downloadPage"
				>
					{/* each single page (table) */}
					{modifiedAgentData.map((agent, index) => (
						<SinglePage
							key={index}
							classes={classes}
							reportTitle="Agent Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={agent}
							serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
							setPage={setPage}
							// setSortBy={setSortBy}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AgentReportsTable;
