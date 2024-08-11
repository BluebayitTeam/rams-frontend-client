import { Navigate } from 'react-router-dom';
import SiteSettingApp from './SiteSettingApp';
import SiteSettings from './siteSettings/SiteSettings';
import SiteSetting from './siteSetting/SiteSetting';

/**
 * The E-Commerce app configuration.
 */
const SiteSettingAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/siteSetting',
			element: <SiteSettingApp />,
			children: [
				{
					path: '',
					element: <Navigate to="siteSettings" />
				},
				{
					path: 'siteSettings',
					element: <SiteSettings />
				},
				{
					path: 'siteSettings/:siteSettingId/*',
					element: <SiteSetting />
				}
			]
		}
	]
};
export default SiteSettingAppConfig;
