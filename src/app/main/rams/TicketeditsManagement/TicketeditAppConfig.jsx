import { Navigate } from 'react-router-dom';
import TicketeditApp from './TicketeditApp';
import Ticketedits from './ticketedits/Ticketedits';
import Ticketedit from './ticketedit/Ticketedit';

/**
 * The E-Commerce app configuration.
 */
const TicketeditAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ticketedit',
			element: <TicketeditApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ticketedits" />
				},
				{
					path: 'ticketedits',
					element: <Ticketedits />
				},
				{
					path: 'ticketedits/:ticketeditId/*',
					element: <Ticketedit />
				}
			]
		}
	]
};
export default TicketeditAppConfig;
