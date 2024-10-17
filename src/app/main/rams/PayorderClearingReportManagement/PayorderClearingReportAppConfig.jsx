import { Navigate } from 'react-router-dom';
import PayorderClearingReportApp from './PayorderClearingApp';
import PayorderClearingReport from './payorderClearingReport/PayorderClearingReport';

/**
 * The E-Commerce app configuration.
 */
const PayorderClearingReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/payorderClearingReport',
			element: <PayorderClearingReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="payorderClearingReports" />
				},

				{
					path: 'payorderClearingReports/:payorderClearingReportId?/*',
					element: <PayorderClearingReport />
				}
			]
		}
	]
};
export default PayorderClearingReportAppConfig;
