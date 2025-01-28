/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import { Checkbox, Pagination, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import SalaryPaymentsTableHead from './SalaryPaymentsTableHead';

import {
  selectFilteredSalaryPayments,
  useGetSalaryPaymentsQuery,
} from '../SalaryPaymentsApi';
import moment from 'moment';

/**
 * The salaryPayments table.
 */

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    bottom: 15,
    backgroundColor: '#fff',
    padding: '10px 20px',
    zIndex: 1000,
    borderTop: '1px solid #ddd',
    width: 'calc(100% - 350px)',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}));

function SalaryPaymentsTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const classes = useStyles();

  const { data, isLoading, refetch } = useGetSalaryPaymentsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredSalaryPayments(data));
  const salaryPayments = useSelector(
    selectFilteredSalaryPayments(data?.salary_payments)
  );
  let serialNumber = 1;
  const user_role = localStorage.getItem('user_role');

  useEffect(() => {
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);
  const [selected, setSelected] = useState([]);

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
      setSelected(salaryPayments?.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/salaryPayment/salaryPayments/${item.id}/${item.handle}`);
  }

  function handleUpdateSalaryPayment(item, event) {
    localStorage.removeItem('deleteSalaryPayment');
    localStorage.setItem('updateSalaryPayment', event);
    navigate(`/apps/salaryPayment/salaryPayments/${item.id}/${item.handle}`);
  }

  function handleDeleteSalaryPayment(item, event) {
    localStorage.removeItem('updateSalaryPayment');
    localStorage.setItem('deleteSalaryPayment', event);
    navigate(`/apps/salaryPayment/salaryPayments/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  // pagination
  const handlePagination = (e, handlePage) => {
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

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
    );
  }

  if (salaryPayments?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no salaryPayments!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10'>
      <FuseScrollbars className='grow overflow-x-auto'>
        <TableContainer
          sx={{
            height: 'calc(100vh - 250px)',
            overflowY: 'auto',
          }}>
          <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
            <SalaryPaymentsTableHead
              selectedSalaryPaymentIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={salaryPayments?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                salaryPayments,
                [
                  (o) => {
                    switch (tableOrder.id) {
                      case 'categories': {
                        return o.categories[0];
                      }
                      default: {
                        return o[tableOrder.id];
                      }
                    }
                  },
                ],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                // Check if the salary id matches 30
                const employees = n?.employees;

                let displayEmployees = employees
                  ?.slice(0, 3) // Get up to the first 3 items
                  ?.map((employee) => `${employee.first_name}`)
                  .join(', ');

                if (employees?.length > 3) {
                  const remainingCount = employees.length - 3;
                  // const remainingEmployees = employees.slice(3); // Get remaining employees
                  displayEmployees += `", and ${remainingCount} more`;
                }
                return (
                  <TableRow
                    className='h-52 cursor-pointer'
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
                      className='whitespace-nowrap p-4 md:p-16  border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.date && moment(new Date(n.date)).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.branch?.name}
                    </TableCell>
                    {/* <TableCell className="whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200" component="th" scope="row">
										{n.name}
									</TableCell> */}
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.invoice_no}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {`"${displayEmployees}` || '--'}
                    </TableCell>

                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.payment_account?.name}
                    </TableCell>

                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.total_amount}
                    </TableCell>

                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      align='center'
                      component='th'
                      scope='row'>
                      <div className='flex flex-nowrap'>
                        {/* <Tooltip title="Print" placement="top" enterDelay={300}>
												<PrintIcon
													className="cursor-pointer mr-3"
													style={{ color: 'blue' }}
													onClick={() => printSalaryRef.current.doPrint(n)}
												/>
											</Tooltip> */}
                        <Tooltip title='Edit' placement='top' enterDelay={300}>
                          <Edit
                            style={{
                              color: 'green',
                            }}
                            onClick={() => handleUpdatePaymentSalary(n)}
                            className='cursor-pointer'
                          />
                        </Tooltip>

                        <Tooltip
                          title='Delete'
                          placement='top'
                          enterDelay={300}>
                          <Delete
                            onClick={() =>
                              handleDeletePaymentSalary(n, 'Delete')
                            }
                            className='cursor-pointer'
                            style={{
                              color: 'red',
                            }}
                          />
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FuseScrollbars>
      <div className={classes.root} id='pagiContainer'>
        <Pagination
          classes={{ ul: 'flex-nowrap' }}
          count={totalData?.total_pages}
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
          component='div'
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalData?.total_pages}
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
  );
}

export default withRouter(SalaryPaymentsTable);
