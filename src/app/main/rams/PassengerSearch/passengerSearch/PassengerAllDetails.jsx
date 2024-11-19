/* eslint-disable no-undef */
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
  PASSENGERALLDETAILS_BY_PASSENGER_ID,
} from 'src/app/constant/constants';
import { doneNotDone } from 'src/app/@data/data';
import setIdIfValueIsObject from 'src/app/@helpers/setIdIfValueIsObject';
import { EmabassyAlert } from 'src/app/@customHooks/notificationAlert';
import PassengerAllDetailsHeader from './PassengerAllDetailsHeader';
import { useGetPassengerAllDetailsQuery } from '../PassengerSearchsApi';
import PassengerAllDetailsForm from './PassengerAllDetailsForm';
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
  police_clearance_no: z
    .string()
    .nonempty('You must enter a passengerAllDetails name')
    .min(5, 'The passengerAllDetails name must be at least 5 characters'),
});

function PassengerAllDetails() {
  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <div>
      <h2>Test is Passenger Serch</h2>
    </div>
  );
}

export default PassengerAllDetails;
