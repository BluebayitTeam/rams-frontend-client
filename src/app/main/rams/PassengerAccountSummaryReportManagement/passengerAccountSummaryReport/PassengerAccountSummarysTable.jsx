/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';

import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageWithExtraHeading from 'src/app/@components/ReportComponents/SiglePageWithExtraHeading';
import { useGetPassengerAccountSummaryAllReportsQuery, useGetPassengerAccountSummaryReportsQuery } from '../passengerAccountSummarysApi';
import PassengerAccountSummaryFilterMenu from './PassengerAccountSummaryFilterMenu';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Job Id', name: 'reference_no', show: true },
	{ id: 3, label: 'Passenger Name', name: 'passenger', subName: 'passenger_name', show: true },
	{ id: 4, label: 'Passport No', name: 'passenger', subName: 'passport_no', show: true },
	{ id: 5, label: 'Mobile No', name: 'passenger', subName: 'contact_no', show: true },
	{
		id: 6,
		label: 'District',
		getterMethod: data => `${data.passenger?.district?.name || ''}`,
		show: true
	},

	{
		id: 7,
		label: 'Debit',
		name: 'debit',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 8,
		label: 'Credit',
		name: 'credit',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 9,
		label: 'Balance',
		name: 'balance',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 10,
		label: 'Office Cost',
		name: 'office_cost',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 11,
		label: 'Current Status',
		getterMethod: data => `${data.passenger?.current_status?.name || ''}`,
		show: true
	}
];

function PassengerAccountSummaryReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema) 
	});
	const dispatch = useDispatch();
     const {  getValues } = methods;
	const [modifiedPassengerAccountSummaryData, setModifiedPassengerAccountSummaryData] = useReportData();
    const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);
    const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);
    const [inSiglePageMode, setInSiglePageMode] = useState(false);
	const [totalCdAmount, setTotalCdAmount] = useState(0);
    const [totalDbAmount, setTotalDbAmount] = useState(0);
    const [totalBAlance, setTotalBAlance] = useState(0);
	const [pagination, setPagination] = useState(false);

    const componentRef = useRef(null);
	const { watch } = methods;

	const filterData = watch();

	const { data: paginatedData, refetch: refetchPassengerAccountSummary } = useGetPassengerAccountSummaryReportsQuery(
	  {
		agent: filterData.agent || '',
		page,
		size,
	  },
	  { skip: inShowAllMode }
	);

    const { data: allData, refetch: refetchAllPassengerAccountSummary } = useGetPassengerAccountSummaryAllReportsQuery(
		{
			agent: filterData.agent || '',
		
		},
		{ skip: !inShowAllMode }
	  );



	  useEffect(() => {
		if (inShowAllMode && allData) {
		  setModifiedPassengerAccountSummaryData(allData.account_logs || []);
		  setTotalCdAmount(allData.total_credit_amount );
		  setTotalDbAmount(allData.total_debit_amount );
		  setTotalBAlance(allData.total_balance );
	
		  setInSiglePageMode(false);
		  setInShowAllMode(true);
		  setPagination(false)
		  const { totalPages, totalElements } = getPaginationData(
			allData.account_logs,
			size,
			page
		  );
	
		  setPage(page || 1);
		  setSize(size || 25);
		  setTotalPages(totalPages);
		  setTotalElements(totalElements);
		} else if (!inShowAllMode && paginatedData) {
		  setModifiedPassengerAccountSummaryData(paginatedData.account_logs || []);
		  setTotalCdAmount(paginatedData.total_credit_amount );
		  setTotalDbAmount(paginatedData.total_debit_amount );
		  setTotalBAlance(paginatedData.total_balance ); 
		  setPage(paginatedData?.page || 1);
		  setSize(paginatedData?.size || 25);
		  setTotalPages(paginatedData.total_pages || 0);
		  setTotalElements(paginatedData.total_elements || 0);
		  setPagination(true);
		  setInSiglePageMode(true);
		  setInShowAllMode(false);
	
		}
	  }, [inShowAllMode, allData, paginatedData, size, page]);


	  const handleGetPassengerAccountSummarys = useCallback(async (newPage) => {
		try {
		  const page = newPage || 1;
		  setPage(page);
		  await refetchPassengerAccountSummary();
		} catch (error) {
		  console.error('Error fetching agents:', error);
		}
	  }, [refetchPassengerAccountSummary]);


	  const handleGetAllPassengerAccountSummarys = useCallback(async () => {
		try {
		  await refetchAllPassengerAccountSummary();
		} catch (error) {
		  console.error('Error fetching all foreignLedgers:', error);
		}
	  }, [refetchAllPassengerAccountSummary]);

    const agentName = data?.agent?.first_name
	const district = data?.agent?.city?.name
	const phone = data?.agent?.primary_phone

	

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	

	return (
		<div className={classes.headContainer}>
			{/* Filter */}
			<FormProvider {...methods}>
				<PassengerAccountSummaryFilterMenu
					inShowAllMode={inShowAllMode}
					handleGetPassengerAccountSummarys={handleGetPassengerAccountSummarys}
					handleGetAllPassengerAccountSummarys={handleGetAllPassengerAccountSummarys}
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
				onFirstPage={() => handleGetPassengerAccountSummarys(1)}
				onPreviousPage={() => handleGetPassengerAccountSummarys(page - 1)}
				onNextPage={() => handleGetPassengerAccountSummarys(page + 1)}
				onLastPage={() => handleGetPassengerAccountSummarys(totalPages)}
				handleExelDownload={handleExelDownload}
				handlePrint={handlePrint}
				handleGetData={handleGetPassengerAccountSummarys}
				handleGetAllData={handleGetAllPassengerAccountSummarys}
				tableColumns={tableColumns}
				dispatchTableColumns={dispatchTableColumns}
				filename="AgentReport"
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
					{modifiedPassengerAccountSummaryData.map((passengerAccountSummary, index) => (
						<SiglePageWithExtraHeading
							key={index}
							classes={classes}
							reportTitle="Passenger AccountSummary Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={passengerAccountSummary}
							totalColumn={initialTableColumnsState?.length}
							agentName={agentName}
							district={district}
							phone={phone}
							serialNumber={index + 1 + (page - 1) * size} 
							setPage={setPage}
							
						/>
					))}
				</tbody>
			</table>

		</div>
	);
}

export default PassengerAccountSummaryReportsTable;
