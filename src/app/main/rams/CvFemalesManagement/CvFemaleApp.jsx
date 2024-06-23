import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CvFemaleApp() {
	return <Outlet />;
}

export default withReducer('cvFemaleApp', reducer)(CvFemaleApp);
