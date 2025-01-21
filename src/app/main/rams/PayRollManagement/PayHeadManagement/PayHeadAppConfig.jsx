import { Navigate } from 'react-router-dom';
import PayHead from './payHead/PayHead';
import PayHeadApp from './PayHeadApp';
import PayHeads from './payHeads/PayHeads';

/**
 * The E-Commerce app configuration.
 */


const PayHeadAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/payHead',
			element: <PayHeadApp />,
			children: [
				{
					path: '',
					element: <Navigate to="payHeads" />
				},
				{
					path: 'payHeads',
					element: <PayHeads />
				},
				{
					path: 'payHeads/:payHeadId/*',
					element: <PayHead />
				}
			]
		}
	]
};
export default PayHeadAppConfig;
