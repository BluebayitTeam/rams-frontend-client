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
// import ReportSelectManPower from 'src/app/@components/ReportComponents/ReportSelectManPower';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function ManPowerFilterMenu({
  inShowAllMode,
  handleGetManPowers,
  handleGetAllManPowers,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { passengers, countries, agents, passengerTypes, currentStatuss } =
    useSelector((state) => state.data);

  const values = getValues();
  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllManPowers() : handleGetManPowers(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllManPowers() : handleGetManPowers(),
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
        {/* M.Exp From */}
        <ReportDatePicker
          {...commonFieldProps}
          name='expiry_date_after'
          label='M.Exp From'
          minDate={values.expiry_date_before}
          maxDate={new Date()}
        />{' '}
        {/* M.Exp To */}
        <ReportDatePicker
          {...commonFieldProps}
          name='expiry_date_before'
          label='M.Exp To'
          minDate={values.expiry_date_after}
          maxDate={new Date()}
        />
        {/* V.Ent from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='V.Ent from'
          maxDate={values.date_before || new Date()}
        />
        {/* V.Ent To */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='V.Ent To'
          minDate={values.date_after}
          maxDate={new Date()}
        />
        {/* V.Stp Status */}
        <ReportSelect
          {...commonFieldProps}
          name='stamping_status'
          options={doneNotDone}
          icon='local_activity'
          width='112px'
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
          icon='flag'
          width='100px'
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
          onClick={() => navigate(`/apps/reportClm/reportClms/manPower`)}
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
          name='expiry_date_after'
          label='M.Exp From'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='expiry_date_before'
          label='M.Exp To'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_after'
          label='V.Ent from'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='V.Ent To'
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
          icon='flag'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='current_status'
          icon='local_activity'
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

export default ManPowerFilterMenu;
