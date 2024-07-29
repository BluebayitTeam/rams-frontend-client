import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function KuwaitVisaApp() {
	return <Outlet />;
}

export default withReducer('kuwaitVisaApp', reducer)(KuwaitVisaApp);
