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
import { rowsPerPageOptions } from 'src/app/@data/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { BASE_URL } from 'src/app/constant/constants';
import moment from 'moment';
import DescriptionIcon from '@mui/icons-material/Description';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import TableBody from '@mui/material/TableBody';
import _ from '@lodash';

import {
  selectFilteredPassengerEditHistorys,
  useGetPassengerEditHistorysQuery,
} from '../PassengerEditHistorysApi';
import PassengerEditHistoryFilterMenu from './PassengerEditHistoryFilterMenu';
import PassengerEditHistorysTableHead from './PassengerEditHistorysTableHead';

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

function PassengerEditHistorysTable(props) {
  const classes = useStyles();
  const methods = useForm();

  const { watch, getValues } = methods;

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pagination, setPagination] = useState(false);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState([]);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const componentRef = useRef(null);

  const passengerEditHistorysId = getValues().username;

  const { data, refetch } = useGetPassengerEditHistorysQuery({
    passengerEditHistorysId,
    page,
    size,
  });

  const PassengerLogs = data?.passenger_logs;

  useEffect(() => {
    if (data) {
      setTotal(data.passenger_logs || []);
    }
  }, [data, size, page]);

  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });
  let serialNumber = 1;

  useEffect(() => {
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);
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

  function handleChangePage(event, value) {
    setPage(value);
    setPageAndSize({ ...pageAndSize, page: value + 1 });
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPageAndSize({ ...pageAndSize, size: event.target.value });
  }
  const handleGetPassengerEditHistorys = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error('Error fetching passengerlogs:', error);
    }
  }, []);

  const handleGetAllAgents = useCallback(async () => {
    try {
    } catch (error) {
      console.error('Error fetching all passengerlogs:', error);
    }
  }, []);

  if (passengerEditHistorysId?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'></motion.div>
    );
  }

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <PassengerEditHistoryFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetPassengerEditHistorys={handleGetPassengerEditHistorys}
          handleGetAllAgents={handleGetAllAgents}
          passengerEditHistorysId={passengerEditHistorysId}
        />
      </FormProvider>

      <div className='w-full flex flex-col min-h-full px-10 '>
        <div className='grow overflow-x-auto overflow-y-auto'>
          <Table
            stickyHeader
            className='min-w-xl '
            aria-labelledby='tableTitle'>
            <PassengerEditHistorysTableHead
              selectedAgentIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={PassengerLogs?.length}
              onMenuItemClick={handleDeselect}
              rows={rows}
            />

            <TableBody>
              {_.orderBy(PassengerLogs, [tableOrder.id], [tableOrder.direction])

                .map((n) => {
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
                          ? moment(new Date(n.created_at)).format('DD-MM-YYYY')
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
                          ? moment(new Date(n.passport_issue_date)).format(
                              'DD-MM-YYYY'
                            )
                          : ' '}
                      </TableCell>
                      <TableCell
                        className='p-4 md:p-16'
                        component='th'
                        scope='row'>
                        {n.passport_expiry_date
                          ? moment(new Date(n.passport_expiry_date)).format(
                              'DD-MM-YYYY'
                            )
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
            page={page + 1}
            defaultPage={1}
            color='primary'
            showFirstButton
            showLastButton
            variant='outlined'
            shape='rounded'
            onChange={handlePagination}
          />

          <TablePagination
            className='shrink-0 mb-2'
            component='div'
            rowsPerPageOptions={rowsPerPageOptions}
            count={data?.total_elements}
            rowsPerPage={rowsPerPage}
            page={page}
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
  );
}

export default PassengerEditHistorysTable;
