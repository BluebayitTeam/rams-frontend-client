import { Navigate } from 'react-router-dom';
import EvisaEntryApp from './EvisaEntryApp';
import EvisaEntrys from './evisaEntrys/EvisaEntrys';
import EvisaEntry from './evisaEntry/EvisaEntry';

/**
 * The E-Commerce app configuration.
 */
const EvisaEntryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/evisaEntry',
			element: <EvisaEntryApp />,
			children: [
				{
					path: '',
					element: <Navigate to="evisaEntrys" />
				},
				{
					path: 'evisaEntrys',
					element: <EvisaEntrys />
				},

				{
					path: 'evisaEntrys/:evisaEntryId/*',
					element: <EvisaEntry />
				}
			]
		}
	]
};
export default EvisaEntryAppConfig;
