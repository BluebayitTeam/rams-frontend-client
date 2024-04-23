import { Navigate } from 'react-router-dom';
import NewSupport from './newSupport/NewSupport';
import Support from './support/Support';
import SupportApp from './SupportApp';
import Supports from './supports/Supports';

/**
 * The E-Commerce app configuration.
 */
const SupportAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/support',
			element: <SupportApp />,
			children: [
				{
					path: '',
					element: <Navigate to="supports" />
				},
				{
					path: 'supports',
					element: <Supports />
				},
				{
					path: 'supports/:supportId/*',
					element: <Support />
				},
				{
					path: 'newSupports/:newSupportId/*',
					element: <NewSupport />
				}
			]
		}
	]
};
export default SupportAppConfig;
