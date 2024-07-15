/* eslint-disable prettier/prettier */
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPassengers } from 'app/store/dataSlice';
import { AddedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import MakeListRowHeader from './MakeListRowHeader';
import MakeListRowModel from './models/MakeListRowModel';
import {
  useCreateMakeListRowMutation,
  useGetMakeListRowQuery,
} from '../MakeListRowApi';
import MultiplePassengersTable from './MultiplePassengersTable';

/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a makeListRow name')
    .min(5, 'The makeListRow name must be at least 5 characters'),
});

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

function MakeListRow() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const classes = useStyles();
  const routeParams = useParams();
  const { makeListRowId } = routeParams;
  const {
    data: makeListRow,
    isLoading,
    isError,
    refetch,
  } = useGetMakeListRowQuery(makeListRowId, {
    skip: !makeListRowId || makeListRowId === 'new',
  });

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { control, reset, watch, formState, setValue, getValues } = methods;
  console.log('getValues', getValues());
  const { errors } = formState;
  const passengers = useSelector((state) => state.data.passengers);
  const [mltPassengerList, setMltPassengerList] = useState([]);
  const [mltPassengerDeletedId, setMltPassengerDeletedId] = useState(null);

  const [pageData, setPageData] = useState({ page: 1, size: 30 });
  const { makeAListId } = routeParams;
  const [passengerIds,setPassengerIds]=useState(passengers)
  const dispatch = useDispatch();

  useEffect(() => {
    if (makeListRowId && makeListRowId !== 'new') {
      refetch();
    }
  }, [makeListRowId, refetch]);

  useEffect(() => {
    if (makeListRowId === 'new') {
      reset(MakeListRowModel({}));
    } else if (makeListRow) {
      reset(makeListRow);
    }
  }, [makeListRowId, reset, makeListRow]);

  useEffect(() => {
    if (mltPassengerDeletedId) {
      setMltPassengerList(
        mltPassengerList.filter((item) => item.id !== mltPassengerDeletedId)
      );
      setMltPassengerDeletedId(null);
    }
  }, [mltPassengerDeletedId]);

  useEffect(() => {
    dispatch(getPassengers());
  }, [dispatch]);

  useEffect(() => {
    setValue(
      'passengers',
      mltPassengerList.map((data) => data.id)
    );
  }, [mltPassengerList, setValue]);

  const handlePassengerSelect = (newPassenger) => {
    if (newPassenger) {
      if (
        !mltPassengerList.some((passenger) => passenger.id === newPassenger.id)
      ) {
        setMltPassengerList([...mltPassengerList, newPassenger]);
        createMakeAListRow({
          passenger: newPassenger.id,
          make_list: params.makeAListId,
        })
          .then((response) => {
            AddedSuccessfully();
          })
          .catch((error) => {
            console.error('Error saving passenger:', error);
          });
      }
    }
  };

  const [createMakeAListRow] = useCreateMakeListRowMutation();

  // useEffect(() => {
  //   if (pageData.page && pageData.size && params.makeAListId) {
  //     const authTOKEN = {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: localStorage.getItem('jwt_access_token'),
  //       },
  //     };

     

  //     fetch(`${GET_MAKEALIST_ROW_BY_LIST_ID}${params.makeAListId}?page=${pageData.page}&size=${pageData.size}`, authTOKEN)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('Fetched passengers:', data?.passengers);
  //         setPassengers(data?.passengers || []);
  //         setPageData({
  //           ...pageData,
  //           total_pages: data.total_pages,
  //           total_elements: data.total_elements,
  //         });
  //       })
  //       .catch(() => {
         
  //       });
  //   }
  // }, [pageData.page, pageData.size, params.makeAListId]);

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && makeListRowId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such makeListRow!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/makeListRow/makeListRows'
          color='inherit'>
          Go to MakeListRows Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<MakeListRowHeader />}
        content={
          <div className='p-16'>
            {tabValue === 0 && (
              <div className='p-16'>
                <div className='flex justify-center w-full px-16'>
                  <Controller
                    name='passenger'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        className={`w-full max-w-320 h-48 ${classes.container}`}
                        freeSolo
                        value={
                          value
                            ? passengers.find((data) => data.id === value)
                            : null
                        }
                        options={passengers}
                        getOptionLabel={(option) =>
                          `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
                        }
                        onChange={(event, newValue) => {
                          onChange(newValue?.id);
                          handlePassengerSelect(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder='Select Passenger'
                            label='Passenger'
                            error={!value}
                            helperText={errors?.agency?.message}
                            variant='outlined'
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    )}
                  />
                </div>
              </div>
            )}
            {mltPassengerList.length > 0 && (
              <MultiplePassengersTable
                passengers={mltPassengerList}
                setMltPassengerList={setMltPassengerList}
                passengerIds={passengerIds}
                
              />
            )}
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}

export default MakeListRow;
