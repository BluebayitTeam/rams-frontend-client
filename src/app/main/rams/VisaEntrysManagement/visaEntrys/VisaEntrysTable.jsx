/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import withRouter from '@fuse/core/withRouter';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from '@lodash';
import { Delete, Edit, PictureAsPdf } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Pagination, TableCell, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { BASE_URL } from 'src/app/constant/constants';
import {
  selectFilteredVisaEntrys,
  useGetVisaEntrysQuery,
} from '../VisaEntrysApi';
import VisaEntrysTableHead from './VisaEntrysTableHead';

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
    width: '100%',
    padding: '0 20px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}));

function VisaEntrysTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { navigate, searchKey } = props;
  const { reset, formState, watch, control, getValues, setValue } = useForm({
    mode: 'onChange',
    resolver: zodResolver(),
  });
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data, isLoading, refetch } = useGetVisaEntrysQuery({
    ...pageAndSize,
    searchKey,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const totalData = useSelector(selectFilteredVisaEntrys(data));
  const visaEntrys = useSelector(selectFilteredVisaEntrys(data?.visa_entries));

  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);
  useEffect(() => {
    refetch({ searchKey });
  }, []);
  let serialNumber = 1;

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
    refetch({ page, rowsPerPage });
  }, []);
  useEffect(() => {
    if (totalData?.visa_entries) {
      const modifiedRow = [
        {
          id: 'sl',
          align: 'left',
          disablePadding: false,
          label: 'SL',
          sort: true,
        },
      ];

      Object.entries(totalData?.visa_entries[0] || {})
        .filter(([key]) => key !== 'id' && key !== 'random_number') // Filter out the 'id' field
        .map(([key, value]) => {
          modifiedRow.push({
            id: key,
            label: key
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            align: 'left',
            disablePadding: false,
            sort: true,
            style: { whiteSpace: 'nowrap' },
          });
        });

      modifiedRow.push({
        id: 'action',
        align: 'left',
        disablePadding: false,
        label: 'Action',
        sort: true,
      });

      setRows(modifiedRow);
    }
  }, [totalData?.visaEntrys, visaEntrys]);

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
      setSelected(visaEntrys.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function _handleClick(item) {
    navigate(`/apps/visaEntry/visaEntrys/${item.id}/${item.handle}`);
  }

  function handleUpdateVisaEntry(item, event) {
    localStorage.removeItem('deleteVisaEntry');
    localStorage.setItem('updateVisaEntry', event);
    navigate(`/apps/visaEntry/visaEntrys/${item.id}/${item.handle}`);
  }

  function handleDeleteVisaEntry(item, event) {
    localStorage.removeItem('updateVisaEntry');
    localStorage.setItem('deleteVisaEntry', event);
    navigate(`/apps/visaEntry/visaEntrys/${item.id}/${item.handle}`);
  }

  // console.log('testDelete', handleDeleteVisaEntry);

  function _handleCheck(event, id) {
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

  if (visaEntrys?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no visaEntrys!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10 '>
      <div className='grow overflow-x-auto overflow-y-auto'>
        <TableContainer
          sx={{
            height: 'calc(100vh - 248px)',
            overflowY: 'auto',
          }}>
          <Table
            stickyHeader
            className='min-w-xl '
            aria-labelledby='tableTitle'>
            <VisaEntrysTableHead
              selectedVisaEntryIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={visaEntrys?.length}
              onMenuItemClick={handleDeselect}
              rows={rows}
            />

            <TableBody>
              {_.orderBy(
                visaEntrys,
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
                      style={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 1, backgroundColor: '#fff',

                      }}>
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}
                    </TableCell>
                    {Object?.entries(n)?.map(
                      ([key, value]) =>
                        key !== 'id' &&
                        key !== 'random_number' && (
                          <TableCell
                            className='p-4 md:p-16 border-t-1 border-gray-200'
                            component='th'
                            scope='row'
                            key={key}>
                            {key === 'file' ? (
                              n[key]?.split('.').pop()?.toLowerCase() ===
                                'pdf' ? (
                                <PictureAsPdf
                                  style={{
                                    color: 'red',
                                    cursor: 'pointer',
                                    display: 'block',
                                    fontSize: '35px',
                                  }}
                                  onClick={() =>
                                    window.open(`${BASE_URL}${n[key]}`)
                                  }
                                />
                              ) : ['doc', 'docx'].includes(
                                n[key]?.split('.').pop()?.toLowerCase()
                              ) ? (
                                <DescriptionIcon
                                  style={{
                                    color: 'blue',
                                    cursor: 'pointer',
                                    display: 'block',
                                    fontSize: '35px',
                                  }}
                                  onClick={() =>
                                    window.open(`${BASE_URL}${n[key]}`)
                                  }
                                />
                              ) : (
                                <img
                                  onClick={() =>
                                    n.file && showImage(`${BASE_URL}${n[key]}`)
                                  }
                                  src={
                                    n[key]
                                      ? `${BASE_URL}${n[key]}`
                                      : '/assets/images/logos/user.jpg'
                                  }
                                  style={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                  }}
                                  alt='uploaded file'
                                />
                              )
                            ) : (key === 'calling_date' ||
                              key === 'calling_exp_date' ||
                              key === 'visa_issue_date') &&
                              n[key] ? (
                              moment(new Date(n[key])).format('DD-MM-YYYY')
                            ) : (key === 'is_debtor' || key === 'is_paid') &&
                              n[key] !== undefined ? (
                              n[key] ? (
                                'Yes'
                              ) : (
                                'No'
                              )
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                    )}

                    <TableCell
                      className='p-4 md:p-16 whitespace-nowrap border-t-1  border-gray-200'
                      component='th'
                      scope='row'
                      align='right'
                      style={{
                        position: 'sticky',
                        right: 0,
                        zIndex: 1, backgroundColor: '#fff',

                      }}>
                      <Edit
                        onClick={(event) =>
                          handleUpdateVisaEntry(n, 'updateVisaEntry')
                        }
                        className='cursor-pointer custom-edit-icon-style'
                      />

                      <Delete
                        onClick={(event) =>
                          handleDeleteVisaEntry(n, 'deleteVisaEntry')
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
      </div>

      <div id='pagiContainer' className={classes.root}>
        <Pagination
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
          className='shrink-0 '
          component='div'
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalData?.total_elements}
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

export default withRouter(VisaEntrysTable);
