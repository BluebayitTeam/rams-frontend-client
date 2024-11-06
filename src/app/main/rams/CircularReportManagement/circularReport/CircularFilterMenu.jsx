import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getCountries,
  getLedgers,
  getProfessions,
  getSubLedgers,
  getVisaAgents,
} from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function CircularFilterMenu({
  inShowAllMode,
  handleGetCirculars,
  handleGetAllCirculars,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { visa_agents, countries, professions } = useSelector(
    (state) => state.data
  );
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  // element refs
  const companyNameEl = useRef(null);
  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllCirculars() : handleGetCirculars(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllCirculars() : handleGetCirculars(),
  };

  useEffect(() => {
    dispatch(getVisaAgents());
    dispatch(getCountries());
    dispatch(getProfessions());
  }, []);

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

        {/* V.Agent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='visa_agent'
          options={visa_agents}
          icon='person'
          label='V.Agent'
          width='54px'
        />

        {/* Country */}
        <ReportSelect
          {...commonFieldProps}
          name='country'
          options={countries}
          label='Country'
          icon='flag'
          width='60px'
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
        {/* visa no */}
        <ReportTextField
          {...commonFieldProps}
          name='company_name'
          domEl={companyNameEl}
          icon='accessibility_new_icon'
          width='106px'
        />
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
          name='visa_agent'
          icon='person'
          options={visa_agents}
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='country'
          label='Country'
          icon='flag'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='profession'
          icon='person'
          options={professions}
        />
        <Keyword
          {...commonKewordProps}
          type='text'
          name='company_name'
          domEl={companyNameEl}
          icon='accessibility_new_icon'
        />
      </div>
    </div>
  );
}

export default CircularFilterMenu;
