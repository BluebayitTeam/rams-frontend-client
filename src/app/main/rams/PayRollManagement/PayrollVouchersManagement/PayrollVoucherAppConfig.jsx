import { Navigate } from 'react-router-dom';
import PayrollVoucher from './payrollVoucher/PayrollVoucher';
import PayrollVoucherApp from './PayrollVoucherApp';
import PayrollVouchers from './payrollVouchers/PayrollVouchers';

/**
 * The E-Commerce app configuration.
 */

const PayrollVoucherAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/payrollVoucher',
      element: <PayrollVoucherApp />,
      children: [
        {
          path: '',
          element: <Navigate to='payrollVouchers' />,
        },
        {
          path: 'payrollVouchers',
          element: <PayrollVouchers />,
        },
        {
          path: 'payrollVouchers/:payrollVoucherId/*',
          element: <PayrollVoucher />,
        },
      ],
    },
  ],
};
export default PayrollVoucherAppConfig;
