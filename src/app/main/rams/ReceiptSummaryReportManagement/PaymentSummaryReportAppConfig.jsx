import { Navigate } from 'react-router-dom';
import PaymentSummaryReportApp from './PaymentSummaryReportApp';
import PaymentSummaryReport from './paymentSummaryReport/PaymentSummaryReport';

/**
 * The E-Commerce app configuration.
 */
const PaymentSummaryReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/paymentSummaryReport',
			element: <PaymentSummaryReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="paymentSummaryReports" />
				},

				{
					path: 'paymentSummaryReports/:paymentSummaryReportId?/*',
					element: <PaymentSummaryReport />
				}
			]
		}
	]
};
export default PaymentSummaryReportAppConfig;
