import { Navigate } from 'react-router-dom';
import VisaReissueListApp from './VisaReissueListApp';
import VisaReissueList from './visaReissueList/VisaReissueList';

/**
 * The E-Commerce app configuration.
 */
const VisaReissueListAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/visaReissueList-management',
			element: <VisaReissueListApp />,
			children: [
				{
					path: '',
					element: <Navigate to="visaReissueLists" />
				},

				{
					path: 'visaReissueLists/:visaReissueListId/:fromSearch?',
					element: <VisaReissueList />
				}
			]
		}
	]
};
export default VisaReissueListAppConfig;
