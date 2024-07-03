import { Navigate } from 'react-router-dom';
import PayableBillApp from './PayableBillApp';
import PayableBills from './payableBills/PayableBills';
import PayableBill from './payableBill/PayableBill';

/**
 * The E-Commerce app configuration.
 */
const PayableBillAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/payableBill',
			element: <PayableBillApp />,
			children: [
				{
					path: '',
					element: <Navigate to="payableBills" />
				},
				{
					path: 'payableBills',
					element: <PayableBills />
				},
				{
					path: 'payableBills/:payableBillId/:invoice_no?',
					element: <PayableBill />
				}
			]
		}
	]
};
export default PayableBillAppConfig;
