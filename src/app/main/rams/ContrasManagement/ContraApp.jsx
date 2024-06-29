import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ContraApp() {
	return <Outlet />;
}

export default withReducer('contraApp', reducer)(ContraApp);
