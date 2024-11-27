import { Navigate } from 'react-router-dom';
import PassengerAllDetails from './passengerEditHistory/PassengerAllDetails';
import PassengerSearchApp from './PassengerEditHistoryApp';
import PassengerApp from '../PassengersManagement/PassengerApp';
import PassengerDetail from './passengerEditHistory/PassengerDetail';
import Passenger from '../PassengersManagement/passenger/Passenger';
import Passengers from '../PassengersManagement/passengers/Passengers';
import MedicalApp from '../MedicalsManagement/MedicalApp';
import Medical from '../MedicalsManagement/medical/Medical';
import EmbassyApp from '../EmbassysManagement/EmbassyApp';
import Embassy from '../EmbassysManagement/embassy/Embassy';

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

    {
      path: 'apps/passenger',
      element: <PassengerApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengers' />,
        },

        {
          path: 'passengers/:passengerId/:fromSearch/:passengerType?',
          element: <Passenger />,
        },
      ],
    },
  ],
};
export default PassengerSearchAppConfig;
