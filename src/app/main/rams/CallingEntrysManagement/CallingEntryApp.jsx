import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CallingEntryApp() {
	return <Outlet />;
}

export default withReducer('callingEntryApp', reducer)(CallingEntryApp);
