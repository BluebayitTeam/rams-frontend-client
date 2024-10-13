import { zodResolver } from '@hookform/resolvers/zod';
import { Email, LocationOn, PhoneEnabled } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { Checkbox, FormControl, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import useUserInfo from 'src/app/@customHooks/useUserInfo';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';
import { z } from 'zod';
import '../../../rams/print.css';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetAccountSummaryReportsQuery
} from '../AccountSummaryReportsApi';
import AccountSummaryFilterMenu from './AccountSummaryFilterMenu';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});


function AccountSummaryReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const {  watch ,getValues,control  ,setValue } = methods;

  const [generalData, setGeneralData] = useState({});

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);
	const [inPrint, setInPrint] = useState(false);
	const { authTOKEN } = useUserInfo();

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


  // useEffect(() => {
  //   if (!inShowAllMode && data) {

  //     setModifiedAccountSummaryData(data.agents || []);
  //     setPage(data?.page || 1);
	// 		setSize(data?.size || 25);
  //     setTotalPages(data.total_pages || 0);
  //     setTotalElements(data.total_elements || 0);
  //     setPagination(true);
  //     setInSiglePageMode(true);
	// 		setInShowAllMode(false);
      
  //   }
  // }, [ data, size, page]);

 //get general setting data
 useEffect(() => {
  fetch(`${GET_SITESETTINGS}`, authTOKEN)
    .then(response => response.json())
    .then(data => setGeneralData(data.general_settings[0] || {}))
    .catch(() => setGeneralData({}));
  setValue('is_branch_show', true);
}, []);
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




  

  return (
    <>
    <div className={classes.headContainer}>
      {/* filter */}
      <FormProvider {...methods}>
        <AccountSummaryFilterMenu handleGetAccountSummarys={handleGetAccountSummarys} />
      </FormProvider>
    </div>
    <div className={`${classes.menubar} justify-start md:justify-center`}>
      {/* print icon*/}
      <PrintIcon
        className="cursor-pointer inside icon"
        style={{ padding: '6px', border: inPrint && '1px solid' }}
        onClick={() => handlePrint()}
      />
      <Controller
        name="is_branch_show"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              label="Is Branch Show"
              control={<Checkbox {...field} checked={field.value ? field.value : false} />}
            />
          </FormControl>
        )}
      />
    </div>

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
  </>
  );
}

export default AccountSummaryReportsTable;