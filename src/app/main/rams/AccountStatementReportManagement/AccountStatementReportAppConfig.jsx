import { Navigate } from 'react-router-dom';
import AccountStatementReportApp from './AccountStatementReportApp';
import AccountStatementReport from './accountStatementReport/AccountStatement';

/**
 * The E-Commerce app configuration.
 */
const AccountStatementReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/accountStatementReport',
			element: <AccountStatementReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="accountStatementReports" />
				},

				{
					path: 'accountStatementReports/:accountStatementReportId?/*',
					element: <AccountStatementReport />
				}
			]
		}
	]
};
export default AccountStatementReportAppConfig;
