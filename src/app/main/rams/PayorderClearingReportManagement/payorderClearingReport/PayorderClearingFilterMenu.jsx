import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getBranches, getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { payorderReportStatus } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function PayorderClearingFilterMenu({ inShowAllMode, handleGetPayorderClearings, handleGetAllPayorderClearings }) {
	const classes = useStyles();
	const dispatch = useDispatch();
  const methods = useFormContext();
	const { getValues } = methods;
  const theme = useTheme();
	const values = getValues();
	const [_reRender, setReRender] = useState(0);

  const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ?  handleGetPayorderClearings():handleGetAllPayorderClearings)
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ?handleGetPayorderClearings():handleGetAllPayorderClearings)
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
       {/* lpassengerTypes */}
        <ReportSelect
					{...commonFieldProps}
					name="status"
					options={payorderReportStatus}
				  icon="text_fields"
					width="46px"
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
					type="select"
					name="status"
					icon="text_fields"
				/>
      </div>
    </div>
  );
}

export default PayorderClearingFilterMenu;
