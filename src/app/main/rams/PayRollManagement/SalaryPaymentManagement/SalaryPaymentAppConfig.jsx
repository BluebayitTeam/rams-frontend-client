import { Navigate } from 'react-router-dom';
import SalaryPayment from './salaryPayment/SalaryPayment';
import SalaryPaymentApp from './SalaryPaymentApp';
import SalaryPayments from './salaryPayments/SalaryPayments';

/**
 * The E-Commerce app configuration.
 */

const SalaryPaymentAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/salaryPayment',
      element: <SalaryPaymentApp />,
      children: [
        {
          path: '',
          element: <Navigate to='salaryPayments' />,
        },
        {
          path: 'salaryPayments',
          element: <SalaryPayments />,
        },
        {
          path: 'salaryPayments/:salaryPaymentId/*',
          element: <SalaryPayment />,
        },
      ],
    },
  ],
};
export default SalaryPaymentAppConfig;
