import { Navigate } from 'react-router-dom';
import CreditorReportApp from './CreditorReportApp';
import CreditorReport from './creditorReport/CreditorReport';

/**
 * The E-Commerce app configuration.
 */
const CreditorReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/creditorReport',
			element: <CreditorReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="creditorReports" />
				},

				{
					path: 'creditorReports/:creditorReportId?/*',
					element: <CreditorReport />
				}
			]
		}
	]
};
export default CreditorReportAppConfig;
