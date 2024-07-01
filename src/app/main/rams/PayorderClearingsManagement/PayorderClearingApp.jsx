import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PostDateClearingApp() {
	return <Outlet />;
}

export default withReducer('payorderClearingApp', reducer)(PostDateClearingApp);
