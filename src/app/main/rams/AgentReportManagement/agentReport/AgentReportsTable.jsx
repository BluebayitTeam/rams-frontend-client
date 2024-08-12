/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { makeStyles } from '@mui/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReducer, useRef, useState } from 'react';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import AgentFilterMenu from './AgentFilterMenu';

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
	const [modifiedAgentData, setModifiedAgentData, setSortBy] = useReportData();
	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const componentRef = useRef();

	const handlePdfDownload = () => {
		// Your logic to handle PDF download
	};

	const handleExelDownload = () => {
		// Your logic to handle Excel download
	};

	const handlePrint = () => {
		// Your logic to handle print
	};

	const handleGetAgents = () => {
		// Your logic to get agents for the current page
	};

	const handleGetAllAgents = () => {
		// Your logic to get all agents
	};
	return (
		<div className={classes.headContainer}>
			{/* Filter */}
			<FormProvider {...methods}>
				<AgentFilterMenu
					inShowAllMode={inShowAllMode}
					// handleGetAgents={handleGetAgents}
					// handleGetAllAgents={handleGetAllAgents}
				/>
			</FormProvider>
			<ReportPaginationAndDownload
				page={page}
				size={size}
				totalPages={totalPages}
				totalElements={totalElements}
				onFirstPage={() => handleGetAgents(1)}
				onPreviousPage={() => handleGetAgents(page - 1)}
				onNextPage={() => handleGetAgents(page + 1)}
				onLastPage={() => handleGetAgents(totalPages)}
				handlePdfDownload={handlePdfDownload}
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
				<div
					ref={componentRef}
					id="downloadPage"
				>
					{/* each single page (table) */}
					{modifiedAgentData.map((agent) => (
						<SinglePage
							classes={classes}
							//   generalData={generalData}
							reportTitle="Agent Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={agent}
							serialNumber={agent.page * agent.size - agent.size + 1}
							setPage={setPage}
							//   inSiglePageMode={inSiglePageMode}
							setSortBy={setSortBy}
						/>
					))}
				</div>
			</table>
		</div>
	);
}

export default AgentReportsTable;
