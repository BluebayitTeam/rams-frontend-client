import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function KsaVisaApp() {
	return <Outlet />;
}

export default withReducer('ksaVisaApp', reducer)(KsaVisaApp);
