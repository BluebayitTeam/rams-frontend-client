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
import { selectFilteredPassengerReports, useGetPassengerAllReportsQuery, useGetPassengerReportsQuery } from '../PassengerReportsApi';
import PassengerFilterMenu from './PassengerFilterMenu';

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

function PassengerReportsTable(props) {
	const classes = useStyles();
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema) // Use zodResolver for form validation
	});
	const dispatch = useDispatch();

	const { control, getValues } = methods;

	const [modifiedPassengerData, setModifiedPassengerData] = useReportData();

	console.log('modifiedPassengerData', modifiedPassengerData);

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
	const { data, isLoading, refetch } = useGetPassengerReportsQuery({ ...getValues(), page, size }, { enabled: false });

	const { refetch: refetchAll } = useGetPassengerAllReportsQuery({ ...getValues() }, { enabled: false });
	const totalData = useSelector(selectFilteredPassengerReports(data));

	useEffect(() => {
		setModifiedPassengerData(totalData?.Passengers);
	}, [totalData]);

	// Function to handle Excel download
	const handleExelDownload = () => {
		document.getElementById('test-table-xls-button').click();
	};

	// Function to handle Print
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const handleGetPassengers = async (newPage, callBack) => {
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

					const PassengersData = response.data.Passengers || [];
					setModifiedPassengerData(PassengersData);
					setInShowAllMode(false);

					// const { totalPages, totalElements } = getPaginationData(PassengersData, size, page);
					setTotalPages(response.data?.total_pages);
					setTotalElements(response.data?.total_elements);
				});
			}
		} catch (error) {
			console.error('Error fetching Passengers:', error);
		}
	};

	const handleGetAllPassengers = async (callBack, callBackAfterStateUpdated) => {
		try {
			const formValues = getValues();

			const response = await refetchAll({ ...formValues }); // Manually trigger the query

			if (response?.data) {
				unstable_batchedUpdates(() => {
					if (callBack) {
						callBack(response.data);
					}

					setModifiedPassengerData(response.data.Passengers || []);
					setInShowAllMode(true);

					const { totalPages, totalElements } = getPaginationData(response.data.Passengers, size, page);
					setTotalPages(totalPages);
					setTotalElements(totalElements);
				});

				if (callBackAfterStateUpdated) {
					callBackAfterStateUpdated(response.data);
				}
			}
		} catch (error) {
			console.error('Error fetching all Passengers:', error);
		}
	};

	return (
		<div className={classes.headContainer}>
			{/* Filter */}
			<FormProvider {...methods}>
				<PassengerFilterMenu
					inShowAllMode={inShowAllMode}
					handleGetPassengers={handleGetPassengers}
					handleGetAllPassengers={handleGetAllPassengers}
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
				onFirstPage={() => handleGetPassengers(1)}
				onPreviousPage={() => handleGetPassengers(page - 1)}
				onNextPage={() => handleGetPassengers(page + 1)}
				onLastPage={() => handleGetPassengers(totalPages)}
				handleExelDownload={handleExelDownload}
				handlePrint={handlePrint}
				handleGetData={handleGetPassengers}
				handleGetAllData={handleGetAllPassengers}
				tableColumns={tableColumns}
				dispatchTableColumns={dispatchTableColumns}
				filename="PassengerReport"
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
					{modifiedPassengerData.map((Passenger, index) => (
						<SinglePage
							key={index}
							classes={classes}
							reportTitle="Passenger Report"
							tableColumns={tableColumns}
							dispatchTableColumns={dispatchTableColumns}
							data={Passenger}
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

export default PassengerReportsTable;
