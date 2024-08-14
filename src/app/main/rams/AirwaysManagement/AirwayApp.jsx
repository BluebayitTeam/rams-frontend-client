import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function AirwayApp() {
	return <Outlet />;
}

export default withReducer('airwayApp', reducer)(AirwayApp);
