import { Navigate } from 'react-router-dom';
import ProvidentFundApp from './ProvidentFundApp';
import ProvidentFunds from './providentFunds/ProvidentFunds';
import ProvidentFund from './providentFund/ProvidentFund';

/**
 * The E-Commerce app configuration.
 */
const ProvidentFundAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/providentFund',
      element: <ProvidentFundApp />,
      children: [
        {
          path: '',
          element: <Navigate to='providentFunds' />,
        },
        {
          path: 'providentFunds',
          element: <ProvidentFunds />,
        },
        {
          path: 'providentFunds/:providentFundId/:invoice_no?',
          element: <ProvidentFund />,
        },
      ],
    },
  ],
};
export default ProvidentFundAppConfig;
