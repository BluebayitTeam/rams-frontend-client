import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DesignationApp() {
	return <Outlet />;
}

export default withReducer('designationApp', reducer)(DesignationApp);
