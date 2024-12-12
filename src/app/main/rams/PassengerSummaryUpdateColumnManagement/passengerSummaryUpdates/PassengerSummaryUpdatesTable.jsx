/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import {  Pagination, TableCell } from '@mui/material';
import { Delete, Edit, PictureAsPdf } from '@mui/icons-material';
import { rowsPerPageOptions } from 'src/app/@data/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DescriptionIcon from '@mui/icons-material/Description';
import { BASE_URL, GET_PASSENGER_UPDATES, SEARCH_PROFESSION, UPDATE_PASSENGER_UPDATES } from 'src/app/constant/constants';
import PassengerSummaryUpdatesTableHead from './PassengerSummaryUpdatesTableHead';
import { selectFilteredPassengerSummaryUpdates, useGetPassengerSummaryUpdatesQuery } from '../PassengerSummaryUpdatesApi';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { makeStyles } from '@mui/styles';


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

function PassengerSummaryUpdatesTable(props) {
  const dispatch = useDispatch();
  	const classes = useStyles();

  const { navigate, searchKey } = props;
  const { reset, formState, watch, control, getValues, setValue } = useForm({
    mode: 'onChange',
    resolver: zodResolver(),
  });
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

  const { data, isLoading, refetch } = useGetPassengerSummaryUpdatesQuery({
    ...pageAndSize,
  
  });

  const [searchPassengerUpdate, setSearchPassengerUpdate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);


  const [editableRowIds, setEditableRowIds] = useState({});

  const [rowId, setRowId] = useState('');

 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const totalData = useSelector(selectFilteredPassengerSummaryUpdates(data));
  const passengers = useSelector(
    selectFilteredPassengerSummaryUpdates(data?.passengers)
  );

  console.log('passengersTest', data);

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
    if (totalData?.passengers) {
      const modifiedRow = [
        {
          id: 'sl',
          align: 'left',
          disablePadding: false,
          label: 'SL',
          sort: true,
        },
      ];

      Object.entries(totalData?.passengers[0] || {})
        .filter(([key]) => key !== 'id' && key !== 'random_number')
        .map(([key]) => {
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
  }, [totalData?.passengers, refetch]);



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
      setSelected(passengers.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  // function _handleClick(item) {
  //   navigate(`/apps/passengerSummaryUpdate/passengers/${item?.id}/${item?.handle}`);
  // }

  // function handleUpdatePassengerSummaryUpdate(item, event) {
  //   localStorage.removeItem('deletePassengerSummaryUpdate');
  //   localStorage.setItem('updatePassengerSummaryUpdate', event);
  //   navigate(`/apps/passengerSummaryUpdate/passengers/${item?.id}/${item?.handle}`);
  // }

  // function handleDeletePassengerSummaryUpdate(item, event) {
  //   localStorage.removeItem('updatePassengerSummaryUpdate');
  //   localStorage.setItem('deletePassengerSummaryUpdate', event);
  //   navigate(`/apps/passengerSummaryUpdate/passengers/${item?.id}/${item?.handle}`);
  // }


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
  // const handlePagination = (e, handlePage) => {
  //   setPageAndSize({ ...pageAndSize, page: handlePage });
  //   setPage(handlePage - 1);
  // };

  function handleChangePage(event, value) {
    setPage(value);
    setPageAndSize({ ...pageAndSize, page: value + 1 });
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPageAndSize({ ...pageAndSize, size: event.target.value });
  }



  useEffect(() => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };
    fetch(`${GET_PASSENGER_UPDATES}`, authTOKEN)
      .then((response) => response.json())
      .then((data) => setTableClm(data.passengers[0] || {}))
      .catch(() => setTableClm({}));
  }, []);
	const [tableClm, setTableClm] = useState({});

  const ModifiedClm = Object.keys(tableClm);

  ModifiedClm.map((data) => {});

  const getSearchPassengerUpdate = () => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };
    fetch(`${SEARCH_PROFESSION}?name=${searchText}`, authTOKEN)
      .then((response) => response.json())
      .then((searchedPassengerUpdateData) => {
        setSearchPassengerUpdate(searchedPassengerUpdateData?.passengers);
      })
      .catch(() => setSearchPassengerUpdate([]));
  };

  function handleRequestSort(passengerUpdateEvent, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(passengerUpdateEvent) {
    if (passengerUpdateEvent.target.checked) {
      setSelected(passengers.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleDeletePassengerUpdate(passengerId) {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };

    axios
      .delete(`${DELETE_PASSENGER_UPDATES}${passengerId}`, authTOKEN)
      .then((res) => {
        // setUpdatedItem();
      });

    dispatch(getPassengerUpdates(pageAndSize));
  }

  function handlePassengerSummaryColumn() {
    localStorage.removeItem('passengerSummaryEvent');
    router.push(`/apps/passengerSummaryUpdate-management/columns`);
  }
  function handleCheck(passengerUpdateEvent, id) {
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

  //pagination
  const handlePagination = (e, handlePage) => {
    setPageAndSize({ ...pageAndSize, page: handlePage });
    setPage(handlePage - 1);
    dispatch(getPassengerUpdates({ ...pageAndSize, page: handlePage }));
  };

  function handleChangePage(event, value) {
    setPage(value);
    setPageAndSize({ ...pageAndSize, page: value + 1 });
    dispatch(getPassengerUpdates({ ...pageAndSize, page: value + 1 }));
  }

  function handleChangeRowsPerPage(passengerUpdateEvent) {
    setRowsPerPage(passengerUpdateEvent.target.value);
    setPageAndSize({ ...pageAndSize, size: passengerUpdateEvent.target.value });
    dispatch(
      getPassengerUpdates({
        ...pageAndSize,
        size: passengerUpdateEvent.target.value,
      })
    );
  }

  // if (loading) {
  //   return <FuseLoading />;
  // }

  if (passengers?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='textSecondary' variant='h5'>
          There are no passenger for Update
        </Typography>
      </motion.div>
    );
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === 'Enter') {
      const datas = getValues()?.items;
      const data = datas.find((data) => data.id == rowId);
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };

      axios
        .put(`${UPDATE_PASSENGER_UPDATES}${rowId}`, data, authTOKEN)
        .then((res) => {
          dispatch(getPassengerUpdates(pageAndSize));
        });
    }
  };
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
    );
  }

  if (passengers?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no passengers!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full px-10 '>
      <div className='grow overflow-x-auto overflow-y-auto'>
        <Table stickyHeader className='min-w-xl ' aria-labelledby='tableTitle'>
          <PassengerSummaryUpdatesTableHead
            selectedPassengerSummaryUpdateIds={selected}
            tableOrder={tableOrder}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={passengers?.length}
            onMenuItemClick={handleDeselect}
            rows={rows}
          />
          

         
        </Table>
      </div>

      <div id='pagiContainer' className='flex justify-between mb-6'>
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
          className='shrink-0 mb-2'
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

export default withRouter(PassengerSummaryUpdatesTable);
