/* eslint-disable no-nested-ternary */

// Import necessary modules and components
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import { Pagination, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import {
  selectFilteredProvidentFunds,
  useGetProvidentFundsQuery,
} from '../ProvidentFundsApi';
import PrintProvidentFund from './PrintProvidentFund';
import ProvidentFundsTableHead from './ProvidentFundsTableHead';

/**
 * The providentFunds table.
 */

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    bottom: 12,
    padding: '0px 20px 10px 20px',
    backgroundColor: '#fff',
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

function ProvidentFundsTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetProvidentFundsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredProvidentFunds(data));
  const providentFunds = useSelector(
    selectFilteredProvidentFunds(data?.instances)
  );
  let serialNumber = 1;

  const printProvidentFundRef = useRef();

  const handlePrint = n => {
    printProvidentFundRef.current.doPrint(n);
  };


  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
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
      setSelected(providentFunds.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/providentFund/providentFunds/${item.id}/${item.handle}`);
  }

  function handleUpdateProvidentFund(item, event) {
    localStorage.removeItem('deleteProvidentFund');
    localStorage.setItem('updateProvidentFund', event);
    navigate(
      `/apps/providentFund/providentFunds/${item.id}/${item.invoice_no}`
    );
  }

  function handleDeleteProvidentFund(item, event) {
    localStorage.removeItem('updateProvidentFund');
    localStorage.setItem('deleteProvidentFund', event);
    navigate(
      `/apps/providentFund/providentFunds/${item.id}/${item.invoice_no}`
    );
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

  if (providentFunds?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no providentFunds!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10'>
      <PrintProvidentFund ref={printProvidentFundRef} title="Provident Fund" type="payment" />
      <FuseScrollbars className='grow overflow-x-auto'>
        <TableContainer
          sx={{
            height: 'calc(100vh - 248px)',
            overflowY: 'auto',
          }}
        >
          <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'

          >
            <ProvidentFundsTableHead
              selectedProvidentFundIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={providentFunds?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                providentFunds,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-20 cursor-pointer border-t-1  border-gray-200'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}>

                    <TableCell
                      className='w-40 md:w-64 border-t-1  border-gray-200'
                      component='th'
                      scope='row'
                    // style={{
                    //   position: 'sticky',
                    //   left: 0,
                    //   zIndex: 1,
                    //   backgroundColor: '#fff',
                    // }}
                    >
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-12  whitespace-nowrap border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.payment_date &&
                        moment(new Date(n.payment_date)).format(
                          'DD-MM-YYYY'
                        )}{' '}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.branch?.name}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.invoice_no}
                    </TableCell>

                    <TableCell
                      className='p-4 md:p-12  whitespace-nowrap	border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.related_ledgers?.toString()}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 border-t-1  border-gray-200" component="th" scope="row">
                      {`${n?.details ? n?.details + ',' : ''} ${n.ledger?.name || ''}`}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 border-t-1  border-gray-200" component="th" scope="row">
                      {n.debit_amount}
                    </TableCell>


                    <TableCell
                      className='p-4 md:p-16 whitespace-nowrap border-t-1  border-gray-200'
                      component='th'
                      scope='row'
                      align='right'
                    // style={{
                    //   position: 'sticky',
                    //   right: 0,
                    //   zIndex: 1,
                    //   backgroundColor: '#fff',
                    // }}
                    >
                      <PrintIcon
                        className='cursor-pointer custom-print-icon-style'
                        onClick={() => printProvidentFundRef.current.doPrint(n)}
                      />
                      <Edit
                        onClick={(event) =>
                          handleUpdateProvidentFund(n, 'updateProvidentFund')
                        }
                        className='cursor-pointer custom-edit-icon-style'
                      />

                      <Delete
                        onClick={(event) =>
                          handleDeleteProvidentFund(n, 'deleteProvidentFund')
                        }
                        className='cursor-pointer custom-delete-icon-style'
                      />
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
    </div >
  );
}

export default withRouter(ProvidentFundsTable);
