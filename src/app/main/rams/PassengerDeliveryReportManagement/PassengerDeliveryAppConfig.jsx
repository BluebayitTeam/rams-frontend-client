import { Navigate } from 'react-router-dom';
import PassengerDeliveryApp from './PassengerDeliveryApp';
import PassengerDelivery from './passengerDelivery/PassengerDelivery';

/**
 * The E-Commerce app configuration.
 */
const PassengerDeliveryAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/passengerDelivery',
      element: <PassengerDeliveryApp />,
      children: [
        {
          path: '',
          element: <Navigate to='passengerDeliverys' />,
        },

        {
          path: 'passengerDeliverys/:passengerDeliveryId?/*',
          element: <PassengerDelivery />,
        },
      ],
    },
  ],
};
export default PassengerDeliveryAppConfig;
