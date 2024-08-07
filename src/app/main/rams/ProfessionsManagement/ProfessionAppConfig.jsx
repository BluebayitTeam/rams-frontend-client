import { Navigate } from 'react-router-dom';
import ProfessionApp from './ProfessionApp';
import Professions from './professions/Professions';
import Profession from './profession/Profession';

/**
 * The E-Commerce app configuration.
 */
const ProfessionAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/profession',
			element: <ProfessionApp />,
			children: [
				{
					path: '',
					element: <Navigate to="professions" />
				},
				{
					path: 'professions',
					element: <Professions />
				},
				{
					path: 'professions/:professionId/*',
					element: <Profession />
				}
			]
		}
	]
};
export default ProfessionAppConfig;
