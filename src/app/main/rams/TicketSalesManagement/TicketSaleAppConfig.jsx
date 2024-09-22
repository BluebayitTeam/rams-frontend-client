import { Navigate } from 'react-router-dom';
import TicketSaleApp from './TicketSaleApp';
import TicketSales from './ticketSales/TicketSales';
import TicketSale from './ticketSale/TicketSale';

/**
 * The E-Commerce app configuration.
 */
const TicketSaleAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/ticketSale',
      element: <TicketSaleApp />,
      children: [
        {
          path: '',
          element: <Navigate to='ticketSales' />,
        },
        {
          path: 'ticketSales',
          element: <TicketSales />,
        },

        {
          path: 'ticketSales/:ticketSaleId/*',
          element: <TicketSale />,
        },
      ],
    },
  ],
};
export default TicketSaleAppConfig;
