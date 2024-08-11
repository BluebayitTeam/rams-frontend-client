import { useTheme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';
import { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import { getCities, getGroups } from 'app/store/dataSlice';
import { useCreateAgentReportMutation } from '../AgentReportsApi';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';

const useStyles = makeStyles((theme) => ({
	...getReportFilterMakeStyles(theme)
}));

function AgentFilterMenu() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const routeParams = useParams();
	const { agentReportId } = routeParams;
	const [createAgentReport] = useCreateAgentReportMutation();
	const methods = useFormContext();
	const { formState, watch, getValues, reset } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { groups, cities } = useSelector((state) => state.data);

	console.log('groups', groups);
	useEffect(() => {
		dispatch(getCities());
		dispatch(getGroups());
	}, []);
	const [_reRender, setReRender] = useState(0);

	// element refs
	const userNameEl = useRef(null);
	const primaryPhoneEl = useRef(null);
	const agentCodeEl = useRef(null);
	const commonFieldProps = {
		setReRender
		//   onEnter: () => (inShowAllMode ? handleGetAllAgents() : handleGetAgents()),
	};

	const commonKewordProps = {
		setReRender
		//   onClick: () => (inShowAllMode ? handleGetAllAgents() : handleGetAgents()),
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
					icon="person"
					width="75px"
				/>
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
					icon="locationCity"
					width="45px"
				/>

				{/* Agent Code */}
				<ReportTextField
					{...commonFieldProps}
					name="agent_code"
					domEl={agentCodeEl}
					// icon={QrCodeIcon}
					width="77px"
				/>
			</div>
		</div>
	);
}

export default AgentFilterMenu;
