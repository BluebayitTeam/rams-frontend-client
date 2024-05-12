import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function OfficeApp() {
	return <Outlet />;
}

export default withReducer('officeApp', reducer)(OfficeApp);
