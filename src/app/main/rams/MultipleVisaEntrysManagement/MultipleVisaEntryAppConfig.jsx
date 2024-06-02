import { Navigate } from 'react-router-dom';
import MultipleVisaEntryApp from './MultipleVisaEntryApp';
import MultipleVisaEntry from './multipleVisaEntry/MultipleVisaEntry';

/**
 * The E-Commerce app configuration.
 */
const MultipleVisaEntryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/multipleVisaEntry-management',
			element: <MultipleVisaEntryApp />,
			children: [
				{
					path: '',
					element: <Navigate to="multipleVisaEntrys" />
				},

				{
					path: 'multipleVisaEntrys/:multipleVisaEntryId?/*',
					element: <MultipleVisaEntry />
				}
			]
		}
	]
};
export default MultipleVisaEntryAppConfig;
