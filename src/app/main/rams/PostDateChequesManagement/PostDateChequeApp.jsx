import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PostDateChequeApp() {
	return <Outlet />;
}

export default withReducer('postDateChequeApp', reducer)(PostDateChequeApp);
