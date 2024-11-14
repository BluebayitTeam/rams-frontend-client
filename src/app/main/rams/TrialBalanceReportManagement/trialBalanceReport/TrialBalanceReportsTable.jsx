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
  useGetTrialBalanceAllReportsQuery,
  useGetTrialBalanceReportsQuery,
} from '../TrialBalanceReportsApi';
import TrialBalanceFilterMenu from './TrialBalanceFilterMenu';
import {
  BASE_URL,
  GET_SITESETTINGS,
  TRIALBALANCE_FILTER_BY_ID,
} from 'src/app/constant/constants';
import { Email, LocationOn, PhoneEnabled } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const schema = z.object({});

function TrialBalanceReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { watch, getValues } = methods;

  const [
    modifiedTrialBalanceData,
    setModifiedTrialBalanceData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
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

  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  const filterData = watch();

  const { data: paginatedData } = useGetTrialBalanceReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
      page,
      size,
    },
    { skip: inShowAllMode }
  );

  const { data: allData } = useGetTrialBalanceAllReportsQuery(
    {
      date_after: filterData.date_after || '',
      date_before: filterData.date_before || '',
      branch: filterData.branch || '',
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTrialBalanceData(allData.trial_balance || []);
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
      setModifiedTrialBalanceData(paginatedData.trial_balance || []);
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

  const handleGetTrialBalances = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching trialBalances:', error);
    }
  }, []);

  const handleGetAllTrialBalances = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all trialBalances:', error);
    }
  }, []);

  const handleRowClick = (id, group_or_ledger) => {
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
        setModifiedTrialBalanceData(data?.instances || []);
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
    if (serial.length > 2) {
      const newSerial = [...serial];
      newSerial.pop();
      setSerial(newSerial);
      const lastElement = newSerial[newSerial.length - 1];
      handleRowClick(lastElement);
    } else {
      handleGetTrialBalances();

      setSerial([0]);
    }
  }
  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TrialBalanceFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTrialBalances={handleGetTrialBalances}
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
      {modifiedTrialBalanceData?.length > 0 && (
        <div ref={componentRef} id='downloadPage' className='bg-white p-20'>
          <div className={`${classes.pageHead} p-12`}>
            <div className='logoContainer pr-0 md:-pr-20'>
              <img
                style={{
                  visibility: generalData.logo ? 'visible' : 'hidden',
                  textAlign: 'center',
                }}
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
          <h3 className='text-center mb-20'>
            <u>Trial Balance</u>
          </h3>

          <div className='px-20 mx-32'>
            <TableContainer className='border-0'>
              <Table size='small'>
                <TableHead>
                  <TableRow className='border-t-1 border-b-1 border-current mx-40 p-0'>
                    <TableCell
                      className='border-l-1 border-current'
                      rowSpan='2'>
                      &nbsp;
                    </TableCell>
                    <TableCell
                      className='border-l-1 border-current border-r-1 p-0 text-center'
                      align='center'
                      colSpan='2'>
                      Closing Balance
                    </TableCell>
                  </TableRow>
                  <TableRow className='border-t-1 border-b-1 border-current mx-40'>
                    <TableCell
                      className='border-l-1 border-current p-0 ml-5 pr-5'
                      align='right'>
                      <b className='ml-20 pr-10'>Debit</b>
                    </TableCell>
                    <TableCell
                      className='border-l-1 border-r-1 border-current p-0'
                      align='right'>
                      <b>Credit</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modifiedTrialBalanceData?.map((item) =>
                    item.data?.map((item) => (
                      <TableRow
                        key={item.id}
                        onClick={() => {
                          if (item?.is_clickable) {
                            handleRowClick(item.id, item?.group_or_ledger);
                            setSerial((prevSerial) => [
                              ...prevSerial,
                              item?.id,
                            ]);
                          }
                        }}
                        style={{
                          cursor: item?.is_clickable ? 'pointer' : 'default',
                        }}
                        className='mx-40'>
                        <TableCell className='border-1 border-current'>
                          <b>{item.name}</b>
                        </TableCell>
                        <TableCell
                          className='border-1 border-current'
                          align='right'>
                          {item.debit !== 0 ? item.debit.toFixed(2) : '0.00'}
                        </TableCell>
                        <TableCell
                          className='border-1 border-current'
                          align='right'>
                          {item.credit !== 0 ? item.credit.toFixed(2) : '0.00'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}

                  <TableRow
                    className='mx-40 border-t-1 border-current'
                    style={{ backgroundColor: '#d9d9d9' }}>
                    <TableCell className='border-1 border-current'>
                      <b>Grand Total</b>
                    </TableCell>
                    <TableCell
                      className='border-1 border-current'
                      align='right'>
                      <b>{totalDr === 0 ? '0.00' : totalDr.toFixed(2)}</b>
                    </TableCell>
                    <TableCell
                      className='border-1 border-current'
                      align='right'>
                      <b>{totalCr === 0 ? '0.00' : totalCr.toFixed(2)}</b>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <table
            className={classes.pageFooterContainer}
            style={{ marginTop: '15px' }}>
            <tbody>
              <tr>
                <td>
                  <span style={{ textAlign: 'left' }}>
                    Printed Date & Time: {moment().format('DD/MM/YY')},{' '}
                    {moment().format('LT')}
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
    </div>
  );
}

export default TrialBalanceReportsTable;
