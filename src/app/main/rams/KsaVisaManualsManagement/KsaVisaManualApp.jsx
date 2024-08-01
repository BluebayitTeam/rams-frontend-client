import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function KsaVisaManualApp() {
	return <Outlet />;
}

export default withReducer('ksaVisaManualApp', reducer)(KsaVisaManualApp);
