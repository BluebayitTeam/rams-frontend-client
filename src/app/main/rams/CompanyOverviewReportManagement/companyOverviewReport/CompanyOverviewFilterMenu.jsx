import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents, getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import ReportSelectFirstAgentCode from 'src/app/@components/ReportComponents/ReportSelectFirstAgentCode';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function CompanyOverviewFilterMenu({
  inShowAllMode,
  handleGetCompanyOverviews,
  handleGetAllCompanyOverviews,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { agents, subLedgers } = useSelector((state) => state.data);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  console.log('Passenger Values:', getValues());

  // element refs
  const visaNoEl = useRef(null);
  const companyNameEl = useRef(null);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetAllCompanyOverviews()
        : handleGetCompanyOverviews(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetAllCompanyOverviews()
        : handleGetCompanyOverviews(),
  };

  useEffect(() => {
    dispatch(getAgents());
  }, []);
  console.log('sadhbjkasbdkj', getValues());
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
        <ReportSelectFirstAgentCode
          {...commonFieldProps}
          name='visa_agent'
          label='V.Agent'
          options={agents}
          icon='person'
          width='50px'
        />

        {/* Visa No */}
        <ReportTextField
          {...commonFieldProps}
          name='visa_number'
          domEl={visaNoEl}
          icon='accessibility_new_icon'
          width='77px'
        />

        {/* phone */}
        <ReportTextField
          {...commonFieldProps}
          name='company_name'
          label='Company Name'
          domEl={companyNameEl}
          icon='phone'
          width='45px'
        />
        {/* lpassengerTypes */}
        <ReportSelect
          {...commonFieldProps}
          name='account_type'
          options={bankAndCash}
          icon='text_fields'
          width='90px'
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
          type='text'
          name='company_name'
          label='Company Name'
          domEl={companyNameEl}
          icon='phone'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='account_type'
          icon='text_fields'
        />
      </div>
    </div>
  );
}

export default CompanyOverviewFilterMenu;
