import { Navigate } from 'react-router-dom';
import OfficeApp from './OfficeApp';
import Office from './office/Office';

/**
 * The E-Commerce app configuration.
 */
const OfficeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/office',
			element: <OfficeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="offices" />
				},

				{
					path: 'offices/:officeId/*',
					element: <Office />
				}
			]
		}
	]
};
export default OfficeAppConfig;
