/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import { Pagination, TableContainer } from '@mui/material';
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
import DepartmentsTableHead from './DepartmentsTableHead';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import {
  selectFilteredDepartments,
  useGetDepartmentsQuery,
} from '../DepartmentsApi';

/**
 * The departments table.
 */

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    //  
    padding: '10px 20px',
    backgroundColor: '#fff',
    zIndex: 1000,
    borderTop: '1px solid #ddd',
    width: '76%',
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

function DepartmentsTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const classes = useStyles();
  const { data, isLoading, refetch } = useGetDepartmentsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredDepartments(data));
  const departments = useSelector(selectFilteredDepartments(data?.departments));
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
      setSelected(departments.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/department/departments/${item.id}/${item.name}`);
  }

  function handleUpdateDepartment(item, event) {
    localStorage.removeItem('deleteDepartment');
    localStorage.setItem('updateDepartment', event);
    navigate(`/apps/department/departments/${item.id}/${item.name}`);
  }

  function handleDeleteDepartment(item, event) {
    localStorage.removeItem('updateDepartment');
    localStorage.setItem('deleteDepartment', event);
    navigate(`/apps/department/departments/${item.id}/${item.name}`);
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

  if (departments?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no departments!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10'>
      <FuseScrollbars className=''>
        <TableContainer
          sx={{
            height: 'calc(100vh - 250px)',
            overflowY: 'auto',
          }}>
          <Table stickyHeader className='w-full' aria-labelledby='tableTitle'>
            <DepartmentsTableHead
              selectedDepartmentIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={departments.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                departments,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
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
                      // component='th'
                      scope='row'
                      style={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 1, backgroundColor: '#fff',
                        //  
                      }}
                    >
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.name}
                    </TableCell>

                    <TableCell
                      whitespace-nowrap
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      align='center'
                      component='th'
                      scope='row'
                      style={{
                        position: 'sticky',
                        right: 0,
                        zIndex: 1, backgroundColor: '#fff',
                        //  
                      }}>
                      <div>
                        {hasPermission('DEPARTMENT_UPDATE') && (
                          <Edit
                            onClick={() =>
                              handleUpdateDepartment(n, 'updateDepartment')
                            }
                            className='cursor-pointer custom-edit-icon-style'
                          />
                        )}

                        {hasPermission('DEPARTMENT_DELETE') && (
                          <Delete
                            onClick={() =>
                              handleDeleteDepartment(n, 'deleteDepartment')
                            }
                            className='cursor-pointer custom-delete-icon-style'
                          />
                        )}
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

export default withRouter(DepartmentsTable);
