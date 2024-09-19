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
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Name', name: 'username', show: true },
	{ id: 3, label: 'Group', name: 'group', subName: 'name', show: true },
	{ id: 4, label: 'District', name: 'city', subName: 'name', show: true },
	{ id: 5, label: 'Mobile', name: 'primary_phone', show: true },
	{ id: 6, label: 'Email', name: 'email', show: true }
];

function LedgerReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema) // Use zodResolver for form validation
	});
	const dispatch = useDispatch();

	const { control, getValues } = methods;

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

	// Prevent automatic fetching by setting enabled: false
	const { data, isLoading, refetch } = useGetLedgerReportsQuery({ ...getValues(), page, size }, { enabled: false });

	const { refetch: refetchAll } = useGetLedgerAllReportsQuery({ ...getValues() }, { enabled: false });
	const totalData = useSelector(selectFilteredLedgerReports(data));

	useEffect(() => {
		setModifiedLedgerData(totalData?.ledgers);
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
		// debugger;
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

					setModifiedLedgerData(response.data.ledgers || []);
					setInShowAllMode(true);

					const { totalPages, totalElements } = getPaginationData(response.data.ledgers, size, page);
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
