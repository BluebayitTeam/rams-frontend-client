import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ClientApp() {
	return <Outlet />;
}

export default withReducer('clientApp', reducer)(ClientApp);
