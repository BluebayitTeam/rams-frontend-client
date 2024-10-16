import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents, getAirways, getBranches, getCountries, getCurrentStatuss, getEmployees, getPassengers, getPassengerTypes } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import ReportSelectFirstAgentCode from 'src/app/@components/ReportComponents/ReportSelectFirstAgentCode';
import ReportSelectFirstLastName from 'src/app/@components/ReportComponents/ReportSelectFirstLastName';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function TicketSaleFilterMenu({ inShowAllMode, handleGetTicketSales, handleGetAllTicketSales }) {
	const classes = useStyles();
	const dispatch = useDispatch();
  const methods = useFormContext();
	const { getValues } = methods;
  const theme = useTheme();
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
  const { branches ,agents,airways,employees} = useSelector((state) => state.data);

  const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ?  handleGetAllTicketSales():handleGetTicketSales())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllTicketSales():handleGetTicketSales())      
	};

  useEffect(() => {
		dispatch(getCountries());
		dispatch(getCurrentStatuss());
		dispatch(getAgents());
		dispatch(getBranches());
		dispatch(getPassengers());
		dispatch(getPassengerTypes());
		dispatch(getAirways());
		dispatch(getEmployees());
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
          icon='local_activityIcon'
          width='50px'
        />
         
         {/* AirWay */}
          <ReportSelect
          {...commonFieldProps}
          name='airway'
          options={airways}
          icon='local_activityIcon'
          width='45px'
        />


         {/* Coustomer */}
				<ReportSelectFirstAgentCode
					{...commonFieldProps}
					name="agent"
          label="Coustomer"
					options={agents}
					icon="person_icon"
          width="76px"
          getOptionLabel={(option) => `${option.first_name}- ${option.agent_code}`}
				/>


           {/* Ticket Agency */}
          <ReportSelectFirstAgentCode
          {...commonFieldProps}
          name='ticket_agency'
          options={agents}
          icon='person_icon'
          width='95px'
          />

        <ReportSelectFirstLastName
          {...commonFieldProps}
          name='issue_person'
          options={employees}
          icon='person'
          width='95px'
		     />
        
      </div>

      {/* keywords */}
      <div className='allKeyWrdContainer'>
      <Keyword
          {...commonKewordProps}
          type='select'
          name='branch'
          icon='local_activityIcon'
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
          type='select'
          name='airway'
          icon='local_activityIcon'
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='agent'
          label="Coustomer"
          icon="person_icon"
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='ticket_agency'
          icon="person_icon"
        />
        <Keyword
          {...commonKewordProps}
          type='select'
          name='issue_person'
          icon="person_icon"
        />
        
      
      </div>
    </div>
  );
}

export default TicketSaleFilterMenu;
