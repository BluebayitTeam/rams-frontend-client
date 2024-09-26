import { Navigate } from 'react-router-dom';
import ReceiptReportApp from './ReceiptReportApp';
import ReceiptReport from './receiptReport/ReceiptReport';

/**
 * The E-Commerce app configuration.
 */
const ReceiptReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/receiptReport',
			element: <ReceiptReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="receiptReports" />
				},

				{
					path: 'receiptReports/:receiptReportId?/*',
					element: <ReceiptReport />
				}
			]
		}
	]
};
export default ReceiptReportAppConfig;
