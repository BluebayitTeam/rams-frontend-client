import { Navigate } from 'react-router-dom';
import LedgerReportApp from './LedgerReportApp';
import LedgerReport from './ledgerReport/LedgerReport';

/**
 * The E-Commerce app configuration.
 */
const LedgerReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ledgerReport',
			element: <LedgerReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ledgerReports" />
				},

				{
					path: 'ledgerReports/:ledgerReportId?/*',
					element: <LedgerReport />
				}
			]
		}
	]
};
export default LedgerReportAppConfig;
