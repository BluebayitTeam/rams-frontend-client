import { makeStyles } from '@mui/styles';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { Pagination, TableCell } from '@mui/material';
import {
  rowsPerPageOptionHistorys,
  rowsPerPageOptions,
} from 'src/app/@data/data';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BASE_URL,
  GET_PASSENGER_BY_PASSENGER_ID,
} from 'src/app/constant/constants';
import moment from 'moment';
import DescriptionIcon from '@mui/icons-material/Description';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import TableBody from '@mui/material/TableBody';
import _ from '@lodash';

import {
  selectFilteredPassengerEditHistorys,
  useGetEmbassyEditHistorysQuery,
  useGetFlightEditHistorysQuery,
  useGetManpowerEditHistorysQuery,
  useGetMedicalEditHistorysQuery,
  useGetMofaEditHistorysQuery,
  useGetMusanedOkalaEditHistorysQuery,
  useGetOfficeWorkEditHistorysQuery,
  useGetPassengerEditHistorysQuery,
  useGetTrainingEditHistorysQuery,
} from '../PassengerEditHistorysApi';
import PassengerEditHistoryFilterMenu from './PassengerEditHistoryFilterMenu';
import PassengerEditHistorysTableHead from './PassengerEditHistorysTableHead';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import ManpowerEditHistorysTable from './ManpowerEditHistorysTable';
import EmbassyEditHistorysTable from './EmbassyEditHistorysTable';
import FlightEditHistorysTable from './FlightEditHistorysTable';
import MedicalEditHistorysTable from './MedicalEditHistorysTable';
import MofaEditHistorysTable from './MofaEditHistorysTable';
import MusanedOkalaEditHistorysTable from './MusanedOkalaEditHistorysTable';
import OfficeWorkEditHistorysTable from './OfficeWorkEditHistorysTable';
import TrainingEditHistorysTable from './TrainingEditHistorysTable';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    overflow: 'auto',
    minHeight: '35px',
  },
  toolbar: {
    '& > div': {
      minHeight: 'fit-content',
    },
  },
}));

function PassengerEditHistorysTable(props) {
  const classes = useStyles();
  const methods = useForm();

  const { watch, getValues } = methods;

  const [page, setPage] = useState('1');
  const [size, setSize] = useState('30');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState([]);
  const [totalManpower, setTotalManpower] = useState([]);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);
  const [isValidPassengerId, setIsValidPassengerId] = useState(false);

  const passengerEditHistorysId = getValues().username;

  useEffect(() => {
    if (passengerEditHistorysId) {
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      axios
        .get(
          ` ${GET_PASSENGER_BY_PASSENGER_ID}${passengerEditHistorysId}`,
          authTOKEN
        )
        .then((res) => {
          setpId(res?.data?.passenger_id || 0);
          setpstatus(res?.data?.current_status || '');
          setpimage(res?.data?.passenger_pic || '');
          if (res?.data?.id) {
            setNoData(false);
          } else {
            setNoData(true);
          }
        })
        .catch(() => {
          setpId(0);
          setNoData(true);
          setpimage('');
          setpstatus('');
        });
    }
  }, [passengerEditHistorysId]);

  const { data } = useGetPassengerEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });

  const { data: manpowerEditHistorysData, refetch } =
    useGetManpowerEditHistorysQuery({
      passengerEditHistorysId,
      page,
      size,
    });

  const { data: embassyEditHistorysData } = useGetEmbassyEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });
  const { data: flightEditHistorysData } = useGetFlightEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });
  const { data: medicalEditHistorysData } = useGetMedicalEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });

  const { data: musanedokalaEditHistorysData } =
    useGetMusanedOkalaEditHistorysQuery({
      passengerEditHistorysId,
      page,
      size,
    });
  const { data: mofaEditHistorysData } = useGetMofaEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });

  const { data: officeWorkEditHistorysData } =
    useGetOfficeWorkEditHistorysQuery({
      passengerEditHistorysId,
      page,
      size,
    });
  const { data: trainingEditHistorysData } = useGetTrainingEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });

  const PassengerLogs = data?.passenger_logs || [];

  useEffect(() => {
    if (data) {
      setTotal(data.passenger_logs || []);
    }
  }, [data, size, page]);

  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

  const [noData, setNoData] = useState(false);
  const [pimage, setpimage] = useState('');
  const [pstatus, setpstatus] = useState('');
  const [pId, setpId] = useState(0);
  let serialNumber = 1;

  const [tableOrder, setTableOrder] = useState({
    direction: 'asc',
    id: '',
  });

  function handleRequestSort(event, property) {
    const newOrder = { id: property, direction: 'desc' };

    if (tableOrder.id === property && tableOrder.direction === 'desc') {
      newOrder.direction = 'asc';
    }

    setTableOrder(newOrder);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(PassengerLogs.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }
  // pagination
  const handlePagination = (event, handlePage) => {
    setPageAndSize({ ...pageAndSize, page: handlePage });
    setPage(handlePage - 1);
  };

  function handleChangePage(event, newPage) {
    // `newPage` is zero-based from TablePagination
    setPageAndSize({ ...pageAndSize, page: newPage + 1 }); // Convert to 1-based
  }

  function handleChangeRowsPerPage(event) {
    const newSize = parseInt(event.target.value, 10); // Parse the new size
    setRowsPerPage(newSize); // Update rows per page
    setPageAndSize({ page: 1, size: newSize }); // Reset to the first page
  }
  const handleGetPassengerEditHistorys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passengerlogs:', error);
    }
  }, []);

  return (
    <div className={classes.headContainer}>
      {passengerEditHistorysId?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className='flex flex-1 items-center justify-center h-full'
        />
      ) : (
        <>
          <FormProvider {...methods}>
            <PassengerEditHistoryFilterMenu
              inShowAllMode={inShowAllMode}
              handleGetPassengerEditHistorys={handleGetPassengerEditHistorys}
              noData={noData}
              passengerEditHistorysId={passengerEditHistorysId}
              pId={pId}
              pstatus={pstatus}
              pimage={pimage}
            />
          </FormProvider>
          <div className='w-full flex flex-col'>
            {PassengerLogs && PassengerLogs.length > 0 ? (
              <>
                <div className='grow overflow-x-auto overflow-y-auto '>
                  <center>
                    <h1
                      style={{
                        fontWeight: '600',
                        color: '#0727c7',
                        backgroundColor: '#dbdbe1',
                        padding: '10px',
                      }}>
                      Passenger
                    </h1>
                  </center>
                  <Table
                    stickyHeader
                    className='min-w-xl'
                    aria-labelledby='tableTitle'>
                    <PassengerEditHistorysTableHead
                      selectedAgentIds={selected}
                      tableOrder={tableOrder}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={PassengerLogs?.length}
                      onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                      {_.orderBy(
                        PassengerLogs,
                        [tableOrder.id],
                        [tableOrder.direction]
                      )?.map((n, index) => {
                        const isSelected = selected.includes(n.id);
                        const serial =
                          pageAndSize.page * pageAndSize.size -
                          pageAndSize.size +
                          index +
                          1;

                        return (
                          <TableRow
                            className='h-72 cursor-pointer'
                            hover
                            role='checkbox'
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}>
                            <TableCell
                              className='w-40 md:w-64'
                              component='th'
                              scope='row'>
                              {pageAndSize.page * pageAndSize.size -
                                pageAndSize.size +
                                serialNumber++}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.created_at
                                ? moment(new Date(n.created_at)).format(
                                    'DD-MM-YYYY'
                                  )
                                : ' '}{' '}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.created_by?.first_name}{' '}
                              {n.created_by?.last_name}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.agent}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.demand}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.profession}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.agency}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.target_country}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passenger_type}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.current_status}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.visa_entry}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.police_station}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.district}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passenger_name}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.gender}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.date_of_birth
                                ? moment(new Date(n.date_of_birth)).format(
                                    'DD-MM-YYYY'
                                  )
                                : ' '}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.nid}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.father_name}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.mother_name}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.spouse_name}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.religion}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.marital_status}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passport_no}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passport_type}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passport_issue_date
                                ? moment(
                                    new Date(n.passport_issue_date)
                                  ).format('DD-MM-YYYY')
                                : ' '}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passport_expiry_date
                                ? moment(
                                    new Date(n.passport_expiry_date)
                                  ).format('DD-MM-YYYY')
                                : ' '}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.village}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.post_office}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.contact_no}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.emergency_contact_no}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.place_of_birth}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.place_of_residence}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.passport_issue_place}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16'
                              component='th'
                              scope='row'>
                              {n.notes}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div id='pagiContainer' className='flex justify-between mb-6'>
                  <Pagination
                    count={data?.total_pages}
                    defaultPage={1}
                    color='primary'
                    showFirstButton
                    showLastButton
                    variant='outlined'
                    shape='rounded'
                    onChange={handlePagination}
                  />
                  <TablePagination
                    classes={{ root: 'overflow-visible' }}
                    component='div'
                    rowsPerPageOptions={rowsPerPageOptionHistorys}
                    count={data?.total_elements || 0}
                    rowsPerPage={rowsPerPage}
                    page={pageAndSize.page - 1}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </>
            ) : (
              <div className='text-center mt-6'></div>
            )}
          </div>
        </>
      )}
      <ManpowerEditHistorysTable
        manpowerEditHistorysData={manpowerEditHistorysData}
        passengerEditHistorysId={passengerEditHistorysId}
        refetch={refetch}
      />
      <EmbassyEditHistorysTable
        embassyEditHistorysData={embassyEditHistorysData}
      />
      <FlightEditHistorysTable
        flightEditHistorysData={flightEditHistorysData}
      />
      <MedicalEditHistorysTable
        medicalEditHistorysData={medicalEditHistorysData}
      />{' '}
      <MofaEditHistorysTable mofaEditHistorysData={mofaEditHistorysData} />
      <MusanedOkalaEditHistorysTable
        musanedokalaEditHistorysData={musanedokalaEditHistorysData}
      />{' '}
      <OfficeWorkEditHistorysTable
        officeWorkEditHistorysData={officeWorkEditHistorysData}
      />{' '}
      <TrainingEditHistorysTable
        trainingEditHistorysData={trainingEditHistorysData}
      />
    </div>
  );
}

export default PassengerEditHistorysTable;
