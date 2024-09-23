import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function passengerAccountSummaryFilterMenu({ inShowAllMode, handleGetPassengerAccountSummarys, handleGetAllPassengerAccountSummarys }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues } = methods;

	const theme = useTheme();
	const { agents } = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
	console.log('Passenger Values:', getValues());

	

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllPassengerAccountSummarys() : handleGetPassengerAccountSummarys())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllPassengerAccountSummarys() : handleGetPassengerAccountSummarys())
	};

	useEffect(() => {
		
		dispatch(getAgents());
	}, [dispatch]);

	// console.log('sadhbjkasbdkj', getValues());
	return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
       {/* Agent */}
		<ReportSelect
          {...commonFieldProps}
          name='agent'
          options={agents}
          icon='person'
          width='40px'
		  getOptionLabel={(option) => `${option.first_name || ''} - ${option.last_name || ''}`}

        />
</div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
	   <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
         icon="person"
		  
        />
      </div>
    </div>
  );
}

export default passengerAccountSummaryFilterMenu;
