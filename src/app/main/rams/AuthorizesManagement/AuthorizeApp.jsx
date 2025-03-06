import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function AuthorizeApp() {
	return <Outlet />;
}

export default withReducer('authorizeApp', reducer)(AuthorizeApp);
