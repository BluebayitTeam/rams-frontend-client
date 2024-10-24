import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getAgents,
  getCities,
  getCountries,
  getCurrentStatuss,
  getDemands,
  getGroups,
  getMedicals,
  getMedicalTypes,
  getProfessions,
} from 'app/store/dataSlice';
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
import { genders } from 'src/app/@data/data';
import ReportSelectMedical from 'src/app/@components/ReportComponents/ReportSelectMedical';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function MedicalFilterMenu({
  inShowAllMode,
  handleGetMedicals,
  handleGetAllMedicals,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { medicals, countries, agents, medicalTypes, currentStatuss } =
    useSelector((state) => state.data);

  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  console.log('Medical Values:', getValues());

  // element refs
  const userNameEl = useRef(null);
  const primaryPhoneEl = useRef(null);
  const medicalCodeEl = useRef(null);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllMedicals() : handleGetMedicals(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllMedicals() : handleGetMedicals(),
  };

  useEffect(() => {
    dispatch(getCities());
    dispatch(getGroups());
    dispatch(getMedicals());
    dispatch(getDemands());
    dispatch(getCountries());
    dispatch(getAgents());
    dispatch(getProfessions());
    dispatch(getMedicalTypes());
    dispatch(getCurrentStatuss());
  }, [dispatch]);

  // console.log('sadhbjkasbdkj', getValues());
  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='Date From'
          maxDate={values.date_before || new Date()}
        />

        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='Date To'
          minDate={values.date_after}
          maxDate={new Date()}
        />
        {/* Country */}
        <ReportSelect
          {...commonFieldProps}
          name='target_country'
          options={countries}
          icon='flag'
          width='100px'
        />
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='agent'
          options={agents}
          icon='person'
          width='40px'
        />
        {/* Medical Type */}
        <ReportSelect
          {...commonFieldProps}
          name='medical_type'
          options={medicalTypes}
          icon='text_fields'
          width='110px'
        />
        {/* Medical */}
        <ReportSelectMedical
          {...commonFieldProps}
          name='medical'
          options={medicals}
          getOptionLabel={(option) =>
            `${option.medical_id} -${option.office_serial} - ${option.passport_no}- ${option.medical_name}`
          }
          icon='person'
          width='78px'
        />

        {/* Current Status */}
        <ReportSelect
          {...commonFieldProps}
          name='current_status'
          options={currentStatuss}
          icon='local_activity'
          width='100px'
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
          onClick={() => navigate(`/apps/reportClm/reportClms/medical`)}
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
          label='Date From'
        />

        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='Date To'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='medical'
          icon='person'
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
          name='target_country'
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
          name='medical_type'
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

export default MedicalFilterMenu;
