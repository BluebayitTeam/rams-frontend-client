import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getEmployeeUsers,
  getLedgers,
  getPermissions,
  getSubLedgers,
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
  const { users, subLedgers } = useSelector((state) => state.data);
  const invoiceNoEl = useRef(null);
  const activityLog = useSelector((state) => state.data.permissions);
  const [activityLogTypes, setActivityLogTypes] = useState([]);

  useEffect(() => {
    setActivityLogTypes([].concat(...Object.values(activityLog)));
  }, [activityLog]);
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
    dispatch(getEmployeeUsers());
    dispatch(getPermissions());
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

        {/* name */}
        <ReportTextField
          {...commonFieldProps}
          name='invoice_no'
          domEl={invoiceNoEl}
          icon='person'
          width='75px'
        />
        {/* passengerAgent */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='user'
          options={users}
          icon='person'
          width='35px'
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
          type='text'
          name='invoice_no'
          domEl={invoiceNoEl}
          icon='person'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='user'
          icon='person'
        />
      </div>
    </div>
  );
}

export default ActivityLogFilterMenu;
