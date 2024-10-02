import { Navigate } from 'react-router-dom';
import ForeignLedgerReportApp from './ForeignLedgerReportApp';
import ForeignLedgerReport from './foreignLedgerReport/ForeignLedgerReport';

/**
 * The E-Commerce app configuration.
 */
const ForeignLedgerReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/foreignLedgerReport',
			element: <ForeignLedgerReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="foreignLedgerReports" />
				},

				{
					path: 'foreignLedgerReports/:foreignLedgerReportId?/*',
					element: <ForeignLedgerReport />
				}
			]
		}
	]
};
export default ForeignLedgerReportAppConfig;
