import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function BranchApp() {
	return <Outlet />;
}

export default withReducer('branchApp', reducer)(BranchApp);
