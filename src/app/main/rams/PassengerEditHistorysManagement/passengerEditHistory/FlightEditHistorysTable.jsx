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

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import FlightEditHistorysHead from './FlightEditHistorysHead';

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

function FlightEditHistorysTable({ flightEditHistorysData }) {
  const classes = useStyles();
  const methods = useForm();

  const { watch, getValues } = methods;

  const [page, setPage] = useState('1');
  const [size, setSize] = useState('30');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState([]);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  console.log('dataPrint', flightEditHistorysData);

  const FlightLogs = flightEditHistorysData?.flight_logs || [];

  useEffect(() => {
    if (flightEditHistorysData) {
      setTotal(flightEditHistorysData.flight_logs || []);
    }
  }, [flightEditHistorysData, size, page]);

  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

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
      setSelected(FlightLogs.map((n) => n.id));
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
      console.error('Error fetching flightlogs:', error);
    }
  }, []);

  const handleGetAllAgents = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all flightlogs:', error);
    }
  }, []);

  if (flightEditHistorysData?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'></motion.div>
    );
  }

  console.log('PrintFlight', flightEditHistorysData?.length);

  return (
    <div className={classes.headContainer}>
      <div className='w-full flex flex-col'>
        <div className={classes.headContainer}>
          <div className='w-full flex flex-col'>
            {FlightLogs && FlightLogs.length > 0 ? (
              <>
                <div className='grow overflow-x-auto overflow-y-auto'>
                  <center>
                    <h1
                      style={{
                        fontWeight: '600',
                        color: '#0727c7',
                        backgroundColor: '#dbdbe1',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                      }}>
                      Flight
                    </h1>
                  </center>

                  <Table
                    stickyHeader
                    className='min-w-xl'
                    aria-labelledby='tableTitle'>
                    <FlightEditHistorysHead
                      selectedAgentIds={selected}
                      tableOrder={tableOrder}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={FlightLogs?.length}
                      onMenuItemClick={handleDeselect}
                    />
                    <TableBody>
                      {_.orderBy(
                        FlightLogs,
                        [tableOrder.id],
                        [tableOrder.direction]
                      ).map((n, index) => {
                        const isSelected = selected.indexOf(n.id) !== -1;
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
                              className='w-40 md:w-64 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {pageAndSize.page * pageAndSize.size -
                                pageAndSize.size +
                                serialNumber++}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.created_at
                                ? moment(new Date(n.created_at)).format(
                                    'DD-MM-YYYY'
                                  )
                                : ' '}{' '}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.created_by?.first_name}{' '}
                              {n.created_by?.last_name}
                            </TableCell>
                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.submit_date}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.profession_english}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.profession_arabic}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.salary}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.stamping_status}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.stamping_date
                                ? moment(new Date(n.stamping_date)).format(
                                    'DD-MM-YYYY'
                                  )
                                : ' '}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.visa_expiry_date
                                ? moment(new Date(n.visa_expiry_date)).format(
                                    'DD-MM-YYYY'
                                  )
                                : ' '}
                            </TableCell>

                            <TableCell
                              className='p-4 md:p-16 border-t-1  border-gray-200'
                              component='th'
                              scope='row'>
                              {n.delivery_date
                                ? moment(new Date(n.delivery_date)).format(
                                    'DD-MM-YYYY'
                                  )
                                : ' '}{' '}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div id='pagiContainer' className='flex justify-between mb-6'>
                  <Pagination
                    count={flightEditHistorysData?.total_pages}
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
                    count={flightEditHistorysData?.total_elements || 0}
                    rowsPerPage={rowsPerPage}
                    page={pageAndSize.page - 1}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </>
            ) : (
              <div className='text-center mt-6'></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightEditHistorysTable;
