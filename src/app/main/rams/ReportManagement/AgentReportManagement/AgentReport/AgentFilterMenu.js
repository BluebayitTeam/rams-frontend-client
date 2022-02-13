import { faCity, faPhoneAlt, faQrcode, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import { getCities, getGroups } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from '../../reportComponents/Keyword';
import ReportDatePicker from '../../reportComponents/ReportDatePicker';
import ReportSelect from '../../reportComponents/ReportSelect';
import ReportTextField from '../../reportComponents/ReportTextField';
import { getReportFilterMakeStyles } from '../../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportFilterMakeStyles(theme)
}));

function AgentFilterMenu({ inShowAllMode, handleGetAgents, handleGetAllAgents }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const agentCodeEl = useRef(null);

	//select field data
	const districts = useSelector(state => state.data.cities);
	const groups = useSelector(state => state.data.groups);

	const methods = useFormContext();
	const { getValues } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getCities());
		dispatch(getGroups());
	}, []);

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllAgents() : handleGetAgents())
	};

	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllAgents() : handleGetAgents())
	};

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* user name */}
				<ReportTextField
					{...commonFieldProps}
					name="username"
					label="User Name"
					domEl={userNameEl}
					icon={faUser}
					width="75px"
				/>

				{/* group */}
				<ReportSelect {...commonFieldProps} name="group" options={groups} icon={faUsers} width="40px" />

				{/* phone */}
				<ReportTextField
					{...commonFieldProps}
					name="primary_phone"
					label="Phone"
					domEl={primaryPhoneEl}
					icon={faPhoneAlt}
					width="45px"
				/>

				{/* district */}
				<ReportSelect {...commonFieldProps} name="district" options={districts} icon={faCity} width="45px" />

				{/* Agent Code */}
				<ReportTextField
					{...commonFieldProps}
					name="agent_code"
					domEl={agentCodeEl}
					icon={faQrcode}
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
					icon={faUser}
				/>
				<Keyword {...commonKewordProps} type="select" name="group" icon={faUsers} />
				<Keyword
					{...commonKewordProps}
					type="text"
					name="primary_phone"
					label="Phone"
					domEl={primaryPhoneEl}
					icon={faPhoneAlt}
				/>
				<Keyword {...commonKewordProps} type="select" name="district" icon={faCity} />
				<Keyword {...commonKewordProps} type="text" name="agent_code" domEl={agentCodeEl} icon={faQrcode} />
				<Keyword {...commonKewordProps} type="date" name="date_after" label="Date From" />
				<Keyword {...commonKewordProps} type="date" name="date_before" label="Date To" />
			</div>
		</div>
	);
}

export default AgentFilterMenu;
