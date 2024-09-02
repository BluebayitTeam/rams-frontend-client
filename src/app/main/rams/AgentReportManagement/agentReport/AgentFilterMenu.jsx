import { useTheme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';
import { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getCities, getGroups } from 'app/store/dataSlice';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function AgentFilterMenu({ inShowAllMode, handleGetAgents, handleGetAllAgents }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const methods = useFormContext();
	const { getValues } = methods;

	const theme = useTheme();
	const { groups, cities } = useSelector((state) => state.data);
	const values = getValues();
	const [_reRender, setReRender] = useState(0);

	// element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const agentCodeEl = useRef(null);

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllAgents() : handleGetAgents())
	};
	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllAgents() : handleGetAgents())
	};

	useEffect(() => {
		dispatch(getCities());
		dispatch(getGroups());
	}, [dispatch]);

	console.log('sadhbjkasbdkj', getValues());
	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* user name */}
				<ReportTextField
					{...commonFieldProps}
					name="username"
					label="User Name"
					domEl={userNameEl}
					icon="person"
					width="75px"
				/>

				{/* group */}
				<ReportSelect
					{...commonFieldProps}
					name="group"
					options={groups}
					icon="groups"
					width="40px"
				/>

				{/* phone */}
				<ReportTextField
					{...commonFieldProps}
					name="primary_phone"
					label="Phone"
					domEl={primaryPhoneEl}
					icon="phone"
					width="45px"
				/>

				{/* district */}
				<ReportSelect
					{...commonFieldProps}
					name="district"
					options={cities}
					icon="homeSharp"
					width="45px"
				/>

				{/* agent code */}
				<ReportTextField
					{...commonFieldProps}
					name="agent_code"
					domEl={agentCodeEl}
					icon="qr_code_scanner_sharp"
					width="77px"
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
			</div>

			{/* keywords */}
			<div className="allKeyWrdContainer">
				<Keyword
					{...commonKewordProps}
					type="text"
					name="username"
					label="User Name"
					domEl={userNameEl}
					icon="person"
				/>

				<Keyword
					{...commonKewordProps}
					type="select"
					name="group"
					icon="groups"
				/>

				<Keyword
					{...commonKewordProps}
					type="text"
					name="primary_phone"
					label="Phone"
					domEl={primaryPhoneEl}
					icon="phone"
				/>

				<Keyword
					{...commonKewordProps}
					type="select"
					name="district"
					icon="homeSharp"
				/>

				<Keyword
					{...commonKewordProps}
					type="text"
					name="agent_code"
					domEl={agentCodeEl}
					icon="qr_code_scanner_sharp"
				/>

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
			</div>
		</div>
	);
}

export default AgentFilterMenu;
