import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getAgents,
  getCountries,
  getPassengers,
  getPassengerTypes,
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectPassenger from 'src/app/@components/ReportComponents/ReportSelectPassenger';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function PassengerDeliveryFilterMenu({
  inShowAllMode,
  handleGetPassengerDeliverys,
  handleGetAllPassengerDeliverys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { getValues } = methods;
  const theme = useTheme();
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  const { countries, passengerTypes, agents, passengers } = useSelector(
    (state) => state.data
  );

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetPassengerDeliverys()
        : handleGetAllPassengerDeliverys,
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetPassengerDeliverys()
        : handleGetAllPassengerDeliverys,
  };

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getPassengerTypes());
  }, []);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='Delivery Date From	'
          maxDate={values.date_before || new Date()}
        />

        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='Delivery Date  to'
          minDate={values.date_after}
          maxDate={new Date()}
        />

        {/* Country */}
        <ReportSelect
          {...commonFieldProps}
          name='country'
          options={countries}
          icon='flag'
          width='55px'
        />

        {/* passenger Type */}
        <ReportSelect
          {...commonFieldProps}
          name='passenger_type'
          options={passengerTypes}
          icon='person'
          width='108px'
        />

        {/* agent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='agent'
          options={agents}
          icon='person'
          width='40px'
        />
        {/* Passenger */}
        <ReportSelectPassenger
          {...commonFieldProps}
          name='passenger'
          options={passengers}
          getOptionLabel={(option) =>
            `${option.passenger_id} -${option.office_serial} - ${option.passport_no}- ${option.passenger_name}`
          }
          icon='person'
          width='78px'
        />
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_after'
          label='Delivery Date From	'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='Delivery Date  to'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='country'
          options={countries}
          icon='flag'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger_type'
          options={passengerTypes}
          icon='person'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger'
          icon='person'
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
          icon='person'
        />
      </div>
    </div>
  );
}

export default PassengerDeliveryFilterMenu;
