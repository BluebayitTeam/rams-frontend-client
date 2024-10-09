import { Navigate } from 'react-router-dom';
import DrebtorReportApp from './DrebtorReportApp';
import DrebtorReport from './debtortReport/DebtorReport';

/**
 * The E-Commerce app configuration.
 */
const DrebtorReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/drebtorReport',
			element: <DrebtorReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="drebtorReports" />
				},

				{
					path: 'drebtorReports/:drebtorReportId?/*',
					element: <DrebtorReport />
				}
			]
		}
	]
};
export default DrebtorReportAppConfig;
