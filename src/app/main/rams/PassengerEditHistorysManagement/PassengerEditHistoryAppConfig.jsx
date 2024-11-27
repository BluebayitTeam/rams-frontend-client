import { Navigate } from 'react-router-dom';
import PassengerEditHistoryApp from './PassengerEditHistoryApp';
import PassengerEditHistory from './passengerEditHistory/PassengerEditHistory';

/**
 * The E-Commerce app configuration.
 */
const PassengerEditHistoryAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerEditHistory',
      element: <PassengerEditHistoryApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerEditHistorys' />,
        },

        {
          path: 'passengerEditHistorys/:passengerEditHistoryId?/*',
          element: <PassengerEditHistory />,
        },
      ],
    },
  ],
};
export default PassengerEditHistoryAppConfig;
