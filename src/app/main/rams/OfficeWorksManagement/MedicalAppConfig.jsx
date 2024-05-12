import { Navigate } from 'react-router-dom';
import MedicalApp from './MedicalApp';
import Medical from './medical/Medical';

/**
 * The E-Commerce app configuration.
 */
const MedicalAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/medical',
			element: <MedicalApp />,
			children: [
				{
					path: '',
					element: <Navigate to="medicals" />
				},

				{
					path: 'medicals/:medicalId/*',
					element: <Medical />
				}
			]
		}
	]
};
export default MedicalAppConfig;
