import { Navigate } from 'react-router-dom';
import UnitApp from './UnitApp';
import Units from './units/Units';
import Unit from './unit/Unit';

/**
 * The E-Commerce app configuration.
 */
const UnitAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/unit',
      element: <UnitApp />,
      children: [
        {
          path: '',
          element: <Navigate to='units' />,
        },
        {
          path: 'units',
          element: <Units />,
        },
        {
          path: 'units/:unitId/*',
          element: <Unit />,
        },
      ],
    },
  ],
};
export default UnitAppConfig;
