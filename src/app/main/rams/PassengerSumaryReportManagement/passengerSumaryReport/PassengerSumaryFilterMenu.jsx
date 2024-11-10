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
import {
  doneNotDone,
  genders,
  medicalResult2s,
  medicalResults,
} from 'src/app/@data/data';
import {
  getAgents,
  getCountries,
  getCurrentStatuss,
  getDemands,
  getPassengerAgents,
  getPassengers,
  getPassengerTypes,
  getProfessions,
  getVisaAgents,
} from 'app/store/dataSlice';
import ReportSelectPassenger from 'src/app/@components/ReportComponents/ReportSelectPassenger';
import ReportSelectDemand from 'src/app/@components/ReportComponents/ReportSelectDemand';
import ReportSelectFirstAgentCode from 'src/app/@components/ReportComponents/ReportSelectFirstAgentCode';

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
  // element refs
  const visaNoEl = useRef(null);
  const theme = useTheme();
  const {
    passengers,
    countries,
    agents,
    passengerTypes,
    currentStatuss,
    demands,
    professions,
    visa_agents,
    passenger_agents,
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
    dispatch(getVisaAgents());
    dispatch(getPassengerTypes());
    dispatch(getDemands());
    dispatch(getProfessions());
    dispatch(getPassengerAgents());
    dispatch(getCurrentStatuss());
  }, [dispatch]);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* Demand */}
        <ReportSelectDemand
          {...commonFieldProps}
          name='demand'
          options={demands}
          label='Demand'
          icon='person'
          width='56px'
        />
        {/* P.agent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='agent'
          label='P.agent'
          options={passenger_agents}
          icon='person'
          width='54px'
        />
        {/* visa no */}
        <ReportTextField
          {...commonFieldProps}
          name='visa_number'
          domEl={visaNoEl}
          icon='accessibility_new_icon'
          width='90px'
        />
        {/* Profession */}
        <ReportSelect
          {...commonFieldProps}
          name='profession'
          options={professions}
          label='Profession'
          icon='person'
          width='72px'
        />
        {/* Passenger Type */}
        <ReportSelect
          {...commonFieldProps}
          name='passenger_type'
          options={passengerTypes}
          icon='text_fields'
          width='110px'
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
        {/* Gender */}
        <ReportSelect
          {...commonFieldProps}
          name='gender'
          options={genders}
          icon='radio_button_checked_two_tone'
          width='50px'
        />
        {/* Passenger */}
        <ReportSelectPassenger
          {...commonFieldProps}
          name='passenger'
          options={passengers}
          getOptionLabel={(option) =>
            `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
          }
          icon='person'
          width='78px'
        />
        {/* Mofa Status */}
        <ReportSelect
          {...commonFieldProps}
          name='mofa_status'
          options={doneNotDone}
          icon='local_activity'
          width='82px'
        />
        {/* Stamping from  */}
        <ReportDatePicker
          {...commonFieldProps}
          name='stamping_date_before'
          label='Stamping from '
          maxDate={values.stamping_date_before || new Date()}
        />
        {/* Stamping to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='stamping_date_after'
          label='Stamping to'
          minDate={values.stamping_date_after}
          maxDate={new Date()}
        />
        {/* Medical Result */}
        <ReportSelect
          {...commonFieldProps}
          name='medical_result'
          options={medicalResult2s}
          icon='new_releases'
          width='97px'
        />
        {/* Med.Exp from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='medical_expiry_date_before'
          label='Med.Exp from'
          minDate={values.medical_expiry_date_before}
          maxDate={new Date()}
        />{' '}
        {/* Med.Exp To */}
        <ReportDatePicker
          {...commonFieldProps}
          name='medical_expiry_date_after'
          label='Med.Exp To'
          minDate={values.medical_expiry_date_after}
          maxDate={new Date()}
        />
        {/* PC.Status */}
        <ReportSelect
          {...commonFieldProps}
          name='police_clearance_status'
          options={doneNotDone}
          icon='account_balance'
          label='Pc Status'
          width='64px'
        />{' '}
        {/* DL.Status */}
        <ReportSelect
          {...commonFieldProps}
          name='driving_license_status'
          options={doneNotDone}
          icon='directions_car'
          label='Dl Status'
          width='62px'
        />{' '}
        {/* finger status */}
        <ReportSelect
          {...commonFieldProps}
          name='finger_status'
          options={doneNotDone}
          icon='touch_app'
          label='Finger Statuss'
          width='90px'
        />{' '}
        {/* Trng.Card Status */}
        <ReportSelect
          {...commonFieldProps}
          name='training_card_status'
          options={doneNotDone}
          icon='recent_actors'
          label='Trng.Card Status'
          width='115px'
        />
        {/* ManP.from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='man_power_date_before'
          label='ManP.from'
          maxDate={values.man_power_date_before || new Date()}
        />
        {/* ManP.to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='man_power_date_after'
          label='ManP.to'
          minDate={values.man_power_date_after}
          maxDate={new Date()}
        />
        {/* ManP.Status*/}
        <ReportSelect
          {...commonFieldProps}
          name='man_power_status'
          options={doneNotDone}
          icon='recent_actors'
          label='ManP.Status'
          width='85px'
        />
        {/* V.Agent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='visa_agent'
          options={visa_agents}
          icon='person'
          label='V.Agent'
          width='54px'
        />{' '}
        {/* Current Status */}
        <ReportSelect
          {...commonFieldProps}
          name='current_status'
          options={doneNotDone}
          icon='local_activity'
          width='97px'
        />
      </div>
      <div>
        <ViewWeek
          onClick={() =>
            navigate(`/apps/reportClm/reportClms/passenger_summary`)
          }
          className='cursor-pointer mr-10 mt-20'
          style={{ color: 'red', marginLeft: '45%', fontSize: '30px' }}
        />{' '}
        <p style={{ marginLeft: '42%', color: 'blue' }}>Column Setting</p>
      </div>
      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='select'
          name='demand'
          label='Demand'
          icon='person'
        />
        <Keyword
          {...commonKewordProps}
          type='text'
          name='visa_number'
          domEl={visaNoEl}
          icon='accessibility_new_icon'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='visa_agent'
          icon='person'
          options={visa_agents}
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
          label='P.agent'
          options={passenger_agents}
          icon='person'
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='profession'
          icon='person'
          options={professions}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='medical_result'
          icon='new_releases'
          options={medicalResults}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger_type'
          icon='text_fields'
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
          name='gender'
          icon='radio_button_checked_two_tone'
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
          name='mofa_status'
          icon='local_activity'
          options={doneNotDone}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='current_status'
          icon='local_activity'
          options={doneNotDone}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='police_clearance_status'
          icon='account_balance'
          label='Pc Status'
          options={doneNotDone}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='driving_license_status'
          icon='directions_car'
          label='Dl Status'
          options={doneNotDone}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='training_card_status'
          icon='recent_actors'
          label='Trng.Card Status'
          options={doneNotDone}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='finger_status'
          icon='touch_app'
          label='Finger Status'
          options={doneNotDone}
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='select'
          name='man_power_status'
          icon='recent_actors'
          label='ManP.Status'
          options={doneNotDone}
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='stamping_date_before'
          label='Stamping from '
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='stamping_date_after'
          label='Stamping to'
        />{' '}
        <Keyword
          {...commonKewordProps}
          type='date'
          name='medical_expiry_date_before'
          label='Med.Exp from'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='medical_expiry_date_after'
          label='Med.Exp To'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='man_power_date_before'
          label='ManP.from'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='man_power_date_after'
          label='ManP.to'
        />
      </div>
    </div>
  );
}

export default PassengerSumaryFilterMenu;
