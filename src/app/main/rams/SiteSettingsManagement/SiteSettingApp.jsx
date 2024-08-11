import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function SiteSettingApp() {
	return <Outlet />;
}

export default withReducer('siteSettingApp', reducer)(SiteSettingApp);
