import { Navigate } from 'react-router-dom';
import FormContentDetailApp from './FormContentDetailApp';
import FormContentDetails from './formContentDetails/FormContentDetails';
import FormContentDetail from './formContentDetail/FormContentDetail';

/**
 * The E-Commerce app configuration.
 */
const FormContentDetailAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/formContentDetail',
			element: <FormContentDetailApp />,
			children: [
				{
					path: '',
					element: <Navigate to="formContentDetails" />
				},
				{
					path: 'formContentDetails',
					element: <FormContentDetails />
				},
				{
					path: 'formContentDetails/:formContentDetailId/*',
					element: <FormContentDetail />
				}
			]
		}
	]
};
export default FormContentDetailAppConfig;
