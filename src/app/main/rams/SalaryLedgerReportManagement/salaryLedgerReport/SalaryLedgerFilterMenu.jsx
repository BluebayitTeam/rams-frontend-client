import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getDepartments,
  getEmployees
} from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';
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

  console.log('values', getValues());
  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_from'
          label='Date from'
        // minDate={values.date_to}
        // maxDate={new Date()}
        />

        {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_to'
          label='Date to'
        // maxDate={values.date_from || new Date()}
        />

        {/* employee */}
        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='employee'
          options={employees}
          icon='import_contacts'
          width='70px'
        />

        {/* department */}
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
          name='date_to'
          label='Date To'
        />

        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_from'
          label='Date From '
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
