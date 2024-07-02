import { Navigate } from 'react-router-dom';
import ReceivableBillApp from './ReceivableBillApp';
import ReceivableBills from './receivableBills/ReceivableBills';
import ReceivableBill from './receivableBill/ReceivableBill';

/**
 * The E-Commerce app configuration.
 */
const ReceivableBillAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/receivableBill',
			element: <ReceivableBillApp />,
			children: [
				{
					path: '',
					element: <Navigate to="receivableBills" />
				},
				{
					path: 'receivableBills',
					element: <ReceivableBills />
				},
				{
					path: 'receivableBills/:receivableBillId/:invoice_no?',
					element: <ReceivableBill />
				}
			]
		}
	]
};
export default ReceivableBillAppConfig;
