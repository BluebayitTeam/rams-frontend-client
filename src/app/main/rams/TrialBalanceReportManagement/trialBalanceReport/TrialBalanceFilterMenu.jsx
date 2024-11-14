import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getBranches, getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
  ...getReportFilterMakeStyles(theme),
}));

function TrialBalanceFilterMenu({
  inShowAllMode,
  handleGetTrialBalances,
  handleGetAllTrialBalances,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { getValues } = methods;
  const theme = useTheme();
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  const { ledgers, subLedgers, branches } = useSelector((state) => state.data);
  const banks = ledgers.filter(
    (data) => data?.head_group?.name === 'Bank Accounts'
  );

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode ? handleGetTrialBalances() : handleGetAllTrialBalances,
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode ? handleGetTrialBalances() : handleGetAllTrialBalances,
  };

  useEffect(() => {
    dispatch(getBranches());
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
        {/* branche */}
        <ReportSelect
          {...commonFieldProps}
          name='branch'
          options={branches}
          icon='import_contacts'
          width='50px'
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
          name='branch'
          icon='import_contacts'
        />
      </div>
    </div>
  );
}

export default TrialBalanceFilterMenu;
