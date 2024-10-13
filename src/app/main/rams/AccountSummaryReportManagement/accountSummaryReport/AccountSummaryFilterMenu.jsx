import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function AccountSummaryFilterMenu({ inShowAllMode, handleGetAccountSummarys, handleGetAllAccountSummarys }) {
	const classes = useStyles();
	const dispatch = useDispatch();
  const methods = useFormContext();
	const { getValues } = methods;
  const theme = useTheme();
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
  const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllAccountSummarys() : handleGetAccountSummarys())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllAccountSummarys() : handleGetAccountSummarys())
	};

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
       {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='start_date'
          label='Date From'
          maxDate={values.end_date || new Date()}
        />

        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='end_date'
          label='Date To'
          minDate={values.start_date}
          maxDate={new Date()}
        />
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
      <Keyword
          {...commonKewordProps}
          type='date'
          name='start_date'
          label='Date From'
        />

        <Keyword
          {...commonKewordProps}
          type='date'
          name='end_date'
          label='Date To'
        />
      </div>
    </div>
  );
}

export default AccountSummaryFilterMenu;
