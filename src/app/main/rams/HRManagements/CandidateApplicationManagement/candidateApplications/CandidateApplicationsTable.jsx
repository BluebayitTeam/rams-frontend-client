/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Close, Delete, Edit, PictureAsPdf } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Modal,
  Pagination,
  TableContainer,
  TextField
} from '@mui/material';
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
import { rowsPerPageOptions, status } from 'src/app/@data/data';
import CandidateApplicationsTableHead from './CandidateApplicationsTableHead';

import clsx from 'clsx';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  BASE_URL,
  UPDATE_CANDIDATE_APPLICATION_STATUS,
} from 'src/app/constant/constants';
import {
  selectFilteredCandidateApplications,
  useGetCandidateApplicationsQuery,
} from '../CandidateApplicationsApi';

/**
 * The CandidateApplications table.
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

function CandidateApplicationsTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const classes = useStyles();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const { control, formState, setValue, getValues, watch, reset } =
    methods || {};

  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading, refetch } = useGetCandidateApplicationsQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredCandidateApplications(data));
  const CandidateApplications = useSelector(
    selectFilteredCandidateApplications(data?.candidate_applications)
  );
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

  function handleUpdateShorlisted() {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };

    const response = axios.put(
      `${UPDATE_CANDIDATE_APPLICATION_STATUS}${getValues().id}`,
      {
        id: getValues()?.id,
        application_status: getValues()?.application_status,
      },
      authTOKEN
    );
    dispatch(
      getCandidateApplications({ ...parameter, keyword: searchText })
    ).then(() => setLoading(false));
    setOpenModal(false);
  }

  function handleRequestSort(event, property) {
    const newOrder = { id: property, direction: 'desc' };

    if (tableOrder.id === property && tableOrder.direction === 'desc') {
      newOrder.direction = 'asc';
    }

    setTableOrder(newOrder);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(CandidateApplications.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(
      `/apps/CandidateApplication/CandidateApplications/${item.id}`
    );
  }

  function handleUpdateCandidateApplication(item, event) {
    localStorage.removeItem('deleteCandidateApplication');
    localStorage.setItem('updateCandidateApplication', event);
    navigate(
      `/apps/CandidateApplication/CandidateApplications/${item.id}`
    );
  }

  function handleDeleteCandidateApplication(item, event) {
    localStorage.removeItem('updateCandidateApplication');
    localStorage.setItem('deleteCandidateApplication', event);
    navigate(
      `/apps/CandidateApplication/CandidateApplications/${item.id}`
    );
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

  if (CandidateApplications?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no CandidateApplications!
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
            <CandidateApplicationsTableHead
              selectedCandidateApplicationIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={CandidateApplications?.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                CandidateApplications,
                [tableOrder.id],
                [tableOrder.direction]
              ).map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                const date = n?.dates?.map((option) => option);
                const dateData = date?.join(', ');
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
                      {`${n?.job_post?.title}- ${n?.job_post?.code}`}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {`${n?.first_name} ${n?.last_name}`}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.email}
                    </TableCell>{' '}
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.phone_number}
                    </TableCell>
                    <TableCell
                      whitespace-nowrap
                      className='p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'
                      padding='none'
                    // onClick={() => {
                    //   setOpenModal(true);
                    //   reset({ ...n });
                    //   setCandidateData(n);
                    // }}
                    >
                      <div
                        className={clsx(
                          'inline text-12 font-semibold py-4 px-12 rounded-full truncate text-white',
                          n.application_status === ('pending' || 'Pending')
                            ? 'bg-orange'
                            : n.application_status ===
                              ('approved' || 'Approved')
                              ? 'bg-green-800'
                              : n.application_status ===
                                ('shortlisted' || 'Shortlisted')
                                ? 'bg-green-300'
                                : n.application_status ===
                                  ('rejected' || 'Rejected')
                                  ? 'bg-red'
                                  : ''
                        )}>
                        {n.application_status === ('pending' || 'Pending')
                          ? 'Pending'
                          : n.application_status === ('approved' || 'Approved')
                            ? 'Approved'
                            : n.application_status ===
                              ('shortlisted' || 'Shortlisted')
                              ? 'Shortlisted'
                              : n.application_status ===
                                ('rejected' || 'Rejected')
                                ? 'Rejected'
                                : ''}
                      </div>
                    </TableCell>
                    <TableCell
                      className='p-4  md:p-12 w-1/3 border-t-1  border-gray-200'
                      component='th'
                      scope='row'>
                      {n.resume?.split('.')?.pop()?.toLowerCase() === 'pdf' ? (
                        <PictureAsPdf
                          style={{
                            color: 'red',
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: '35px',
                            margin: 'auto',
                          }}
                          // onClick={() => n.file && showImage(`${BASE_URL}${n.file}`)}
                          onClick={() => window.open(`${BASE_URL}${n.resume}`)}
                        />
                      ) : (
                        <img
                          onClick={() =>
                            n.resume && showImage(`${BASE_URLL}${n.resume}`)
                          }
                          src={`${BASE_URL}${n.resume}`}
                          style={{ height: '70px' }}
                        />
                      )}
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
                        <Edit
                          onClick={() =>
                            handleUpdateCandidateApplication(
                              n,
                              'updateCandidateApplication'
                            )
                          }
                          className='cursor-pointer custom-edit-icon-style'
                        />{' '}
                        <Delete
                          onClick={() =>
                            handleDeleteCandidateApplication(
                              n,
                              'deleteCandidateApplication'
                            )
                          }
                          className='cursor-pointer custom-delete-icon-style'
                        // style={{
                        //   color: 'red',
                        //   visibility:
                        //     user_role === 'ADMIN' || user_role === 'admin'
                        //       ? 'visible'
                        //       : 'hidden',
                        // }}
                        />
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

      {/* Status Update by Modal  */}

      <Modal
        open={openModal}
        className={classes.modal}
        onClose={() => {
          setOpenModal(false);
        }}
        keepMounted>
        <>
          <Card style={{ marginBottom: '10px' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  className='text-center m-10'
                  variant='h6'
                  component='div'>
                  Shortlisted Status
                </Typography>
                <Close
                  onClick={(event) => setOpenModal(false)}
                  className='cursor-pointer custom-delete-icon-style'
                // style={{ color: 'red' }}
                />
              </div>
              <FormProvider {...methods}>
                <Controller
                  name='application_status'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      className='mt-8 mb-16'
                      freeSolo
                      options={status}
                      value={
                        value ? status.find((data) => data.id == value) : null
                      }
                      getOptionLabel={(option) => `${option.name}`}
                      onChange={(event, newValue) => {
                        onChange(newValue?.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder='Select Status'
                          label='Status'
                          variant='outlined'
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  )}
                />

                <div className='flex justify-center items-center mr-32'>
                  <Button
                    className='whitespace-nowrap mx-4'
                    variant='contained'
                    color='secondary'
                    style={{ backgroundColor: '#22d3ee', height: '35px' }}
                    // disabled={!name || _.isEmpty(name)}
                    onClick={handleUpdateShorlisted}>
                    Update
                  </Button>
                </div>
              </FormProvider>
            </CardContent>
          </Card>
        </>
      </Modal>
    </div>
  );
}

export default withRouter(CandidateApplicationsTable);
