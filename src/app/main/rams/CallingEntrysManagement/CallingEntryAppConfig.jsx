import { Navigate } from 'react-router-dom';
import CallingEntryApp from './CallingEntryApp';
import CallingEntrys from './callingEntrys/CallingEntrys';
import CallingEntry from './callingEntry/CallingEntry';

/**
 * The E-Commerce app configuration.
 */
const CallingEntryAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/callingEntry',
      element: <CallingEntryApp />,
      children: [
        {
          path: '',
          element: <Navigate to='callingEntrys' />,
        },
        {
          path: 'callingEntrys',
          element: <CallingEntrys />,
        },

        {
          path: 'callingEntrys/:callingEntryId/:fromSearch?',
          element: <CallingEntry />,
        },
      ],
    },
  ],
};
export default CallingEntryAppConfig;
