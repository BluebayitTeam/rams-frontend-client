import { Navigate } from 'react-router-dom';
import AccountSummaryReportApp from './AccountSummaryApp';
import AccountSummaryReport from './accountSummaryReport/AccountSummaryReport';

/**
 * The E-Commerce app configuration.
 */
const AccountSummaryReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/accountSummaryReport',
			element: <AccountSummaryReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="accountSummaryReports" />
				},

				{
					path: 'accountSummaryReports/:accountSummaryReportId?/*',
					element: <AccountSummaryReport />
				}
			]
		}
	]
};
export default AccountSummaryReportAppConfig;
