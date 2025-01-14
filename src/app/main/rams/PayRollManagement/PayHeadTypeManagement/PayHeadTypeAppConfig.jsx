import { Navigate } from 'react-router-dom';
import PayHeadType from './payHeadType/PayHeadType';
import PayHeadTypeApp from './PayHeadTypeApp';
import PayHeadTypes from './payHeadTypes/PayHeadTypes';

/**
 * The E-Commerce app configuration.
 */


const PayHeadTypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/payHeadType',
			element: <PayHeadTypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="payHeadTypes" />
				},
				{
					path: 'payHeadTypes',
					element: <PayHeadTypes />
				},
				{
					path: 'payHeadTypes/:payHeadTypeId/*',
					element: <PayHeadType />
				}
			]
		}
	]
};
export default PayHeadTypeAppConfig;
