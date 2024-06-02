import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DemandAssignApp() {
	return <Outlet />;
}

export default withReducer('demandAssignApp', reducer)(DemandAssignApp);
