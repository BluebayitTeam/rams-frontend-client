import { Navigate } from 'react-router-dom';
import PaymentReportApp from './PaymentReportApp';
import PaymentReport from './paymentReport/PaymentReport';

/**
 * The E-Commerce app configuration.
 */
const PaymentReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/paymentReport',
			element: <PaymentReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="paymentReports" />
				},

				{
					path: 'paymentReports/:paymentReportId?/*',
					element: <PaymentReport />
				}
			]
		}
	]
};
export default PaymentReportAppConfig;
