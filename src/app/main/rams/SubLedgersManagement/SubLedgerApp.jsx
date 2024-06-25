import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function SubLedgerApp() {
	return <Outlet />;
}

export default withReducer('subLedgerApp', reducer)(SubLedgerApp);
