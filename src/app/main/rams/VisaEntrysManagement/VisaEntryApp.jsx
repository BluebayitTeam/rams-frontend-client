import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function VisaEntryApp() {
	return <Outlet />;
}

export default withReducer('visaEntryApp', reducer)(VisaEntryApp);
