import { Navigate } from 'react-router-dom';
import PassengerAllDetails from './passengerSearch/PassengerAllDetails';
import PassengerSearchApp from './PassengerSearchApp';

/**
 * The E-Commerce app configuration.
 */
const PassengerSearchAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerSearch',
      element: <PassengerSearchApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerSearchs' />,
        },

        {
          path: 'passengerSearchs/:passengerSearchId/:fromSearch?',

          element: <PassengerAllDetails />,
        },
      ],
    },
  ],
};
export default PassengerSearchAppConfig;
