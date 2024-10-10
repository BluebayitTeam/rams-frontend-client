import { zodResolver } from '@hookform/resolvers/zod';
import { Email, LocationOn, PhoneEnabled } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SiglePageWithOpeningBalance from 'src/app/@components/ReportComponents/SiglePageWithOpeningBalance';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';
import { z } from 'zod';
import '../../../rams/print.css';
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
	{ id: 3, label: 'Ledger', name: 'ledger', subName: 'name', show: true },
	{ id: 4, label: 'Invoice No', name: 'reference_no', show: true, style: { justifyContent: 'center' } },
	{ id: 5, label: 'Purpose', name: 'sub_ledger', subName: 'name', show: true },
	{ id: 6, label: 'Details', name: 'details', show: true },

	{
		id: 7,
		label: 'Credit',
		name: 'credit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' },
		type: 'amount'
	},
	{
		id: 8,
		label: 'Debit',
		name: 'debit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' },
		type: 'amount'
	},

	{
		id: 9,
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
		resolver: zodResolver(schema) 	
	});
	const dispatch = useDispatch();
    const {  getValues,watch } = methods;
    const [modifiedLedgerData, setModifiedLedgerData] = useReportData();
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
	const [totalRecords, setTotalRecords] = useState(0);
	const [previousBalance, setPreviousBalance] = useState(0);
	const [dateFrom, setDateFrom] = useState();
	const [dateTo, setDateTo] = useState();
	const [show, setShow] = useState(false);
	const [generalData, setGeneralData] = useState({});
    const [inSiglePageMode, setInSiglePageMode] = useState(false);
    const componentRef = useRef(null);
	
	const { data:paginatedData,  refetch } = useGetLedgerReportsQuery({
        ledger: watch('ledger') || '',
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
		sub_ledger: watch('sub_ledger') || '',
        account_type: watch('account_type') || '',
		page,
		size,
     
      },  { skip: inShowAllMode })
	  

	  console.log('allData420', paginatedData)


const {data: allData, refetch: refetchAll } = useGetLedgerAllReportsQuery({
        ledger: watch('ledger') || '',
        date_after: watch('date_after') || '',
        date_before: watch('date_before') || '',
		sub_ledger: watch('sub_ledger') || '',
        account_type: watch('account_type') || '',
     
      },  { skip: !inShowAllMode });


	const totalData = useSelector(selectFilteredLedgerReports(paginatedData));



	//get general setting data
	useEffect(() => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		if (sessionStorage.getItem('sundryReportLedgerKey')) {
			if (inShowAllMode === true) handleGetAllLedgers();
			else handleGetLedgers();
		}

		fetch(`${GET_SITESETTINGS}`, authTOKEN)
			.then(response => response.json())
			.then(data => setGeneralData(data.general_settings[0] || {}))
			.catch(() => setGeneralData({}));
	}, []);


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

	

	useEffect(() => {
		if (inShowAllMode && allData) {
			setModifiedLedgerData(allData?.account_logs || []);
		    setTotalCdAmount(allData.total_credit_amount ||0 );
		    setTotalDbAmount(allData.total_debit_amount ||0);
		    setTotalBAlance(allData.total_amount?.toFixed(2) || 0.0);
		    setTotalRecords(allData?.total_elements || 0);
            setPreviousBalance(allData?.previous_balance || 0);
			setShow(allData?.account_logs?.length > 0 ? false : true);
			setTotalRecords(allData?.total_elements || 0);
			setDateFrom(allData?.date_after);
			setDateTo(allData?.date_before);
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
		  setModifiedLedgerData(paginatedData?.account_logs || []);
		  setTotalCdAmount(paginatedData.total_credit_amount|| 0);
		  setTotalDbAmount(paginatedData.total_debit_amount || 0);
		  setTotalBAlance(paginatedData.total_amount?.toFixed(2) || 0.0);
		  setPreviousBalance(paginatedData?.previous_balance || 0);

		  setTotalRecords(paginatedData?.total_elements || 0);
		  setShow(paginatedData?.account_logs?.length > 0 ? false : true);
		  setTotalRecords(paginatedData?.total_elements || 0);
		  setDateFrom(paginatedData?.date_after);

		  setDateTo(paginatedData?.date_before);

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
		  await refetch();
		} catch (error) {
		  console.error('Error fetching agents:', error);
		}
	  }, [refetch]);
	
	  const handleGetAllLedgers = useCallback(async () => {
		try {
		  await refetchAll();
		} catch (error) {
		  console.error('Error fetching all foreignLedgers:', error);
		}
	  }, [refetchAll]);

     const filteredData = {
		Account: getValues()?.account_typeName || null,
		Ledger: getValues()?.ledgerName || null,
		Date_To: getValues()?.date_before ? moment(new Date(getValues()?.date_before)).format('DD-MM-YYYY') : null,
		Date_From: getValues()?.date_after ? moment(new Date(getValues()?.date_after)).format('DD-MM-YYYY') : null, 
		Sub_Ledger: getValues()?.sub_ledgerName || null
	  };
	  
	  

const ladgerData = getValues().ledger

console.log('ladgerData', ladgerData)
	
const filteredKeys = Object.keys(filteredData).filter(key => filteredData[key] !== null);
	console.log('firstKey', filteredKeys);

	const filteredValues = filteredKeys.map(key => {
		return `<b>${key.replace(/_/g, ' ')}</b>: ${filteredData[key]}`;
	});
	const FilteredCriteria = filteredValues.join(', ');

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

			{totalRecords > 0 ?( <table
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
								...ledger?.data,
								{
									credit_amount: totalCdAmount?.toFixed(2)|| '0.00', 
									debit_amount: totalDbAmount?.toFixed(2)|| '0.00',
									details: 'Total Balance',
									balance:totalBAlance,
									getterMethod: () => 'Total Amount',
									hideSerialNo: true,
									rowStyle: {
										fontWeight: 600,
										color: totalCdAmount  > 0 ? 'green' : 'red',
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
						
						addInHeader={previousBalance}
						
						inSiglePageMode={inSiglePageMode}
						filteredData={filteredData}

					/>
					
					))}
				</tbody>
			</table>):(
				<div>
					
					{show && ladgerData && (
						<div>
							<div className={classes.pageHead}>
								<div className="logoContainer pr-0 md:-pr-20">
									<img
										style={{
											visibility: generalData.logo ? 'visible' : 'hidden',
											textAlign: 'center'
										}}
										src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
										alt="Not found"
									/>
								</div>
							</div>
							<div
								style={{
									textAlign: 'center',
									borderBottom: '1px solid gray',
									fontSize: '10px'
								}}
							>
								<LocationOn fontSize="small" />
								{` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp;{' '}
								<PhoneEnabled fontSize="small" />
								{` ${generalData?.phone || ''}`}&nbsp; &nbsp; <Email fontSize="small" />
								{` ${generalData?.email || ''}`}
							</div>
							<div className={classes.pageHead}>
								<h2 className="title  pl-0 md:-pl-20">
									<u>Ledger Report</u>
								</h2>
							</div>
							<div className={classes.pageHead}>
					<p className="title  pl-0 md:-pl-20" dangerouslySetInnerHTML={{ __html: FilteredCriteria }} />
				</div>

							
							<div style={{ textAlign: 'center' }}>
								{previousBalance > 0 ? (
									<h3 style={{ color: 'green' }}>
										Opening Balance: {previousBalance?.toFixed(2)} Cr
									</h3>
								) : (
									<h3 style={{ color: 'red' }}>Opening Balance: {previousBalance?.toFixed(2)} Dr</h3>
								)}
							</div>
						</div>
					)}

				</div>
			)}
		</div>
	);
}

export default LedgerReportsTable;
