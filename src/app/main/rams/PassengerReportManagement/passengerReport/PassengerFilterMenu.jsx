import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getPassengers } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
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
	const { passengers} = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);

	// element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const passengerCodeEl = useRef(null);

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
	}, [dispatch]);

	console.log('sadhbjkasbdkj', getValues());
	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* passenger name */}
				<ReportSelect
    {...commonFieldProps}
    name="passenger"
    options={passengers}
    icon="person"
    autocompleteStyle={{ width: '330px', margin: '0px 10px' }} // Dynamic styles
    getOptionLabel={(option) => `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`}  // Custom label display logic
/>


				
			</div>

			{/* keywords */}
			<div className="allKeyWrdContainer">
				
				

				<Keyword
					{...commonKewordProps}
					type="select"
					name="passenger"
					icon="person"
				/>

				

			
			</div>
		</div>
	);
}

export default PassengerFilterMenu;
