import { Navigate } from 'react-router-dom';
import Passenger from './Passenger/Passenger';
import PassengerApp from './PassengerApp';
import Passengers from './Passengers/Passengers';

/**
 * The E-Commerce app configuration.
 */
const PassengerAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passenger',
      element: <PassengerApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengers' />,
        },
        {
          path: 'passengers/:passengerType?',
          element: <Passengers />,
        },
        {
          path: 'passengers/:passengerId?/:passengerType?/*',
          element: <Passenger />,
        },
      ],
    },
  ],
};
export default PassengerAppConfig;
