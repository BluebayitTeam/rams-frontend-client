import { Navigate } from 'react-router-dom';
import VisaEntryApp from './VisaEntryApp';
import VisaEntrys from './visaEntrys/VisaEntrys';
import VisaEntry from './visaEntry/VisaEntry';

/**
 * The E-Commerce app configuration.
 */
const VisaEntryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/visaEntry',
			element: <VisaEntryApp />,
			children: [
				{
					path: '',
					element: <Navigate to="visaEntrys" />
				},
				{
					path: 'visaEntrys',
					element: <VisaEntrys />
				},

				{
					path: 'visaEntrys/:visaEntryId/*',
					element: <VisaEntry />
				}
			]
		}
	]
};
export default VisaEntryAppConfig;
