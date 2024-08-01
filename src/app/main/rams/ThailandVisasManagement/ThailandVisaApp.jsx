import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ThailandVisaApp() {
	return <Outlet />;
}

export default withReducer('thailandVisaApp', reducer)(ThailandVisaApp);
