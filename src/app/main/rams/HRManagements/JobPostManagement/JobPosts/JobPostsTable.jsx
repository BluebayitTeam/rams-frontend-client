/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import { Pagination, TableContainer, Tooltip } from '@mui/material';
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
import JobPostsTableHead from './JobPostsTableHead';

import { selectFilteredJobPosts, useGetJobPostsQuery } from '../JobPostsApi';

/**
 * The JobPosts table.
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

function JobPostsTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const classes = useStyles();
  const { data, isLoading, refetch } = useGetJobPostsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredJobPosts(data));
  const JobPosts = useSelector(selectFilteredJobPosts(data?.job_posts));
  let serialNumber = 1;

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
      setSelected(JobPosts.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/JobPost/JobPosts/${item.id}/${item.handle}`);
  }

  function handleUpdateJobPost(item, event) {
    localStorage.removeItem('deleteJobPost');
    localStorage.setItem('updateJobPost', event);
    navigate(`/apps/JobPost/JobPosts/${item.id}/${item.handle}`);
  }

  function handleDeleteJobPost(item, event) {
    localStorage.removeItem('updateJobPost');
    localStorage.setItem('deleteJobPost', event);
    navigate(`/apps/JobPost/JobPosts/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
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

  if (JobPosts?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no JobPosts!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10'>
      <FuseScrollbars className='grow overflow-x-auto'>
        <TableContainer
          sx={{
            height: 'calc(100vh - 248px)',
            overflowY: 'auto',
          }}>
          <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
            <JobPostsTableHead
              selectedJobPostIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={JobPosts?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(JobPosts, [tableOrder.id], [tableOrder.direction]).map(
                (n) => {
                  const isSelected = selected.indexOf(n.id) !== -1;

                  return (
                    <TableRow
                      className='h-52 cursor-pointer border-t-1  border-gray-200'
                      hover
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}>
                      <TableCell
                        className='whitespace-nowrap w-40 md:w-64 border-t-1  border-gray-200'
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
                      <TableCell
                        className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                        component='th'
                        scope='row'>
                        {n?.code}
                      </TableCell>
                      <TableCell
                        className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                        component='th'
                        scope='row'>
                        {n?.title}
                      </TableCell>

                      <TableCell
                        whitespace-nowrap
                        className='p-4 md:p-16 border-t-1  border-gray-200'
                        align='center'
                        component='th'
                        scope='row'
                        style={{
                          position: 'sticky',
                          right: 0,
                          zIndex: 1, backgroundColor: '#fff',

                        }}>
                        <div>
                          <Tooltip
                            title='Edit'
                            placement='top'
                            enterDelay={300}>
                            <Edit
                              onClick={() =>
                                handleUpdateJobPost(n, 'updateJobPost')
                              }
                              className='cursor-pointer custom-edit-icon-style'

                            />
                          </Tooltip>

                          <Tooltip
                            title='Delete'
                            placement='top'
                            enterDelay={300}>
                            <Delete
                              onClick={() =>
                                handleDeleteJobPost(n, 'deleteJobPost')
                              }
                              className='cursor-pointer custom-delete-icon-style'
                            />
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
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

export default withRouter(JobPostsTable);
