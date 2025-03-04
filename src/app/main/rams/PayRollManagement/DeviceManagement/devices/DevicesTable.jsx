/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Delete, Edit } from '@mui/icons-material';
import { Pagination, Switch, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { UPDATE_DEVICE_IP } from 'src/app/constant/constants';
import NotificationModel from 'src/app/main/apps/notifications/models/NotificationModel';
import { selectFilteredDevices, useGetDevicesQuery } from '../DevicesApi';
import DevicesTableHead from './DevicesTableHead';

/**
 * The devices table.
 */
const IOSSwitch = styled(props => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5
        }
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    }
  })
);

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

function DevicesTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetDevicesQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredDevices(data));
  const devices = useSelector(selectFilteredDevices(data?.device_ips));
  let serialNumber = 1;
  const user_role = localStorage.getItem('user_role');

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
      setSelected(devices.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/device/devices/${item.id}/${item.handle}`);
  }

  function handleUpdateDevice(item, event) {
    localStorage.removeItem('deleteDevice');
    localStorage.setItem('updateDevice', event);
    navigate(`/apps/device/devices/${item.id}/${item.handle}`);
  }

  function handleDeleteDevice(item, event) {
    localStorage.removeItem('updateDevice');
    localStorage.setItem('deleteDevice', event);
    navigate(`/apps/device/devices/${item.id}/${item.handle}`);
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

  function handleDeviceStatusSave(event, item) {
    // toast.dismiss();
    const status = event.target.checked ? 'connected' : 'disconnected';

    const { id, ip_address, name, port } = item;

    // Create an object with id and status
    const logData = {
      id,
      name,
      ip_address,
      status,
      port
    };

    console.log('logData', logData, item.id);
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token')
      }
    };
    axios
      .put(`${UPDATE_DEVICE_IP}${item.id}`, logData, authTOKEN)
      .then(res => {
        console.log("fetching_refetching", res)

        if (res) {
          refetch({ page, rowsPerPage });
          NotificationModel({ title: `Device has susscessfully ${res.data.status}` })
          // dispatch(
          //   NotificationModel({
          //     message: `Device has susscessfully ${res.data.status}`,
          //     options: { variant: 'success' },
          //     item_id: item.id
          //   })
          // );
        }


      })
      .catch(err =>
        NotificationModel({ title: `No device found` })
        // dispatch(
        //   NotificationModel({
        //     message: `No device found`,
        //     options: { variant: 'error' },
        //     item_id: item.id
        //   })
        // )
      );
  }


  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
    );
  }

  if (devices?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no devices!
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
            <DevicesTableHead
              selectedDeviceIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={devices.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(devices, [tableOrder.id], [tableOrder.direction]).map(
                (n) => {
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
                      //   zIndex: 1, backgroundColor: '#fff',
                      //    
                      // }}
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
                        className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                        component='th'
                        scope='row'>
                        {n?.ip_address}
                      </TableCell>
                      <TableCell
                        className={`whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200 ${n?.status == 'disconnected' ? 'text-red-500' : 'text-green-500'
                          }`}
                        component="th"
                        scope="row"
                      >
                        {n?.status}
                      </TableCell>
                      <TableCell
                        className='p-4 md:p-16 border-t-1  border-gray-200'
                        component='th'
                        scope='row'
                        align='center'
                      // style={{
                      //   position: 'sticky',
                      //   right: 0,
                      //   zIndex: 1, backgroundColor: '#fff',
                      //    
                      // }}
                      >
                        <Edit
                          onClick={(event) =>
                            handleUpdateDevice(n, 'updateDevice')
                          }
                          className='cursor-pointer custom-edit-icon-style'
                        />
                        <Delete
                          onClick={(event) =>
                            handleDeleteDevice(n, 'deleteDevice')
                          }
                          className='cursor-pointer custom-delete-icon-style'
                          style={{
                            visibility:
                              user_role === 'ADMIN' || user_role === 'admin'
                                ? 'visible'
                                : 'hidden'
                          }}
                        />
                        <IOSSwitch
                          sx={{ m: 1 }}
                          defaultChecked={n.status == 'connected' ? true : false}
                          onChange={event => {
                            console.log('switch', event.target.checked);
                            handleDeviceStatusSave(event, n);
                          }}
                        />
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

export default withRouter(DevicesTable);
