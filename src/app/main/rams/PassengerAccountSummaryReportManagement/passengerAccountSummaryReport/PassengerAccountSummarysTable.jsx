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

import { selectFilteredPassengerAccountSummaryReports, useGetPassengerAccountSummaryAllReportsQuery, useGetPassengerAccountSummaryReportsQuery } from '../passengerAccountSummarysApi';
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
		resolver: zodResolver(schema) // Use zodResolver for form validation
	});
	const dispatch = useDispatch();

	const { control, getValues } = methods;

	const [modifiedPassengerAccountSummaryData, setModifiedPassengerAccountSummaryData] = useReportData();

	console.log('modifiedPassengerAccountSummaryData', modifiedPassengerAccountSummaryData);

	const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);

	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);
	const [inShowAllMode, setInShowAllMode] = useState(false);

	console.log('...getValues()', getValues());

	const [inSiglePageMode, setInSiglePageMode] = useState(false);

	const componentRef = useRef(null);

	// Prevent automatic fetching by setting enabled: false
	const { data, isLoading, refetch } = useGetPassengerAccountSummaryReportsQuery({ ...getValues(), page, size }, { enabled: false });
	console.log('adshsakdhasdhasdhasdhas',data?.account_logs);

	const { refetch: refetchAll } = useGetPassengerAccountSummaryAllReportsQuery({ ...getValues()}, { enabled: false });
	const totalData = useSelector(selectFilteredPassengerAccountSummaryReports(data));

	useEffect(() => {
		setModifiedPassengerAccountSummaryData(totalData?.account_logs);
	}, [totalData]);

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const handleGetPassengerAccountSummarys = async (newPage, callBack) => {
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

					const passengerAccountSummarysData = response.data.account_logs || [];
					setModifiedPassengerAccountSummaryData(passengerAccountSummarysData);
					setInShowAllMode(false);

					// const { totalPages, totalElements } = getPaginationData(passengerAccountSummarysData, size, page);
					setTotalPages(response.data?.total_pages);
					setTotalElements(response.data?.total_elements);
				});
			}
		} catch (error) {
			console.error('Error fetching passengerAccountSummarys:', error);
		}
	};

	const handleGetAllPassengerAccountSummarys = async (callBack, callBackAfterStateUpdated) => {
		try {
			const formValues = getValues();

			const response = await refetchAll({ ...formValues }); // Manually trigger the query

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}

					setModifiedPassengerAccountSummaryData(response.data.account_logs || []);
					setInShowAllMode(true);

					const { totalPages, totalElements } = getPaginationData(response.data.account_logs);
					setTotalPages(totalPages);
					setTotalElements(totalElements);
				});

				if (callBackAfterStateUpdated) {
					callBackAfterStateUpdated(response.data);
				}
			}
		} catch (error) {
			console.error('Error fetching all passengerAccountSummarys:', error);
		}
	};

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
				filename="PassengerAccountSummaryReport"
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
						<SinglePage
							key={index}
							classes={classes}
							reportTitle="PassengerAccountSummary Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={passengerAccountSummary}
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

export default PassengerAccountSummaryReportsTable;
