import { Navigate } from 'react-router-dom';
import PassengerLedgerReportApp from './PassengerLedgerReportApp';
import PassengerLedgerReport from './passengerLedgerReport/PassengerLedgerReport';

/**
 * The E-Commerce app configuration.
 */
const PassengerLedgerReportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/passengerLedgerReport',
			element: <PassengerLedgerReportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="passengerLedgerReports" />
				},

				{
					path: 'passengerLedgerReports/:passengerLedgerReportId?/*',
					element: <PassengerLedgerReport />
				}
			]
		}
	]
};
export default PassengerLedgerReportAppConfig;
