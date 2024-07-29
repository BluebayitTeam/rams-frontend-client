import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function BmetApp() {
	return <Outlet />;
}

export default withReducer('bmetApp', reducer)(BmetApp);
