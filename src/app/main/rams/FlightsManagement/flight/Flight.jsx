import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, Tab, TextField, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  FLIGHT_BY_PASSENGER_ID,
  GET_PASSENGER_BY_ID,
} from 'src/app/constant/constants';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { activeRetrnCncl } from 'src/app/@data/data';
import moment from 'moment';
import { getManpower } from 'app/store/dataSlice';
import FlightHeader from './FlightHeader';
import { useGetFlightQuery } from '../FlightsApi';
import FlightForm from './FlightForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';

const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    paddingTop: '0.8rem',
    paddingBottom: '0.7rem',
    boxSizing: 'content-box',
  },
  textField: {
    height: '4.8rem',
    '& > div': {
      height: '100%',
    },
  },
}));

const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a Flight name')
    .min(5, 'The Flight name must be at least 5 characters'),
});

function Flight() {
  const emptyValue = {
    passenger: '',
    ticket_status: '',
    ticket_agency: '',
    carrier_air_way: '',
    flight_no: '',
    ticket_no: '',
    sector_name: '',
    flight_time: '',
    arrival_time: '',
    issue_date: '',
    flight_date: '',
    notes: '',
    current_status: '',
  };
  const routeParams = useParams();
  const { flightId, fromSearch } = routeParams;
  const passengers = useSelector((state) => state.data.passengers);
  const classes = useStyles();
  const navigate = useNavigate();
  const [formKey, setFormKey] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });

  const {
    data: Flight,
    isLoading,
    isError,
  } = useGetFlightQuery(flightId, {
    skip: !flightId || flightId === 'new',
  });

  const [tabValue, setTabValue] = useState(0);

  const {
    reset,
    control,
    formState: { errors },
    setValue,
  } = methods;

  const handleReset = (defaultValues) => {
    reset(defaultValues);
    setFormKey((prevKey) => prevKey + 1); // Trigger re-render with new form key
  };

  const getCurrentStatus = (passengerId) => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };
    axios.get(`${GET_PASSENGER_BY_ID}${passengerId}`, authTOKEN).then((res) => {
      setValue('current_status', res.data?.current_status?.id);
    });
  };

  useEffect(() => {
    if (fromSearch) {
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      axios
        .get(`${FLIGHT_BY_PASSENGER_ID}${flightId}`, authTOKEN)
        .then((res) => {
          if (res.data.id) {
            // handleReset({ ...setIdIfValueIsObject(res.data), passenger: flightId });
          } else {
            handleReset({
              passenger: flightId,
              ticket_status: activeRetrnCncl.find((data) => data.default)?.id,
            });
            sessionStorage.setItem('operation', 'save');
          }
        })
        .catch(() => {
          handleReset({
            passenger: flightId,
            ticket_status: activeRetrnCncl.find((data) => data.default)?.id,
          });
          sessionStorage.setItem('operation', 'save');
        });
    } else {
      handleReset({
        ...emptyValue,
        ticket_status: activeRetrnCncl.find((data) => data.default)?.id,
      });
    }
  }, [fromSearch]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('FLIGHT_DETAILS') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          contentToolbar={
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              variant='scrollable'
              scrollButtons='auto'
              classes={{ root: 'w-full h-64' }}>
              <Tab label='Passenger Details' />
              <Tab label='Flight Information' />
            </Tabs>
          }
          header={
            <FlightHeader handleReset={handleReset} emptyValue={emptyValue} />
          }
          content={
            <div className='p-16'>
              {tabValue === 0 && (
                <div className='p-16'>
                  <div className='flex justify-center w-full px-16'>
                    <Controller
                      name='passenger'
                      control={control}
                      render={({ field: { value } }) => (
                        <Autocomplete
                          className={`w-full max-w-320 h-48 ${classes.container}`}
                          freeSolo
                          autoHighlight
                          disabled={!!fromSearch}
                          value={
                            value
                              ? passengers.find((data) => data.id === value)
                              : null
                          }
                          options={passengers}
                          getOptionLabel={(option) =>
                            `${option?.passenger_id} ${option?.office_serial} ${option?.passport_no} ${option?.passenger_name}`
                          }
                          onChange={(event, newValue) => {
                            const authTOKEN = {
                              headers: {
                                'Content-type': 'application/json',
                                Authorization:
                                  localStorage.getItem('jwt_access_token'),
                              },
                            };

                            getManpower(newValue?.id);
                            axios
                              .get(
                                `${GET_PASSENGER_BY_ID}${newValue?.id}`,
                                authTOKEN
                              )
                              .then((res) => {
                                setValue(
                                  'current_status',
                                  res.data?.current_status?.id
                                );
                                setValue('passenger', res.data?.id);
                              });

                            if (newValue?.id) {
                              const authTOKEN = {
                                headers: {
                                  'Content-type': 'application/json',
                                  Authorization:
                                    localStorage.getItem('jwt_access_token'),
                                },
                              };
                              axios
                                .get(
                                  `${FLIGHT_BY_PASSENGER_ID}${newValue?.id}`,
                                  authTOKEN
                                )
                                .then((res) => {
                                  if (res.data.id) {
                                    console.log(
                                      `basdnaksnd`,
                                      moment(
                                        new Date(res?.data?.issue_date)
                                      ).format('YYYY-MM-DD')
                                    );
                                    handleReset({
                                      ...setIdIfValueIsObject(res?.data),
                                      passenger: newValue?.id,
                                      flight_date: moment(
                                        new Date(res?.data?.flight_date)
                                      ).format('DD-MM-YYYY'),
                                      issue_date: moment(
                                        new Date(res?.data?.issue_date)
                                      ).format('YYYY-MM-DD'),
                                    });
                                    navigate(
                                      `/apps/Flight-management/Flights/${
                                        newValue?.passenger?.id || newValue?.id
                                      }`
                                    );
                                  } else {
                                    navigate(
                                      `/apps/Flight-management/Flights/new`
                                    );
                                    handleReset({
                                      passenger: newValue?.id,
                                      ticket_status: activeRetrnCncl.find(
                                        (data) => data.default
                                      )?.id,
                                    });
                                    getCurrentStatus(newValue?.id);
                                  }
                                })
                                .catch(() => {
                                  handleReset({
                                    passenger: newValue?.id,
                                    ticket_status: activeRetrnCncl.find(
                                      (data) => data.default
                                    )?.id,
                                  });
                                  getCurrentStatus(newValue?.id);
                                  navigate(
                                    `/apps/Flight-management/Flights/new`
                                  );
                                });
                            } else {
                              handleReset({
                                passenger: newValue?.id,
                                ticket_status: activeRetrnCncl.find(
                                  (data) => data.default
                                )?.id,
                              });
                              getCurrentStatus(newValue?.id);
                              navigate(`/apps/Flight-management/Flights/new`);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className={classes.textField}
                              placeholder='Select Passenger'
                              label='Passenger'
                              required
                              helperText={errors?.passenger?.message}
                              variant='outlined'
                              autoFocus
                              InputLabelProps={
                                value
                                  ? { shrink: true }
                                  : { style: { color: 'red' } }
                              }
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                  <FlightForm />
                </div>
              )}
              {tabValue === 1 && <FlightForm flightId={flightId} />}
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default Flight;
