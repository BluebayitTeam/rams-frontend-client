import { Navigate } from 'react-router-dom';
import PassengerSummaryUpdateApp from './PassengerSummaryUpdateApp';
import PassengerSummaryUpdates from './passengerSummaryUpdates/PassengerSummaryUpdates';
import PassengerSummaryUpdate from './passengerSummaryUpdate/PassengerSummaryUpdate';

/**
 * The E-Commerce app configuration.
 */
const PassengerSummaryUpdateAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerSummaryUpdate',
      element: <PassengerSummaryUpdateApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerSummaryUpdates' />,
        },
        {
          path: 'passengerSummaryUpdates',
          element: <PassengerSummaryUpdates />,
        },

        {
          path: 'passengerSummaryUpdates/:passengerSummaryUpdateId/*',
          element: <PassengerSummaryUpdate />,
        },
      ],
    },
  ],
};
export default PassengerSummaryUpdateAppConfig;
