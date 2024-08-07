import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DistrictApp() {
	return <Outlet />;
}

export default withReducer('districtApp', reducer)(DistrictApp);
