import { Navigate } from 'react-router-dom';
import RecruitingAgencyApp from './RecruitingAgencyApp';
import RecruitingAgencys from './recruitingAgencys/RecruitingAgencys';
import RecruitingAgency from './recruitingAgency/RecruitingAgency';

/**
 * The E-Commerce app configuration.
 */
const RecruitingAgencyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/recruitingAgency',
			element: <RecruitingAgencyApp />,
			children: [
				{
					path: '',
					element: <Navigate to="recruitingAgencys" />
				},
				{
					path: 'recruitingAgencys',
					element: <RecruitingAgencys />
				},
				{
					path: 'recruitingAgencys/:recruitingAgencyId/*',
					element: <RecruitingAgency />
				}
			]
		}
	]
};
export default RecruitingAgencyAppConfig;
