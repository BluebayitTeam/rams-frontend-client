import { Navigate } from 'react-router-dom';
import PassengerAccountSummaryReport from './passengerAccountSummaryReport/passengerAccountSummaryReport';
import PassengerAccountSummaryReportApp from './passengerAccountSummaryReportApp';

/**
 * The E-Commerce app configuration.
 */
const PassengerAccountSummaryReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/passengerAccountSummaryReport',
			element: <PassengerAccountSummaryReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="passengerAccountSummaryReports" />
				},

				{
					path: 'passengerAccountSummaryReports/:passengerAccountSummaryReportId?/*',
					element: <PassengerAccountSummaryReport />
				}
			]
		}
	]
};
export default PassengerAccountSummaryReportAppConfig;
