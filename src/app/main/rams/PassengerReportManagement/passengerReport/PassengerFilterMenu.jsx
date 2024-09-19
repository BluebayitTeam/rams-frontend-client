import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getCities, getGroups } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function PassengerFilterMenu({ inShowAllMode, handleGetPassengers, handleGetAllPassengers }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues } = methods;

	const theme = useTheme();
	const { groups, cities } = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
	console.log('Passenger Values:', getValues());

	// element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const PassengerCodeEl = useRef(null);

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllPassengers() : handleGetPassengers())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllPassengers() : handleGetPassengers())
	};

	useEffect(() => {
		
		dispatch(getCities());
		dispatch(getGroups());
	}, [dispatch]);

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
					name="Passenger"
					options={groups}
					icon="person"
					width="40px"
				/>

                   {/* Current Status */}
                  <ReportSelect
					{...commonFieldProps}
					name="Passenger"
					options={groups}
					icon="groups"
					width="40px"
				/>
                   {/* Country */}
                  <ReportSelect
					{...commonFieldProps}
					name="Passenger"
					options={groups}
					icon="groups"
					width="40px"
				/>
                   {/* Agent */}
                  <ReportSelect
					{...commonFieldProps}
					name="Passenger"
					options={groups}
					icon="groups"
					width="40px"
				/>
                   {/* Passenger Type */}
                  <ReportSelect
					{...commonFieldProps}
					name="Passenger"
					options={groups}
					icon="groups"
					width="40px"
				/>
                   {/* Gender */}
                  <ReportSelect
					{...commonFieldProps}
					name="Passenger"
					options={groups}
					icon="groups"
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
					name="pasenger"
					icon="groups"
				/>

				

				<Keyword
					{...commonKewordProps}
					type="select"
					name="district"
					icon="homeSharp"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="district"
					icon="homeSharp"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="district"
					icon="homeSharp"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="district"
					icon="homeSharp"
				/>
				<Keyword
					{...commonKewordProps}
					type="select"
					name="district"
					icon="homeSharp"
				/>

				

				
			</div>
		</div>
	);
}

export default PassengerFilterMenu;
