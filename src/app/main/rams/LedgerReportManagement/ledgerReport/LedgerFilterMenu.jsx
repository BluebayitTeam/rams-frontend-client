import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getLedgers, getSubLedgers } from 'app/store/dataSlice';
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

function LedgerFilterMenu({ inShowAllMode, handleGetLedgers, handleGetAllLedgers }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues } = methods;

	const theme = useTheme();
	const { ledgers, subLedgers,passengerTypes  } = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);
	console.log('Passenger Values:', getValues());

	

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllLedgers() : handleGetLedgers())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllLedgers() : handleGetLedgers())
	};

	useEffect(() => {
		dispatch(getLedgers());
		dispatch(getSubLedgers());
	}, []);

	console.log('sadhbjkasbdkj', getValues());
	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				

				{/* ledger */}
				<ReportSelect
					{...commonFieldProps}
					name="ledger"
					options={ledgers}
					icon="import_contacts"
					width="50px"
				/>

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

				

				{/* sub_ledger */}
				<ReportSelect
					{...commonFieldProps}
					name="sub_ledger"
					options={subLedgers}
					icon="import_contacts"
					width="70px"
				/>

				
                    {/* lpassengerTypes */}
                  <ReportSelect
					{...commonFieldProps}
					name="account_type"
					options={bankAndCash}
					icon="text_fields"
					width="90px"
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
					name="ledger"
					icon="import_contacts"
				/>

				

				<Keyword
					{...commonKewordProps}
					type="select"
					name="sub_ledger"
					icon="import_contacts"
				/>

			
				

                   <Keyword
					{...commonKewordProps}
					type="select"
					name="account_type"
					icon="text_fields"
				/>
			</div>
		</div>
	);
}

export default LedgerFilterMenu;
