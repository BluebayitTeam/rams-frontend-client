import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import { z } from 'zod';
import '../../../rams/print.css';

import moment from 'moment';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetAccountSummaryReportsQuery
} from '../AccountSummaryReportsApi';
import AccountSummaryFilterMenu from './AccountSummaryFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

const initialTableColumnsState = [
	{ id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
	{ id: 2, label: 'Acoount', name: 'account', show: true },
	{
		id: 3,
		label: 'Receipt',
		name: 'debit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 4,
		label: 'Payment',
		name: 'credit_amount',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	},
	{
		id: 5,
		label: 'Balance',
		name: 'balance',
		show: true,
		style: { justifyContent: 'flex-end', marginRight: '5px' },
		headStyle: { textAlign: 'right' }
	}
];

function AccountSummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const {  watch ,getValues } = methods;

  const [modifiedAccountSummaryData, setModifiedAccountSummaryData,setSortBy,setSortBySubKey,dragAndDropRow] = useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data  } = useGetAccountSummaryReportsQuery(
    {
      
      start_date: filterData.start_date || '',
      end_date: filterData.end_date || '',
     
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  

  // const { data: allData, } = useGetAccountSummaryAllReportsQuery(
  //   {
      
  //     start_date: filterData.start_date || '',
  //     end_date: filterData.end_date || '',
     
  //   },
  //   { skip: !inShowAllMode }
  // );


  useEffect(() => {
    if (!inShowAllMode && data) {

      setModifiedAccountSummaryData(data.agents || []);
      setPage(data?.page || 1);
			setSize(data?.size || 25);
      setTotalPages(data.total_pages || 0);
      setTotalElements(data.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
			setInShowAllMode(false);
      
    }
  }, [ data, size, page]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetAccountSummarys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  }, []);

  const handleGetAllAccountSummarys = useCallback(async () => {
    try {
      
    } catch (error) {
      console.error('Error fetching all agents:', error);
    }
  }, []);


  const filteredData = {
    
    Date_To: getValues()?.end_date
      ? moment(new Date(getValues()?.end_date)).format("DD-MM-YYYY")
      : null,
    Date_From: getValues()?.start_date
      ? moment(new Date(getValues()?.start_date)).format("DD-MM-YYYY")
      : null,
   
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <AccountSummaryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetAccountSummarys={handleGetAccountSummarys}
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
        onFirstPage={() => handleGetAccountSummarys(1)}
        onPreviousPage={() => handleGetAccountSummarys(page - 1)}
        onNextPage={() => handleGetAccountSummarys(page + 1)}
        onLastPage={() => handleGetAccountSummarys(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetAccountSummarys}
        handleGetAllData={handleGetAllAccountSummarys}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename='AccountSummaryReport'
      />

<table id="table-to-xls" className="w-full " style={{ minHeight: '270px' }}>
				{data?.balance_details && (
					<div ref={componentRef} id="downloadPage" className="bg-white">
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
								marginTop: '10px',
								fontSize: '10px'
							}}
						>
							<LocationOn fontSize="small" />
							{` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp; <PhoneEnabled fontSize="small" />
							{` ${generalData?.phone || ''}`}&nbsp; &nbsp; <Email fontSize="small" />
							{` ${generalData?.email || ''}`}
						</div>
						<div className={classes.pageHead}>
							<h2 className="title  pl-0 md:-pl-20">
								<u>Account Statement Summary Report</u>
							</h2>
						</div>{' '}
						{watch('is_branch_show') && (
							<div>
								<h3 className="title  pl-0 md:-pl-20 text-center">
									Branch: {getValues()?.branchName ? getValues()?.branchName : 'All'}
								</h3>
							</div>
						)}
						<div>
							<h2 className="title  pl-10 md:-pl-20 mt-20 mb-5" style={{ marginLeft: '50px' }}>
								<span style={{ marginLeft: '15px' }}>
									<b>Opening Balance</b>
								</span>
							</h2>
						</div>
						<TableContainer style={{ width: '50%', marginLeft: '5%' }}>
							<Table
								className={classes.table}
								size="small"
								style={{ border: '1px solid gray', borderBottom: '1px solid gray' }}
								aria-label=" table w-75"
							>
								<TableHead>
									<TableRow className="tableRow cursor-pointer">
										<TableCell className="tableCell text-center">SL</TableCell>
										<TableCell className="tableCell" align="">
											Name
										</TableCell>
										<TableCell className="tableCell" align="">
											Balance
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.entries(data?.opening_balances).map(([key, val], index) => (
										<TableRow key={key}>
											<TableCell className="tableCell text-center" component="th" scope="row">
												{index + 1} {/* SL No */}
											</TableCell>
											<TableCell className="tableCell" align="">
												{key}
											</TableCell>
											<TableCell
												className="tableCell"
												align=""
												style={{ color: val > 0 ? 'green' : 'red' }}
											>
												{val?.toFixed(2)} {val > 0 ? 'Dr' : 'Cr'}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<div>
							<h2 className="title  pl-0 md:-pl-20 mt-20 mb-5" style={{ marginLeft: '50px' }}>
								<span style={{ marginLeft: '15px' }}>
									<b>Balance</b>
								</span>
							</h2>
						</div>
						<TableContainer style={{ width: '90%', marginLeft: '5%' }} className="text-center">
							<Table
								className={classes.table}
								size="small"
								style={{ border: '1px solid gray', borderBottom: '1px solid gray' }}
								aria-label="a dense table w-75"
							>
								<TableHead>
									<TableRow>
										<TableCell className="tableCell text-center">SL</TableCell>
										<TableCell className="tableCell" align="">
											Name
										</TableCell>

										<TableCell className="tableCell" align="">
											Receipt
										</TableCell>
										<TableCell className="tableCell" align="">
											Payment
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data?.balance_details?.map((balance_detail, idx) => (
										<TableRow key={idx}>
											<TableCell className="tableCell text-center" component="th" scope="row">
												{idx + 1}
											</TableCell>
											<TableCell className="tableCell" align="">
												{balance_detail?.name}
											</TableCell>
											<TableCell className="tableCell" align="">
												{balance_detail.debit?.toFixed(2)}
											</TableCell>
											<TableCell className="tableCell" align="">
												{balance_detail.credit?.toFixed(2)}
											</TableCell>{' '}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<div>
							<h2 className="title  pl-0 md:-pl-20 mt-20 mb-5" style={{ marginLeft: '50px' }}>
								<span style={{ marginLeft: '15px' }}>
									<b>Closing Balance</b>
								</span>
							</h2>
						</div>
						<TableContainer style={{ width: '50%', marginLeft: '5%' }}>
							<Table
								className={classes.table}
								style={{ border: '1px solid gray', borderBottom: '1px solid gray' }}
								size="small"
								aria-label="a dense table w-75"
							>
								<TableHead>
									<TableRow>
										<TableCell className="tableCell text-center">SL</TableCell>
										<TableCell className="tableCell" align="">
											Name
										</TableCell>
										<TableCell className="tableCell" align="">
											Balance
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.entries(data?.closing_balances)?.map((entry, index) => (
										<TableRow key={entry[0]}>
											<TableCell className="tableCell text-center" component="th" scope="row">
												{index + 1} {/* SL No */}
											</TableCell>
											<TableCell className="tableCell" align="">
												{entry[0]}
											</TableCell>
											<TableCell
												className="tableCell"
												align=""
												style={{ color: entry[1] > 0 ? 'green' : 'red' }}
											>
												{entry[1]?.toFixed(2)} {entry[1] > 0 ? 'Dr' : 'Cr'}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<table className={classes.pageFooterContainer} style={{ marginTop: '15px' }}>
							<tbody>
								<tr>
									<td>
										<span style={{ textAlign: 'left' }}>
											Printed Date & Time: {moment().format('DD/MM/YY')}, {moment().format('LT')}
										</span>
									</td>

									<td>
										<span style={{ textAlign: 'left' }}>
											Developed by RAMS(Bluebay IT Limited)-01861650206
										</span>
									</td>
									<td>
										<span>&nbsp;</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</table>
    </div>
  );
}

export default AccountSummaryReportsTable;