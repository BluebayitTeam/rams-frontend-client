import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MusanedOkalaApp() {
	return <Outlet />;
}

export default withReducer('musanedOkalaApp', reducer)(MusanedOkalaApp);
