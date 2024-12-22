import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function passengerAccountSummaryFilterMenu() {
	const classes = useStyles();
	const dispatch = useDispatch();
  const [inShowAllMode, setInShowAllMode] = useState(false);
	const methods = useFormContext();
	const { getValues } = methods;

	const theme = useTheme();
	const { agents } = useSelector((state) => state.data);
	const values = getValues();
	
	const [_reRender, setReRender] = useState(0);
	
const handleGetAllPassengerSummarys = (e) => {
  const data = {
    agent: getValues().agent,
    passenger: getValues().passenger,
    flight_status: getValues().flight_status,
    page: 1,
    size: 100,
  };

  // const data = { agent, passenger, flight };
  dispatch(getPassengerUpdates(data));
};
	

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllPassengerSummarys() : null)
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllPassengerSummarys() : null)
	};

	useEffect(() => {
		
		dispatch(getAgents());
	}, [dispatch]);


	return (
    <div className={classes.filterMenuContainer}>
      <div className='allFieldContainer borderTop mt-4'>
       {/* Agent */}
		<ReportSelectFirstLastName
          {...commonFieldProps}
          name='agent'
          options={agents}
          icon='person'
          width='40px'
		/>
</div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
	   <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
         icon="person"
		  options={agents}
        />

		
      </div>
    </div>
  );
}

export default passengerAccountSummaryFilterMenu;
