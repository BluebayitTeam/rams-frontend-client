import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function EvisaEntryApp() {
	return <Outlet />;
}

export default withReducer('evisaEntryApp', reducer)(EvisaEntryApp);
