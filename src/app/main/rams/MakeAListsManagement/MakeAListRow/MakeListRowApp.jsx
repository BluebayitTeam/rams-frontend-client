import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MakeListRowApp() {
	return <Outlet />;
}

export default withReducer('makeListRowApp', reducer)(MakeListRowApp);
