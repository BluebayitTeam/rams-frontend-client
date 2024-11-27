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
          path: 'passengerEditHistorys/:passengerEditHistoryId?',

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
export default PassengerEditHistoryAppConfig;
