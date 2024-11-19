import { zodResolver } from '@hookform/resolvers/zod';
import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import ReportPaginationAndDownload from 'src/app/@components/ReportComponents/ReportPaginationAndDownload';
import SinglePage from 'src/app/@components/ReportComponents/SinglePage';
import tableColumnsReducer from 'src/app/@components/ReportComponents/tableColumnsReducer';
import useReportData from 'src/app/@components/ReportComponents/useReportData';
import getPaginationData from 'src/app/@helpers/getPaginationData';
import { z } from 'zod';
import '../../../rams/print.css';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import moment from 'moment';
import { getReportMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  useGetBalanceSheetAllReportsQuery,
  useGetBalanceSheetReportsQuery,
} from '../BalanceSheetReportsApi';
import BalanceSheetFilterMenu from './BalanceSheetFilterMenu';
import {
  BALANCESHEET_DETAILS,
  BASE_URL,
  GET_SITESETTINGS,
} from 'src/app/constant/constants';
import { Email, LocationOn, PhoneEnabled } from '@mui/icons-material';
import getReportDateFromDateToTitle from 'src/app/@helpers/getReportDateFromDateToTitle';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

function BalanceSheetReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [inPrint, setInPrint] = useState(false);
  const [totalDr, setTotalDr] = useState(0);
  const [totalCr, setTotalCr] = useState(0);
  const [serial, setSerial] = useState([0]);
  const [balanceSheetDetails, setBalanceSheetDetails] = useState({});
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [show, setShow] = useState(false);
  const componentRef = useRef(null);

  const componentRefDetails = useRef();
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [balanceSheetsData, setBalanceSheetsData] = useState([]);

  console.log('balanceSheetData', balanceSheetData);

  const filterData = watch();

  const { data: paginatedData } = useGetBalanceSheetReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      page,
      size,
    },
    { skip: !filterData.date_after && !filterData.date_before } // Skip the query if no dates are provided
  );

  console.log('paginatedData', paginatedData);

  const { data: allData } = useGetBalanceSheetAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedBalanceSheetData(allData.trial_balance || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.trial_balance,
        size,
        page
      );
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setBalanceSheetsData(paginatedData || []);
      setBalanceSheetData(paginatedData.balance_sheet || []);

      // setBalanceSheetDetails(paginatedData.balance_sheet);
      setTotalLiabilities(paginatedData?.left_total);
      setTotalAssets(paginatedData?.right_total);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [inShowAllMode, allData, paginatedData, size, page]);

  const handleExelDownload = () => {
    document.getElementById('test-table-xls-button').click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetBalanceSheets = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching balanceSheets:', error);
    }
  }, []);

  const handleRowClick = (id, group_or_ledger) => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: sessionStorage.getItem('jwt_access_token'),
      },
    };
    fetch(
      `${BALANCESHEET_DETAILS}?date_before=${getValues().date_before || ''}&date_after=${
        getValues().date_after || ''
      }&group_id=${id || ''}&group_or_ledger=${group_or_ledger || ''}&branch=${getValues().branch || ''}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) => {
        setBalanceSheetDetails(data);
        setTotalLiabilities(data?.total_dr);
        setTotalAssets(data?.total_cr);
        setBalanceSheetData([]);
      });
  };

  //get general setting data
  useEffect(() => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };

    fetch(`${GET_SITESETTINGS}`, authTOKEN)
      .then((response) => response.json())
      .then((data) => setGeneralData(data.general_settings[0] || {}))
      .catch(() => setGeneralData({}));
  }, []);

  function pop() {
    if (serial.length > 1) {
      console.log('check1');
      const newSerial = [...serial];
      newSerial.pop();
      setSerial(newSerial);
      const lastElement = newSerial[newSerial.length - 1];
      handleRowClick(lastElement);
    } else {
      console.log('check2');
      if (!inShowAllMode && paginatedData) {
        setBalanceSheetData(paginatedData.balance_sheet);
      }
      setBalanceSheetDetails({});
      setSerial([0]);
    }
  }

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <BalanceSheetFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetBalanceSheets={handleGetBalanceSheets}
        />
      </FormProvider>
      <div
        className={`${classes.menubar} justify-start md:justify-center`}
        style={{ backgroundColor: '#c2c7f1' }}>
        {/* ArrowBackIcon icon*/}
        <ArrowBackIcon
          className='cursor-pointer inside icon'
          style={{ padding: '6px', border: inPrint && '1px solid' }}
          onClick={() => pop()}
        />
        {/* Print icon */}
        <PrintIcon
          className='cursor-pointer inside icon'
          style={{ padding: '6px', border: inPrint ? '1px solid' : 'none' }}
          onClick={handlePrint}
        />
      </div>
      {(balanceSheetData?.left?.length > 0 ||
        balanceSheetData?.right?.length > 0) && (
        <div ref={componentRef} id='downloadPage' className='bg-white p-20'>
          <div className={`${classes.pageHead} `}>
            <div className='logoContainer pr-0 md:-pr-20 pt-10'>
              <img
                style={{
                  visibility: generalData.logo ? 'visible' : 'hidden',
                }}
                className='text-center'
                src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
                alt='Not found'
              />
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              borderBottom: '1px solid gray',
              marginBottom: '20px',
              marginTop: '-10px',
              fontSize: '10px',
            }}>
            <LocationOn fontSize='small' />
            {` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp;{' '}
            <PhoneEnabled fontSize='small' />
            {` ${generalData?.phone || ''}`}&nbsp; &nbsp;{' '}
            <Email fontSize='small' />
            {` ${generalData?.email || ''}`}
          </div>

          <div>
            <h4 className='text-center  font-bold text-sm py-3'>
              Balance Sheet Report{' '}
            </h4>
            {balanceSheetData?.date_after && (
              <h5 className='text-center  font-bold text-xs'>
                {getReportDateFromDateToTitle(
                  balanceSheetData?.date_after,
                  balanceSheetData?.date_before
                )}
              </h5>
            )}
          </div>

          <div className='px-20 mx-32'>
            <table width='100%' className='mt-20'>
              <tr>
                {/* Left Side */}
                <td valign='top' className='border-1 border-current'>
                  <TableContainer valign='top' className='border-0'>
                    <Table size='small' style={{ borderStyle: 'hidden' }}>
                      <TableHead>
                        <TableRow
                          className='border-1  border-current mx-40'
                          style={{ backgroundColor: '#d9d9d9' }}>
                          <TableCell className='border-b-1 border-current font-bold'>
                            Liabilities
                          </TableCell>
                          <TableCell className=' text-right border-b-1 border-current font-bold'>
                            Total{' '}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {balanceSheetData?.left?.map(
                          (item) => (
                            console.log('dfkjhkjdfhds', item),
                            (
                              <TableRow
                                key={item.id}
                                onClick={() => {
                                  item?.is_clickable &&
                                    handleRowClick(
                                      item.id,
                                      item?.group_or_ledger
                                    );
                                  item?.is_clickable &&
                                    setSerial([...serial, item?.id]);
                                }}
                                className='mx-40 cursor-pointer'>
                                <TableCell className='border-0'>
                                  {item.name}
                                </TableCell>
                                <TableCell className='border-0' align='right'>
                                  {/* {(item.credit - item.debit)?.toFixed(2)} */}
                                  {(item.credit - item.debit)?.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            )
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </td>
                {/* Right Side */}
                <td valign='top' className='border-1 border-current'>
                  <TableContainer className='border-0'>
                    <Table size='small'>
                      <TableHead>
                        <TableRow
                          className='mx-40 border-b-1 border-current'
                          style={{ backgroundColor: '#d9d9d9' }}>
                          <TableCell className='border-b-1 border-current font-bold'>
                            Assets
                          </TableCell>
                          <TableCell className='text-right border-b-1 border-current font-bold'>
                            Total{' '}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {balanceSheetData?.right?.map((item) => (
                          <TableRow
                            key={item.id}
                            onClick={() => {
                              item?.is_clickable &&
                                handleRowClick(item.id, item?.group_or_ledger);
                              item?.is_clickable &&
                                setSerial([...serial, item?.id]);
                            }}
                            className='mx-40 cursor-pointer	'>
                            <TableCell className='border-0'>
                              {item.name}
                            </TableCell>
                            <TableCell className='border-0' align='right'>
                              {(item.debit - item.credit)?.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </td>
              </tr>

              <tr>
                {/* Left Side */}

                <td className='border-1 border-current'>
                  <TableContainer className='border-none'>
                    <Table size='small'>
                      <TableHead>
                        <TableRow className=' mx-40'>
                          <TableCell align='left' className='font-bold'>
                            Totals
                          </TableCell>

                          <TableCell align='right' className='font-bold'>
                            {balanceSheetsData?.left_total?.toFixed(2) ||
                              '0.00'}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </td>
                {/* Right Side */}
                <td className='border-1 border-current'>
                  <TableContainer className='border-0'>
                    <Table size='small'>
                      <TableHead>
                        <TableRow className=' mx-40'>
                          <TableCell align='left' className='font-bold'>
                            Total
                          </TableCell>
                          <TableCell align='right' className='font-bold'>
                            {balanceSheetsData?.right_total?.toFixed(2) ||
                              '0.00'}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </td>
              </tr>
            </table>
          </div>
        </div>
      )}

      {balanceSheetDetails?.instances?.length > 0 && (
        <div
          ref={componentRefDetails}
          id='downloadPage'
          className='bg-white p-20'>
          <div className={`${classes.pageHead} `}>
            <div className='logoContainer pr-0 md:-pr-20 pt-10'>
              <img
                style={{
                  visibility: generalData.logo ? 'visible' : 'hidden',
                }}
                className='text-center'
                src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
                alt='Not found'
              />
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              borderBottom: '1px solid gray',
              marginBottom: '20px',
              marginTop: '-10px',
              fontSize: '10px',
            }}>
            <LocationOn fontSize='small' />
            {` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp;{' '}
            <PhoneEnabled fontSize='small' />
            {` ${generalData?.phone || ''}`}&nbsp; &nbsp;{' '}
            <Email fontSize='small' />
            {` ${generalData?.email || ''}`}
          </div>
          <div>
            <h4 className='text-center  font-bold text-sm py-5'>
              Balance Sheet Details Report for{' '}
              {balanceSheetDetails?.group_id?.name}
            </h4>
            {balanceSheetDetails?.date_after && (
              <h5 className='text-center  font-bold text-xs'>
                {getReportDateFromDateToTitle(
                  balanceSheetDetails?.date_after,
                  balanceSheetDetails?.date_before
                )}
              </h5>
            )}
          </div>

          <div className='px-20 mx-32'>
            <TableContainer className='border-0 '>
              <Table size='small'>
                <TableHead>
                  <TableRow className='border-1 border-current	mx-40 p-0'>
                    <TableCell className='border-0' rowSpan='2'>
                      &nbsp;
                    </TableCell>
                    <TableCell
                      className='border-1 border-current	p-0 text-center'
                      align='center'
                      colSpan='2'>
                      Closing Balance{' '}
                    </TableCell>
                  </TableRow>
                  <TableRow className='border-1  border-current	mx-40'>
                    <TableCell className='border-1 border-current	text-right p-0 '>
                      <b className='mr-20 '>Debit</b>
                    </TableCell>
                    <TableCell
                      className='border-1 border-current	 p-0'
                      align='right'>
                      <b>Credit</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balanceSheetDetails?.instances?.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => {
                        item?.is_clickable &&
                          handleRowClick(item.id, item?.group_or_ledger);
                        item?.is_clickable && setSerial([...serial, item?.id]);
                      }}
                      className='mx-40 cursor-pointer	'>
                      <TableCell className='border-1 border-current'>
                        {item.name}
                      </TableCell>
                      <TableCell
                        className='border-1 border-current'
                        align='right'>
                        {item.debit !== 0 && item.debit?.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className='border-1 border-current'
                        align='right'>
                        {item.credit !== 0 && item.credit?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow
                    className='mx-40 border-t-2'
                    style={{ backgroundColor: '#d9d9d9' }}>
                    <TableCell className='border-1 border-current text-right'>
                      <b>Total</b>
                    </TableCell>
                    <TableCell
                      className='border-1 border-current font-bold'
                      align='right'>
                      {totalLiabilities?.toFixed(2)}
                    </TableCell>
                    <TableCell
                      className='border-1 border-current font-bold'
                      align='right'>
                      {totalAssets?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default BalanceSheetReportsTable;
