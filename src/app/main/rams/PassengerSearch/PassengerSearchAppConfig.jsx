import { Navigate } from 'react-router-dom';
import PassengerAllDetails from './passengerSearch/PassengerAllDetails';
import PassengerSearchApp from './PassengerSearchApp';
import PassengerApp from '../PassengersManagement/PassengerApp';
import PassengerDetail from './passengerSearch/PassengerDetail';
import Passenger from '../PassengersManagement/passenger/Passenger';
import Passengers from '../PassengersManagement/passengers/Passengers';

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
          path: 'passengerSearchs/:passengerSearchId?',

          element: <PassengerAllDetails />,
        },
      ],
    },

    // {
    //   path: 'apps/passenger',
    //   element: <PassengerApp />,
    //   children: [
    //     {
    //       path: '',
    //       element: <Navigate to='passengerSearchs' />,
    //     },

    //     {
    //       path: 'passengers/:passengerSearchId/:fromSearch/:passengerType?',
    //       element: <Passenger />,
    //     },
    //   ],
    // },
  ],
};
export default PassengerSearchAppConfig;
