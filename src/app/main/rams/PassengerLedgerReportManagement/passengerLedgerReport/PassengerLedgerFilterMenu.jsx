import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getPassengers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { bankAndCash } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function PassengerLedgerFilterMenu({ inShowAllMode, handleGetPassengerLedgers, handleGetAllPassengerLedgers }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues,setValue } = methods;

	const theme = useTheme();
	const { passengers, cities } = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
	console.log('Passenger Values:', getValues());

	

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllPassengerLedgers() : handleGetPassengerLedgers())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllPassengerLedgers() : handleGetPassengerLedgers())
	};

	useEffect(() => {
		dispatch(getPassengers());
	}, [dispatch]);

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
        
              {/* Passenger */}
				  <ReportSelect
          {...commonFieldProps}
          name='passenger'
          options={passengers}
          getOptionLabel={(option) => `${option.passenger_id}  ${option.passport_no} ${option.passenger_name}`}

          icon='person'
          width='40px'
		      />

          {/* lpassengerTypes */}
          <ReportSelect
					{...commonFieldProps}
					name="account_type"
					options={bankAndCash}
					icon="text_fields"
					width="40px"
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
					name="passenger"
					icon="person"
					
				/>
        
      </div>

      <Keyword
					{...commonKewordProps}
					type="select"
					name="account_type"
					icon="text_fields"
				/>
    </div>
  );
}

export default PassengerLedgerFilterMenu;
