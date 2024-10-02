import { Navigate } from 'react-router-dom';
import ReceiptSummaryReportApp from './ReceiptSummaryReportApp';
import ReceiptSummaryReport from './receiptSummaryReport/ReceiptSummaryReport';

/**
 * The E-Commerce app configuration.
 */
const ReceiptSummaryReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/receiptSummaryReport',
			element: <ReceiptSummaryReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="receiptSummaryReports" />
				},

				{
					path: 'receiptSummaryReports/:receiptSummaryReportId?/*',
					element: <ReceiptSummaryReport />
				}
			]
		}
	]
};
export default ReceiptSummaryReportAppConfig;
