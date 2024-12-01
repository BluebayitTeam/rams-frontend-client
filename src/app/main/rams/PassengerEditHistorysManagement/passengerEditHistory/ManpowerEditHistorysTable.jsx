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
import { useGetManpowerEditHistorysQuery } from '../PassengerEditHistorysApi';
import ManpowerEditHistorysTableHead from './ManpowerEditHistorysTableHead';
import PassengerEditHistoryFilterMenu from './PassengerEditHistoryFilterMenu';

const initialTableColumnsState = [
  { id: 1, label: 'SL', sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: 'Name', name: 'username', show: true },
  { id: 3, label: 'Group', name: 'group', subName: 'name', show: true },
  { id: 4, label: 'District', name: 'city', show: true },
  { id: 5, label: 'Mobile', name: 'primary_phone', show: true },
  { id: 6, label: 'Email', name: 'email', show: true },
];

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

function ManpowerEditHistorysTable(props) {
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

  const manpowerEditHistorysId = getValues().username;

  const { data, refetch } = useGetManpowerEditHistorysQuery({
    manpowerEditHistorysId,
    page,
    size,
  });

  console.log('dataPrint', data);

  const ManpowerLogs = data?.manpower_logs || [];

  useEffect(() => {
    if (data) {
      setTotal(data.manpower_logs || []);
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

  console.log('printPagination', pageAndSize);

  function handleRequestSort(event, property) {
    const newOrder = { id: property, direction: 'desc' };

    if (tableOrder.id === property && tableOrder.direction === 'desc') {
      newOrder.direction = 'asc';
    }

    setTableOrder(newOrder);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(ManpowerLogs.map((n) => n.id));
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
      console.error('Error fetching manpowerlogs:', error);
    }
  }, []);

  const handleGetAllAgents = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all manpowerlogs:', error);
    }
  }, []);

  if (manpowerEditHistorysId?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'></motion.div>
    );
  }

  useEffect(() => {
    if (manpowerEditHistorysId) {
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      axios
        .get(
          ` ${GET_PASSENGER_BY_PASSENGER_ID}${manpowerEditHistorysId}`,
          authTOKEN
        )
        .then((res) => {
          setpId(res?.data?.manpower_id || 0);
          setpstatus(res?.data?.current_status || '');
          setpimage(res?.data?.manpower_pic || '');
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
  }, [manpowerEditHistorysId]);
  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <PassengerEditHistoryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerEditHistorys={handleGetPassengerEditHistorys}
          handleGetAllAgents={handleGetAllAgents}
          noData={noData}
          manpowerEditHistorysId={manpowerEditHistorysId}
          pId={pId}
          pstatus={pstatus}
          pimage={pimage}
        />
      </FormProvider>

      {noData ? (
        <div
          className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.noData}`}>
          <h1></h1>
        </div>
      ) : (
        <div
          style={{
            display: !manpowerEditHistorysId ? 'none' : 'block',
          }}>
          <div style={{ display: noData ? '' : 'block' }}>
            <div className='w-full flex flex-col'>
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
                    {' '}
                    Manpower
                  </h1>
                </center>
                <Table
                  stickyHeader
                  className='min-w-xl'
                  aria-labelledby='tableTitle'>
                  <ManpowerEditHistorysTableHead
                    selectedAgentIds={selected}
                    tableOrder={tableOrder}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={ManpowerLogs?.length}
                    onMenuItemClick={handleDeselect}
                  />

                  <TableBody>
                    {_.orderBy(
                      ManpowerLogs,
                      [tableOrder.id],
                      [tableOrder.direction]
                    )?.map((n) => {
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
                            {n.created_by?.first_name} {n.created_by?.last_name}
                          </TableCell>

                          <TableCell
                            className='p-4 md:p-16'
                            component='th'
                            scope='row'>
                            {n.new_visa_no}
                          </TableCell>

                          <TableCell
                            className='p-4 md:p-16'
                            component='th'
                            scope='row'>
                            {n.registration_id}
                          </TableCell>

                          <TableCell
                            className='p-4 md:p-16'
                            component='th'
                            scope='row'>
                            {n.man_power_status}
                          </TableCell>

                          <TableCell
                            className='p-4 md:p-16'
                            component='th'
                            scope='row'>
                            {n.man_power_date
                              ? moment(new Date(n.man_power_date)).format(
                                  'DD-MM-YYYY'
                                )
                              : ' '}
                          </TableCell>

                          <TableCell
                            className='p-4 md:p-16'
                            component='th'
                            scope='row'>
                            {n.submit_date
                              ? moment(new Date(n.submit_date)).format(
                                  'DD-MM-YYYY'
                                )
                              : ' '}
                          </TableCell>

                          <TableCell
                            className='p-4 md:p-16'
                            component='th'
                            scope='row'>
                            {n.delivery_date
                              ? moment(new Date(n.delivery_date)).format(
                                  'DD-MM-YYYY'
                                )
                              : ' '}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManpowerEditHistorysTable;
