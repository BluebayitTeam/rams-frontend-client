import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, Tab, TextField, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  GET_PASSENGER_BY_ID,
  MEDICAL_BY_PASSENGER_ID,
} from 'src/app/constant/constants';
import { doneNotDone, medicalResults } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import moment from 'moment';
import MedicalHeader from './MedicalHeader';
import { useGetMedicalQuery } from '../MedicalsApi';
import MedicalForm from './MedicalForm';
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
    .nonempty('You must enter a medical name')
    .min(5, 'The medical name must be at least 5 characters'),
});

function Medical() {
  const emptyValue = {
    passenger: '',
    medical_center: '',
    medical_serial_no: '',
    medical_result: '',
    medical_card: '',
    medical_exam_date: '',
    medical_report_date: '',
    medical_issue_date: '',
    medical_expiry_date: '',
    notes: '',
    slip_pic: '',
    medical_card_pic: '',
    current_status: '',
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { medicalId, fromSearch } = routeParams;
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
    data: medical,
    isLoading,
    isError,
  } = useGetMedicalQuery(medicalId, {
    skip: !medicalId || medicalId === 'new',
  });

  const [tabValue, setTabValue] = useState(0);

  const {
    reset,
    watch,
    control,
    formState: { errors },
    setValue,
  } = methods;

  function handleTabChange(event, value) {
    setTabValue(value);
  }

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
        .get(`${MEDICAL_BY_PASSENGER_ID}${medicalId}`, authTOKEN)
        .then((res) => {
          if (res.data.id) {
            reset({ ...setIdIfValueIsObject(res.data), passenger: medicalId });
          } else {
            handleReset({
              passenger: medicalId,
              medical_card: doneNotDone.find((data) => data.default)?.id,
              medical_result: medicalResults.find((data) => data.default)?.id,
            });
            sessionStorage.setItem('operation', 'save');
          }
        })
        .catch(() => {
          handleReset({
            passenger: medicalId,
            medical_card: doneNotDone.find((data) => data.default)?.id,
            medical_result: medicalResults.find((data) => data.default)?.id,
          });
          sessionStorage.setItem('operation', 'save');
        });
    } else {
      handleReset({
        ...emptyValue,
        medical_card: doneNotDone.find((data) => data.default)?.id,
        medical_result: medicalResults.find((data) => data.default)?.id,
      });
    }
  }, [fromSearch]);

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission('MEDICAL_DETAILS') && (
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
              <Tab label='Medical Information' />
            </Tabs>
          }
          header={
            <MedicalHeader handleReset={handleReset} emptyValue={emptyValue} />
          }
          content={
            <div className='p-16'>
              {tabValue === 0 && (
                <div className='p-16'>
                  <div className='flex justify-center w-full px-16'>
                    <Controller
                      name='passenger'
                      control={control}
                      render={({ field: { value } }) => {
                        return (
                          <Autocomplete
                            className={`w-full max-w-320 h-48 ${classes.container}`}
                            freeSolo
                            autoHighlight
                            disabled={!!fromSearch}
                            value={
                              value
                                ? passengers.find(
                                    (data) => data.id === Number(value)
                                  )
                                : null
                            }
                            options={passengers}
                            getOptionLabel={(option) =>
                              `${option?.passenger_id || ''} ${option?.office_serial || ''} ${option?.passport_no || ''} ${option?.passenger_name || ''}`
                            }
                            onChange={(event, newValue) => {
                              console.log('Selected newValue:', newValue); // Add this to log the selected value
                              const authTOKEN = {
                                headers: {
                                  'Content-type': 'application/json',
                                  Authorization:
                                    localStorage.getItem('jwt_access_token'),
                                },
                              };

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
                                axios
                                  .get(
                                    `${MEDICAL_BY_PASSENGER_ID}${newValue?.id}`,
                                    authTOKEN
                                  )
                                  .then((res) => {
                                    if (res.data.id) {
                                      handleReset({
                                        ...setIdIfValueIsObject(res.data),
                                        passenger: newValue?.id,
                                        medical_expiry_date: moment(
                                          new Date(
                                            res.data?.medical_expiry_date
                                          )
                                        ).format('YYYY-MM-DD'),
                                        medical_issue_date: moment(
                                          new Date(res.data?.medical_issue_date)
                                        ).format('YYYY-MM-DD'),
                                        medical_report_date: moment(
                                          new Date(
                                            res.data?.medical_report_date
                                          )
                                        ).format('YYYY-MM-DD'),
                                        medical_exam_date: moment(
                                          new Date(res.data?.medical_exam_date)
                                        ).format('YYYY-MM-DD'),
                                      });
                                      navigate(
                                        `/apps/medical/medicals/${
                                          newValue?.newValue?.id || newValue?.id
                                        }`
                                      );
                                    } else {
                                      navigate(`/apps/medical/medicals/new`);
                                      handleReset({
                                        passenger: newValue?.id,
                                        medical_result: medicalResults.find(
                                          (data) => data.default
                                        )?.id,
                                        medical_card: doneNotDone.find(
                                          (data) => data.default
                                        )?.id,
                                      });
                                      getCurrentStatus(newValue?.id);
                                    }
                                  })
                                  .catch(() => {
                                    handleReset({
                                      passenger: newValue?.id,
                                      medical_result: medicalResults.find(
                                        (data) => data.default
                                      )?.id,
                                      medical_card: doneNotDone.find(
                                        (data) => data.default
                                      )?.id,
                                    });
                                    getCurrentStatus(newValue?.id);
                                    navigate(`/apps/medical/medicals/new`);
                                  });
                              } else {
                                navigate(`/apps/medical/medicals/new`);
                                handleReset({
                                  passenger: newValue?.id,
                                  medical_result: medicalResults.find(
                                    (data) => data.default
                                  )?.id,
                                  medical_card: doneNotDone.find(
                                    (data) => data.default
                                  )?.id,
                                });
                                getCurrentStatus(newValue?.id);
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
                        );
                      }}
                    />
                  </div>
                  <MedicalForm />
                </div>
              )}
              {tabValue === 1 && <MedicalForm medicalId={medicalId} />}
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default Medical;
