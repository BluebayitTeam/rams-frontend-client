import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function BmetVerifyApp() {
	return <Outlet />;
}

export default withReducer('bmetVerifyApp', reducer)(BmetVerifyApp);
