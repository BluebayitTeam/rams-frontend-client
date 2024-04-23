import { Navigate } from 'react-router-dom';
import PaymentDetailApp from './PaymentDetailApp';
import PaymentDetails from './paymentDetails/PaymentDetails';
import PaymentDetail from './paymentDetail/PaymentDetail';

/**
 * The E-Commerce app configuration.
 */
const PaymentDetailAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/paymentDetail',
			element: <PaymentDetailApp />,
			children: [
				{
					path: '',
					element: <Navigate to="paymentDetails" />
				},
				{
					path: 'paymentDetails',
					element: <PaymentDetails />
				},
				{
					path: 'paymentDetails/:paymentDetailId/*',
					element: <PaymentDetail />
				}
			]
		}
	]
};
export default PaymentDetailAppConfig;
