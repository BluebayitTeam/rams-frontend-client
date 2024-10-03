import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageWithOpeningBalance from 'src/app/@components/ReportComponents/SiglePageWithOpeningBalance';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';
import { z } from 'zod';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import { selectFilteredLedgerReports, useGetLedgerAllReportsQuery, useGetLedgerReportsQuery } from '../LedgerReportsApi';
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

	const { control, getValues,watch } = methods;

	const [modifiedLedgerData, setModifiedLedgerData] = useReportData();

	console.log('modifiedLedgerData', modifiedLedgerData);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [page, setPage] = useState(1);
	const [size, setSize] = useState(25);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);
	const [pagination, setPagination] = useState(false);
	const [totalCdAmount, setTotalCdAmount] = useState(0);
	const [totalDbAmount, setTotalDbAmount] = useState(0);
	const [totalBAlance, setTotalBAlance] = useState(0);
	const [totalAllPageBalance, setTotalAllPageBalance] = useState(0);
	const [totalRecords, setTotalRecords] = useState(0);
	const [previousBalance, setPreviousBalance] = useState(0);
	const [ledgerName, setLedgerName] = useState('');
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();

	

	const [inSiglePageMode, setInSiglePageMode] = useState(false);

	const componentRef = useRef(null);
	
	const { data, isLoading, refetch } = useGetLedgerReportsQuery({
        ledger: watch('ledger') || '',
        
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
		sub_ledger: watch('sub_ledger') || '',
        account_type: watch('account_type') || '',
     
      }, { enabled: false });
	const { refetch: refetchAll } = useGetLedgerAllReportsQuery({
        ledger: watch('ledger') || '',
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
		sub_ledger: watch('sub_ledger') || '',
        account_type: watch('account_type') || '',
     
      }, { enabled: false });
	const totalData = useSelector(selectFilteredLedgerReports(data));

	// console.log('fdjshsdjkfhsdkhfsdkhfsdkhf',getValues());

	useEffect(() => {
		setModifiedLedgerData(totalData?.account_logs);
	}, [totalData]);

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const handleGetLedgers = async (newPage, callBack) => {
		
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

					const ledgersData = (response.data.account_logs || [], size + 1, response.data?.previous_balance || 0);
					setModifiedLedgerData(ledgersData);
					setTotalAllPageBalance(ledgersData?.all_page_total_amount || 0.0);
		            setTotalRecords(ledgersData?.total_elements || 0);
		            setPreviousBalance(ledgersData?.previous_balance || 0);
	                setPagination(true);
		            setShow(ledgersData?.account_logs?.length > 0 ? false : true);
		            setLedgerName(ledgersData?.ledger_name);
		            const totalDbAmnt = getTotalAmount(ledgersData?.account_logs || [], 'debit_amount');
		            setTotalCdAmount(ledgersData?.total_credit_amount || 0);
		            setTotalDbAmount(ledgersData?.total_debit_amount || 0);
		            setTotalBAlance(ledgersData?.total_amount?.toFixed(2) || 0.0);
		            setPage(ledgersData?.page || 1);
		            setDateFrom(ledgersData?.date_after);
		            setDateTo(ledgersData?.date_before);
					setPage(ledgersData?.page || 1);
					setSize(ledgersData?.size || 25);
					setTotalPages(ledgersData.total_pages || 0);
					setTotalElements(ledgersData.total_elements || 0);
		            setInSiglePageMode(true);
		            setInShowAllMode(false);
	
				});
			}
		} catch (error) {
			console.error('Error fetching ledgers:', error);
		}
	};

	const handleGetAllLedgers = async (callBack, callBackAfterStateUpdated) => {
		try {
			const formValues = getValues();

			const response = await refetchAll({ ...formValues }); // Manually trigger the query

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}
                    const allData = (response.data.account_logs || [], size, response.data?.previous_balance || 0);
					setModifiedLedgerData(allData);
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
					setSize(size || 25);
					setTotalPages(totalPages);
					setTotalElements(totalElements);
				});

				if (callBackAfterStateUpdated) {
					callBackAfterStateUpdated(response.data);
				}
			}
		} catch (error) {
			console.error('Error fetching all ledgers:', error);
		}
	};


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
						<SiglePageWithOpeningBalance
						key={index}
						classes={classes}
						reportTitle="Ledger Report"
						tableColumns={tableColumns}
						dispatchTableColumns={dispatchTableColumns}
						dateFromDateTo={
							dateFrom && dateTo
								? `Date : ${moment(dateFrom).format('DD-MM-YYYY')} to ${moment(dateTo).format('DD-MM-YYYY')}`
								: ''
						}
						data={{
							...ledger,
							data: [
								...ledger.data,
								{
									credit_amount: totalCdAmount + ledger.openingBlnc,
									debit_amount: totalDbAmount,
									details: 'Total Balance',
									balance:
										totalCdAmount + ledger.openingBlnc - totalDbAmount > 0
											? `${totalCdAmount + ledger.openingBlnc - totalDbAmount} Cr`
											: `${Math.abs(totalCdAmount + ledger.openingBlnc - totalDbAmount)} Dr`,
									getterMethod: () => 'Total Amount',
									hideSerialNo: true,
									rowStyle: {
										fontWeight: 600,
										color: totalCdAmount + ledger.openingBlnc - totalDbAmount > 0 ? 'green' : 'red',
									},
								},
							],
						}}
						totalColumn={initialTableColumnsState?.length || 0}
						serialNumber={
							pagination
								? page * size - size + index + 1
								: ledger.page * ledger.size - ledger.size + 1
						}
						setPage={setPage}
						filteredData={filteredData}
						// addInHeader={ledger.isFirsPage && ledger.openingBlnc}
						addInHeader={{
							...ledger,
							addInHeader:[
								ledger.openingBlnc
							]
						}}
					/>
					
					))}
				</tbody>
			</table>
		</div>
	);
}

export default LedgerReportsTable;
