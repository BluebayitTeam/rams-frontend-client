/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import { useGetLedgerAllReportsQuery, useGetLedgerReportsQuery } from '../LedgerReportsApi';
import LedgerFilterMenu from './LedgerFilterMenu';

const useStyles = makeStyles((theme) => ({
	...getReportMakeStyles(theme)
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true, style: { justifyContent: 'center' } },
	{ id: 2, label: 'Log Date', name: 'log_date', show: true, type: 'date', style: { justifyContent: 'center' } },
	{ id: 3, label: 'Invoice No', name: 'reference_no', show: true, style: { justifyContent: 'center' } },
	{ id: 4, label: 'Purpose', name: 'sub_ledger', subName: 'name', show: true },
	{ id: 5, label: 'Details', name: 'details', show: true },

	{
		id: 6,
		label: 'Credit',
		name: 'credit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' },
		type: 'amount'
	},
	{
		id: 7,
		label: 'Debit',
		name: 'debit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' },
		type: 'amount'
	},

	{
		id: 8,
		label: 'Balance',
		name: 'balance',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' },
		type: 'amount'
	}
];

function LedgerReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema) // Use zodResolver for form validation
	});
	const dispatch = useDispatch();

	const { watch } = methods;

	const [modifiedLedgerData, setModifiedLedgerData] = useReportData();


	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [pagination, setPagination] = useState(false);


	const [inSiglePageMode, setInSiglePageMode] = useState(false);

	const componentRef = useRef(null);
	const filterData = watch();

  const { data: paginatedData, refetch: refetchLedgerReports } = useGetLedgerReportsQuery(
    {
      ledger: filterData.ledger || '',
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      sub_ledger: filterData.sub_ledger || '',
      account_type: filterData.account_type || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData, refetch: refetchAllLedgerReports } = useGetLedgerAllReportsQuery(
		{
		  ledger: filterData.ledger || '',
		  date_after: filterData.date_after || '',
		  date_before: filterData.date_before || '',
		  sub_ledger: filterData.sub_ledger || '',
		  account_type: filterData.account_type || '',
		
		},
		{ skip: !inShowAllMode }
	  );
	
	  useEffect(() => {
		if (inShowAllMode && allData) {
		  setModifiedLedgerData(allData.account_logs || []);
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
		  setModifiedLedgerData(paginatedData.account_logs || []);
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



	  const handleGetLedgers = useCallback(async (newPage) => {
		try {
		  const page = newPage || 1;
		  setPage(page);
		  await refetchLedgerReports();
		} catch (error) {
		  console.error('Error fetching agents:', error);
		}
	  }, [refetchLedgerReports]);
	
	  const handleGetAllLedgers = useCallback(async () => {
		try {
		  await refetchAllLedgerReports();
		} catch (error) {
		  console.error('Error fetching all foreignLedgers:', error);
		}
	  }, [refetchAllLedgerReports]);



	

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
				<LedgerFilterMenu
					inShowAllMode={inShowAllMode}
					handleGetLedgers={handleGetLedgers}
					handleGetAllLedgers={handleGetAllLedgers}
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
				onFirstPage={() => handleGetLedgers(1)}
				onPreviousPage={() => handleGetLedgers(page - 1)}
				onNextPage={() => handleGetLedgers(page + 1)}
				onLastPage={() => handleGetLedgers(totalPages)}
				handleExelDownload={handleExelDownload}
				handlePrint={handlePrint}
				handleGetData={handleGetLedgers}
				handleGetAllData={handleGetAllLedgers}
				tableColumns={tableColumns}
				dispatchTableColumns={dispatchTableColumns}
				filename="LedgerReport"
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
					{modifiedLedgerData.map((ledger, index) => (
						<SinglePage
							key={index}
							classes={classes}
							reportTitle="Ledger Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							inSiglePageMode={inSiglePageMode}
							data={{
								...ledger,
								data: [
								  ...ledger.data, 
								  {
									credit_amount: totalCdAmount+ ledger.openingBlnc,
									debit_amount: totalDbAmount,
									details: 'Total Balance',
									balance:
															totalCdAmount + ledger.openingBlnc - totalDbAmount > 0
																? `${
																		totalCdAmount +
																		ledger.openingBlnc -
																		totalDbAmount
																  } Cr`
																: `${
																		totalCdAmount +
																		ledger.openingBlnc -
																		totalDbAmount
																  } Dr`,
									getterMethod: () => 'Total Amount',
									hideSerialNo: true,
									rowStyle: {
										fontWeight: 600,
										color:
											totalCdAmount + ledger.openingBlnc - totalDbAmount > 0
												? 'green'
												: 'red'
									}
								  },
								],
							  }}
							totalColumn={initialTableColumnsState?.length}
							serialNumber={
								pagination
								  ? page * size - size + index * ledger.data.length + 1
								  : ledger.page * ledger.size - ledger.size + 1
							  }
							setPage={setPage}
							// setSortBy={setSortBy}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default LedgerReportsTable;
