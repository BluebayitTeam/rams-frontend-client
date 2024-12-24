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
import {  Autocomplete, Pagination, TableCell, TextField } from '@mui/material';

import { activeRetrnCncl, balanceType, doneNotDone, genders, maritalStatuses, medicalResults, religions, rowsPerPageOptions } from 'src/app/@data/data';
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GET_PASSENGER_UPDATES, SEARCH_PROFESSION, UPDATE_PASSENGER_UPDATES } from 'src/app/constant/constants';
import PassengerSummaryUpdatesTableHead from './PassengerSummaryUpdatesTableHead';
import { selectFilteredPassengerSummaryUpdates, useGetPassengerSummaryUpdatesQuery } from '../PassengerSummaryUpdatesApi';
import { makeStyles } from '@mui/styles';

import { DoneOutlineOutlined, Edit } from '@mui/icons-material';
import { getAgencys, getAgents, getCities, getCountries, getCurrentStatuss, getDemands, getGroups, getMedicalCenters, getPassengers, getPassengerTypes, getProfessions, getRecruitingAgencys, getThanas, getVisaEntrys } from 'app/store/dataSlice';
import axios from 'axios';
import setIdIfValueIsObjArryData from 'src/app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'src/app/@helpers/setIdIfValueIsObject2';
import CustomDatePicker from 'src/app/@components/CustomDatePicker';
import moment from 'moment';
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

function PassengerSummaryUpdatesTable({ paginatedData, refetch ,isLoading }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { reset, formState, watch, control, getValues, setValue } =
    useFormContext();

  const countrys = useSelector((state) => state.data.countries);
  const thanas = useSelector((state) => state.data.thanas);
  const passenger = useSelector((state) => state.data.passengers);
  const professions = useSelector((state) => state.data.professions);
  const ticketAgencys = useSelector((state) => state.data.agents);
  const passengerTypes = useSelector((state) => state.data.passengerTypes);
  const agents = useSelector((state) => state.data.agents);
  const demands = useSelector((state) => state.data.demands);
  const agencys = useSelector((state) => state.data.agencies);
  const targetCountrys = useSelector((state) => state.data.countries);
  const currentStatuss = useSelector((state) => state.data.currentStatuss);
  const visaEntrys = useSelector((state) => state.data.visaEntries);
  const districts = useSelector((state) => state.data.cities);
  const groups = useSelector((state) => state.data.groups);
  const medicalCenters = useSelector((state) => state.data.medicalCenters);
  const recruitingAgencys = useSelector(
    (state) => state.data.recruitingAgencys
  );

  const [searchPassengerUpdate, setSearchPassengerUpdate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const [editableRowIds, setEditableRowIds] = useState({});

  const [rowId, setRowId] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const totalData = useSelector(
    selectFilteredPassengerSummaryUpdates(paginatedData)
  );
  const passengers = useSelector(
    selectFilteredPassengerSummaryUpdates(paginatedData?.passengers)
  );

  useEffect(() => {
    Object.entries(editableRowIds).forEach(([key, value]) => {
      value == true && setRowId(key);
    });
  }, [editableRowIds]);

  // setEditableRowDatas
  function setEditableRowDatas(passengerId) {}

  const { fields, remove } = useFieldArray({
    control,
    name: 'items',
    keyName: 'key',
  });

  //rerender feildsArray after ledgers fetched otherwise ledger's option not be shown
  useEffect(() => {
    reset({ ...getValues(), items: watch('items') });
  }, [passengers]);

  //set product item list
  useEffect(() => {
    let newEdiableRowIds = {};
    passengers?.map((data) => {
      newEdiableRowIds = { ...newEdiableRowIds, [data.id]: false };
      return null;
    });
    setEditableRowIds(newEdiableRowIds);
  }, [passengers]);

  useEffect(() => {
    if (!passengers) {
      return;
    }
    /**
     * Reset the form on contra state changes
     */
    const convertedContraItems = setIdIfValueIsObjArryData(passengers);

    const convertedContra = setIdIfValueIsObject2(passengers);
    if (
      !getValues().agent &&
      !getValues().passenger &&
      !getValues().flight_status
    ) {
      reset({ ...convertedContra, items: convertedContraItems });
    }
    // reset({ ...convertedContra, items: convertedContraItems });
  }, [passengers]);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getCountries());
    dispatch(getGroups());
    dispatch(getThanas());
    dispatch(getPassengers());
    dispatch(getProfessions());
    dispatch(getAgents());
    dispatch(getRecruitingAgencys());
    dispatch(getAgents());
    dispatch(getDemands());
    dispatch(getAgencys());
    dispatch(getPassengerTypes());
    dispatch(getCurrentStatuss());
    dispatch(getVisaEntrys());
    dispatch(getMedicalCenters());
  }, []);

  function capital_letter(str) {
    str = str.split(' ');

    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(' ');
  }

  let serialNumber = 1;

  const [rows, setRows] = useState([]);

 
  // useEffect(() => {
  //   refetch({ page, rowsPerPage });
  // }, [page, rowsPerPage]);

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
        .filter(([key]) =>key !== 'id' &&  key !== 'random_number')
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

    refetch();
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
        ev.preventDefault();

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
          refetch(pageAndSize);
        });
    }
  };

  // Update Passenger Row function
  const updatePassengerRow = (passengerId) => {
    const items = getValues()?.items;
    console.log('Current Items:', items);

    const data = items.find((item) => item?.id === passengerId);

    if (!data) {
      console.warn(`Passenger with ID ${passengerId} not found`);
      return;
    }

    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };

    axios
      .put(`${UPDATE_PASSENGER_UPDATES}${passengerId}`, data, authTOKEN)
      .then((res) => {
        console.log('Update Response:', res);
        refetch(pageAndSize); 
      })
      .catch((err) => {
        console.error('Error updating passenger:', err);
      });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
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

          <TableBody>
            {_.orderBy(passengers, [tableOrder.id], [tableOrder.direction])

              .map((item, idx) => {
                const isSelected = selected.indexOf(item.id) !== -1;
                return (
                  <TableRow
                    className='h-72 cursor-pointer'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item.id}
                    selected={isSelected}
                    onClick={(e) => {
                      setEditableRowIds({
                        ...editableRowIds,
                        [item.id]: true,
                      });
                      setEditableRowDatas(item.id);
                    }}
                    onKeyDown={handleSubmitOnKeyDownEnter}>
                    <TableCell
                      className='w-40 md:w-64'
                      component='th'
                      scope='row'>
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}
                    </TableCell>

                    {Object.entries(item).map(([key, val]) => {
                      
                      return (
                    key !== 'id' &&
                      (
                        <TableCell
                          className='w-40 md:w-64'
                          component='th'
                          scope='row'
                          style={{ width: '15%' }}>
                          {editableRowIds[item.id] ? (
                            // district Dropdown

                            key == 'district' || key == 'city' ? (
                              <Controller
                                name={`items?.${idx}?.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => {
                              
                                  return (
                                    <Autocomplete
                                      className='mt-8 mb-16 w-full  '
                                      freeSolo
                                      value={
                                        val
                                          ? districts.find(
                                              (data) => data.id == val
                                            )
                                          : null
                                      }
                                      options={districts}
                                      getOptionLabel={(option) =>
                                        `${option.name}`
                                      }
                                      onChange={(event, newValue) => {
                                        console.log(
                                          'Selected newValue:',
                                          newValue
                                          
                                        );
                                        onChange(newValue?.id);
                                        setValue(
                                          `items.${idx}.${key}`,
                                          newValue?.id
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          placeholder='Select City'
                                          label={capital_letter(
                                            key.replaceAll('_', ' ')
                                          )}
                                          id={`${key}`}
                                          // error={!!errors.district}
                                          variant='outlined'
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                            ) : // Agents Dropdown

                            key == 'agent' ||
                              key == 'sub_agent' ||
                              key == 'okala_given_by_musanedokala' ||
                              key == 'visa_agent_visaentry' ||
                              key == 'agent_passenger' ||
                              key == 'musaned_given_by_musanedokala' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => {
                                  return (
                                    <Autocomplete
                                      className='mt-8 mb-16'
                                      freeSolo
                                      value={
                                        value
                                          ? agents.find(
                                              (data) => data.id === value
                                              // data.username == value
                                            )
                                          : null
                                      }
                                      options={agents}
                                      getOptionLabel={(option) =>
                                        `${option.first_name}-${option.agent_code}`
                                      }
                                      onChange={(event, newValue) => {
                                        console.log(
                                          'Selected newValue:',
                                          newValue
                                        ); // Log the new value
                                        onChange(newValue?.id); // Update the value
                                        setValue(
                                          `items.${idx}.${key}`,
                                          newValue?.id
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          placeholder='Select Agent'
                                          label={capital_letter(
                                            key.replaceAll('_', ' ')
                                          )}
                                          id={`${key}`}
                                          variant='outlined'
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                            ) : // thana Dropdown

                            key == 'thana' || key == 'police_station' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => {
                                  return (
                                    <Autocomplete
                                      className='mt-8 mb-16'
                                      placeholder='Select District'
                                      freeSolo
                                      value={
                                        thanas.find(
                                          (data) => data.id === value
                                        ) || null
                                      }
                                      options={thanas}
                                      getOptionLabel={(option) =>
                                        option.name || ''
                                      }
                                      onChange={(event, newValue) => {
                                        console.log(
                                          'Selected newValue:',
                                          newValue
                                        ); // Log the new value
                                        onChange(newValue?.id || null); // Update the value
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          placeholder='Select Police Station'
                                          label={capital_letter(
                                            key.replaceAll('_', ' ')
                                          )}
                                          variant='outlined'
                                          id={`${key}`}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                            ) : // group DropDown

                            key == 'group' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? groups.find(
                                            (data) => data.id === value
                                          )
                                        : null
                                    }
                                    options={groups}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Group'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        // error={!!errors.group || !value}
                                        // helperText={errors?.group?.message}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // onKeyDown={handleSubmitOnKeyDownEnter}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // marital_status DropDown

                            key == 'marital_status' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? maritalStatuses.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={maritalStatuses}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Marital Status'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        // error={!!errors.group || !value}
                                        // helperText={errors?.group?.message}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // ticket_status DropDown

                            key == 'ticket_status' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? activeRetrnCncl.find(
                                            (data) => data.id === value
                                          )
                                        : null
                                    }
                                    options={activeRetrnCncl}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Ticket Status'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        // error={!!errors.group || !value}
                                        // helperText={errors?.group?.message}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // passenger_type Dropdown

                            key == 'passenger_type' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? passengerTypes.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={passengerTypes}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Passenger Type'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // onKeyDown={handleSubmitOnKeyDownEnter}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // gender Dropdown

                            key == 'gender' || key == 'gender_passenger' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? genders.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={genders}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Gender'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        // error={!!errors.gender || !value}
                                        // helperText={errors?.gender?.message}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // gender Dropdown

                            key == 'balance_type' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? balanceType.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={balanceType}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Balance Type'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        // error={!!errors.gender || !value}
                                        // helperText={errors?.gender?.message}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // religion Dropdown

                            key == 'religion_passenger' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? religions.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={religions}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Religion'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // doneNotDone Dropdown

                            key == 'interviewed' ||
                              key == 'stamping_status_embassy' ||
                              key == 'calling_status_callingemb' ||
                              key == 'emb_attestation_status_callingemb' ||
                              key == 'man_power_status_manpower' ||
                              key == 'mofa_status_mofa' ||
                              key == 'finger_status_officework' ||
                              key == 'police_clearance_status_officework' ||
                              key == 'medical_card_medical' ||
                              key == 'mofa_status_mofa' ||
                              key == 'training_card_status_training' ||
                              key == 'remofa_status_mofa' ||
                              key == 'musaned_status_musanedokala' ||
                              key == 'okala_status_musanedokala' ||
                              key == 'driving_license_status_officework' ||
                              key == 'bio_submitted_status_callingemb' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? doneNotDone.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={doneNotDone}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder={`Select ${capital_letter(
                                          key.replaceAll('_', ' ')
                                        )} `}
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        // error={!!errors.stamping_status}
                                        // helperText={errors?.stamping_status?.message}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // visa_entry Dropdown

                            key == 'visa_entry' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? visaEntrys.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={visaEntrys}
                                    getOptionLabel={(option) =>
                                      `${option.visa_number}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Visa Entry'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // Demand Dropdown

                            key == 'demand' ||
                              key == 'demand_visaentry' ||
                              key == 'demand_visaentry' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? demands.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={demands}
                                    getOptionLabel={(option) =>
                                      `${option.company_name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Demand'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // onKeyDown={handleSubmitOnKeyDownEnter}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // Country Dropdown

                            key == 'target_country' ||
                              key == 'country_agent' ||
                              key == 'target_country_passenger' ||
                              key == 'country_visaentry' ||
                              key == 'country_femalecv' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? targetCountrys.find(
                                            (data) => data.name == value
                                          )
                                        : null
                                    }
                                    options={targetCountrys}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.name);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Target Country'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )} // error={!!errors.target_country || !value}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // ticket_agency Dropdown

                            key == 'ticket_agency' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? ticketAgencys.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={ticketAgencys}
                                    getOptionLabel={(option) =>
                                      `${option.first_name} ${option.last_name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Ticket Agency'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // mofa_agency Dropdown

                            key == 'mofa_agency' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? agencys.find(
                                            (data) => data.id == value
                                          )
                                        : null
                                    }
                                    options={agencys}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // Date Dropdown
                            key == 'repatriation_date' ||
                              key == 'dispatched_date' ||
                              key == 'handover_passport_ticket_date' ||
                              key == 'accounts_cleared_date' ||
                              key == 'immigration_clearance_date' ||
                              key == 'sev_received_date' ||
                              key == 'submitted_for_sev_date' ||
                              key == 'interviewed_date' ||
                              key == 'passport_expiry_date' ||
                              key == 'passport_issue_date' ||
                              key ==
                                'submitted_for_permission_immigration_clearance_date' ||
                              key == 'delivery_date_manpower' ||
                              key == 'man_power_date_manpower' ||
                              key == 'submit_date_manpower' ||
                              key == 'medical_exam_date_medical' ||
                              key == 'medical_expiry_date_medical' ||
                              key == 'medical_issue_date_medical' ||
                              key == 'medical_report_date_medical' ||
                              key == 'sponsor_dob_visaentry' ||
                              key == 'mofa_date_mofa' ||
                              key == 'musaned_date_musanedokala' ||
                              key == 'okala_date_musanedokala' ||
                              key == 'finger_date_officework' ||
                              key == 'admission_date_training' ||
                              key == 'certificate_date_training' ||
                              key == 'date_of_birth' ||
                              key == 'passport_expiry_date_passenger' ||
                              key == 'passport_issue_date_passenger' ||
                              key == 'visa_issue_date_visaentry' ||
                              key == 'balance_date_agent' ||
                              key == 'bio_submitted_date_callingemb' ? (
                              <CustomDatePicker
                                name={`items.${idx}.${key}`}
                                label={capital_letter(key.replaceAll('_', ' '))}
                                className='mt-8 mb-16 w-full  '
                                // required
                              />
                            ) : // current_status

                            key == 'current_status' ||
                              key == 'handover_passport_ticket' ||
                              key == 'accounts_cleared' ||
                              key == 'immigration_clearance' ||
                              key == 'sev_received' ||
                              key ==
                                'submitted_for_permission_immigration_clearance' ||
                              key == 'current_status' ||
                              key == 'dispatched' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                 
                                }) => {
                                      console.log('valueCheck', val, key);
                                  return (
                                    <Autocomplete
                                      className='mt-8 mb-16 w-full'
                                      freeSolo
                                      value={
                                        val
                                          ? currentStatuss.find(
                                              (data) => data.id == val
                                            )
                                          : null
                                      }
                                      options={currentStatuss}
                                      getOptionLabel={(option) =>
                                        `${option.name}`
                                      }
                                      onChange={(event, newValue) => {
                                        console.log(
                                          'Selected newValue:',
                                          newValue
                                        ); // Log the new selection
                                        onChange(newValue?.id); // Update the value
                                             setValue(
                                               `items.${idx}.${key}`,
                                               newValue?.id
                                             );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          placeholder='Select Current Status'
                                          label={capital_letter(
                                            key.replaceAll('_', ' ')
                                          )}
                                          id={`${key}`}
                                          variant='outlined'
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                            ) : // recruiting_agency

                            key == 'agency' ||
                              key == 'recruiting_agency_manpower' ||
                              key == 'recruiting_agency_training' ||
                              key == 'agency_passenger' ||
                              key == 'recruiting_agency_embassy' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? recruitingAgencys.find(
                                            (data) => data.name == value
                                          )
                                        : null
                                    }
                                    options={recruitingAgencys}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.name);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Recruiting Agency'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // onKeyDown={handleSubmitOnKeyDownEnter}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // passenger Show
                            key == 'passenger_embassy' ||
                              key == 'passenger_flight' ||
                              key == 'passenger_malecv' ||
                              key == 'passenger_manpower' ||
                              key == 'passenger_medical' ||
                              key == 'passenger_training' ||
                              key == 'passenger_mofa' ||
                              key == 'passenger_musanedokala' ||
                              key == 'passenger_officework' ||
                              key == 'passenger_callingemb' ||
                              key == 'passenger_embassy' ||
                              key == 'passenger_femalecv' ? (
                              passenger.find((data) => data.id === val)
                                ?.passenger_name
                            ) : // ID ,  Passenger Id

                            key == 'id' || key == 'passenger_id_passenger' ? (
                              val
                            ) : // medical_center_medical

                            key == 'medical_center_medical' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? medicalCenters.find(
                                            (data) => data.name == value
                                          )
                                        : null
                                    }
                                    options={medicalCenters}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Medical Center'
                                        label={capital_letter(
                                          key.replaceAll('_', ' ')
                                        )}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // onKeyDown={handleSubmitOnKeyDownEnter}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // profession Dropdown

                            key == 'profession' ||
                              key == 'profession_femalecv' ||
                              key == 'profession_malecv' ||
                              key == 'profession_passenger' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => {
                                  console.log('CurrentType', typeof value); // Log the current value
                                  return (
                                    <Autocomplete
                                      className='mt-8 mb-16 w-full'
                                      freeSolo
                                      value={
                                        value
                                          ? professions.find(
                                              (data) => data.name === value
                                            )
                                          : null
                                      }
                                      options={professions}
                                      getOptionLabel={(option) =>
                                        `${option.name}`
                                      }
                                      onChange={(event, newValue) => {
                                        console.log(
                                          'Selected newValue:',
                                          newValue
                                        ); // Log the selected value
                                        onChange(newValue?.id);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          placeholder='Select Profession'
                                          label={capital_letter(
                                            key.replaceAll('_', ' ')
                                          )}
                                          id={`${key}`}
                                          variant='outlined'
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                        />
                                      )}
                                    />
                                  );
                                }}
                              />
                            ) : // Medical Result Dropdown

                            key == 'medical_result_medical' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16'
                                    freeSolo
                                    value={
                                      value
                                        ? medicalResults.find(
                                            (data) => data.name == value
                                          )
                                        : null
                                    }
                                    options={medicalResults}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.id);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Medical Result'
                                        label={`${key}`}
                                        id={`${key}`}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : // country Dropdown

                            key == 'country_agent' ||
                              key == 'country_femalecv' ||
                              key == 'country_visaentry' ||
                              key == 'target_country_passenger' ||
                              key == 'country_visaentry' ? (
                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({
                                  field: { onChange, value, name },
                                }) => (
                                  <Autocomplete
                                    className='mt-8 mb-16 w-full  '
                                    freeSolo
                                    value={
                                      value
                                        ? countrys.find(
                                            (data) => data.name == value
                                          )
                                        : null
                                    }
                                    options={countrys}
                                    getOptionLabel={(option) =>
                                      `${option.name}`
                                    }
                                    onChange={(event, newValue) => {
                                      onChange(newValue?.name);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder='Select Country'
                                        label={`${key}`}
                                        id={`${key}`}
                                        // error={!!errors.country || !value}
                                        // helperText={errors?.country?.message}
                                        variant='outlined'
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            ) : (
                              // All String fields

                              <Controller
                                name={`items.${idx}.${key}`}
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <TextField
                                      {...field}
                                      className=' mt-8 mb-16 w-full   '
                                      label={capital_letter(
                                        key.replaceAll('_', ' ')
                                      )}
                                      id={`items.${idx}.${key}`}
                                      variant='outlined'
                                      InputLabelProps={
                                        field.value && { shrink: true }
                                      }
                                      fullWidth
                                    />
                                  );
                                }}
                              />
                            )
                          ) : // Date Format Show
                          val ? (
                            key == 'balance_date_agent' ||
                            key == 'bio_submitted_date_callingemb' ||
                            key == 'calling_date_callingemb' ||
                            key == 'delivery_date_embassy' ||
                            key == 'stamping_date_embassy' ||
                            key == 'submit_date_embassy' ||
                            key == 'visa_expiry_date_embassy' ||
                            key == 'flight_date_flight' ||
                            key == 'issue_date_flight' ||
                            key == 'delivery_date_manpower' ||
                            key == 'man_power_date_manpower' ||
                            key == 'submit_date_manpower' ||
                            key == 'medical_exam_date_medical' ||
                            key == 'medical_expiry_date_medical' ||
                            key == 'medical_issue_date_medical' ||
                            key == 'medical_report_date_medical' ||
                            key == 'mofa_date_mofa' ||
                            key == 'musaned_date_musanedokala' ||
                            key == 'okala_date_musanedokala' ||
                            key == 'finger_date_officework' ||
                            key == 'date_of_birth' ||
                            key == 'passport_expiry_date_passenger' ||
                            key == 'passport_issue_date_passenger' ||
                            key == 'visa_issue_date_visaentry' ||
                            key == 'balance_date_agent' ||
                            key == 'bio_submitted_date_callingemb' ? (
                              val && moment(new Date(val)).format('DD-MM-YYYY')
                            ) : // Country Show
                            key == 'country_agent' ||
                              key == 'target_country_passenger' ||
                              key == 'country_visaentry' ||
                              key == 'country_femalecv' ? (
                              countrys.find((data) => data.id === val)?.name
                            ) : // Professions Show
                            key == 'profession_femalecv' ||
                              key == 'profession_malecv' ||
                              key == 'profession_passenger' ? (
                              professions.find((data) => data.id === val)?.name
                            ) : // Agents Show
                            key == 'musaned_given_by_musanedokala' ||
                              key == 'visa_agent_visaentry' ||
                              key == 'agent' ||
                              key == 'okala_given_by_musanedokala' ? (
                              `${agents.find((data) => data.id === val)?.first_name} ${
                                agents.find((data) => data.id === val)
                                  ?.last_name
                              }`
                            ) : // Medical Center Show
                            key == 'medical_center_medical' ? (
                              medicalCenters.find((data) => data.id === val)
                                ?.name
                            ) : // current_status Show

                            key == 'current_status' ? (
                              currentStatuss.find((data) => data.id === val)
                                ?.name
                            ) : // group Show

                            key == 'group' ? (
                              groups.find((data) => data.id === val)?.name
                            ) : // gender Show

                            key == 'gender' ? (
                              genders.find((data) => data.id === val)?.name
                            ) : // balance_type Show

                            key == 'balance_type' ? (
                              balanceType.find((data) => data.id === val)?.name
                            ) : // Demand Show

                            key == 'demand' || key == 'demand_visaentry' ? (
                              demands.find((data) => data.id === val)
                                ?.company_name
                            ) : // doneNotDone Show

                            key == 'stamping_status_embassy' ||
                              key == 'calling_status_callingemb' ||
                              key == 'emb_attestation_status_callingemb' ||
                              key == 'man_power_status_manpower' ||
                              key == 'mofa_status_mofa' ||
                              key == 'finger_status_officework' ||
                              key == 'police_clearance_status_officework' ||
                              key == 'medical_card_medical' ||
                              key == 'remofa_status_mofa' ||
                              key == 'training_card_status_training' ||
                              key == 'musaned_status_musanedokala' ||
                              key == 'okala_status_musanedokala' ||
                              key == 'driving_license_status_officework' ||
                              key == 'bio_submitted_status_callingemb' ? (
                              doneNotDone.find((data) => data.id === val)?.name
                            ) : // passenger_type Show

                            key == 'passenger_type_passenger' ? (
                              passengerTypes.find((data) => data.id === val)
                                ?.name
                            ) : // religion_passenger Show

                            key == 'religion_passenger' ? (
                              religions.find((data) => data.id === val)?.name
                            ) : // maritalStatuses Show

                            key == 'marital_status_passenger' ? (
                              maritalStatuses.find((data) => data.id === val)
                                ?.name
                            ) : // visa_entry Show

                            key == 'visa_entry' ? (
                              visaEntrys.find((data) => data.id === val)
                                ?.visa_number
                            ) : // ticket_status Show

                            key == 'ticket_status' ? (
                              activeRetrnCncl.find((data) => data.id === val)
                                ?.name
                            ) : // district Show

                            key == 'district' || key == 'city' ? (
                              districts.find((data) => data.id === val)?.name
                            ) : key == 'recruiting_agency_manpower' ||
                              key == 'agency_passenger' ||
                              key == 'recruiting_agency_training' ||
                              key == 'recruiting_agency_embassy' ? (
                              recruitingAgencys.find((data) => data.id === val)
                                ?.name
                            ) : // thana Dropdown

                            key == 'thana' || key == 'police_station' ? (
                              thanas.find((data) => data.id === val)?.name
                            ) : // medicalResults Dropdown

                            key == 'medical_result_medical' ? (
                              medicalResults.find((data) => data.id === val)
                                ?.name
                            ) : // ticket_agency Dropdown

                            key == 'ticket_agency' ? (
                              `${agents.find((data) => data.id === val)?.first_name} ${
                                agents.find((data) => data.id === val)
                                  ?.last_name
                              }`
                            ) : // mofa_agency Dropdown

                            key == 'mofa_agency' ? (
                              `${agencys.find((data) => data.id === val)?.name}`
                            ) : // passenger Show
                            key == 'passenger_embassy' ||
                              key == 'passenger_flight' ||
                              key == 'passenger_malecv' ||
                              key == 'passenger_manpower' ||
                              key == 'passenger_medical' ||
                              key == 'passenger_mofa' ||
                              key == 'passenger_musanedokala' ||
                              key == 'passenger_officework' ||
                              key == 'passenger_callingemb' ||
                              key == 'passenger_embassy' ||
                              key == 'passenger_femalecv' ? (
                              passenger.find((data) => data.id === val)
                                ?.passenger_name
                            ) : (
                              val
                            )
                          ) : (
                            ''
                          )}
                          </TableCell>
                        )
                      );
                    })}

                    <TableCell
                      className='p-4 md:p-16'
                      align='center'
                      component='th'
                      scope='row'>
                      <div>
                        {editableRowIds[item.id] ? (
                          <DoneOutlineOutlined
                            style={{ color: 'green' }}
                            className='cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();

                              setEditableRowIds({
                                ...editableRowIds,
                                [item.id]: false,
                              });
                              updatePassengerRow(item.id);
                            }}
                          />
                        ) : (
                          <Edit
                            style={{ color: 'green' }}
                            className='cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditableRowIds({
                                ...editableRowIds,
                                [item.id]: true,
                              });
                              setEditableRowDatas(item.id);
                            }}
                          />
                        )}{' '}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
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
