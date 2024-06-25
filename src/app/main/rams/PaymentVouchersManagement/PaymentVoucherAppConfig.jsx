import { Navigate } from 'react-router-dom';
import PaymentVoucherApp from './PaymentVoucherApp';
import PaymentVouchers from './paymentVouchers/PaymentVouchers';
import PaymentVoucher from './paymentVoucher/PaymentVoucher';

/**
 * The E-Commerce app configuration.
 */
const PaymentVoucherAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/paymentVoucher',
			element: <PaymentVoucherApp />,
			children: [
				{
					path: '',
					element: <Navigate to="paymentVouchers" />
				},
				{
					path: 'paymentVouchers',
					element: <PaymentVouchers />
				},
				{
					path: 'paymentVouchers/:paymentVoucherId/*',
					element: <PaymentVoucher />
				}
			]
		}
	]
};
export default PaymentVoucherAppConfig;
