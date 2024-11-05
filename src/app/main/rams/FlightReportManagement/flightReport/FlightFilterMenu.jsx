import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import { ViewWeek } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';
import { doneNotDone, genders } from 'src/app/@data/data';
import {
  getAgents,
  getCountries,
  getPassengers,
  getPassengerTypes,
} from 'app/store/dataSlice';
import ReportSelectPassenger from 'src/app/@components/ReportComponents/ReportSelectPassenger';
// import ReportSelectFlight from 'src/app/@components/ReportComponents/ReportSelectFlight';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function FlightFilterMenu({
  inShowAllMode,
  handleGetFlights,
  handleGetAllFlights,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useFormContext();
  const { getValues } = methods;
  // element refs
  const ticketNoEl = useRef(null);

  const theme = useTheme();
  const { passengers, countries, agents, passengerTypes, currentStatuss } =
    useSelector((state) => state.data);

  const values = getValues();
  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () => (inShowAllMode ? handleGetAllFlights() : handleGetFlights()),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () => (inShowAllMode ? handleGetAllFlights() : handleGetFlights()),
  };

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getPassengerTypes());
  }, [dispatch]);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* F.Ent from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='F.Ent from'
          maxDate={values.date_before || new Date()}
        />
        {/* F.Ent to*/}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='F.Ent to'
          minDate={values.date_after}
          maxDate={new Date()}
        />
        {/* Flight From */}
        <ReportDatePicker
          {...commonFieldProps}
          name='flight_date_after'
          label='Flight From'
          minDate={values.flight_date_after}
          maxDate={new Date()}
        />{' '}
        {/* Flight to*/}
        <ReportDatePicker
          {...commonFieldProps}
          name='flight_date_after'
          label='Flight to'
          minDate={values.flight_date_after}
          maxDate={new Date()}
        />
        {/* ticket no */}
        <ReportTextField
          {...commonFieldProps}
          name='ticket_no'
          domEl={ticketNoEl}
          icon='accessibility_new_icon'
          width='90px'
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
        {/* Country */}
        <ReportSelect
          {...commonFieldProps}
          name='target_country'
          options={countries}
          label='Country'
          icon='flag'
          width='60px'
        />
        {/* agent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='agent'
          options={agents}
          icon='person'
          width='40px'
        />
        {/* Passenger Type */}
        <ReportSelect
          {...commonFieldProps}
          name='passenger_type'
          options={passengerTypes}
          icon='text_fields'
          width='110px'
        />
        {/* Gender */}
        <ReportSelect
          {...commonFieldProps}
          name='gender'
          options={genders}
          icon='radio_button_checked_two_tone'
          width='50px'
        />
      </div>
      <div>
        <ViewWeek
          onClick={() => navigate(`/apps/reportClm/reportClms/flight`)}
          className='cursor-pointer mr-10 mt-20'
          style={{ color: 'red', marginLeft: '45%', fontSize: '30px' }}
        />{' '}
        <p style={{ marginLeft: '42%', color: 'blue' }}>Column Setting</p>
      </div>
      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_after'
          label='F.Ent from'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='F.Ent to'
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='date'
          name='flight_date_after'
          label='Flight From'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='flight_date_before'
          label='Flight to'
        />
        <Keyword
          {...commonKewordProps}
          type='text'
          name='ticket_no'
          domEl={ticketNoEl}
          icon='accessibility_new_icon'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger'
          icon='person'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='target_country'
          label='Country'
          icon='flag'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
          icon='person'
          options={agents}
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger_type'
          icon='text_fields'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='gender'
          icon='radio_button_checked_two_tone'
        />
      </div>
    </div>
  );
}

export default FlightFilterMenu;
