/* eslint-disable no-nested-ternary */
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import { Close, Edit } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Card,
  Modal,
  Pagination,
  TableContainer,
  TableHead,
  TextField,
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
import { rowsPerPageOptions } from 'src/app/@data/data';
import PromotionsTableHead from './PromotionsTableHead';

import { getEmployees, getPromotions } from 'app/store/dataSlice';
import moment from 'moment';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import styled from 'styled-components';
import {
  selectFilteredPromotions,
  useCreatePromotionMutation,
  useGetPromotionsQuery,
} from '../PromotionsApi';

/**
 * The promotions table.
 */

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
  modal: {
    margin: 'auto',
    backgroundColor: 'white',
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '1000px',
    maxHeight: '1000px',
    borderRadius: '20px',
    overflow: 'scroll',
  },
  paginationContainerRoot: {
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
function PromotionsTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const classes = useStyles();
  const { data, isLoading, isError, refetch } = useGetPromotionsQuery({
    ...pageAndSize,
    searchKey,
  });
  const [savePromotion] = useCreatePromotionMutation();
  const totalData = useSelector(selectFilteredPromotions(data));
  const previousPromotionHistory = useSelector(
    (state) => state?.data?.promotions
  );
  const promotions = useSelector(
    selectFilteredPromotions(data?.projected_promotions)
  );
  const employees = useSelector((state) => state.data.employees);
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [candidateData, setCandidateData] = useState({});

  console.log('getValues_data', data);

  let serialNumber = 1;
  console.log('promotions', previousPromotionHistory);

  useEffect(() => {
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);

  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const { control, formState, setValue, getValues, watch, reset } =
    methods || {};

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
      setSelected(promotions.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/promotion/promotions/${item.id}/${item.handle}`);
  }

  function handleUpdatePromotion(item, event) {
    localStorage.removeItem('deletePromotion');
    localStorage.setItem('updatePromotion', event);
    navigate(`/apps/promotion/promotions/${item.id}/${item.handle}`);
  }

  function handleDeletePromotion(item, event) {
    localStorage.removeItem('updatePromotion');
    localStorage.setItem('deletePromotion', event);
    navigate(`/apps/promotion/promotions/${item.id}/${item.handle}`);
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

  if (isError || promotions?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There are no promotions!
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
            <PromotionsTableHead
              selectedPromotionIds={selected}
              tableOrder={tableOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={promotions.length}
              onMenuItemClick={handleDeselect}
            />

            <TableBody>
              {_.orderBy(
                promotions,
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
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1 border-gray-200'
                      component='th'
                      scope='row'>
                      {`${n?.employee} `}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1 border-gray-200'
                      component='th'
                      scope='row'>
                      {`${n?.current_designation}`}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1 border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.promoted_designaiton}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1 border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.basic_salary}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1 border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.increment_amount}
                    </TableCell>
                    <TableCell
                      className='whitespace-nowrap p-4 md:p-16 border-t-1 border-gray-200'
                      component='th'
                      scope='row'>
                      {n?.projected_promotion_date}
                    </TableCell>

                    <TableCell
                      className='p-4 md:p-16 border-t-1  border-gray-200'
                      component='th'
                      scope='row'
                      align='start'
                      style={{
                        position: 'sticky',
                        right: 0,
                        zIndex: 1, backgroundColor: '#fff',

                      }}>
                      <Edit
                        onClick={(promotionEvent) => {
                          reset({
                            employee: n?.employee_id,
                            effective_from: n?.projected_promotion_date,
                            approval_date: moment(new Date()).format(
                              'YYYY-MM-DD'
                            ),
                            increment_amount: n?.increment_amount,
                            additional_increment_amount: '0',
                            previous_basic_salary: n?.basic_salary,
                            current_designation: n?.current_designation,
                            promoted_designaiton: n?.promoted_designaiton,
                          });
                          dispatch(getPromotions(n?.employee_id));
                          setOpenModal(true);
                        }}
                        className='cursor-pointer custom-edit-icon-style'
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </FuseScrollbars>

      <div className={classes.paginationContainerRoot} id='pagiContainer'>
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

      {/* Promotion modal */}
      <Modal
        open={openModal}
        className={classes.modal}
        onClose={() => setOpenModal(false)}
        keepMounted>
        <Card
          className={`${classes.card} ${classes.modalContent}`}
          style={{
            marginBottom: '10px',
            padding: '10px',
            maxWidth: '1000px',
            fontSize: '12px',
          }}>
          <div>
            {/* Close Button */}
            <div
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              className='mx-10'>
              <Close
                onClick={() => setOpenModal(false)}
                className='cursor-pointer custom-delete-icon-style'
              />
            </div>

            <Typography
              className='text-center my-10 bg-green-100'
              variant='h6'
              component='div'>
              Promotion Details
            </Typography>

            <FormProvider {...methods}>
              <div>
                <Controller
                  name='employee'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      className='mt-8 mb-16'
                      freeSolo
                      value={
                        value
                          ? employees.find((role) => role.id === value)
                          : null
                      }
                      options={employees}
                      getOptionLabel={(option) =>
                        `${option?.first_name} ${option?.last_name}`
                      }
                      onChange={(event, newValue) => {
                        onChange(newValue?.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder='Select Employee'
                          label='Employee'
                          id='employees'
                          variant='outlined'
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name='previous_basic_salary'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className='mt-8 mb-16'
                      label='Previous Basic Salary'
                      id='previous_basic_salary'
                      variant='outlined'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={field.value && { shrink: true }}
                    />
                  )}
                />
                <div className='flex md:space-x-12 flex-col md:flex-row'>
                  <Controller
                    name='increment_amount'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className='mt-8 mb-16'
                        label='Increment Amount'
                        id='increment_amount'
                        variant='outlined'
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        InputLabelProps={field.value && { shrink: true }}
                      />
                    )}
                  />
                  <Controller
                    name='additional_increment_amount'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className='mt-8 mb-16'
                        label='Additional Increment Amount'
                        id='additional_increment_amount'
                        variant='outlined'
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                      />
                    )}
                  />
                </div>

                <div className='flex md:space-x-12 flex-col md:flex-row'>
                  {/* <Controller
                    name="effective_from"
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker
                        label="Effective From"
                        required
                        placeholder="DD-MM-YYYY"
                      />

                    )}
                  />
                  <Controller
                    name="approval_date"
                    control={control}
                    render={({ field }) => <CustomDatePicker label="Approval Date" />}
                  /> */}
                </div>
              </div>
            </FormProvider>

            <Typography
              className='text-center my-10 bg-green-100'
              variant='h6'
              component='div'>
              Previous Promotion History
            </Typography>
            <Div h='fit-content' pd='2' alignItems='flex-start' border>
              <TableContainer className={classes.tblContainer}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead
                    className={classes.tableHead}
                    style={{ backgroundColor: 'black' }}>
                    <TableRow>
                      <TableCell align='center' className='text-white'>
                        No.
                      </TableCell>
                      <TableCell align='center' className='text-white'>
                        Previous Designation
                      </TableCell>
                      <TableCell align='center' className='text-white'>
                        Promoted Designation
                      </TableCell>
                      <TableCell align='center' className='text-white'>
                        Increment Amount
                      </TableCell>
                      <TableCell align='center' className='text-white'>
                        Effective From
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {previousPromotionHistory?.map((row, idx) => {
                      <TableRow key={row?.name}>
                        <TableCell
                          component='th'
                          scope='row'
                          className='text-black'
                          align='center'>
                          {idx + 1}
                        </TableCell>

                        <TableCell align='center' className='text-black'>
                          {row.current_designation?.name}
                        </TableCell>
                        <TableCell align='center' className='text-black'>
                          {row.promoted_designation?.name}
                        </TableCell>
                        <TableCell align='center' className='text-black'>
                          {Number(row.increment_amount) +
                            Number(row.additional_increment_amount)}
                        </TableCell>
                        <TableCell align='center' className='text-black'>
                          {row.effective_from}
                        </TableCell>
                      </TableRow>;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Div>

            <div className='text-center'>
              <Button
                variant='contained'
                className='mx-auto mt-10 whitespace-nowrap'
                color='secondary'
                onClick={() => {
                  savePromotion(getValues()).then((data) => {
                    UpdatedSuccessfully();
                    setOpenModal(false);
                    navigate(`/apps/promotion/promotions`);
                  });
                }}>
                <span>Save</span>
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
    </div>
  );
}

export default withRouter(PromotionsTable);

const Div = styled('div')((props) => ({
  background: props.bg,
  height:
    props.h === '1'
      ? '25px'
      : props.h === '2'
        ? '35px'
        : props.h === 3
          ? '50px'
          : props.h && props.h,
  width: '100%',
  display: 'flex',
  justifyContent: props.justCont ? props.justCont : 'space-between',
  alignItems: props.alignItems ? props.alignItems : 'center',
  padding:
    props.pd === '1'
      ? '10px'
      : props.pd === '2'
        ? '20px'
        : props.pd && props.pd,
  flexWrap: props.wrap && 'wrap',
  border: props.border && '2px solid gray',
  borderTop: `4px solid ${props.top}`,
  borderLeft: `4px solid ${props.left}`,
  minHeight: props.minHeight,
}));
