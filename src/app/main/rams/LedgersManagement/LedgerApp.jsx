import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function LedgerApp() {
	return <Outlet />;
}

export default withReducer('ledgerApp', reducer)(LedgerApp);
