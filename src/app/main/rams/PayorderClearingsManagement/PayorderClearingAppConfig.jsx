import { Navigate } from 'react-router-dom';
import PayorderClearingApp from './PayorderClearingApp';
import PayorderClearings from './payorderClearings/PayorderClearings';
import PayorderClearing from './payorderClearing/PayorderClearing';

/**
 * The E-Commerce app configuration.
 */
const PayorderClearingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/payorderClearing',
			element: <PayorderClearingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="payorderClearings" />
				},
				{
					path: 'payorderClearings',
					element: <PayorderClearings />
				},
				{
					path: 'payorderClearings/:payorderClearingId/*',
					element: <PayorderClearing />
				}
			]
		}
	]
};
export default PayorderClearingAppConfig;
