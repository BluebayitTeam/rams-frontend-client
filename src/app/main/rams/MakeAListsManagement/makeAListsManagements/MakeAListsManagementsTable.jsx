/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { Pagination } from '@mui/material';
import MakeAListsManagementsTableHead from './MakeAListsManagementsTableHead';
import {
  selectFilteredMakeAListsManagements,
  useGetMakeAListsManagementsQuery,
} from '../MakeAListsManagementsApi';

/**
 * The makeAListsManagements table.
 */
function MakeAListsManagementsTable(props) {
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetMakeAListsManagementsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredMakeAListsManagements(data));
  const makeAListsManagements = useSelector(
    selectFilteredMakeAListsManagements(data?.make_lists)
  );
  const serialNumber = 1;

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
      setSelected(makeAListsManagements.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(
      `/apps/makeAListsManagement/makeAListsManagements/${item.id}/${item.handle}`
    );
  }

  function handleUpdateMakeAListsManagement(item, event) {
    localStorage.removeItem('deleteMakeAListsManagement');
    localStorage.setItem('updateMakeAListsManagement', event);
    navigate(
      `/apps/makeAListsManagement/makeAListsManagements/${item.id}/${item.handle}`
    );
  }

  function handleDeleteMakeAListsManagement(item, event) {
    localStorage.removeItem('updateMakeAListsManagement');
    localStorage.setItem('deleteMakeAListsManagement', event);
    navigate(
      `/apps/makeAListsManagement/makeAListsManagements/${item.id}/${item.handle}`
    );
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

  if (!makeAListsManagements || makeAListsManagements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no makeAListsManagements!
        </Typography>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10'>
      <FuseScrollbars className='grow overflow-x-auto'>
        <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
          <MakeAListsManagementsTableHead
            selectedMakeAListsManagementIds={selected}
            tableOrder={tableOrder}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={makeAListsManagements.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {makeAListsManagements && makeAListsManagements.length > 0 ? (
              _.orderBy(
                makeAListsManagements,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-20 cursor-pointer'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={() => handleClick(n)}>
                    <TableCell padding='checkbox'>
                      <input
                        type='checkbox'
                        checked={isSelected}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>
                    <TableCell component='th' scope='row' padding='none'>
                      {n.name}
                    </TableCell>
                    <TableCell align='left'>{n.description}</TableCell>
                    <TableCell align='right'>{n.created_at}</TableCell>
                    <TableCell align='right'>{n.updated_at}</TableCell>
                    <TableCell align='right'>
                      <button
                        onClick={(event) =>
                          handleUpdateMakeAListsManagement(n, event)
                        }>
                        Edit
                      </button>
                      <button
                        onClick={(event) =>
                          handleDeleteMakeAListsManagement(n, event)
                        }>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography color='text.secondary' variant='h5'>
                    There are no makeAListsManagements!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <div id='pagiContainer'>
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
          className='shrink-0 border-t-1'
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

export default withRouter(MakeAListsManagementsTable);
