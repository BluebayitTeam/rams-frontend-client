import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function ActivityLogFilterMenu({
  inShowAllMode,
  handleGetActivityLogs,
  handleGetAllActivityLogs,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { employees, subLedgers } = useSelector((state) => state.data);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllActivityLogs() : handleGetActivityLogs(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllActivityLogs() : handleGetActivityLogs(),
  };

  useEffect(() => {
    dispatch(getLedgers());
    dispatch(getSubLedgers());
  }, []);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='Created From'
          maxDate={values.date_before || new Date()}
        />

        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='Created To'
          minDate={values.date_after}
          maxDate={new Date()}
        />

        {/* ledger */}
        <ReportSelect
          {...commonFieldProps}
          name='employee'
          options={employees}
          icon='person'
          width='66px'
        />

        {/* lpassengerTypes */}
        <ReportSelect
          {...commonFieldProps}
          name='account_type'
          label='Activity Log Type'
          options={bankAndCash}
          icon='text_fields'
          width='108px'
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
          name='employee'
          icon='person'
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

export default ActivityLogFilterMenu;
