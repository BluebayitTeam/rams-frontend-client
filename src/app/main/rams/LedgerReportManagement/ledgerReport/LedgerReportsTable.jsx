/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */

import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useEffect, useReducer, useRef, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
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
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);

	console.log('inShowAllMode', inShowAllMode);

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

					const ledgersData = response.data.ledgers || [];
					setModifiedLedgerData(ledgersData);
					setInShowAllMode(false);

					// const { totalPages, totalElements } = getPaginationData(ledgersData, size, page);
					setTotalPages(response.data?.total_pages);
					setTotalElements(response.data?.total_elements);
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

					setModifiedLedgerData(response.data.account_logs || []);
					setInShowAllMode(true);

					const { totalPages, totalElements } = getPaginationData(response.data.account_logs, size, page);
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
							data={ledger}
							totalColumn={initialTableColumnsState?.length}
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

export default LedgerReportsTable;
