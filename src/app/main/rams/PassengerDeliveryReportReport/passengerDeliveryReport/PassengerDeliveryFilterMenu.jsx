import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  getBranches,
  getCountries,
  getLedgers,
  getSubLedgers,
} from 'app/store/dataSlice';
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

function PassengerDeliveryFilterMenu({
  inShowAllMode,
  handleGetPassengerDeliverys,
  handleGetAllPassengerDeliverys,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { getValues } = methods;
  const theme = useTheme();
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  const { countries, subLedgers, branches } = useSelector(
    (state) => state.data
  );
  const banks = ledgers.filter(
    (data) => data?.head_group?.name === 'Bank Accounts'
  );

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetPassengerDeliverys()
        : handleGetAllPassengerDeliverys,
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetPassengerDeliverys()
        : handleGetAllPassengerDeliverys,
  };

  useEffect(() => {
    dispatch(getBranches());
    dispatch(getCountries());
    dispatch(getSubLedgers());
  }, []);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_after'
          label='Delivery Date From	'
          maxDate={values.date_before || new Date()}
        />

        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='date_before'
          label='Delivery Date  to'
          minDate={values.date_after}
          maxDate={new Date()}
        />

        {/* Country */}
        <ReportSelect
          {...commonFieldProps}
          name='country'
          options={countries}
          icon='flag'
          width='50px'
        />

        {/* sub_ledger */}
        <ReportSelect
          {...commonFieldProps}
          name='sub_ledger'
          options={subLedgers}
          icon='import_contacts'
          width='76px'
        />

        {/* lpassengerTypes */}
        <ReportSelect
          {...commonFieldProps}
          name='rp_bank_id'
          options={banks}
          icon='text_fields'
          width='95px'
        />
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_after'
          label='Delivery Date From	'
        />

        <Keyword
          {...commonKewordProps}
          type='date'
          name='date_before'
          label='Delivery Date  to'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='country'
          options={countries}
          icon='flag'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='sub_ledger'
          icon='import_contacts'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='rp_bank_id'
          icon='text_fields'
        />
      </div>
    </div>
  );
}

export default PassengerDeliveryFilterMenu;
