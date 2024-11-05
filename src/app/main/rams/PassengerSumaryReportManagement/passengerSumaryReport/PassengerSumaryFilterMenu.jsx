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
  getDemands,
  getPassengers,
  getPassengerTypes,
} from 'app/store/dataSlice';
import ReportSelectPassenger from 'src/app/@components/ReportComponents/ReportSelectPassenger';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function PassengerSumaryFilterMenu({
  inShowAllMode,
  handleGetPassengerSumarys,
  handleGetAllPassengerSumarys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const {
    passengers,
    countries,
    agents,
    passengerTypes,
    currentStatuss,
    demands,
  } = useSelector((state) => state.data);

  const values = getValues();
  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetAllPassengerSumarys()
        : handleGetPassengerSumarys(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetAllPassengerSumarys()
        : handleGetPassengerSumarys(),
  };

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getPassengerTypes());
    dispatch(getDemands());
  }, [dispatch]);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* Demand */}
        <ReportSelect
          {...commonFieldProps}
          name='demand'
          options={demands}
          label='Demand'
          icon='person'
          width='60px'
        />
        {/* MP.Ent From */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='MP.Ent From'
          maxDate={values.date_before || new Date()}
        />
        {/* MP.Ent To */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='MP.Ent To'
          minDate={values.date_after}
          maxDate={new Date()}
        />
        {/* MP.from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='man_power_date_after'
          label='MP.from'
          minDate={values.man_power_date_before}
          maxDate={new Date()}
        />{' '}
        {/* MP.To */}
        <ReportDatePicker
          {...commonFieldProps}
          name='man_power_date_before'
          label='MP.To'
          minDate={values.man_power_date_after}
          maxDate={new Date()}
        />
        {/* MP.Dl from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='delivery_date_after'
          label='MP.Dl from'
          maxDate={values.delivery_date_before || new Date()}
        />
        {/* MP.Dl to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='delivery_date_before'
          label='MP.Dl to'
          minDate={values.delivery_date_after}
          maxDate={new Date()}
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
          onClick={() => navigate(`/apps/reportClm/reportClms/manpower`)}
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
          label='MP.Ent From'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='MP.Ent To'
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='date'
          name='man_power_date_after'
          label='MP.from'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='man_power_date_before'
          label='MP.To'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='delivery_date_after'
          label='MP.Dl from'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='delivery_date_before'
          label='MP.Dl to'
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

export default PassengerSumaryFilterMenu;
