import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CvMaleApp() {
	return <Outlet />;
}

export default withReducer('cvMaleApp', reducer)(CvMaleApp);
