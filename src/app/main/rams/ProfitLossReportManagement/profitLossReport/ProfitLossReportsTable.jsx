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
  useGetProfitLossAllReportsQuery,
  useGetProfitLossReportsQuery,
} from '../ProfitLossReportsApi';
import ProfitLossFilterMenu from './ProfitLossFilterMenu';
import {
  BASE_URL,
  GET_SITESETTINGS,
  TRIALBALANCE_FILTER_BY_ID,
} from 'src/app/constant/constants';
import { Email, LocationOn, PhoneEnabled } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

function ProfitLossReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { watch, getValues } = methods;
  const navigate = useNavigate();
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
  const [profitLossDetails, setProfitLossDetailsData] = useState([]);
  const [totalLeftTotal, setTotalLeftTotal] = useState(0);
  const [totalRightTotal, setTotalRightTotal] = useState(0);

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [show, setShow] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetProfitLossReportsQuery(
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

  const { data: allData } = useGetProfitLossAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedProfitLossData(allData.profit_loss || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.profit_loss,
        size,
        page
      );
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      const allData = paginatedData?.profit_loss;

      setProfitLossDetailsData(allData);
      setTotalLeftTotal(paginatedData?.left_total);
      setTotalRightTotal(paginatedData?.right_total);
      setTotalCr(paginatedData?.total_cr);
      setTotalDr(paginatedData?.total_dr);
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

  const handleGetProfitLosss = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching profitLosss:', error);
    }
  }, []);

  const handleRowClick = (id, group_or_ledger) => {
    console.log('groupId', id);
    // push(id);
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };
    fetch(
      `${TRIALBALANCE_FILTER_BY_ID}?date_after=${getValues().date_after || ''}&date_before=${
        getValues().date_before || ''
      }&group_or_ledger=${group_or_ledger || ''}&branch=${getValues().branch || ''}&group_id=${id || ''}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) => {
        setProfitLossDetailsData(data?.instances || []);
        setTotalCr(data?.total_cr);
        setTotalDr(data?.total_dr);
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
      const newSerial = [...serial];
      newSerial.pop();
      setSerial(newSerial);
      const lastElement = newSerial[newSerial.length - 1];
      handleRowClick(lastElement);
    } else {
      if (!inShowAllMode && paginatedData) {
        const allData = paginatedData?.profit_loss;

        setProfitLossDetailsData(allData);
      }

      setSerial([0]);
    }
  }

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <ProfitLossFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetProfitLosss={handleGetProfitLosss}
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
      <div ref={componentRef} id='downloadPage' className='bg-white p-20'>
        {(profitLossDetails?.left_upper?.length > 0 ||
          profitLossDetails?.right_upper?.length > 0) && (
          <div className='bg-white p-20'>
            <div className={`${classes.pageHead} p-12`}>
              <div className='logoContainer pr-0 md:-pr-20'>
                <img
                  style={{
                    visibility: generalData.logo ? 'visible' : 'hidden',
                    textAlign: 'center',
                  }}
                  src={
                    generalData.logo ? `${BASE_URL}${generalData.logo}` : null
                  }
                  alt='Not found'
                />
              </div>
            </div>
            <div className='text-center border-b border-solid border-gray-400 mb-20 mt-[-10px] text-xs'>
              <LocationOn className='text-xs' />
              {` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp;{' '}
              <PhoneEnabled className='text-xs' />
              {` ${generalData?.phone || ''}`}&nbsp; &nbsp;{' '}
              <Email className='text-xs' />
              {` ${generalData?.email || ''}`}
            </div>

            <h3 className='text-center mb-10'>
              <u>Profit & Loss A/C</u>
            </h3>
            <div className='px-20 mx-32'>
              <table width='100%' style={{ padding: '20px' }}>
                <tr>
                  {/* Left Side */}
                  <td
                    valign='top'
                    style={{
                      // borderLeft: '1px solid black',
                      borderTop: '1px solid black',
                      borderRight: '1px solid black',
                    }}>
                    <TableContainer valign='top' className='border-0'>
                      <Table size='small' style={{ borderStyle: 'hidden' }}>
                        <TableHead>
                          <TableRow className='border-1  border-current mx-40'>
                            <TableCell
                              align='left'
                              className='boder-b-1 border-l-1 border-current'>
                              <b>Particulars</b>
                            </TableCell>
                            <TableCell
                              align='right'
                              className='boder-b-1 border-current'>
                              &nbsp;
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {profitLossDetails?.left_upper?.map((item) => (
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
                              style={{ cursor: 'pointer' }}
                              className='mx-40'>
                              <TableCell className='border-0'>
                                <b>{item.name}</b>
                              </TableCell>
                              <TableCell className='border-0' align='right'>
                                {item.amount}
                              </TableCell>
                            </TableRow>
                          ))}

                          <TableRow
                            style={{ cursor: 'pointer' }}
                            className='mx-40'>
                            <TableCell className='border-0'>
                              <b>&nbsp;</b>
                            </TableCell>
                            <TableCell
                              className='border-t-1 border-b-0 border-current'
                              align='right'>
                              {profitLossDetails?.left_upper?.reduce(
                                (total, obj) => total + obj?.amount,
                                0
                              )}
                            </TableCell>
                          </TableRow>

                          {profitLossDetails?.left_lower?.map((item) => (
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
                              style={{ cursor: 'pointer' }}
                              className='mx-40'>
                              <TableCell className='border-0'>
                                <b>{item.name}</b>
                              </TableCell>
                              <TableCell className='border-0' align='right'>
                                {item.amount}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </td>
                  {/* Right Side */}
                  <td
                    valign='top'
                    style={{
                      borderLeft: '1px solid black',
                      borderTop: '1px solid black',
                      // borderRight: '1px solid black'
                    }}>
                    <TableContainer className='border-0'>
                      <Table size='small'>
                        <TableHead>
                          <TableRow className='mx-40 '>
                            <TableCell
                              align='left'
                              className='boder-b-1 border-current'>
                              <b>Particulars</b>
                            </TableCell>
                            <TableCell
                              align='right'
                              className='boder-b-1 border-current'>
                              &nbsp;
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {profitLossDetails?.right_upper?.map((item) => (
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
                              style={{ cursor: 'pointer' }}
                              className='mx-40'>
                              <TableCell className='border-0'>
                                <b>{item.name}</b>
                              </TableCell>
                              <TableCell className='border-0' align='right'>
                                {item.amount}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow
                            style={{ cursor: 'pointer' }}
                            className='mx-40'>
                            <TableCell className='border-0'>
                              <b>&nbsp;</b>
                            </TableCell>
                            <TableCell
                              className='border-t-1 border-b-0 border-current'
                              align='right'>
                              {profitLossDetails?.right_upper?.reduce(
                                (total, obj) => total + obj?.amount,
                                0
                              )}
                            </TableCell>
                          </TableRow>
                          {profitLossDetails?.right_lower?.map((item) => (
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
                              style={{ cursor: 'pointer' }}
                              className='mx-40'>
                              <TableCell className='border-0'>
                                <b>{item.name}</b>
                              </TableCell>
                              <TableCell className='border-0' align='right'>
                                {item.amount}
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
                  <td>
                    <TableContainer
                      style={{ border: 'none' }}
                      className='border-0'>
                      <Table size='small'>
                        <TableHead>
                          <TableRow
                            className='mx-40'
                            style={{
                              borderTop: '1px solid black',
                            }}>
                            <TableCell align='left'>
                              <b>Total</b>
                            </TableCell>
                            <TableCell align='right'>
                              {totalLeftTotal}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </td>
                  {/* Right Side */}
                  <td>
                    <TableContainer className='border-0'>
                      <Table size='small'>
                        <TableHead>
                          <TableRow
                            className=' mx-40'
                            style={{
                              borderTop: '1px solid black',
                            }}>
                            <TableCell align='left'>
                              <b>Total</b>
                            </TableCell>
                            <TableCell align='right'>
                              {totalRightTotal}
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

        {profitLossDetails?.length > 0 && (
          <div className='bg-white p-20'>
            <div className={`${classes.pageHead} p-12`}>
              <div className='logoContainer pr-0 md:-pr-20'>
                <img
                  style={{
                    visibility: generalData.logo ? 'visible' : 'hidden',
                    textAlign: 'center',
                  }}
                  src={
                    generalData.logo ? `${BASE_URL}${generalData.logo}` : null
                  }
                  alt='Not found'
                />
              </div>
            </div>
            <div className='text-center border-b border-solid border-gray-400 mb-20 mt-[-10px] text-xs'>
              <LocationOn className='text-xs' />
              {` ${generalData?.address}` || ''} &nbsp; &nbsp; &nbsp;{' '}
              <PhoneEnabled className='text-xs' />
              {` ${generalData?.phone || ''}`}&nbsp; &nbsp;{' '}
              <Email className='text-xs' />
              {` ${generalData?.email || ''}`}
            </div>

            <h3 className='text-center mb-20'>
              <u>Profit & Loss A/C</u>
            </h3>
            <div className='px-20 mx-32'>
              <TableContainer className='border-0 '>
                <Table size='small'>
                  <TableHead>
                    <TableRow className='border-t-1 border-b-1 border-current	mx-40 p-0'>
                      <TableCell className='border-0' rowSpan='2'>
                        &nbsp;
                      </TableCell>
                      <TableCell
                        className='border-l-1 border-current	p-0 text-center'
                        align='center'
                        colSpan='2'>
                        Closing Balance{' '}
                      </TableCell>
                    </TableRow>
                    <TableRow className='border-t-1 border-b-1 border-current	mx-40'>
                      <TableCell
                        className='border-l-1 border-current	p-0 ml-5'
                        align='left'>
                        <b className='ml-20'>Debit</b>
                      </TableCell>
                      <TableCell
                        className='border-l-1 border-current	 p-0'
                        align='right'>
                        <b>Credit</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profitLossDetails?.map((item) => (
                      <TableRow
                        key={item.id}
                        onClick={() => {
                          const isClickable = item?.is_clickable;

                          if (isClickable) {
                            handleRowClick(item.id, item?.group_or_ledger);
                            setSerial([...serial, item?.id]);

                            const reportName = item?.name;

                            if (reportName) {
                              const reportType = {
                                Donation: 'donationPayment-report',
                                Treatment: 'treatmentPayment-report',
                                'Financial Assistance':
                                  'financialAssistancePayment-report',
                                'Welfare Fund':
                                  'welfareFundCombineReceipts-report',
                                'Member Renewal': 'memberRenewalReceipt-report',
                                NOC: 'nocReceipt-report/:redirect?',
                                Compensation:
                                  'compensationPayment-report/:redirect?',
                              }[reportName];

                              if (reportType) {
                                navigate(
                                  `/apps/report-management/${reportType}/true/${
                                    getValues()?.branch || ' '
                                  }/${getValues().date_after}/${
                                    getValues().date_before
                                  }`
                                );
                              }
                            }
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                        className='mx-40'>
                        <TableCell className='border-0'>
                          <b>{item.name}</b>
                        </TableCell>
                        <TableCell className='border-0' align='left'>
                          {item.debit !== 0 && item.debit}
                        </TableCell>
                        <TableCell className='border-0' align='right'>
                          {item.credit !== 0 && item.credit}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className='mx-40 border-t-1 border-current'>
                      <TableCell className='border-0'>
                        <b>Grand Total:</b>
                      </TableCell>
                      <TableCell className='border-0' align='left'>
                        {totalDr == 0 ? ' ' : totalDr}
                      </TableCell>
                      <TableCell className='border-0' align='right'>
                        {totalCr == 0 ? ' ' : totalCr}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfitLossReportsTable;
