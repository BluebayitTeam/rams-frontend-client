import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CallingEmbAttestationApp() {
	return <Outlet />;
}

export default withReducer('callingEmbAttestationApp', reducer)(CallingEmbAttestationApp);
