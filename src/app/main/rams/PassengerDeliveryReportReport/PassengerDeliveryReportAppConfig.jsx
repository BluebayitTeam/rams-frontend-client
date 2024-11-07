import { Navigate } from 'react-router-dom';
import PassengerDeliveryReportApp from './PassengerDeliveryApp';
import PassengerDeliveryReport from './PassengerDeliveryReport/PassengerDeliveryReport';

/**
 * The E-Commerce app configuration.
 */
const PassengerDeliveryReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerDeliveryReport',
      element: <PassengerDeliveryReportApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerDeliveryReports' />,
        },

        {
          path: 'passengerDeliveryReports/:passengerDeliveryReportId?/*',
          element: <PassengerDeliveryReport />,
        },
      ],
    },
  ],
};
export default PassengerDeliveryReportAppConfig;
