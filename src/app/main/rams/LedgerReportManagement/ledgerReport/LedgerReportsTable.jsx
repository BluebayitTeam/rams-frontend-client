/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';
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
    const { watch ,getValues } = methods;
	const [modifiedLedgerData, setModifiedLedgerData] = useReportData();
	const [totalCdAmount, setTotalCdAmount] = useState(0);
	const [totalDbAmount, setTotalDbAmount] = useState(0);
	const [totalBAlance, setTotalBAlance] = useState(0);
	const [totalAllPageBalance, setTotalAllPageBalance] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [previousBalance, setPreviousBalance] = useState(0);
	const [ledgerName, setLedgerName] = useState('');
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();
    const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [pagination, setPagination] = useState(false);
    const [inSiglePageMode, setInSiglePageMode] = useState(false);
    const componentRef = useRef(null);
	const filterData = watch();
	const [show, setShow] = useState(false);

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
		  setModifiedLedgerData(allData.account_logs || [],size,allData?.previous_balance || 0);
          const totalCdAmnt = getTotalAmount(
			allData?.account_logs || [],
			'credit_amount',
			allData?.previous_balance || 0
		);
		setTotalAllPageBalance(allData?.all_page_total_amount || 0.0);
		setTotalRecords(allData?.total_elements || 0);
		setPagination(false);
		setPreviousBalance(allData?.previous_balance || 0);
		setShow(allData?.account_logs?.length > 0 ? false : true);

		setTotalCdAmount(allData?.total_credit_amount || 0);
		setTotalDbAmount(allData?.total_debit_amount || 0);
		setLedgerName(allData?.ledger_name);
		const totalDbAmnt = getTotalAmount(allData?.account_logs || [], 'debit_amount');
		setTotalBAlance(allData?.total_amount?.toFixed(2) || 0.0);
		setInSiglePageMode(false);
		setDateFrom(allData?.date_after);
		setDateTo(allData?.date_before);
		setInShowAllMode(true);
		//get pagination data
		const { totalPages, totalElements } = getPaginationData(allData?.account_logs, size, page);
		setPage(page || 1);
		setSize(size);
		setTotalPages(totalPages);
		setTotalElements(totalElements);

		} else if (!inShowAllMode && paginatedData) {
		  setModifiedLedgerData(paginatedData.account_logs || []);
		  const totalCdAmnt = getTotalAmount(
			paginatedData?.account_logs || [],
			'credit_amount',
			paginatedData?.previous_balance || 0
		);
		setTotalAllPageBalance(paginatedData?.all_page_total_amount || 0.0);
		setTotalRecords(paginatedData?.total_elements || 0);
		setPreviousBalance(paginatedData?.previous_balance || 0);
		setPagination(true);
		setShow(paginatedData?.account_logs?.length > 0 ? false : true);
		setLedgerName(paginatedData?.ledger_name);
		const totalDbAmnt = getTotalAmount(paginatedData?.account_logs || [], 'debit_amount');
		setTotalCdAmount(paginatedData?.total_credit_amount || 0);
		setTotalDbAmount(paginatedData?.total_debit_amount || 0);
		setTotalBAlance(paginatedData?.total_amount?.toFixed(2) || 0.0);
		setPage(paginatedData?.page || 1);
		setDateFrom(paginatedData?.date_after);
		setDateTo(paginatedData?.date_before);
		setSize(size + 1);
		setTotalPages(paginatedData?.total_pages || 0);
		setTotalElements(paginatedData?.total_elements || 0);
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


	const filteredData = {
		Account: getValues()?.account_typeName || null,
		Ledger: getValues()?.sub_ledgerName || null,
		Date_To: getValues()?.date_before || null,
		Date_From: getValues()?.date_after || null,
		Sub_Ledger: getValues()?.sub_ledgerName || null
	};

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
							filteredData={filteredData}
							dateFromDateTo={
								dateFrom && dateTo
									? `Date : ${
											dateFrom && moment(new Date(dateFrom)).format('DD-MM-YYYY')
									  } to ${dateTo && moment(new Date(dateTo)).format('DD-MM-YYYY')}`
									: ''
							}

							data={{
								...ledger,
								data: [
								  ...ledger.data, 
								  {
									credit_amount: totalCdAmount+ ledger.openingBlnc,
									debit_amount: totalDbAmount,
									details: 'Total Balance',
									balance:
										totalCdAmount + ledger.openingBlnc-totalDbAmount > 0
												? `${
												 totalCdAmount +ledger.openingBlnc-totalDbAmount
																  } Cr`
																: `${
																	totalCdAmount +ledger.openingBlnc-totalDbAmount
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
							addInHeader={ledger.isFirsPage && ledger.openingBlnc}

							// setSortBy={setSortBy}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default LedgerReportsTable;
