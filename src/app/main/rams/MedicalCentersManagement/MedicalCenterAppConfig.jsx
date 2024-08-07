import { Navigate } from 'react-router-dom';
import MedicalCenterApp from './MedicalCenterApp';
import MedicalCenters from './medicalCenters/MedicalCenters';
import MedicalCenter from './medicalCenter/MedicalCenter';

/**
 * The E-Commerce app configuration.
 */
const MedicalCenterAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/medicalCenter',
			element: <MedicalCenterApp />,
			children: [
				{
					path: '',
					element: <Navigate to="medicalCenters" />
				},
				{
					path: 'medicalCenters',
					element: <MedicalCenters />
				},
				{
					path: 'medicalCenters/:medicalCenterId/*',
					element: <MedicalCenter />
				}
			]
		}
	]
};
export default MedicalCenterAppConfig;
