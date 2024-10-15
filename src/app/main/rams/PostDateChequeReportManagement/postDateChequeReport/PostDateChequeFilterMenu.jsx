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
	...getReportFilterMakeStyles(theme)
}));

function PostDateChequeFilterMenu({ inShowAllMode, handleGetPostDateCheques, handleGetAllPostDateCheques }) {
	const classes = useStyles();
	const dispatch = useDispatch();
  const methods = useFormContext();
	const { getValues } = methods;
  const theme = useTheme();
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
  const { branches } = useSelector((state) => state.data);

  const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ?  handleGetPostDateCheques():handleGetAllPostDateCheques)
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ?handleGetPostDateCheques():handleGetAllPostDateCheques)
	};

  useEffect(() => {
		dispatch(getBranches());
    dispatch(getLedgers());
		dispatch(getSubLedgers());
	}, []);

  return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
         {/* branche */}
         <ReportSelect
          {...commonFieldProps}
          name='branch'
          options={branches}
          icon='import_contacts'
          width='50px'
        />
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
          type='select'
          name='branch'
          icon='import_contacts'
        />
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

export default PostDateChequeFilterMenu;
