import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getAgents, getCountries, getCurrentStatuss, getDemands, getPassengers, getPassengerTypes, getProfessions } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { genders } from 'src/app/@data/data';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function PassengerFilterMenu({ inShowAllMode, handleGetPassengers, handleGetAllPassengers }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues,setValue } = methods;

	const theme = useTheme();
	const { passengers,countries ,agents,passengerTypes,currentStatuss} = useSelector((state) => state.data);
	
	const values = getValues();
	const [_reRender, setReRender] = useState(0);


	

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllPassengers() : handleGetPassengers())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllPassengers() : handleGetPassengers())
	};

	useEffect(() => {
		dispatch(getPassengers());
		dispatch(getDemands());
		dispatch(getCountries());
		dispatch(getAgents());
		dispatch(getProfessions());
		dispatch(getPassengerTypes());
		dispatch(getCurrentStatuss());
	}, []);

	console.log('sadhbjkasbdkj', getValues());
	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">

				{/* date from */}
				<ReportDatePicker
					{...commonFieldProps}
					name="date_after"
					label="Date From"
					maxDate={values.date_before || new Date()}
				/>

				{/* date to */}
				<ReportDatePicker
					{...commonFieldProps}
					name="date_before"
					label="Date To"
					minDate={values.date_after}
					maxDate={new Date()}
				/>


                   {/* Passenger */}
				   <ReportSelect
	                {...commonFieldProps}
	                name="passenger"
	                 options={passengers}
	                  icon="person"
	                autocompleteStyle={{ width: '330px', margin: '0px 10px' }}
	            getOptionLabel={(option) => `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`}
	           onChange={(_event, newValue) => {
		setValue('passengerName', newValue?.passenger_name || ''); 
		  
	}}
/>


                   {/* Current Status */}
                  <ReportSelect
					{...commonFieldProps}
					name="current_status"
					options={currentStatuss}
					icon="local_activity"
					width="40px"
				/>
                   {/* Country */}
                  <ReportSelect
					{...commonFieldProps}
					name="target_country"
					options={countries}
					icon="flag"
					width="40px"
				/>
                   {/* Agent */}
                  <ReportSelect
					{...commonFieldProps}
					name="agent"
					options={agents}
					icon="person"
					width="40px"
				/>
                   {/* Passenger Type */}
                  <ReportSelect
					{...commonFieldProps}
					name="passenger_type"
					options={passengerTypes}
					icon="text_fields"
					width="40px"
				/>
                   {/* Gender */}
                  <ReportSelect
					{...commonFieldProps}
					name="gender"
					options={genders}
					icon="radio_button_checked_two_tone"
					width="40px"
				/>
 </div>

			{/* keywords */}
			<div className="allKeyWrdContainer">

			<Keyword
					{...commonKewordProps}
					type="date"
					name="date_after"
					label="Date From"
				/>

				<Keyword
					{...commonKewordProps}
					type="date"
					name="date_before"
					label="Date To"
				/>



                    <Keyword
					{...commonKewordProps}
					type="select"
					name="passenger"
					icon="person"
					
				/>

				

				<Keyword
					{...commonKewordProps}
					type="select"
					name="current_status"
					icon="local_activity"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="target_country"
					icon="flag"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="agent"
					icon="person"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="passenger_type"
					icon="text_fields"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="gender"
					icon="radio_button_checked_two_tone"
				/>

				

				
			</div>
		</div>
	);
}

export default PassengerFilterMenu;
