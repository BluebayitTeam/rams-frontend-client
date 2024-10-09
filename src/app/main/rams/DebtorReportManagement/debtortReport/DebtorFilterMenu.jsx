import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getGroups, getLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function DebtorFilterMenu({ inShowAllMode, handleGetDebtors, handleGetAllDebtors }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues } = methods;

	const theme = useTheme();
	const { ledgers, groups } = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);



	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllDebtors() : handleGetDebtors())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllDebtors() : handleGetDebtors())
	};

	useEffect(() => {
		dispatch(getLedgers());
    dispatch(getGroups());

	}, []);


	
	return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
        {/* ledger */}
        <ReportSelect
          {...commonFieldProps}
          name='ledger'
          options={ledgers}
          icon='import_contacts'
          width='40px'
        />
        <ReportSelect
          {...commonFieldProps}
          name='group'
          options={groups}
          icon='import_contacts'
          width='40px'
        />
 </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
        <Keyword
          {...commonKewordProps}
          type='select'
          name='ledger'
          icon='import_contacts'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='group'
          icon='import_contacts'
        />
        
        </div>
    </div>
  );
}

export default DebtorFilterMenu;
