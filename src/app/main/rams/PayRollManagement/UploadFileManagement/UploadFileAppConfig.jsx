import { Navigate } from 'react-router-dom';
import UploadFileApp from './UploadFileApp';
import UploadFiles from './UploadFiles/UploadFiles';

/**
 * The E-Commerce app configuration.
 */

// apps/uploadEmployeeSchedule/uploadSchedules

const UploadFileAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/uploadEmployeeSchedule',
			element: <UploadFileApp />,
			children: [
				{
					path: '',
					element: <Navigate to="uploadSchedules" />
				},
				{
					path: 'uploadSchedules',
					element: <UploadFiles />
				},
			]
		}
	]
};
export default UploadFileAppConfig;
