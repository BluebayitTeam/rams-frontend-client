import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function OfficeWorkApp() {
	return <Outlet />;
}

export default withReducer('officeWorkApp', reducer)(OfficeWorkApp);
