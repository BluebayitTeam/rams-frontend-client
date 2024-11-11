import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getAgents,
  getCountries,
  getEmployeeUsers,
  getLedgers,
  getPermissions,
  getSubLedgers,
  getVisaAgents,
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function VisaEntryFilterMenu({
  inShowAllMode,
  handleGetVisaEntrys,
  handleGetAllVisaEntrys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { agents, countries, visa_agents } = useSelector((state) => state.data);
  const visaNoEl = useRef(null);
  const companyNameEl = useRef(null);

  const [visaEntryTypes, setVisaEntryTypes] = useState([]);

  useEffect(() => {
    setVisaEntryTypes([].concat(...Object.values(visaEntry)));
  }, [visaEntry]);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllVisaEntrys() : handleGetVisaEntrys(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllVisaEntrys() : handleGetVisaEntrys(),
  };

  useEffect(() => {
    dispatch(getAgents());
    dispatch(getVisaAgents());
    dispatch(getCountries());
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
        {/* visa_no */}
        <ReportTextField
          {...commonFieldProps}
          name='visa_no'
          domEl={visaNoEl}
          icon='person'
          width='75px'
        />

        <ReportTextField
          {...commonFieldProps}
          name='company_name'
          domEl={companyNameEl}
          icon='person'
          width='110px'
        />

        {/* passengerAgent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='passenger_agent'
          options={agents}
          icon='import_contacts'
          width='125px'
        />

        {/* V.Agent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='visa_agent'
          options={visa_agents}
          icon='import_contacts'
          width='72px'
        />
        {/* lpassengerTypes */}
        <ReportSelect
          {...commonFieldProps}
          name='country'
          options={countries}
          icon='flag'
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
          type='text'
          name='visa_no'
          domEl={visaNoEl}
          icon='person'
        />

        <Keyword
          {...commonKewordProps}
          type='text'
          name='company_name'
          domEl={companyNameEl}
          icon='person'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='passenger_agent'
          icon='import_contacts'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='visa_agent'
          icon='import_contacts'
          options={visa_agents}
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='country'
          icon='flag'
        />
      </div>
    </div>
  );
}

export default VisaEntryFilterMenu;
