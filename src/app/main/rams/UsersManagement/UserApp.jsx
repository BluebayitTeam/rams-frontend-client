import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function UserApp() {
	return <Outlet />;
}

export default withReducer('userApp', reducer)(UserApp);
