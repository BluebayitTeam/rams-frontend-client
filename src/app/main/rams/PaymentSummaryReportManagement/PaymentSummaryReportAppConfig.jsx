import { Navigate } from 'react-router-dom';
import PaymentReportApp from './PaymentSummaryApp';
import PaymentSummaryReport from './paymentSummaryReport/paymentSummary';

/**
 * The E-Commerce app configuration.
 */
const PaymentSummaryReportConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/paymentSummaryReport',
			element: <PaymentReportApp />,
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
export default PaymentSummaryReportConfig;
