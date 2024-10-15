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
  const { ledgers, subLedgers,branches } = useSelector((state) => state.data);

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
       {/* date from */}
        <ReportDatePicker
          {...commonFieldProps}
          name='pdc_issue_date_after'
          label='Issue Date  From'
          maxDate={values.pdc_issue_date_before || new Date()}
        />

        {/* date to */}
        <ReportDatePicker
          {...commonFieldProps}
          name='pdc_issue_date_before'
          label='Issue Date To'
          minDate={values.pdc_issue_date_after}
          maxDate={new Date()}
        />
        
        

          {/* ledger */}
          <ReportSelect
          {...commonFieldProps}
          name='ledger'
          options={ledgers}
          icon='import_contacts'
          width='50px'
        />


         {/* sub_ledger */}
				<ReportSelect
					{...commonFieldProps}
					name="sub_ledger"
					options={subLedgers}
					icon="import_contacts"
					width="76px"
				/>

        {/* lpassengerTypes */}
        <ReportSelect
					{...commonFieldProps}
					name="rp_bank_id"
				  icon="text_fields"
					width="95px"
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
          type='date'
          name='pdc_issue_date_after'
          label='Issue Date From'
        />
        <Keyword
          {...commonKewordProps}
          type='date'
          name='pdc_issue_date_before'
          label='Issue Date To'
        />

        <Keyword
          {...commonKewordProps}
          type='select'
          name='ledger'
          icon='import_contacts'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='sub_ledger'
          icon='import_contacts'
        />
        
        <Keyword
					{...commonKewordProps}
					type="select"
					name="rp_bank_id"
					icon="text_fields"
				/>
      </div>
    </div>
  );
}

export default PostDateChequeFilterMenu;
