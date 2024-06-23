import { Navigate } from 'react-router-dom';
import QualificationApp from './QualificationApp';
import Qualifications from './qualifications/Qualifications';
import Qualification from './qualification/Qualification';

/**
 * The E-Commerce app configuration.
 */
const QualificationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/qualification',
			element: <QualificationApp />,
			children: [
				{
					path: '',
					element: <Navigate to="qualifications" />
				},
				{
					path: 'qualifications',
					element: <Qualifications />
				},
				{
					path: 'qualifications/:qualificationId/*',
					element: <Qualification />
				}
			]
		}
	]
};
export default QualificationAppConfig;
