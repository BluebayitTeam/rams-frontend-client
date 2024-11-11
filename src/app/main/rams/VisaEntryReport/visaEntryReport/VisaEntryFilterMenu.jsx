import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getEmployeeUsers,
  getLedgers,
  getPermissions,
  getSubLedgers,
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
  const { employeeusers, subLedgers } = useSelector((state) => state.data);
  const visaEntry = useSelector((state) => state.data.permissions);
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
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='employee'
          options={employeeusers}
          icon='person'
          width='65px'
        />

        {/* lpassengerTypes */}
        <ReportSelect
          {...commonFieldProps}
          name='activity_log_type'
          label='Activity Log Type'
          options={visaEntryTypes}
          icon='text_fields'
          width='118px'
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
          name='activity_log_type'
          icon='text_fields'
        />
      </div>
    </div>
  );
}

export default VisaEntryFilterMenu;
