import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getDepartments,
  getEmployees,
  getLedgers,
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

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function SalaryLedgerFilterMenu({
  inShowAllMode,
  handleGetSalaryLedgers,
  handleGetAllSalaryLedgers,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useFormContext();
  const { getValues } = methods;

  const theme = useTheme();
  const { employees, departments } = useSelector((state) => state.data);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetAllSalaryLedgers() : handleGetSalaryLedgers(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetAllSalaryLedgers() : handleGetSalaryLedgers(),
  };

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getDepartments());
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

        {/* ledger */}
        <ReportSelect
          {...commonFieldProps}
          name='employee'
          options={employees}
          icon='import_contacts'
          width='70px'
        />

        {/* sub_ledger */}
        <ReportSelect
          {...commonFieldProps}
          name='department'
          options={departments}
          icon='import_contacts'
          width='88px'
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
          icon='import_contacts'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='department'
          icon='import_contacts'
        />
      </div>
    </div>
  );
}

export default SalaryLedgerFilterMenu;
