import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MalaysiaVisaApp() {
	return <Outlet />;
}

export default withReducer('malaysiaVisaApp', reducer)(MalaysiaVisaApp);
